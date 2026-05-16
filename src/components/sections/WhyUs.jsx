import { motion } from 'framer-motion'
import { HiArrowTrendingUp, HiCheck, HiXMark } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import { COMPARISONS, STATS } from '@/data/stats'

function StatCard({ value, label, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      className="relative overflow-hidden rounded-2xl glass-strong border border-white/10 p-6"
    >
      <span aria-hidden className="absolute -top-12 -right-12 size-40 rounded-full bg-violet-500/15 blur-3xl" />
      <p className="font-display text-4xl md:text-5xl font-semibold text-white tabular-nums">
        <span className="text-gradient">{value}</span>
      </p>
      <p className="mt-2 text-sm text-ink-300">{label}</p>
    </motion.div>
  )
}

export default function WhyUs() {
  return (
    <Section id="why-us">
      <Container>
        <SectionHeader
          eyebrow="Why Neuro Tank"
          title={<>The cost of <span className="text-gradient">slow replies</span> is what's killing your growth.</>}
          description="We measured the same metrics across 180+ businesses before and after deploying our AI. Here's the side-by-side."
        />

        {/* Big stats row */}
        <div className="mb-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => <StatCard key={s.label} {...s} i={i} />)}
        </div>

        {/* Comparison panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-strong border border-white/10"
        >
          <span aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-violet-500/20 blur-3xl" />
          <span aria-hidden className="absolute -bottom-24 -left-24 size-72 rounded-full bg-cyan-500/15 blur-3xl" />

          {/* Header row */}
          <div className="relative grid grid-cols-[1.2fr_1fr_1fr_0.8fr] md:grid-cols-[1.4fr_1fr_1fr_0.8fr] border-b border-white/10 bg-white/[0.03]">
            <div className="p-5 text-xs uppercase tracking-[0.22em] text-ink-300 font-medium">Metric</div>
            <div className="p-5 text-xs uppercase tracking-[0.22em] text-ink-300 font-medium">Traditional team</div>
            <div className="relative p-5 text-xs uppercase tracking-[0.22em] text-white font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]" />
                Neuro Tank
              </span>
              <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/15 to-transparent" />
            </div>
            <div className="p-5 text-xs uppercase tracking-[0.22em] text-ink-300 font-medium text-right">Delta</div>
          </div>

          {COMPARISONS.map((row, i) => (
            <motion.div
              key={row.metric}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative grid grid-cols-[1.2fr_1fr_1fr_0.8fr] md:grid-cols-[1.4fr_1fr_1fr_0.8fr] border-b border-white/5 last:border-b-0 group hover:bg-white/[0.02] transition"
            >
              <div className="p-5 font-medium text-white">{row.metric}</div>
              <div className="p-5 text-sm text-ink-300 flex items-center gap-2">
                <HiXMark className="size-4 text-rose-400/80" />
                {row.traditional}
              </div>
              <div className="p-5 text-sm text-white font-medium flex items-center gap-2 bg-gradient-to-r from-violet-500/5 to-transparent">
                <HiCheck className="size-4 text-emerald-400" />
                {row.neuro}
              </div>
              <div className="p-5 text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full glass border border-white/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  <HiArrowTrendingUp className="size-3" />
                  {row.delta}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
