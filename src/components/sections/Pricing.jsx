import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheck, HiOutlineSparkles } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import Button from '@/components/common/Button.jsx'
import { PRICING_PLANS } from '@/data/pricing'
import { cn } from '@/utils/cn'

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <Section id="pricing">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title={<>Plans that <span className="text-gradient">scale with your revenue.</span></>}
          description="Start with a single bot, grow into a full AI workforce. No setup fees, no contracts. Cancel anytime."
        />

        {/* Billing toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className={cn('text-sm', !yearly ? 'text-white' : 'text-ink-400')}>Monthly</span>
          <button
            onClick={() => setYearly((y) => !y)}
            role="switch"
            aria-checked={yearly}
            className={cn(
              'relative h-8 w-14 rounded-full transition-colors border',
              yearly ? 'border-violet-400/60 bg-gradient-to-r from-violet-500/40 to-cyan-400/30' : 'border-white/10 bg-white/[0.05]',
            )}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={cn(
                'absolute top-1 size-6 rounded-full bg-white shadow-lg',
                yearly ? 'left-7' : 'left-1',
              )}
            />
          </button>
          <span className={cn('text-sm', yearly ? 'text-white' : 'text-ink-400')}>
            Yearly <span className="ml-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">Save 17%</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => {
            const price = plan.customPrice
              ? plan.customPrice
              : yearly
                ? `$${Math.round(plan.priceYearly / 12).toLocaleString()}`
                : `$${plan.priceMonthly.toLocaleString()}`

            const period = plan.customPrice ? '' : '/month'
            const subtotal = !plan.customPrice && yearly ? `Billed $${plan.priceYearly.toLocaleString()}/year` : null

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative group"
              >
                <div className={cn(
                  'relative overflow-hidden rounded-3xl p-7 transition-all duration-500 h-full flex flex-col',
                  plan.highlight
                    ? 'border-2 border-transparent bg-gradient-to-b from-violet-500/10 to-transparent shadow-[0_30px_80px_-20px_rgba(124,58,237,0.5)] [background-clip:padding-box] gradient-border'
                    : 'glass-strong border border-white/10 hover:border-white/20',
                )}>
                  {/* Accent glow */}
                  <span aria-hidden className={cn(
                    'absolute -top-32 -right-24 size-72 rounded-full blur-3xl transition duration-500',
                    plan.highlight ? 'bg-violet-500/30 opacity-90' : 'bg-violet-500/10 opacity-50 group-hover:opacity-80',
                  )} />

                  {plan.badge && (
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold text-white shadow-lg">
                      <HiOutlineSparkles className="size-3" /> {plan.badge}
                    </span>
                  )}

                  <div className="relative">
                    <p className="font-display text-xl font-semibold text-white">{plan.name}</p>
                    <p className="mt-1 text-sm text-ink-300">{plan.tagline}</p>

                    <div className="mt-7 flex items-baseline gap-2">
                      <span className="font-display text-5xl md:text-6xl font-semibold text-white">{price}</span>
                      {period && <span className="text-sm text-ink-300">{period}</span>}
                    </div>
                    {subtotal && <p className="mt-1 text-xs text-ink-400">{subtotal}</p>}
                  </div>

                  <ul className="relative mt-7 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-200/90">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-400/20 border border-white/10">
                          <HiCheck className="size-3 text-white" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8">
                    <Button
                      to="/contact"
                      variant={plan.highlight ? 'primary' : 'ghost'}
                      className="w-full"
                      magnetic={plan.highlight}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm text-ink-400">
          Every plan includes setup, training, integrations and lifetime optimization.
          Not sure which fits? <a href="/contact" className="text-white underline underline-offset-4 hover:text-neon-400">Talk to a strategist →</a>
        </p>
      </Container>
    </Section>
  )
}
