import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi2'
import { useTilt } from '@/hooks/useTilt'
import { cn } from '@/utils/cn'

export default function ServiceCard({ service, index = 0 }) {
  const tilt = useTilt({ max: 6, scale: 1.015 })
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div
        {...tilt}
        className="relative h-full rounded-3xl glass-strong border border-white/10 p-7 overflow-hidden cursor-default
                   transition-[transform,box-shadow] duration-300 ease-out will-change-transform
                   hover:shadow-[0_30px_80px_-20px_rgba(124,58,237,0.55)]"
        style={{ transform: 'perspective(900px)' }}
      >
        {/* Top glow line */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* Accent gradient blob */}
        <span aria-hidden className={cn('absolute -top-24 -right-16 size-56 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition duration-500 bg-gradient-to-br', service.accent)} />
        {/* Mouse glare */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
          style={{ background: 'radial-gradient(220px circle at var(--glare-x,50%) var(--glare-y,50%), rgba(255,255,255,0.08), transparent 60%)' }}
        />

        <div className="relative">
          <div className={cn(
            'inline-grid size-14 place-items-center rounded-2xl border border-white/10',
            'bg-gradient-to-br', service.accent,
            'shadow-[0_10px_30px_-10px_rgba(124,58,237,0.65)]',
          )}>
            <Icon className="size-7 text-white" strokeWidth={1.6} />
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-200/85">
            {service.short}
          </p>

          <ul className="mt-6 space-y-2.5">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink-200/90">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-400 shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-5">
            <Link to={`/services/${service.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 group/link cursor-pointer">
              <span className="bg-gradient-to-r from-neon-400 to-violet-400 bg-clip-text text-transparent">Learn more</span>
              <HiArrowRight className="text-ink-300 transition group-hover/link:translate-x-1 group-hover/link:text-white" />
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
