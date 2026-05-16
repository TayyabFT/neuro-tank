import { useCallback, useRef } from 'react'

/**
 * 3D tilt on hover for cards. Pass `max` (deg) and `scale`.
 * Returns ref + handlers; spread on the wrapping element.
 */
export function useTilt({ max = 8, scale = 1.02, glare = true } = {}) {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    if (glare) el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`)
    if (glare) el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`)
  }, [max, scale, glare])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)'
  }, [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}
