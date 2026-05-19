import { useParams, Navigate } from 'react-router-dom'
import { HiArrowLeft, HiArrowRight, HiCheck } from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import Button from '@/components/common/Button.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import { SERVICES } from '@/data/services'
import { cn } from '@/utils/cn'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = SERVICES.find((s) => s.id === id)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const Icon = service.icon

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={<>{service.title}</>}
        description={service.short}
      >
        <Button to="/contact" magnetic iconRight={<HiArrowRight />}>
          Start with {service.title}
        </Button>
        <Button to="/services" variant="ghost" iconLeft={<HiArrowLeft />}>
          All services
        </Button>
      </PageHeader>

      <Section padded={false} className="pb-24">
        <Container size="narrow">
          <GlassCard className="p-8 md:p-10">
            <div className={cn('inline-grid size-16 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br mb-6', service.accent)}>
              <Icon className="size-8 text-white" strokeWidth={1.6} />
            </div>

            <h2 className="font-display text-2xl font-semibold text-white">What you get</h2>
            <p className="mt-3 text-ink-200/90 leading-relaxed">{service.description}</p>

            <ul className="mt-6 space-y-3">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-ink-200/90">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-400/20 border border-white/10">
                    <HiCheck className="size-3 text-white" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-300">
              Typical go-live: <span className="text-white font-medium">7–14 days</span> depending on integrations.
            </p>
          </GlassCard>
        </Container>
      </Section>
    </>
  )
}
