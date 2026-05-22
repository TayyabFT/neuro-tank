import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import TypingIndicator from './TypingIndicator.jsx'

export default function ChatMessageList({ messages, isLoading }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
      <div className="flex flex-col gap-3">
        {messages.map((msg) => {
          const isUser = msg.role === 'user'
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}
            >
              <div
                className={cn(
                  'max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  isUser
                    ? 'rounded-br-md bg-gradient-to-br from-violet-600/90 to-cyan-600/80 text-white shadow-[0_4px_24px_-4px_rgba(34,211,238,0.35)]'
                    : 'rounded-bl-md border border-white/10 bg-white/[0.06] text-ink-100 backdrop-blur-md',
                  msg.isError && 'border-rose-400/30 bg-rose-500/10 text-rose-100',
                )}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                {msg.streaming && !msg.content && (
                  <span className="inline-block h-4 w-0.5 animate-pulse bg-neon-400" />
                )}
              </div>
              <span className="px-1 text-[10px] text-ink-400">{msg.createdAt}</span>
            </motion.div>
          )
        })}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04]">
            <TypingIndicator />
          </div>
        )}
        {isLoading &&
          messages[messages.length - 1]?.role === 'assistant' &&
          !messages[messages.length - 1]?.content && <TypingIndicator />}
      </div>
      <div ref={endRef} className="h-1" />
    </div>
  )
}
