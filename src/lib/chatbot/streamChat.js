import { CHAT_API_URL } from './constants.js'

function parseSseLine(line, handlers) {
  if (!line.startsWith('data:')) return
  const payload = line.slice(5).trim()
  if (payload === '[DONE]') return
  try {
    const data = JSON.parse(payload)
    if (data.type === 'delta' && data.text) handlers.onDelta?.(data.text)
    if (data.type === 'done' && data.content) handlers.onDone?.(data.content)
    if (data.type === 'error') handlers.onError?.(new Error(data.error || 'Stream error'))
  } catch {
    /* ignore partial JSON */
  }
}

/**
 * Stream or receive a full JSON reply from /api/chat
 */
export async function streamChat({ messages, signal, onDelta, onStart }) {
  const res = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })

  const contentType = res.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data.error || 'Request failed')
    }
    if (data.content) {
      onStart?.()
      onDelta?.(data.content)
      return data.content
    }
    throw new Error(data.error || 'Empty response')
  }

  if (!res.ok || !res.body) {
    throw new Error('Chat service unavailable')
  }

  onStart?.()
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split('\n\n')
    buffer = parts.pop() || ''

    for (const block of parts) {
      for (const line of block.split('\n')) {
        parseSseLine(line.trim(), {
          onDelta: (text) => {
            full += text
            onDelta?.(text)
          },
        })
      }
    }
  }

  return full
}
