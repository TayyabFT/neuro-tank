import Hero from '@/components/sections/Hero.jsx'
import Services from '@/components/sections/Services.jsx'
import Industries from '@/components/sections/Industries.jsx'
import HowItWorks from '@/components/sections/HowItWorks.jsx'
import LiveDemo from '@/components/sections/LiveDemo.jsx'
import WhyUs from '@/components/sections/WhyUs.jsx'
import Testimonials from '@/components/sections/Testimonials.jsx'
import Pricing from '@/components/sections/Pricing.jsx'
import FAQ from '@/components/sections/FAQ.jsx'
import FinalCTA from '@/components/sections/FinalCTA.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <HowItWorks />
      <LiveDemo />
      <WhyUs />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  )
}
