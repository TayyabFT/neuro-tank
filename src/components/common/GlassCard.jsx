import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const GlassCard = forwardRef(function GlassCard(
  { as: As = 'div', className, gradient = true, children, ...rest },
  ref,
) {
  return (
    <As
      ref={ref}
      className={cn(
        'relative rounded-3xl glass-strong overflow-hidden',
        gradient && 'gradient-border',
        className,
      )}
      {...rest}
    >
      {/* subtle inner top highlight */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      {/* corner glow */}
      <span aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-violet-500/20 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </As>
  )
})

export default GlassCard
