import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiOutlinePlay } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import Button from '@/components/common/Button.jsx'
import AmbientBackdrop from '@/components/common/AmbientBackdrop.jsx'
import { usePrefersReducedMotion, useIsMobile } from '@/hooks/useMediaQuery'

const AmbientParticles = lazy(() => import('@/components/three/AmbientParticles.jsx'))

export default function FinalCTA() {
  const reduce = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const enable3D = !reduce && !isMobile

  return (
    <Section id="final-cta" className="overflow-hidden">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-violet-500/[0.08] to-transparent p-10 md:p-20">
          <AmbientBackdrop intensity="default" />

          {enable3D && (
            <div className="absolute inset-0 -z-10 opacity-70">
              <Suspense fallback={null}>
                <AmbientParticles count={420} radius={12} />
              </Suspense>
            </div>
          )}

          {/* Orbiting glow */}
          <span aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[60rem] rounded-full
            bg-[conic-gradient(from_120deg,rgba(34,211,238,0.18),rgba(124,58,237,0.25),rgba(217,70,239,0.18),rgba(34,211,238,0.18))]
            blur-3xl animate-[gradient_18s_linear_infinite]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3.5 py-1.5 text-xs uppercase tracking-[0.22em] text-ink-200"
            >
              <span className="size-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]" />
              Ready in 14 days · No contracts
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="mt-6 font-display text-balance text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-tight"
            >
              <span className="text-white">Ready to automate your business </span>
              <span className="text-gradient">with AI?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mx-auto mt-5 max-w-xl text-pretty text-ink-200/85 leading-relaxed"
            >
              Book a 30-minute strategy call. We'll map the highest-ROI automations for your business
              and ship you a fixed timeline + price within 48 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <Button to="/contact" size="lg" magnetic iconRight={<HiArrowRight />}>
                Start Now
              </Button>
              <Button href="/#demo" size="lg" variant="ghost" iconLeft={<HiOutlinePlay />}>
                Book Consultation
              </Button>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-300">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                Free strategy call
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                Fixed price · No surprises
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
