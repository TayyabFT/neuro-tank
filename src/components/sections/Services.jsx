import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import ServiceCard from '@/components/ui/ServiceCard.jsx'
import { SERVICES } from '@/data/services'

export default function Services() {
  return (
    <Section id="services">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title={<>Everything your AI workforce needs<br /><span className="text-gradient">to run on autopilot.</span></>}
          description="From WhatsApp to website to phone — drop intelligent AI agents into every channel your customers already use, and watch your operations run themselves."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
