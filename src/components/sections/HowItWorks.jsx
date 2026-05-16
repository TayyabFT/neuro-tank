import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HiCheck } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import { PROCESS_STEPS } from '@/data/process'

export default function HowItWorks() {
  const wrapper = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapper, offset: ['start center', 'end center'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title={<>From kickoff to live AI workforce<br /><span className="text-gradient">in under 14 days.</span></>}
          description="A focused, transparent process. You stay in the loop with weekly demos, and your team is fully trained when we hand over."
        />

        <div ref={wrapper} className="relative mx-auto max-w-4xl">
          {/* center timeline */}
          <div aria-hidden className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/8">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-neon-400 via-violet-500 to-fuchsia-500 shadow-[0_0_30px_rgba(124,58,237,0.6)]"
            />
          </div>

          <ul className="space-y-12 md:space-y-20">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon
              const isRight = i % 2 === 1
              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative grid grid-cols-[3rem_1fr] md:grid-cols-2 md:gap-12 items-center ${isRight ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  {/* Dot */}
                  <span aria-hidden className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 grid size-10 place-items-center rounded-full bg-ink-950 ring-1 ring-white/10">
                    <span className="size-3 rounded-full bg-gradient-to-br from-neon-400 to-violet-500 shadow-[0_0_18px_rgba(167,139,250,0.8)]" />
                  </span>

                  {/* Card */}
                  <div className={`col-start-2 md:col-auto ${isRight ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="relative rounded-3xl glass-strong border border-white/10 p-6 md:p-7 group hover:border-white/20 transition">
                      <span aria-hidden className="absolute -top-12 -right-8 size-40 rounded-full blur-3xl bg-violet-500/20 opacity-50 group-hover:opacity-90 transition" />
                      <div className="relative flex items-start gap-4">
                        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 border border-white/10">
                          <Icon className="size-6 text-white" strokeWidth={1.7} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs tracking-[0.22em] text-ink-300">STEP {step.id}</span>
                            <span className="rounded-full bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-200">
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="mt-1 font-display text-2xl font-semibold text-white">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-200/85">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* opposite-side visual */}
                  <div className={`hidden md:block ${isRight ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                    <div className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ink-200">
                      <HiCheck className="text-emerald-400" /> Auto-tracked milestone
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
