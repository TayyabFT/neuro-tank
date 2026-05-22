import { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi2'

export default function ChatComposer({ onSend, disabled }) {
  const [input, setInput] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || disabled) return
    onSend(text)
    setInput('')
  }

  return (
    <form
      onSubmit={submit}
      className="border-t border-white/10 bg-ink-950/60 p-3 backdrop-blur-xl"
    >
      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-neon-400/40 focus-within:shadow-[0_0_20px_-4px_rgba(34,211,238,0.25)]">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit(e)
            }
          }}
          placeholder="Ask about services, pricing, automation…"
          disabled={disabled}
          maxLength={2000}
          className="max-h-24 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink-50 placeholder:text-ink-400 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-500 to-violet-600 text-white transition hover:opacity-90 disabled:opacity-40"
        >
          <HiPaperAirplane className="h-4 w-4 -rotate-45" />
        </button>
      </div>
    </form>
  )
}
