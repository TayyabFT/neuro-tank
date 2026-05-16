import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { cn } from '@/utils/cn'

/**
 * Shared R3F Canvas wrapper.
 * - tuned dpr for crisp visuals + performance
 * - frameloop demand by default not used: we keep it always-on but cheap
 * - safe defaults that work across the site
 */
export default function SceneCanvas({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 45 },
  dpr = [1, 1.75],
  shadows = false,
  alpha = true,
  ...rest
}) {
  return (
    <div className={cn('absolute inset-0', className)}>
      <Canvas
        dpr={dpr}
        camera={camera}
        shadows={shadows}
        gl={{
          antialias: true,
          alpha,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        {...rest}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
