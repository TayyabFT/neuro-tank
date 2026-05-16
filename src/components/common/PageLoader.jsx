import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink-950">
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          className="relative size-20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span className="absolute inset-0 rounded-full border-t-2 border-neon-400 shadow-[0_0_30px_rgba(125,249,255,0.6)]" />
          <span className="absolute inset-2 rounded-full border-t-2 border-violet-400 shadow-[0_0_25px_rgba(167,139,250,0.6)] rotate-180" />
          <span className="absolute inset-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
        </motion.div>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ink-300">
          Booting neural core
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            …
          </motion.span>
        </p>
      </div>
    </div>
  )
}
