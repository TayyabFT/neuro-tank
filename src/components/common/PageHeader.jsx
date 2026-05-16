import { motion } from 'framer-motion'
import Container from './Container.jsx'
import AmbientBackdrop from './AmbientBackdrop.jsx'
import Badge from './Badge.jsx'
import { cn } from '@/utils/cn'

export default function PageHeader({ eyebrow, title, description, children, className }) {
  return (
    <header className={cn('relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24', className)}>
      <AmbientBackdrop intensity="soft" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mx-auto">{eyebrow}</Badge>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-display text-balance text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.04]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-base md:text-lg text-ink-200/85 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
        </div>
      </Container>
    </header>
  )
}
