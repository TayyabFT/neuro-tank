import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import { TESTIMONIALS, LOGOS } from '@/data/testimonials'
import { cn } from '@/utils/cn'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 7000)
    return () => clearInterval(timerRef.current)
  }, [])

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length)
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  const current = TESTIMONIALS[index]

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeader
          eyebrow="Customers"
          title={<>Businesses are <span className="text-gradient">growing while they sleep.</span></>}
          description="Our AI runs the night shift (and the day shift). Here's what founders are saying."
        />

        <div className="relative">
          {/* Backdrop cards */}
          <div className="relative mx-auto max-w-3xl">
            <span aria-hidden className="absolute -inset-x-12 -inset-y-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(124,58,237,0.25),transparent_70%)] blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl glass-strong border border-white/10 p-8 md:p-12"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <HiStar key={i} className="size-4 text-amber-300" />
                    ))}
                  </div>
                  <span className="rounded-full glass border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-200">
                    {current.industry}
                  </span>
                </div>

                <blockquote className="mt-6 font-display text-2xl md:text-3xl leading-snug text-white text-balance">
                  “{current.quote}”
                </blockquote>

                <figcaption className="mt-8 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white font-semibold ring-2 ring-white/10">
                      {current.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                    <div>
                      <p className="font-semibold text-white leading-tight">{current.name}</p>
                      <p className="text-xs text-ink-300 mt-0.5">{current.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 border border-emerald-400/25 px-4 py-2 text-sm font-semibold text-emerald-200">
                    {current.metric}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* nav */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={prev} aria-label="Previous" className="grid size-10 place-items-center rounded-full glass border border-white/10 text-ink-200 hover:text-white hover:border-white/25 transition">
                <HiOutlineChevronLeft className="size-5" />
              </button>
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === index ? 'w-8 bg-gradient-to-r from-neon-400 to-violet-400' : 'w-1.5 bg-white/15 hover:bg-white/30',
                    )}
                  />
                ))}
              </div>
              <button onClick={next} aria-label="Next" className="grid size-10 place-items-center rounded-full glass border border-white/10 text-ink-200 hover:text-white hover:border-white/25 transition">
                <HiOutlineChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Logos marquee */}
          <div className="mt-20">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.28em] text-ink-400">Trusted by teams in 40+ countries</p>
            <div className="mask-fade-x overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap will-change-transform">
                {[...LOGOS, ...LOGOS].map((l, i) => (
                  <span key={i} className="mx-10 font-display text-2xl font-medium text-ink-300/70 hover:text-white transition">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
