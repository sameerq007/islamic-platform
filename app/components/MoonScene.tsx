"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";

export default function MoonScene() {
  return (
    <div className="h-[400px] w-[400px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        
        {/* Light */}
        <ambientLight intensity={1.5} />

        {/* Floating Moon */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1.5, 64, 64]}>
            <meshStandardMaterial
              color="#00d9ff"
              emissive="#00d9ff"
              emissiveIntensity={0.6}
              wireframe
            />
          </Sphere>
        </Float>

      </Canvas>
    </div>
  );
}