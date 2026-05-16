import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { useMagnetic } from '@/hooks/useMagnetic'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-all duration-300 ease-out select-none whitespace-nowrap will-change-transform ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'

const sizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

const variants = {
  primary:
    'text-white shadow-[0_8px_40px_-6px_rgba(124,58,237,0.55)] ' +
    'bg-[linear-gradient(110deg,#22d3ee,#7c3aed_45%,#d946ef_90%)] bg-[length:200%_100%] ' +
    'hover:bg-[position:100%_0] hover:shadow-[0_12px_50px_-4px_rgba(217,70,239,0.6)]',
  ghost:
    'text-ink-100 glass border border-white/10 hover:border-white/20 hover:bg-white/5',
  outline:
    'text-white border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 hover:border-white/25',
  soft:
    'text-ink-100 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08]',
}

const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    children,
    variant = 'primary',
    size = 'md',
    className,
    iconLeft,
    iconRight,
    magnetic = false,
    ...rest
  },
  forwardedRef,
) {
  const magnet = useMagnetic(magnetic === true ? 14 : (typeof magnetic === 'number' ? magnetic : 0))

  const inner = (
    <>
      {/* Glow halo */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500
        bg-[radial-gradient(120%_120%_at_50%_50%,rgba(125,249,255,0.18),transparent_60%)]" />
      {/* Shine sweep */}
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-18deg] translate-x-[-200%] group-hover:translate-x-[420%] transition-transform duration-[1100ms] ease-out" />
      </span>

      {iconLeft && <span className="relative -ml-0.5 text-[1.1em]">{iconLeft}</span>}
      <span className="relative">{children}</span>
      {iconRight && <span className="relative -mr-0.5 text-[1.1em]">{iconRight}</span>}
    </>
  )

  const classes = cn(base, sizes[size], variants[variant], className)

  const mergedRef = (node) => {
    if (magnetic) magnet.ref.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const interaction = magnetic
    ? { onMouseMove: magnet.onMouseMove, onMouseLeave: magnet.onMouseLeave }
    : {}

  if (to) {
    return (
      <Link to={to} className={classes} ref={mergedRef} {...interaction} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} ref={mergedRef} {...interaction} {...rest}>
        {inner}
      </a>
    )
  }
  const Comp = as || 'button'
  return (
    <Comp className={classes} ref={mergedRef} {...interaction} {...rest}>
      {inner}
    </Comp>
  )
})

export default Button
