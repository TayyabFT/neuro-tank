import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineMicrophone, HiOutlinePaperClip, HiOutlineFaceSmile, HiCheckCircle } from 'react-icons/hi2'
import { cn } from '@/utils/cn'

/**
 * Animated 3D-ish phone mockup that types out a conversation.
 * Pure CSS perspective transforms — no WebGL, so it's cheap and crisp.
 */
export default function ChatPhone({ conversation, autoplay = true, className }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const scrollerRef = useRef(null)

  useEffect(() => {
    if (!autoplay) return
    if (!conversation) return

    // Reset the rolling state for a new conversation. This is intentional
    // synchronization (conversation prop -> internal playback state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(0)
    setIsTyping(false)

    let cancelled = false
    let i = 0

    const advance = () => {
      if (cancelled) return
      const next = conversation.messages[i]
      if (!next) return
      // typing indicator only for bot
      if (next.from === 'bot') {
        setIsTyping(true)
        const delay = 900 + Math.min(next.text.length * 22, 1400)
        setTimeout(() => {
          if (cancelled) return
          setIsTyping(false)
          setVisibleCount(i + 1)
          i++
          setTimeout(advance, 700)
        }, delay)
      } else {
        setVisibleCount(i + 1)
        i++
        setTimeout(advance, 900)
      }
    }
    const t = setTimeout(advance, 400)
    return () => { cancelled = true; clearTimeout(t) }
  }, [conversation, autoplay])

  // auto-scroll to bottom
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [visibleCount, isTyping])

  const visible = conversation?.messages.slice(0, visibleCount) ?? []

  return (
    <div className={cn('relative mx-auto w-[300px] sm:w-[340px]', className)}>
      {/* Glow under phone */}
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(124,58,237,0.45),transparent_70%)] blur-2xl" />

      <motion.div
        initial={{ rotateY: -8, rotateX: 6 }}
        animate={{ rotateY: [-8, 8, -8], rotateX: [6, 2, 6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        className="relative rounded-[2.6rem] bg-gradient-to-b from-zinc-900 to-black p-2.5 shadow-[0_30px_80px_-10px_rgba(124,58,237,0.65)] ring-1 ring-white/10"
      >
        {/* speaker / notch */}
        <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-black px-6 py-1.5 ring-1 ring-white/10">
          <span className="block h-1.5 w-12 rounded-full bg-zinc-800" />
        </div>

        <div className="relative overflow-hidden rounded-[2.1rem] bg-[#0b1418]">
          {/* WhatsApp-like header */}
          <div className="flex items-center gap-3 bg-gradient-to-b from-emerald-700/95 to-emerald-800/95 px-4 py-3 pt-8">
            <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white text-[11px] font-semibold ring-2 ring-white/20">
              {conversation?.avatar ?? 'NT'}
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-white">{conversation?.persona ?? 'AI Assistant'}</p>
              <p className="text-[10px] text-emerald-100/80 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                online · ai
              </p>
            </div>
          </div>

          {/* Chat scroller */}
          <div
            ref={scrollerRef}
            className="relative h-[420px] overflow-y-auto scrollbar-hide px-3 py-4 space-y-2.5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(11,20,24,0.92), rgba(11,20,24,0.92)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M0 20h40M20 0v40' stroke='%23ffffff' stroke-opacity='0.04'/></svg>\")",
            }}
            data-lenis-prevent
          >
            <AnimatePresence initial={false}>
              {visible.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'relative max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-md',
                      m.from === 'user'
                        ? 'rounded-tr-sm bg-emerald-600 text-white'
                        : 'rounded-tl-sm bg-zinc-800/95 text-zinc-100 ring-1 ring-white/5',
                    )}
                  >
                    {m.text}
                    <span className={cn('absolute -bottom-1 text-[9px] flex items-center gap-1',
                      m.from === 'user' ? 'right-2 text-emerald-100/70' : 'left-2 text-zinc-400')}>
                      {String(idx + 1).padStart(2, '0')}:32
                      {m.from === 'user' && <HiCheckCircle className="text-cyan-300" />}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-zinc-800/95 px-3.5 py-2.5 ring-1 ring-white/5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-zinc-300"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-2 border-t border-white/5 bg-[#0b1418] p-2.5">
            <button className="grid size-9 place-items-center rounded-full text-zinc-400 hover:text-white">
              <HiOutlineFaceSmile className="size-5" />
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-zinc-800/80 px-3 py-2 text-xs text-zinc-400 ring-1 ring-white/5">
              <HiOutlinePaperClip className="size-4" />
              <span>Type a message</span>
            </div>
            <button className="grid size-9 place-items-center rounded-full bg-emerald-600 text-white">
              <HiOutlineMicrophone className="size-5" />
            </button>
          </div>
        </div>

        {/* side button */}
        <span aria-hidden className="absolute right-[-3px] top-28 h-14 w-[3px] rounded-full bg-zinc-700" />
      </motion.div>
    </div>
  )
}
