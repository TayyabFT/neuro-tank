const WINDOW_MS = 60_000
const MAX_REQUESTS = 25

const buckets = new Map()

export function checkRateLimit(key) {
  const now = Date.now()
  let entry = buckets.get(key)
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { start: now, count: 0 }
    buckets.set(key, entry)
  }
  entry.count += 1
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, retryAfterSec: Math.ceil((WINDOW_MS - (now - entry.start)) / 1000) }
  }
  return { allowed: true }
}

// Prevent unbounded memory in dev
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [k, v] of buckets) {
      if (now - v.start > WINDOW_MS * 2) buckets.delete(k)
    }
  }, WINDOW_MS * 2)
}
