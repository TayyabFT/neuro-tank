import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineBolt } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useChatbot } from '@/hooks/useChatbot'
import ChatOrbButton from './ChatOrbButton.jsx'
import ChatMessageList from './ChatMessageList.jsx'
import ChatComposer from './ChatComposer.jsx'
import SuggestedChips from './SuggestedChips.jsx'

export default function ChatWidget() {
  const { isOpen, toggle, close, messages, isLoading, sendMessage } = useChatbot()

  const showSuggestions =
    messages.length <= 1 || (messages.length === 2 && messages[0]?.id === 'welcome')

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[200] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="pointer-events-auto flex h-[min(560px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/15 bg-ink-950/85 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65),0_0_60px_-10px_rgba(124,58,237,0.45)] backdrop-blur-2xl"
            role="dialog"
            aria-label="Neuro Tank AI assistant"
          >
            <div className="relative border-b border-white/10 px-4 py-3">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-cyan-500/10" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-neon-400/30 bg-gradient-to-br from-violet-600/40 to-cyan-600/30">
                    <HiOutlineBolt className="h-5 w-5 text-neon-400" />
                    <span className="absolute -inset-0.5 rounded-2xl bg-neon-400/20 blur-md" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">Neuro Tank AI</p>
                    <p className="text-xs text-ink-300">Company assistant · replies in seconds</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg px-2 py-1 text-xs text-ink-300 hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>

            <ChatMessageList messages={messages} isLoading={isLoading} />

            {showSuggestions && (
              <SuggestedChips onSelect={sendMessage} disabled={isLoading} />
            )}

            <div className="px-4 pb-2">
              <Link
                to="/contact"
                className="block rounded-xl border border-violet-500/25 bg-violet-500/10 px-3 py-2 text-center text-xs text-violet-200 transition hover:bg-violet-500/20"
              >
                Book free consultation →
              </Link>
            </div>

            <ChatComposer onSend={sendMessage} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto">
        <ChatOrbButton isOpen={isOpen} onClick={toggle} />
      </div>
    </div>
  )
}
