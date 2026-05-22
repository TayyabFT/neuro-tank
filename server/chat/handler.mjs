import { buildSystemPrompt } from './prompt.mjs'
import { retrieveContext, getKnowledgeMeta } from './retrieve.mjs'
import {
  validateMessages,
  detectInjection,
  looksOffTopic,
  getClientIp,
} from './sanitize.mjs'
import { checkRateLimit } from './rateLimit.mjs'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_MODEL = 'llama-3.1-8b-instant'
const REQUEST_TIMEOUT_MS = 25_000
const MAX_RETRIES = 2

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function sseWrite(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`)
}

async function streamGroq({ messages, apiKey, model, onDelta }) {
  let lastError
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.2,
          max_tokens: 512,
          stream: true,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const errText = await response.text().catch(() => '')
        throw new Error(`Groq error ${response.status}: ${errText.slice(0, 200)}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const data = trimmed.slice(5).trim()
          if (data === '[DONE]') return
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) onDelta(delta)
          } catch {
            /* skip malformed chunks */
          }
        }
      }
      return
    } catch (err) {
      lastError = err
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)))
      }
    } finally {
      clearTimeout(timeout)
    }
  }
  throw lastError || new Error('Groq request failed')
}

export async function processChatRequest(body, clientKey = 'anonymous') {
  const meta = getKnowledgeMeta()
  const apiKey = process.env.GROQ_API_KEY
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL

  const rate = checkRateLimit(clientKey)
  if (!rate.allowed) {
    return {
      status: 429,
      stream: false,
      body: { error: 'Too many requests. Please wait a moment and try again.', retryAfterSec: rate.retryAfterSec },
    }
  }

  const validated = validateMessages(body?.messages)
  if (!validated.ok) {
    return { status: 400, stream: false, body: { error: validated.error } }
  }

  const { messages } = validated
  const lastUser = messages[messages.length - 1].content

  if (detectInjection(lastUser)) {
    return {
      status: 200,
      stream: false,
      body: { content: meta.refusalMessage, source: 'guard' },
    }
  }

  if (looksOffTopic(lastUser)) {
    return {
      status: 200,
      stream: false,
      body: { content: meta.refusalMessage, source: 'guard' },
    }
  }

  if (!apiKey) {
    return {
      status: 503,
      stream: false,
      body: {
        error: 'Chat service is not configured. Please add GROQ_API_KEY to your environment.',
      },
    }
  }

  const { context, hasMatch } = retrieveContext(lastUser)
  const systemPrompt = buildSystemPrompt(context)

  const groqMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ]

  if (!hasMatch && messages.length <= 1) {
    groqMessages.push({
      role: 'system',
      content: `If you cannot answer from KNOWLEDGE, use: "${meta.fallbackMessage}"`,
    })
  }

  return {
    status: 200,
    stream: true,
    groqMessages,
    model,
    apiKey,
  }
}

export async function handleChatRequest(req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  try {
    const body = await parseBody(req)
    const ip = getClientIp(req)
    const result = await processChatRequest(body, ip)

    if (!result.stream) {
      res.statusCode = result.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result.body))
      return
    }

    res.statusCode = 200
    sseWrite(res, { type: 'start' })

    let full = ''
    await streamGroq({
      messages: result.groqMessages,
      apiKey: result.apiKey,
      model: result.model,
      onDelta: (text) => {
        full += text
        sseWrite(res, { type: 'delta', text })
      },
    })

    sseWrite(res, { type: 'done', content: full })
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[chat]', err)
    }
    const message =
      err.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : process.env.NODE_ENV !== 'production' && err?.message
          ? err.message
          : 'Something went wrong. Please try again or contact us at neurotank2.5@gmail.com.'

    if (!res.headersSent) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: message }))
    } else {
      sseWrite(res, { type: 'error', error: message })
      res.write('data: [DONE]\n\n')
      res.end()
    }
  }
}

/** Web Request/Response adapter (Vercel / edge-compatible Node) */
export async function handleChatWebRequest(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  let body = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const result = await processChatRequest(body, ip)

  if (!result.stream) {
    return Response.json(result.body, { status: result.status })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
      }
      try {
        send({ type: 'start' })
        let full = ''
        await streamGroq({
          messages: result.groqMessages,
          apiKey: result.apiKey,
          model: result.model,
          onDelta: (text) => {
            full += text
            send({ type: 'delta', text })
          },
        })
        send({ type: 'done', content: full })
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        const message =
          err.name === 'AbortError'
            ? 'Request timed out. Please try again.'
            : 'Something went wrong. Please try again later.'
        send({ type: 'error', error: message })
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
