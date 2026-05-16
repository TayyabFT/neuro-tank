import { cn } from '@/utils/cn'

/**
 * Soft animated ambient backdrop for hero / cinematic sections.
 * Multiple radial gradients + grid + scanline. Pure CSS / GPU friendly.
 */
export default function AmbientBackdrop({ className, intensity = 'default' }) {
  const variants = {
    soft:    'opacity-60',
    default: 'opacity-90',
    intense: 'opacity-100',
  }
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', variants[intensity], className)}>
      <div className="absolute inset-0 bg-grid mask-fade-y opacity-30" />

      {/* Aurora blobs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[60rem] rounded-full
        bg-[radial-gradient(closest-side,rgba(124,58,237,0.35),transparent_70%)] blur-2xl animate-pulse-glow" />
      <div className="absolute top-1/3 -left-32 size-[42rem] rounded-full
        bg-[radial-gradient(closest-side,rgba(34,211,238,0.28),transparent_70%)] blur-2xl animate-pulse-glow" style={{ animationDelay: '1.6s' }} />
      <div className="absolute bottom-0 right-0 size-[44rem] rounded-full
        bg-[radial-gradient(closest-side,rgba(217,70,239,0.22),transparent_70%)] blur-2xl animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_30%,#02030a_85%)]" />

      {/* Scanline */}
      <div className="absolute inset-0 mix-blend-screen opacity-20">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-400 to-transparent animate-scan" />
      </div>
    </div>
  )
}
