"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei"
import * as THREE from "three"

function NeuralNode({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color="#5eead4"
        emissive="#5eead4"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function NeuralConnection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const lineRef = useRef<THREE.Line>(null)
  
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.3,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    )
    return curve.getPoints(20)
  }, [start, end])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#5eead4" transparent opacity={0.4} />
    </line>
  )
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Create neural network structure - 3 layers
  const layers = useMemo(() => {
    const l1: [number, number, number][] = [
      [-1.5, 0.8, 0], [-1.5, 0.3, 0], [-1.5, -0.2, 0], [-1.5, -0.7, 0]
    ]
    const l2: [number, number, number][] = [
      [0, 1, 0], [0, 0.4, 0], [0, -0.2, 0], [0, -0.8, 0], [0, 0.7, 0.5], [0, -0.5, 0.5]
    ]
    const l3: [number, number, number][] = [
      [1.5, 0.6, 0], [1.5, 0, 0], [1.5, -0.6, 0]
    ]
    return { l1, l2, l3 }
  }, [])

  // Create connections between layers
  const connections = useMemo(() => {
    const conns: Array<{ start: [number, number, number]; end: [number, number, number] }> = []
    
    // Layer 1 to Layer 2
    layers.l1.forEach((n1) => {
      layers.l2.slice(0, 4).forEach((n2) => {
        if (Math.random() > 0.3) {
          conns.push({ start: n1, end: n2 })
        }
      })
    })
    
    // Layer 2 to Layer 3
    layers.l2.forEach((n2) => {
      layers.l3.forEach((n3) => {
        if (Math.random() > 0.4) {
          conns.push({ start: n2, end: n3 })
        }
      })
    })
    
    return conns
  }, [layers])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {layers.l1.map((pos, i) => (
        <NeuralNode key={`l1-${i}`} position={pos} delay={i * 0.5} />
      ))}
      {layers.l2.map((pos, i) => (
        <NeuralNode key={`l2-${i}`} position={pos} delay={i * 0.3 + 1} />
      ))}
      {layers.l3.map((pos, i) => (
        <NeuralNode key={`l3-${i}`} position={pos} delay={i * 0.4 + 2} />
      ))}
      
      {/* Connections */}
      {connections.map((conn, i) => (
        <NeuralConnection key={`conn-${i}`} start={conn.start} end={conn.end} />
      ))}
    </group>
  )
}

function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.6, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0d1117"
          emissive="#5eead4"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#5eead4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#5eead4" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#5eead4" />
      
      <CentralSphere />
      <NeuralNetwork />
      <ParticleField />
    </>
  )
}

export function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
