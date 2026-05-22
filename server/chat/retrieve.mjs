import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const knowledge = JSON.parse(readFileSync(join(__dirname, 'knowledge.json'), 'utf8'))

const STOP = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
  'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
  'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'between', 'under', 'again', 'further', 'then', 'once',
  'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
  'own', 'same', 'so', 'than', 'too', 'very', 'just', 'and', 'but',
  'if', 'or', 'because', 'until', 'while', 'about', 'against', 'what',
  'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'i',
  'you', 'your', 'we', 'our', 'they', 'their', 'me', 'my', 'tell', 'please',
])

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
}

export function retrieveContext(query, limit = 6) {
  const tokens = tokenize(query)
  if (tokens.length === 0) {
    return {
      context: knowledge.company.mission,
      chunks: [],
      hasMatch: false,
    }
  }

  const scored = knowledge.chunks.map((chunk) => {
    const tagText = (chunk.tags || []).join(' ')
    const corpus = `${tagText} ${chunk.content}`.toLowerCase()
    let score = 0
    for (const t of tokens) {
      if (corpus.includes(t)) score += 1
      if (tagText.includes(t)) score += 2
    }
    return { chunk, score }
  })

  scored.sort((a, b) => b.score - a.score)
  const top = scored.filter((s) => s.score > 0).slice(0, limit)

  if (top.length === 0) {
    return {
      context: `${knowledge.company.name} — ${knowledge.company.mission}\nContact: ${knowledge.company.email}, ${knowledge.company.phone}`,
      chunks: [],
      hasMatch: false,
    }
  }

  const context = [
    `Company: ${knowledge.company.name}`,
    `Contact: ${knowledge.company.email} | ${knowledge.company.phone} | ${knowledge.company.location}`,
    ...top.map((t) => t.chunk.content),
  ].join('\n\n')

  return { context, chunks: top.map((t) => t.chunk.id), hasMatch: true }
}

export function getKnowledgeMeta() {
  return {
    refusalMessage: knowledge.refusalMessage,
    fallbackMessage: knowledge.fallbackMessage,
    company: knowledge.company,
  }
}
