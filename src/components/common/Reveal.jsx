import { motion } from 'framer-motion'

const PRESETS = {
  up:    { from: { opacity: 0, y: 28 }, to: { opacity: 1, y: 0 } },
  down:  { from: { opacity: 0, y: -28 }, to: { opacity: 1, y: 0 } },
  left:  { from: { opacity: 0, x: 28 },  to: { opacity: 1, x: 0 } },
  right: { from: { opacity: 0, x: -28 }, to: { opacity: 1, x: 0 } },
  fade:  { from: { opacity: 0 },         to: { opacity: 1 } },
  scale: { from: { opacity: 0, scale: 0.94 }, to: { opacity: 1, scale: 1 } },
}

/**
 * Lightweight scroll-reveal wrapper. Used everywhere instead of repeating
 * the same Framer Motion incantation.
 */
export default function Reveal({
  children,
  as: As = 'div',
  preset = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  margin = '-80px',
  className,
  ...rest
}) {
  const { from, to } = PRESETS[preset] || PRESETS.up
  const MotionComp = motion[As] || motion.div
  return (
    <MotionComp
      initial={from}
      whileInView={to}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComp>
  )
}
