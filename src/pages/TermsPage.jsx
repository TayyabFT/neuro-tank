import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import { COMPANY } from '@/data/navigation'

const SECTIONS = [
  {
    title: '1. Agreement',
    body: `By using ${COMPANY.name} ("we", "us") website and services, you agree to these Terms & Conditions. If you do not agree, please do not use our services.`,
  },
  {
    title: '2. Services',
    body: 'We provide AI automation solutions including chatbots, WhatsApp automation, CRM integrations, and custom workflows. Scope, timeline, and pricing are defined in your project agreement or subscription plan.',
  },
  {
    title: '3. Client responsibilities',
    body: 'You agree to provide accurate business information, necessary API access, and timely feedback during setup. You are responsible for how AI responses are used in regulated industries (health, finance, etc.).',
  },
  {
    title: '4. Payment & billing',
    body: 'Subscription fees are billed monthly or annually as selected. Late payments may pause service. Refunds follow the policy stated in your signed agreement or our 30-day satisfaction guarantee where applicable.',
  },
  {
    title: '5. Intellectual property',
    body: 'You retain ownership of your data, brand assets, and customer content. We retain ownership of our platform, templates, and proprietary tooling. Custom workflows built for you are licensed for your business use.',
  },
  {
    title: '6. Limitation of liability',
    body: 'Our services are provided "as is" within commercially reasonable efforts. We are not liable for indirect damages, lost profits, or issues caused by third-party platforms (WhatsApp, Meta, CRM vendors, etc.).',
  },
  {
    title: '7. Termination',
    body: 'Either party may terminate per contract terms. You may export your data upon termination. We may suspend service for abuse, illegal use, or non-payment.',
  },
  {
    title: '8. Governing law',
    body: 'These terms are governed by the laws of Pakistan. Disputes shall be resolved in Lahore, Pakistan unless otherwise agreed in writing.',
  },
  {
    title: '9. Contact',
    body: `Questions about these terms: ${COMPANY.email} · ${COMPANY.phone} · ${COMPANY.address}.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={<>Terms & <span className="text-gradient">Conditions</span></>}
        description="Last updated: May 2026. Please read these terms before using our services."
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
            <Link to="/security" className="text-white underline underline-offset-4 hover:text-neon-400 cursor-pointer">
              Security policy
            </Link>
          </p>
        </Container>
      </Section>
    </>
  )
}
