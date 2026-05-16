import { HiArrowRight, HiOutlineRocketLaunch, HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineLightBulb } from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import Button from '@/components/common/Button.jsx'
import Reveal from '@/components/common/Reveal.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import FinalCTA from '@/components/sections/FinalCTA.jsx'
import HowItWorks from '@/components/sections/HowItWorks.jsx'
import { STATS } from '@/data/stats'

const VALUES = [
  { icon: HiOutlineRocketLaunch, title: 'Ship Fast',     text: 'Most clients are live in under 14 days. We pre-build everything that can be pre-built.' },
  { icon: HiOutlineHeart,        title: 'Care Deeply',   text: 'We treat your business like our own. Your numbers are our scoreboard.' },
  { icon: HiOutlineLightBulb,    title: 'Stay Curious',  text: 'We work with the latest AI models the day they ship — so you get tomorrow\'s edge today.' },
  { icon: HiOutlineGlobeAlt,     title: 'Global · 24/7', text: 'A senior team across 4 continents. Someone is always awake — so your AI always is too.' },
]

const TEAM = [
  { name: 'Aria Voss',      role: 'Founder & CEO',        emoji: '🧠' },
  { name: 'Kenji Adler',    role: 'Head of AI Engineering', emoji: '⚡' },
  { name: 'Lena Rakshit',   role: 'Lead Solutions Architect', emoji: '🛠️' },
  { name: 'Mateo Greco',    role: 'Head of Customer Success', emoji: '🤝' },
  { name: 'Saanvi Roe',     role: 'Lead Designer',        emoji: '🎨' },
  { name: 'Ari Frey',       role: 'Growth & Operations',  emoji: '📈' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Neuro Tank"
        title={<>We build the AI that <span className="text-gradient">runs your business</span> while you sleep.</>}
        description="A focused team of AI engineers, designers and operators on a mission to give every business an always-on intelligent workforce."
      >
        <Button to="/contact" magnetic iconRight={<HiArrowRight />}>Work with us</Button>
        <Button href="#mission" variant="ghost">Read our story</Button>
      </PageHeader>

      {/* Big numbers */}
      <Section padded={false} className="pb-20">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <GlassCard className="p-6">
                  <p className="font-display text-4xl md:text-5xl font-semibold text-gradient">{s.value}</p>
                  <p className="mt-2 text-sm text-ink-300">{s.label}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section id="mission" padded={false} className="pb-24">
        <Container>
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="Our mission"
                title={<>Software used to wait. <span className="text-gradient">AI doesn't.</span></>}
                description="Most businesses still lose customers because a reply came 3 hours late. We exist to make 'instant' the new default — at every business, in every language, on every channel."
              />
              <Button to="/contact" magnetic iconRight={<HiArrowRight />}>Partner with us</Button>
            </Reveal>
            <Reveal preset="left">
              <GlassCard className="p-8 md:p-10">
                <p className="text-lg leading-relaxed text-ink-100">
                  We started Neuro Tank after watching brilliant local businesses lose to bigger competitors —
                  not because of product or price, but because of <strong className="text-white">response time</strong>.
                </p>
                <p className="mt-4 text-ink-200/90 leading-relaxed">
                  Today our AI handles millions of conversations every month for restaurants, clinics, agencies,
                  and global hotels — turning every late-night enquiry into a booked customer. We're just getting started.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section padded={false} className="pb-24">
        <Container>
          <SectionHeader
            eyebrow="What we believe"
            title={<>Four ideas <span className="text-gradient">we run on.</span></>}
            description="These aren't posters on a wall. They're how we hire, ship, and treat clients."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={i * 0.06}>
                  <GlassCard className="p-6 h-full">
                    <span className="inline-grid size-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-400/20">
                      <Icon className="size-6 text-white" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm text-ink-200/85 leading-relaxed">{v.text}</p>
                  </GlassCard>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <HowItWorks />

      {/* Team */}
      <Section padded={false} className="pb-24">
        <Container>
          <SectionHeader
            eyebrow="The team"
            title={<>Senior operators. <span className="text-gradient">Zero hand-offs.</span></>}
            description="When you work with us, you work directly with the people who design, build and deploy your AI."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <GlassCard className="p-5 text-center">
                  <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 border border-white/10 text-3xl">
                    {m.emoji}
                  </div>
                  <p className="mt-4 font-medium text-white">{m.name}</p>
                  <p className="text-xs text-ink-300 mt-0.5">{m.role}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  )
}
