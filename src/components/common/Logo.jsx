import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export default function Logo({ className, mark = true, text = true }) {
  return (
    <Link to="/" aria-label="Neuro Tank — home" className={cn('group inline-flex items-center gap-2.5', className)}>
      {mark && (
        <span className="relative grid size-9 place-items-center">
          <span className="absolute inset-0 rounded-xl bg-[conic-gradient(from_0deg,#22d3ee,#7c3aed,#d946ef,#22d3ee)] animate-[gradient_8s_linear_infinite] opacity-90" />
          <span className="absolute inset-[2px] rounded-[10px] bg-ink-950" />
          <svg viewBox="0 0 24 24" className="relative size-5 text-white">
            <defs>
              <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#7df9ff" />
                <stop offset="0.5" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#f0abfc" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#lg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3.2" />
              <circle cx="12" cy="12" r="8" opacity="0.55" />
              <path d="M12 4v3.2M12 16.8V20M4 12h3.2M16.8 12H20M6.4 6.4l2.3 2.3M15.3 15.3l2.3 2.3M17.6 6.4l-2.3 2.3M8.7 15.3l-2.3 2.3" />
            </g>
          </svg>
          <span className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition bg-[conic-gradient(from_0deg,#22d3ee,#7c3aed,#d946ef,#22d3ee)]" />
        </span>
      )}
      {text && (
        <span className="font-display text-lg tracking-tight">
          <span className="text-white">neuro</span>
          <span className="mx-[1px] text-ink-400">·</span>
          <span className="text-gradient font-semibold">tank</span>
        </span>
      )}
    </Link>
  )
}
