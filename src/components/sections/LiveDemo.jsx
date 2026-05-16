import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiBolt, HiCheckBadge, HiCpuChip, HiOutlineCalendarDays } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import ChatPhone from '@/components/ui/ChatPhone.jsx'
import Button from '@/components/common/Button.jsx'
import { DEMO_CONVERSATIONS } from '@/data/demo'
import { cn } from '@/utils/cn'

const HIGHLIGHTS = [
  { icon: HiBolt,                title: 'Replies in <3 seconds',  text: 'Average response time across 3.2M conversations.' },
  { icon: HiCheckBadge,          title: 'Brand-perfect tone',     text: 'Trained on your voice, products, FAQ and offers.' },
  { icon: HiOutlineCalendarDays, title: 'Books real appointments', text: 'Connected to your calendar — no human in the loop.' },
  { icon: HiCpuChip,             title: 'Connects to your stack', text: 'CRM, Sheets, Stripe, Calendly, Slack and 40+ apps.' },
]

export default function LiveDemo() {
  const [activeId, setActiveId] = useState(DEMO_CONVERSATIONS[0].id)
  const active = DEMO_CONVERSATIONS.find((c) => c.id === activeId)

  return (
    <Section id="demo">
      <Container>
        <SectionHeader
          eyebrow="Live demo"
          title={<>Watch the AI <span className="text-gradient">close conversations</span><br /> in real time.</>}
          description="These aren't mockups. Pick an industry below and watch our AI handle a real customer scenario — exactly as it would on your WhatsApp."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Phone */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <ChatPhone conversation={active} key={active.id} />

              {/* Floating callouts */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 sm:-left-10 top-24 hidden sm:flex items-center gap-2 rounded-2xl glass-strong border border-white/10 px-3 py-2 text-xs text-ink-100 shadow-xl"
              >
                <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-white text-[10px]">AI</span>
                Replied in 1.8s
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-2 sm:-right-8 top-1/2 hidden sm:flex items-center gap-2 rounded-2xl glass-strong border border-white/10 px-3 py-2 text-xs text-ink-100 shadow-xl"
              >
                <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-[10px]">CRM</span>
                Lead saved to HubSpot
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute right-6 -bottom-2 hidden sm:flex items-center gap-2 rounded-2xl glass-strong border border-white/10 px-3 py-2 text-xs text-ink-100 shadow-xl"
              >
                <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px]">📅</span>
                Booking confirmed
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-300 font-medium">Choose a scenario</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DEMO_CONVERSATIONS.map((c) => {
                const isActive = c.id === activeId
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'border-violet-400/60 bg-gradient-to-r from-violet-500/30 to-cyan-400/20 text-white shadow-[0_0_30px_-8px_rgba(124,58,237,0.7)]'
                        : 'border-white/10 bg-white/[0.03] text-ink-200 hover:text-white hover:border-white/20',
                    )}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>

            <h3 className="mt-8 font-display text-3xl md:text-4xl font-semibold leading-tight text-white">
              {active.persona}
            </h3>
            <p className="mt-3 max-w-md text-ink-200/85 leading-relaxed">
              Every reply is generated in real time, grounded in your knowledge base, and routed through your tools — no scripts to maintain.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="rounded-2xl glass border border-white/10 p-4 hover:border-white/20 transition">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-violet-500/30 to-cyan-400/20 border border-white/10">
                        <Icon className="size-4 text-white" />
                      </span>
                      <p className="text-sm font-semibold text-white">{h.title}</p>
                    </div>
                    <p className="text-xs text-ink-300">{h.text}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" magnetic>Get this for my business</Button>
              <Button variant="ghost" href="#pricing">See pricing</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
