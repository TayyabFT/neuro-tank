import { HiArrowRight } from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import Button from '@/components/common/Button.jsx'
import IndustryCard from '@/components/ui/IndustryCard.jsx'
import FinalCTA from '@/components/sections/FinalCTA.jsx'
import Testimonials from '@/components/sections/Testimonials.jsx'
import { INDUSTRIES } from '@/data/industries'

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries we automate"
        title={<>Battle-tested AI playbooks <br /><span className="text-gradient">for your industry.</span></>}
        description="We've shipped AI automation for restaurants to enterprise hotels. Every playbook is pre-built — we just tune it to your brand."
      >
        <Button to="/contact" iconRight={<HiArrowRight />} magnetic>Get my custom playbook</Button>
        <Button href="#industries-grid" variant="ghost">See industries</Button>
      </PageHeader>

      <Section id="industries-grid" padded={false} className="pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard key={ind.id} industry={ind} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Testimonials />
      <FinalCTA />
    </>
  )
}
