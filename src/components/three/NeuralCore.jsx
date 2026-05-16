import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles, Trail } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Centerpiece for the hero — a holographic neural orb:
 *  - Inner glowing icosahedron with subtle distortion (the "thinking" core)
 *  - Translucent wireframe shell (the neural cage)
 *  - 4 orbiting electrons w/ trails (data signals)
 *  - Cloud of sparkles + soft point light
 */
export default function NeuralCore({ mouse }) {
  const group = useRef(null)
  const inner = useRef(null)
  const wire = useRef(null)
  const targetRot = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    // Idle rotation
    if (group.current) {
      // Lerp toward mouse-driven target rotation
      const mx = mouse?.current?.x ?? 0
      const my = mouse?.current?.y ?? 0
      targetRot.current.y += (mx * 0.4 - targetRot.current.y) * 0.05
      targetRot.current.x += (-my * 0.3 - targetRot.current.x) * 0.05
      group.current.rotation.y += delta * 0.18 + targetRot.current.y * 0.01
      group.current.rotation.x = targetRot.current.x
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.12
      wire.current.rotation.x = Math.sin(t * 0.4) * 0.2
    }
    if (inner.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.04
      inner.current.scale.set(s, s, s)
    }
  })

  return (
    <group ref={group}>
      {/* Soft point light to illuminate the core from inside */}
      <pointLight intensity={3.2} distance={9} color="#a78bfa" />
      <pointLight intensity={2.0} distance={9} color="#22d3ee" position={[2, 1, 2]} />
      <pointLight intensity={1.6} distance={9} color="#d946ef" position={[-2, -1, -2]} />

      {/* Inner glowing core */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <Icosahedron ref={inner} args={[1.05, 4]}>
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.6}
            distort={0.38}
            speed={1.4}
          />
        </Icosahedron>
      </Float>

      {/* Translucent wireframe shell */}
      <Icosahedron ref={wire} args={[1.85, 2]}>
        <meshBasicMaterial color="#7df9ff" wireframe transparent opacity={0.18} />
      </Icosahedron>

      {/* Outer faint shell */}
      <Icosahedron args={[2.55, 1]}>
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.08} />
      </Icosahedron>

      {/* Orbiting electrons */}
      <OrbitingElectrons />

      {/* Sparkle aura */}
      <Sparkles count={120} scale={8} size={2.2} speed={0.4} color="#a78bfa" opacity={0.7} />
      <Sparkles count={60} scale={10} size={1.4} speed={0.25} color="#22d3ee" opacity={0.7} />
    </group>
  )
}

function OrbitingElectrons() {
  const config = useMemo(
    () => [
      { radius: 2.1, speed: 0.6, tilt: 0.2,  phase: 0,            color: '#7df9ff' },
      { radius: 2.4, speed: 0.45, tilt: -0.5, phase: Math.PI / 2, color: '#a78bfa' },
      { radius: 2.7, speed: 0.55, tilt: 0.9,  phase: Math.PI,     color: '#f0abfc' },
      { radius: 2.2, speed: 0.7,  tilt: -1.1, phase: Math.PI * 1.5, color: '#34d399' },
    ],
    [],
  )

  return (
    <>
      {config.map((c, i) => (
        <Electron key={i} {...c} />
      ))}
    </>
  )
}

function Electron({ radius, speed, tilt, phase, color }) {
  const ref = useRef(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const angle = t * speed + phase
    if (ref.current) {
      ref.current.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.3 + tilt) * radius * 0.35,
        Math.sin(angle) * radius,
      )
    }
  })
  return (
    <Trail
      width={1.2}
      length={6}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </Trail>
  )
}
