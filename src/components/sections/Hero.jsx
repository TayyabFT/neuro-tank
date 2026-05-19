import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { HiOutlinePlay, HiArrowRight, HiOutlineSparkles, HiOutlineBolt, HiOutlineShieldCheck, HiOutlineClock } from 'react-icons/hi2'
import Container from '@/components/common/Container.jsx'
import Button from '@/components/common/Button.jsx'
import Badge from '@/components/common/Badge.jsx'
import AmbientBackdrop from '@/components/common/AmbientBackdrop.jsx'
import { usePrefersReducedMotion, useIsMobile } from '@/hooks/useMediaQuery'

const HeroScene = lazy(() => import('@/components/three/HeroScene.jsx'))

const TRUST_TICKERS = [
  '30+ businesses supported',
  '1 Lakh+ conversations handled',
  'Replies in under 3 seconds',
  '24/7 coverage',
  '40+ CRM integrations',
  '95+ languages supported',
]

const FLOATING_TAGS = [
  { icon: HiOutlineBolt,         text: 'Replies in <3s',   pos: 'left-[6%] top-[28%]',  delay: 0.4 },
  { icon: HiOutlineShieldCheck,  text: 'GDPR · SOC 2',     pos: 'right-[5%] top-[34%]', delay: 0.6 },
  { icon: HiOutlineClock,        text: '24 / 7 uptime',    pos: 'left-[8%] bottom-[18%]', delay: 0.8 },
  { icon: HiOutlineSparkles,     text: 'Trained on your brand', pos: 'right-[6%] bottom-[22%]', delay: 1.0 },
]

export default function Hero() {
  const reduce = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const enable3D = !reduce && !isMobile

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden pt-32 pb-20">
      <AmbientBackdrop intensity="intense" />

      {/* 3D background scene */}
      {enable3D && (
        <div className="absolute inset-0 -z-[5]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
          {/* readability vignette over the canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_55%,transparent_30%,rgba(2,3,10,0.78)_70%)]" />
        </div>
      )}

      {/* Mobile fallback orb */}
      {!enable3D && (
        <div className="absolute inset-0 -z-[5] flex items-center justify-center">
          <div className="relative size-[24rem] max-w-[80vw] rounded-full
            bg-[conic-gradient(from_120deg,#22d3ee,#7c3aed,#d946ef,#22d3ee)]
            blur-2xl opacity-50 animate-[gradient_10s_linear_infinite]" />
        </div>
      )}

      {/* Floating holographic tags */}
      <div aria-hidden className="hidden md:block">
        {FLOATING_TAGS.map(({ icon: Icon, text, pos, delay }) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
            className={`absolute z-10 ${pos}`}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2 rounded-full glass-strong border border-white/10 px-3.5 py-2 text-xs text-ink-100 shadow-[0_8px_30px_-10px_rgba(124,58,237,0.5)]"
            >
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white text-[10px]">
                <Icon className="size-3.5" />
              </span>
              {text}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge className="mx-auto">
            Always-on AI for ambitious businesses
          </Badge>

          <h1 className="mt-7 font-display text-balance text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-semibold tracking-tight">
            <span className="block text-white">AI Automation That Works</span>
            <span className="block">
              <span className="text-gradient">24/7</span> <span className="text-white">For Your Business</span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base sm:text-lg text-ink-200/85 leading-relaxed"
          >
            We build AI-powered WhatsApp bots, website chatbots, and automation systems
            that reply instantly, generate leads, book appointments and automate support —
            so you never lose a customer to a slow response again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button to="/contact" size="lg" magnetic iconRight={<HiArrowRight />}>
              Book Free Consultation
            </Button>
            <Button href="/#demo" size="lg" variant="ghost" iconLeft={<HiOutlinePlay />}>
              Watch Live Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3 text-xs text-ink-300"
          >
            <span className="flex -space-x-2">
              {[
                'from-violet-500 to-cyan-400',
                'from-fuchsia-500 to-rose-400',
                'from-cyan-500 to-emerald-400',
                'from-amber-400 to-rose-500',
              ].map((g) => (
                <span key={g} className={`size-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-ink-950`} />
              ))}
            </span>
            <span className="font-medium text-ink-200">30+ businesses</span> trust us to handle their AI
          </motion.div>
        </motion.div>
      </Container>

      {/* Marquee trust strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
        <div className="relative mask-fade-x overflow-hidden border-y border-white/5 bg-ink-950/60 backdrop-blur-sm">
          <div className="flex animate-marquee whitespace-nowrap py-4 will-change-transform">
            {[...TRUST_TICKERS, ...TRUST_TICKERS].map((t, i) => (
              <span key={i} className="mx-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-300">
                <span className="size-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
