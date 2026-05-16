import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa6'
import { HiArrowRight, HiCheck } from 'react-icons/hi2'
import Container from '@/components/common/Container.jsx'
import Logo from '@/components/common/Logo.jsx'
import Button from '@/components/common/Button.jsx'
import { NAV_LINKS, COMPANY } from '@/data/navigation'
import { SERVICES } from '@/data/services'

const SOCIALS = [
  { icon: FaXTwitter,    href: COMPANY.social.twitter,   label: 'Twitter / X' },
  { icon: FaLinkedinIn,  href: COMPANY.social.linkedin,  label: 'LinkedIn' },
  { icon: FaInstagram,   href: COMPANY.social.instagram, label: 'Instagram' },
  { icon: FaYoutube,     href: COMPANY.social.youtube,   label: 'YouTube' },
  { icon: FaGithub,      href: COMPANY.social.github,    label: 'GitHub' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 4500)
  }

  return (
    <footer className="relative mt-12 overflow-hidden">
      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[60rem] rounded-full bg-violet-600/20 blur-3xl" />

      <Container className="relative pb-12 pt-20">
        {/* Top CTA strip */}
        <div className="grid gap-10 rounded-3xl glass-strong border border-white/10 p-8 md:p-12 mb-16 md:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-ink-300">Newsletter</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl text-white leading-tight">
              Get the future of business AI delivered <span className="text-gradient">to your inbox</span>.
            </h3>
            <p className="mt-3 max-w-lg text-ink-300">
              Tactical AI automation breakdowns, case studies and templates — once a week. No fluff.
            </p>
          </div>

          <form onSubmit={onSubmit} className="relative">
            <div className="flex items-center rounded-full glass border border-white/10 p-1.5 pl-5 focus-within:border-violet-400/60 transition">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 bg-transparent placeholder-ink-400 text-white outline-none text-sm py-2"
              />
              <Button type="submit" size="sm" iconRight={!submitted && <HiArrowRight />}>
                {submitted ? (
                  <span className="inline-flex items-center gap-1.5"><HiCheck /> Subscribed</span>
                ) : 'Subscribe'}
              </Button>
            </div>
            <p className="mt-2 pl-4 text-xs text-ink-400">We respect your privacy. Unsubscribe anytime.</p>
          </form>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-ink-300 leading-relaxed">
              {COMPANY.name} is an AI automation studio building always-on chat, voice and CRM systems for ambitious businesses.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="grid size-10 place-items-center rounded-full glass border border-white/10 text-ink-200 hover:text-white hover:border-white/25 transition"
                >
                  <Icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-400 font-medium mb-4">Company</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <a href={l.path} className="text-ink-200 hover:text-white transition">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-400 font-medium mb-4">Services</p>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a href={`/services#${s.id}`} className="text-ink-200 hover:text-white transition">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-400 font-medium mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li><a href={`mailto:${COMPANY.email}`} className="text-ink-200 hover:text-white transition">{COMPANY.email}</a></li>
              <li><a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-ink-200 hover:text-white transition">{COMPANY.phone}</a></li>
              <li className="text-ink-400">{COMPANY.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Security</a>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              All systems operational
            </span>
          </div>
        </div>
      </Container>

      {/* Giant brand wordmark */}
      <div aria-hidden className="pointer-events-none relative mt-6 select-none">
        <div className="px-4">
          <div className="mx-auto max-w-[88rem] overflow-hidden">
            <p className="font-display font-bold leading-none tracking-tighter text-[18vw] md:text-[14vw]
              bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent bg-clip-text text-transparent">
              NEURO·TANK
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
