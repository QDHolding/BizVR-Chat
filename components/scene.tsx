"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Sky, Cloud, Float, Html } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VirtualSpaceUI } from "./virtual-space-ui"

function FloatingIsland({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Island Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[2, 1.5, 0.4, 6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Grass Top */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 6]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Trees */}
      <group position={[0.5, 0.5, 0]}>
        <mesh position={[0, 0.7, 0]}>
          <coneGeometry args={[0.4, 1, 6]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
    </group>
  )
}

function TeleportPoint({ position, label, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <Float floatIntensity={2} speed={2}>
        <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={onClick}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={hovered ? "#ff69b4" : "#4b0082"}
            emissive={hovered ? "#ff69b4" : "#4b0082"}
            emissiveIntensity={0.5}
          />
        </mesh>
        <Html center position={[0, 0.5, 0]}>
          <div className="bg-black/50 text-white px-2 py-1 rounded text-sm whitespace-nowrap">{label}</div>
        </Html>
      </Float>
    </group>
  )
}

function Scene() {
  const [environment, setEnvironment] = useState("sunset")
  const [currentSpace, setCurrentSpace] = useState("main")

  const spaces = {
    main: {
      islands: [
        { position: [0, 0, 0], scale: 1, rotation: [0, 0, 0] },
        { position: [8, 2, 8], scale: 0.8, rotation: [0, Math.PI / 3, 0] },
        { position: [-8, -1, -8], scale: 1.2, rotation: [0, -Math.PI / 4, 0] },
      ],
      teleports: [
        { position: [4, 1, 4], label: "Crystal Cave", target: "crystal" },
        { position: [-4, 1, -4], label: "Sky Temple", target: "temple" },
      ],
    },
    crystal: {
      islands: [
        { position: [0, 0, 0], scale: 1.5, rotation: [0, Math.PI / 6, 0] },
        { position: [6, 1, 6], scale: 0.7, rotation: [0, -Math.PI / 4, 0] },
      ],
      teleports: [{ position: [3, 1, 3], label: "Main Hub", target: "main" }],
    },
    temple: {
      islands: [
        { position: [0, 0, 0], scale: 1.2, rotation: [0, -Math.PI / 3, 0] },
        { position: [-5, 3, -5], scale: 0.9, rotation: [0, Math.PI / 6, 0] },
      ],
      teleports: [{ position: [-3, 1, -3], label: "Main Hub", target: "main" }],
    },
  }

  return (
    <>
      <Canvas camera={{ position: [15, 5, 15], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Environment and Lighting */}
          <Sky sunPosition={[0, 1, 0]} />
          <Environment preset={environment as any} background />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* Floating Islands */}
          {spaces[currentSpace].islands.map((island, index) => (
            <Float key={index} speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
              <FloatingIsland {...island} />
            </Float>
          ))}

          {/* Teleport Points */}
          {spaces[currentSpace].teleports.map((teleport, index) => (
            <TeleportPoint
              key={index}
              position={teleport.position}
              label={teleport.label}
              onClick={() => setCurrentSpace(teleport.target)}
            />
          ))}

          {/* Clouds */}
          <Cloud position={[10, 5, 0]} speed={0.2} opacity={0.5} />
          <Cloud position={[-10, 6, -4]} speed={0.2} opacity={0.5} />

          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            maxDistance={30}
            minDistance={5}
          />
        </Suspense>
      </Canvas>

      {/* Environment Controls */}
      <div className="absolute top-4 left-4">
        <Select value={environment} onValueChange={setEnvironment}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sunset">Sunset</SelectItem>
            <SelectItem value="dawn">Dawn</SelectItem>
            <SelectItem value="night">Night</SelectItem>
            <SelectItem value="warehouse">Warehouse</SelectItem>
            <SelectItem value="forest">Forest</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="city">City</SelectItem>
            <SelectItem value="park">Park</SelectItem>
            <SelectItem value="lobby">Lobby</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Virtual Space UI */}
      <VirtualSpaceUI />
    </>
  )
}

export default Scene

