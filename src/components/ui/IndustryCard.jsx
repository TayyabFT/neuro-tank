import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi2'

export default function IndustryCard({ industry, index = 0 }) {
  const Icon = industry.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
    >
      <Link
        to={`/industries/${industry.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong border border-white/10 p-6 cursor-pointer
                   transition-all duration-500 hover:border-white/20 hover:-translate-y-1
                   hover:shadow-[0_20px_60px_-10px_rgba(124,58,237,0.55)]"
      >
        <span aria-hidden className="absolute -top-24 -right-12 size-56 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition duration-500"
          style={{ background: `radial-gradient(closest-side, ${industry.color}55, transparent 70%)` }} />

        <div className="relative mb-5">
          <div className="relative grid h-32 place-items-center">
            <span className="absolute size-24 rounded-full blur-2xl opacity-50 animate-pulse-glow"
              style={{ background: `radial-gradient(closest-side, ${industry.color}, transparent 70%)` }} />
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
              className="relative grid size-20 place-items-center rounded-2xl border border-white/15
                         bg-gradient-to-br from-white/[0.10] to-white/[0.02] backdrop-blur-xl"
              style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), 0 14px 40px -10px ${industry.color}66` }}
            >
              <Icon className="size-9 text-white" strokeWidth={1.6} style={{ filter: `drop-shadow(0 0 12px ${industry.color}aa)` }} />
            </motion.div>
            <span aria-hidden className="absolute inset-0 grid place-items-center">
              <span className="block size-32">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block animate-orbit">
                  <span className="block size-2 rounded-full" style={{ background: industry.color, boxShadow: `0 0 12px ${industry.color}` }} />
                </span>
              </span>
            </span>
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold text-white">{industry.title}</h3>
        <p className="mt-2 text-sm text-ink-200/85 leading-relaxed">{industry.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {industry.workflow.map((w) => (
            <span key={w} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-wider text-ink-200">
              {w}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-100">
          <span className="bg-gradient-to-r from-neon-400 to-violet-400 bg-clip-text text-transparent">See playbook</span>
          <HiArrowRight className="text-ink-300 transition group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </Link>
    </motion.div>
  )
}
