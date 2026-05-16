import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function SectionHeader({ eyebrow, title, description, align = 'center', className }) {
  const isCenter = align === 'center'
  return (
    <div className={cn('relative mb-14 sm:mb-20', isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl', className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs uppercase tracking-[0.18em] font-medium text-ink-200',
            isCenter && 'mx-auto',
          )}
        >
          <span className="size-1.5 rounded-full bg-neon-400 shadow-[0_0_12px_2px_rgba(125,249,255,0.8)]" />
          {eyebrow}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-5 font-display text-balance text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-5 text-base sm:text-lg text-ink-200/85 text-pretty leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
