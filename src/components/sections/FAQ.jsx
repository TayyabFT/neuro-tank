import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlinePlus } from 'react-icons/hi2'
import Section from '@/components/common/Section.jsx'
import Container from '@/components/common/Container.jsx'
import SectionHeader from '@/components/common/SectionHeader.jsx'
import { FAQS } from '@/data/faqs'
import { cn } from '@/utils/cn'

function FAQItem({ q, a, open, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className={cn(
        'rounded-2xl border bg-white/[0.02] backdrop-blur transition-all duration-300',
        open ? 'border-violet-400/30 bg-white/[0.04] shadow-[0_15px_40px_-20px_rgba(124,58,237,0.6)]' : 'border-white/8 hover:border-white/15',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-5 md:px-6 py-5 text-left"
      >
        <span className="text-base md:text-lg font-medium text-white">{q}</span>
        <span className={cn(
          'grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300',
          open ? 'border-violet-400/40 bg-violet-500/15 rotate-45' : 'border-white/10 bg-white/[0.04]',
        )}>
          <HiOutlinePlus className="size-4 text-white" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 pt-1 text-sm md:text-[15px] leading-relaxed text-ink-200/90">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <Section id="faq">
      <Container size="narrow">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Everything you might want to know,<br /><span className="text-gradient">answered.</span></>}
          description="Still curious? Send us a message — real humans reply within 12 hours."
        />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              index={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
