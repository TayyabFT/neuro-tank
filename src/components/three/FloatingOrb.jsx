import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import SceneCanvas from './SceneCanvas.jsx'

/**
 * Compact AI orb — used inside service / CTA cards as decorative 3D.
 * Lightweight: one mesh + sparkles. Renders well even at small sizes.
 */
export default function FloatingOrb({ color = '#a78bfa', accent = '#7df9ff', className }) {
  return (
    <SceneCanvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.4]}
      className={className}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 3]} intensity={2.5} color={accent} />
      <pointLight position={[-3, -2, -3]} intensity={1.5} color={color} />

      <Float speed={2.2} rotationIntensity={1.1} floatIntensity={1.6}>
        <Orb color={color} />
      </Float>

      <Sparkles count={60} scale={4.5} size={2} speed={0.5} color={accent} opacity={0.8} />
    </SceneCanvas>
  )
}

function Orb({ color }) {
  const ref = useRef(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.35
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.3
  })
  return (
    <Icosahedron ref={ref} args={[1.1, 3]}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.15}
        metalness={0.6}
        distort={0.5}
        speed={2.4}
      />
    </Icosahedron>
  )
}
