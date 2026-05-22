import { SUGGESTED_PROMPTS } from '@/lib/chatbot/constants.js'

export default function SuggestedChips({ onSelect, disabled }) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {SUGGESTED_PROMPTS.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item.message)}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-100 transition hover:border-neon-400/40 hover:bg-neon-400/10 hover:text-white disabled:opacity-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
