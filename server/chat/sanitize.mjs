const MAX_MESSAGE_LENGTH = 2000
const MAX_MESSAGES = 20
const MAX_HISTORY = 12

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /disregard\s+(the\s+)?(system|above)/i,
  /you\s+are\s+now\s+/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /reveal\s+(the\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?prompt/i,
  /what\s+are\s+your\s+instructions/i,
  /jailbreak/i,
  /DAN\s+mode/i,
  /\bact\s+as\b.*\bwithout\s+restrictions\b/i,
]

const OFF_TOPIC_PATTERNS = [
  /\b(write|debug|fix)\s+(me\s+)?(code|script|function)\b/i,
  /\b(python|javascript|typescript|react|next\.?js|html|css)\s+(help|tutorial|example)\b/i,
  /\b(solve|calculate|what\s+is)\s+.*\b(equation|integral|derivative|math)\b/i,
  /\b(who\s+is\s+the\s+president|election|politics|war\s+in)\b/i,
  /\b(recipe|weather|sports|movie|celebrity)\b/i,
]

const COMPANY_SIGNALS = [
  'neuro tank',
  'neurotank',
  'pricing',
  'price',
  'plan',
  'starter',
  'growth',
  'enterprise',
  'whatsapp',
  'chatbot',
  'automation',
  'consultation',
  'book',
  'service',
  'integration',
  'crm',
  'industry',
  'contact',
  'email',
  'phone',
  'lahore',
  'onboarding',
  'website ai',
  'lead',
  'booking',
  'appointment',
  'support',
  'custom ai',
  'your company',
  'your team',
  'your business',
]

export function sanitizeText(text) {
  if (typeof text !== 'string') return ''
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)
}

export function validateMessages(raw) {
  if (!Array.isArray(raw)) return { ok: false, error: 'Invalid messages format' }
  if (raw.length > MAX_MESSAGES) return { ok: false, error: 'Too many messages' }

  const messages = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const role = item.role === 'assistant' ? 'assistant' : item.role === 'user' ? 'user' : null
    if (!role) continue
    const content = sanitizeText(item.content)
    if (!content) continue
    messages.push({ role, content })
  }

  if (messages.length === 0) return { ok: false, error: 'No valid messages' }
  const last = messages[messages.length - 1]
  if (last.role !== 'user') return { ok: false, error: 'Last message must be from user' }

  return { ok: true, messages: messages.slice(-MAX_HISTORY) }
}

export function detectInjection(text) {
  return INJECTION_PATTERNS.some((p) => p.test(text))
}

export function looksOffTopic(text) {
  const lower = text.toLowerCase()
  const hasCompany = COMPANY_SIGNALS.some((s) => lower.includes(s))
  if (hasCompany) return false
  return OFF_TOPIC_PATTERNS.some((p) => p.test(text))
}

export function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}
