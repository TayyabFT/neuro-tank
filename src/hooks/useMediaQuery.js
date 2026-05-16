import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    // Re-sync once on (re-)subscription. Intentional synchronization with
    // an external system (the media query list), not derived render state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
