import { HiArrowRight } from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import Button from '@/components/common/Button.jsx'
import ServiceCard from '@/components/ui/ServiceCard.jsx'
import FinalCTA from '@/components/sections/FinalCTA.jsx'
import { SERVICES } from '@/data/services'
import Reveal from '@/components/common/Reveal.jsx'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title={<>An AI workforce for <span className="text-gradient">every channel</span> your customer uses.</>}
        description="From the first WhatsApp ping to the closed deal in your CRM — we automate every step with intelligent AI agents that feel like your best team member."
      >
        <Button to="/contact" magnetic iconRight={<HiArrowRight />}>Get a free audit</Button>
        <Button href="#services-grid" variant="ghost">Explore services</Button>
      </PageHeader>

      <Section id="services-grid" padded={false} className="pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Deep cards */}
      <Section padded={false} className="pb-24">
        <Container>
          <div className="space-y-12">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              const reverse = i % 2 === 1
              return (
                <Reveal key={s.id} preset="up" delay={0}>
                  <div id={s.id} className={`grid items-center gap-8 md:grid-cols-2 rounded-3xl glass-strong border border-white/10 p-8 md:p-12 overflow-hidden relative ${reverse ? '[&>*:first-child]:md:order-2' : ''}`}>
                    <span aria-hidden className="absolute -top-32 -right-24 size-72 rounded-full bg-violet-500/15 blur-3xl" />
                    <div>
                      <div className={`inline-grid size-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br ${s.accent}`}>
                        <Icon className="size-7 text-white" strokeWidth={1.6} />
                      </div>
                      <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold leading-tight text-white">{s.title}</h2>
                      <p className="mt-3 text-ink-200/85 leading-relaxed">{s.description}</p>

                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-ink-200/90">
                            <span className="mt-1.5 size-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button to="/contact" size="sm" magnetic iconRight={<HiArrowRight />}>Start with this</Button>
                        <Button to={`/services/${s.id}`} variant="ghost" size="sm">Learn more</Button>
                      </div>
                    </div>

                    {/* mocked visual panel */}
                    <div className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-25`} />
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <div className="absolute inset-0 grid place-items-center">
                        <Icon className="size-32 text-white/15" strokeWidth={1} />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl glass border border-white/10 p-3 text-xs text-ink-200">
                        <p className="font-mono uppercase tracking-[0.18em] text-ink-300 mb-1">deploy time</p>
                        <p className="text-white font-medium">Production-ready in 7–14 days</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  )
}
