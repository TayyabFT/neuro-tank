import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiArrowRight, HiCheckCircle } from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import Button from '@/components/common/Button.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import Reveal from '@/components/common/Reveal.jsx'
import FAQ from '@/components/sections/FAQ.jsx'
import { COMPANY } from '@/data/navigation'
import { SERVICES } from '@/data/services'
import { cn } from '@/utils/cn'

const BUDGETS = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+']

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 6000)
    setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  }

  return (
    <>
      <PageHeader
        eyebrow="Let's talk"
        title={<>Tell us where your business is leaking customers. <span className="text-gradient">We'll automate the fix.</span></>}
        description="Drop us a few details. A senior strategist will reply within 12 hours with a plan, a price and a timeline."
      />

      <Section padded={false} className="pb-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <Reveal>
              <GlassCard className="p-7 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid place-items-center text-center py-10"
                  >
                    <span className="grid size-16 place-items-center rounded-full bg-emerald-400/15 border border-emerald-400/30 mb-5">
                      <HiCheckCircle className="size-9 text-emerald-300" />
                    </span>
                    <h3 className="font-display text-3xl text-white">Got it. Welcome to the future.</h3>
                    <p className="mt-3 max-w-md text-ink-200/90">
                      One of our senior strategists will be in touch within 12 hours.
                      In the meantime, check your inbox for a confirmation.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" name="name" value={form.name} onChange={onChange} placeholder="Aria Voss" required />
                      <Field label="Work email" name="email" type="email" value={form.email} onChange={onChange} placeholder="aria@company.com" required />
                    </div>
                    <Field label="Company" name="company" value={form.company} onChange={onChange} placeholder="Neuro Café" />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <SelectField label="Service interested in" name="service" value={form.service} onChange={onChange} options={[
                        { value: '', label: 'Pick one (or "not sure")' },
                        ...SERVICES.map((s) => ({ value: s.id, label: s.title })),
                        { value: 'not-sure', label: 'Not sure yet' },
                      ]} />
                      <SelectField label="Project budget" name="budget" value={form.budget} onChange={onChange} options={[
                        { value: '', label: 'Select a range' },
                        ...BUDGETS.map((b) => ({ value: b, label: b })),
                      ]} />
                    </div>

                    <TextAreaField label="Tell us about your business" name="message" value={form.message} onChange={onChange} placeholder="What channel do customers use most? Where are leads slipping through?" rows={5} />

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <p className="text-xs text-ink-400 max-w-xs">
                        We reply within 12 hours, Mon–Fri. By submitting, you agree to our privacy policy.
                      </p>
                      <Button type="submit" size="lg" magnetic iconRight={<HiArrowRight />}>
                        Send to Neuro Tank
                      </Button>
                    </div>
                  </form>
                )}
              </GlassCard>
            </Reveal>

            {/* Sidebar */}
            <Reveal preset="left">
              <div className="space-y-4">
                <ContactCard icon={HiOutlineEnvelope} label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
                <ContactCard icon={HiOutlinePhone}    label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} />
                <ContactCard icon={HiOutlineMapPin}   label="Location" value={COMPANY.address} />

                <GlassCard className="p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-ink-300 mb-3">What happens next</p>
                  <ol className="space-y-3 text-sm text-ink-200">
                    <Step n="1" text="A senior strategist replies in <12h with discovery questions." />
                    <Step n="2" text="30-min strategy call — we map the highest-ROI automations." />
                    <Step n="3" text="You receive a fixed timeline & price within 48 hours." />
                  </ol>
                </GlassCard>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FAQ />
    </>
  )
}

/* ---------- helpers ---------- */

function fieldClass(extra) {
  return cn(
    'w-full rounded-xl glass border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-ink-400 outline-none',
    'transition focus:border-violet-400/60 focus:bg-white/[0.06]',
    extra,
  )
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-ink-300">{label}</span>
      <input className={fieldClass()} {...rest} />
    </label>
  )
}

function TextAreaField({ label, rows = 4, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-ink-300">{label}</span>
      <textarea rows={rows} className={fieldClass('resize-none')} {...rest} />
    </label>
  )
}

function SelectField({ label, options, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-ink-300">{label}</span>
      <select className={fieldClass('appearance-none [&>option]:bg-ink-900')} {...rest}>
        {options.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
    </label>
  )
}

function ContactCard({ icon: Icon, label, value, href }) {
  const Content = (
    <GlassCard className="p-5 flex items-center gap-4 hover:border-white/20 transition">
      <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-400/20">
        <Icon className="size-5 text-white" strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink-300">{label}</p>
        <p className="mt-0.5 font-medium text-white">{value}</p>
      </div>
    </GlassCard>
  )
  return href ? <a href={href} className="block">{Content}</a> : Content
}

function Step({ n, text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/30 border border-white/10 text-xs font-semibold text-white">{n}</span>
      <span>{text}</span>
    </li>
  )
}
