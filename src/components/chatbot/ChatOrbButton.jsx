import { motion } from 'framer-motion'
import { HiSparkles, HiXMark } from 'react-icons/hi2'
import { cn } from '@/utils/cn'

export default function ChatOrbButton({ isOpen, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
      aria-expanded={isOpen}
      className={cn(
        'relative flex h-14 w-14 items-center justify-center rounded-full',
        'border border-white/20 bg-ink-900/80 shadow-[0_0_40px_-6px_rgba(124,58,237,0.7)] backdrop-blur-xl',
        'transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-400',
      )}
      whileTap={{ scale: 0.95 }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-neon-400/30 via-violet-500/20 to-fuchsia-500/30 animate-pulse-glow" />
      <span className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400/40 via-violet-500/30 to-fuchsia-500/40 blur-md opacity-70" />
      <motion.span
        className="relative z-10 text-white"
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? <HiXMark className="h-6 w-6" /> : <HiSparkles className="h-6 w-6" />}
      </motion.span>
      {!isOpen && (
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-400" />
        </span>
      )}
    </motion.button>
  )
}
