import { Link, useParams, Navigate } from 'react-router-dom'
import { HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import Button from '@/components/common/Button.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import { INDUSTRIES } from '@/data/industries'
import { INDUSTRY_PLAYBOOKS } from '@/data/industryPlaybooks'

export default function IndustryDetailPage() {
  const { id } = useParams()
  const industry = INDUSTRIES.find((i) => i.id === id)
  const playbook = INDUSTRY_PLAYBOOKS[id]

  if (!industry || !playbook) {
    return <Navigate to="/industries" replace />
  }

  const Icon = industry.icon

  return (
    <>
      <PageHeader
        eyebrow="Industry playbook"
        title={<>{industry.title} <span className="text-gradient">AI Playbook</span></>}
        description={industry.description}
      >
        <Button to="/contact" magnetic iconRight={<HiArrowRight />}>
          Get this playbook for my business
        </Button>
        <Button to="/industries" variant="ghost" iconLeft={<HiArrowLeft />}>
          All industries
        </Button>
      </PageHeader>

      <Section padded={false} className="pb-24">
        <Container size="narrow">
          <GlassCard className="p-8 md:p-10">
            <div className="flex items-start gap-4 mb-8">
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/10"
                style={{ background: `linear-gradient(135deg, ${industry.color}33, transparent)` }}
              >
                <Icon className="size-7 text-white" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-ink-300">Overview</p>
                <p className="mt-1 text-ink-100 leading-relaxed">{playbook.overview}</p>
              </div>
            </div>

            <h2 className="font-display text-2xl font-semibold text-white">How we deploy</h2>
            <ol className="mt-4 space-y-3">
              {playbook.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-ink-200/90">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/30 border border-white/10 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-display text-2xl font-semibold text-white">Typical results</h2>
            <ul className="mt-4 space-y-2.5">
              {playbook.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm text-ink-200/90">
                  <HiCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {industry.workflow.map((w) => (
                <span key={w} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-wider text-ink-200">
                  {w}
                </span>
              ))}
            </div>
          </GlassCard>

          <p className="mt-8 text-center text-sm text-ink-300">
            Want a custom version for your {industry.title.toLowerCase()} business?{' '}
            <Link to="/contact" className="text-white underline underline-offset-4 hover:text-neon-400 cursor-pointer">
              Book a free consultation
            </Link>
          </p>
        </Container>
      </Section>
    </>
  )
}
