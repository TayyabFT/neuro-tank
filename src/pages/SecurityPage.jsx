import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import { COMPANY } from '@/data/navigation'

const SECTIONS = [
  {
    title: 'Data protection',
    body: 'Customer data and conversation logs are encrypted in transit (TLS) and at rest. Access is restricted to authorized team members on a need-to-know basis.',
  },
  {
    title: 'Infrastructure',
    body: 'We use reputable cloud providers with industry-standard physical and network security. Production systems are monitored for uptime and suspicious activity.',
  },
  {
    title: 'AI & third-party tools',
    body: 'AI models and integrations (WhatsApp, CRM, calendar, etc.) process data only as required to deliver your automation. We do not sell your data to third parties.',
  },
  {
    title: 'Access control',
    body: 'Dashboard and admin access use secure authentication. API keys and credentials are stored encrypted and rotated when staff changes or on request.',
  },
  {
    title: 'Compliance-ready workflows',
    body: 'For healthcare, finance, or other regulated use cases, we configure data retention, escalation, and human handoff rules aligned with your compliance requirements.',
  },
  {
    title: 'Incident response',
    body: 'If we detect a security incident affecting your data, we will notify you promptly and work to contain, investigate, and remediate the issue.',
  },
  {
    title: 'Your responsibilities',
    body: 'Keep your login credentials safe. Review AI responses in sensitive contexts. Notify us immediately if you suspect unauthorized access.',
  },
  {
    title: 'Contact security team',
    body: `Report security concerns to ${COMPANY.email} with subject "Security". Phone: ${COMPANY.phone}.`,
  },
]

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={<>Security & <span className="text-gradient">Privacy</span></>}
        description="How Neuro Tank protects your business data and customer conversations."
      />

      <Section padded={false} className="pb-24">
        <Container size="narrow">
          <GlassCard className="p-8 md:p-10 space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-200/90">{s.body}</p>
              </div>
            ))}
          </GlassCard>
          <p className="mt-8 text-center text-sm text-ink-300">
            See also our{' '}
            <Link to="/terms" className="text-white underline underline-offset-4 hover:text-neon-400 cursor-pointer">
              Terms & Conditions
            </Link>
          </p>
        </Container>
      </Section>
    </>
  )
}
