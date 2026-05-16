import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import IndustryCard from '@/components/ui/IndustryCard.jsx'
import { INDUSTRIES } from '@/data/industries'

export default function Industries() {
  return (
    <Section id="industries" className="relative">
      <Container>
        <SectionHeader
          eyebrow="Industries"
          title={<>Built for the way <span className="text-gradient">your industry sells.</span></>}
          description="Ready-made AI playbooks for the businesses we know inside out — and a custom-built path for anyone we haven't met yet."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.id} industry={ind} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
