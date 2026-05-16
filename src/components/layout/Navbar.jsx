import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineBars3, HiOutlineXMark, HiArrowRight } from 'react-icons/hi2'
import Logo from '@/components/common/Logo.jsx'
import Button from '@/components/common/Button.jsx'
import { NAV_LINKS } from '@/data/navigation'
import { cn } from '@/utils/cn'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu whenever the route changes — synchronizes UI to URL.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className={cn(
            'pointer-events-auto mt-4 flex w-[min(95%,1180px)] items-center justify-between gap-4 rounded-full px-3 py-2 pl-4 transition-all duration-500',
            scrolled
              ? 'glass-strong border-white/10 shadow-[0_8px_40px_-12px_rgba(124,58,237,0.5)] backdrop-blur-2xl'
              : 'border-white/5 bg-white/[0.02] backdrop-blur-md',
            'border',
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/5">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm rounded-full transition-colors duration-200',
                    isActive ? 'text-white' : 'text-ink-200/80 hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              iconRight={<HiArrowRight />}
            >
              Book a Call
            </Button>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="md:hidden inline-flex size-10 items-center justify-center rounded-full glass border border-white/10 text-white hover:bg-white/10"
            >
              {open ? <HiOutlineXMark className="size-5" /> : <HiOutlineBars3 className="size-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative mx-4 mt-24 rounded-3xl glass-strong border border-white/10 p-3"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.path}
                    initial={{ x: 12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 + 0.05 }}
                  >
                    <NavLink
                      to={l.path}
                      end={l.path === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-gradient-to-r from-white/10 to-transparent text-white'
                            : 'text-ink-200 hover:text-white hover:bg-white/[0.04]',
                        )
                      }
                    >
                      {l.label}
                      <HiArrowRight className="opacity-50" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 p-2">
                <Button to="/contact" className="w-full" iconRight={<HiArrowRight />}>
                  Book Free Consultation
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
