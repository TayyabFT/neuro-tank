import { cn } from '@/utils/cn'

export default function Badge({ children, className, dot = true }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]',
      'glass border border-white/10 text-ink-200 font-medium',
      className,
    )}>
      {dot && <span className="size-1.5 rounded-full bg-neon-400 shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]" />}
      {children}
    </span>
  )
}
