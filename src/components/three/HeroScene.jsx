import { useEffect, useRef } from 'react'
import { Environment, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import SceneCanvas from './SceneCanvas.jsx'
import NeuralCore from './NeuralCore.jsx'

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handler, { passive: true })
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  return (
    <SceneCanvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 1.6]}>
      <color attach="background" args={['#02030a']} />
      <fog attach="fog" args={['#02030a', 8, 18]} />

      <PerformanceMonitor />
      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.35} />
      <NeuralCore mouse={mouse} />

      <Environment preset="city" environmentIntensity={0.35} />
    </SceneCanvas>
  )
}
