import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneCanvas from './SceneCanvas.jsx'

/**
 * Background neural particle field — used as a low-cost decorative canvas
 * behind interior sections. ~600 points, all on GPU.
 */
export default function AmbientParticles({ count = 600, radius = 14 }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#02030a']} />
      <ParticleSwarm count={count} radius={radius} />
    </SceneCanvas>
  )
}

// Pure helpers, computed once per (count, radius) tuple via lazy useState.
function buildPositions(count, radius) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = Math.random() * radius
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi) - 2
  }
  return arr
}

function buildColors(count) {
  const arr = new Float32Array(count * 3)
  const palette = [
    new THREE.Color('#7df9ff'),
    new THREE.Color('#a78bfa'),
    new THREE.Color('#f0abfc'),
    new THREE.Color('#ffffff'),
  ]
  for (let i = 0; i < count; i++) {
    const c = palette[Math.floor(Math.random() * palette.length)]
    arr[i * 3]     = c.r
    arr[i * 3 + 1] = c.g
    arr[i * 3 + 2] = c.b
  }
  return arr
}

function ParticleSwarm({ count, radius }) {
  const points = useRef(null)
  const [positions] = useState(() => buildPositions(count, radius))
  const [colors] = useState(() => buildColors(count))

  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.04
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.9}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
