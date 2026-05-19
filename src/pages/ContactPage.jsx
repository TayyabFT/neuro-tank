import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiArrowRight,
  HiCheckCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2'
import PageHeader from '@/components/common/PageHeader.jsx'
import Container from '@/components/common/Container.jsx'
import Section from '@/components/common/Section.jsx'
import Button from '@/components/common/Button.jsx'
import GlassCard from '@/components/common/GlassCard.jsx'
import Reveal from '@/components/common/Reveal.jsx'
import FAQ from '@/components/sections/FAQ.jsx'
import { COMPANY } from '@/data/navigation'
import { SERVICES } from '@/data/services'
import { sendContactEmails, EMAIL_CONFIGURED } from '@/services/email'
import { cn } from '@/utils/cn'

const BUDGETS = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+']
const INITIAL_FORM = { name: '', email: '', company: '', service: '', budget: '', message: '' }

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState(INITIAL_FORM)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!EMAIL_CONFIGURED) {
      setStatus('error')
      setErrorMsg(
        'Email keys not loaded. Create a file named .env in the project root (copy from .env.example), paste your EmailJS IDs, then restart: npm run dev',
      )
      return
    }

    setStatus('sending')
    try {
      await sendContactEmails(form)
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err?.text || err?.message || 'Something went wrong. Please try again or email us directly.',
      )
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrorMsg('')
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
            <Reveal>
              <GlassCard className="p-7 md:p-10">
                {status === 'success' ? (
                  <SuccessState email={form.email || COMPANY.email} onReset={resetForm} />
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" name="name" value={form.name} onChange={onChange} placeholder="Aria Voss" required />
                      <Field label="Work email" name="email" type="email" value={form.email} onChange={onChange} placeholder="aria@company.com" required />
                    </div>
                    <Field label="Company" name="company" value={form.company} onChange={onChange} placeholder="Neuro Café" />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <SelectField label="Service interested in" name="service" value={form.service} onChange={onChange} options={[
                        { value: '', label: 'Pick one (or "not sure")' },
                        ...SERVICES.map((s) => ({ value: s.title, label: s.title })),
                        { value: 'Not sure yet', label: 'Not sure yet' },
                      ]} />
                      <SelectField label="Project budget" name="budget" value={form.budget} onChange={onChange} options={[
                        { value: '', label: 'Select a range' },
                        ...BUDGETS.map((b) => ({ value: b, label: b })),
                      ]} />
                    </div>

                    <TextAreaField label="Tell us about your business" name="message" value={form.message} onChange={onChange} placeholder="What channel do customers use most? Where are leads slipping through?" rows={5} />

                    {status === 'error' && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200"
                      >
                        <HiOutlineExclamationTriangle className="mt-0.5 size-5 shrink-0 text-rose-300" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <p className="text-xs text-ink-400 max-w-xs">
                        We reply within 12 hours, Mon–Fri. By submitting, you agree to our privacy policy.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        magnetic
                        iconRight={status !== 'sending' && <HiArrowRight />}
                        disabled={status === 'sending'}
                        className={status === 'sending' ? 'opacity-80 cursor-wait' : ''}
                      >
                        {status === 'sending' ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="size-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Sending…
                          </span>
                        ) : (
                          'Send to Neuro Tank'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </GlassCard>
            </Reveal>

            <Reveal preset="left">
              <div className="space-y-4">
                <ContactCard icon={HiOutlineEnvelope} label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
                <ContactCard icon={HiOutlinePhone} label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} />
                <ContactCard icon={HiOutlineMapPin} label="Location" value={COMPANY.address} />

                <GlassCard className="p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-ink-300 mb-3">What happens next</p>
                  <ol className="space-y-3 text-sm text-ink-200">
                    <Step n="1" text="You'll get an instant confirmation email." />
                    <Step n="2" text="A senior strategist replies in <12h with discovery questions." />
                    <Step n="3" text="30-min strategy call — we map the highest-ROI automations." />
                    <Step n="4" text="You receive a fixed timeline & price within 48 hours." />
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

function SuccessState({ email, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid place-items-center text-center py-10"
    >
      <span className="grid size-16 place-items-center rounded-full bg-emerald-400/15 border border-emerald-400/30 mb-5">
        <HiCheckCircle className="size-9 text-emerald-300" />
      </span>
      <h3 className="font-display text-3xl text-white">Got it. Welcome to the future.</h3>
      <p className="mt-3 max-w-md text-ink-200/90">
        We've sent a confirmation to <span className="text-white font-medium">{email}</span> and our team
        is reviewing your request now. A strategist will reach out within 12 hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm text-ink-300 underline underline-offset-4 hover:text-white cursor-pointer"
      >
        Send another message
      </button>
    </motion.div>
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
  return href ? <a href={href} className="block cursor-pointer">{Content}</a> : Content
}

function Step({ n, text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-400/30 border border-white/10 text-xs font-semibold text-white">{n}</span>
      <span>{text}</span>
    </li>
  )
}
