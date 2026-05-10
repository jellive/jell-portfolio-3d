"use client";

import { RigidBody } from "@react-three/rapier";

interface VoxelBlockProps {
  position: [number, number, number];
  color: string;
  size?: [number, number, number];
}

function StaticBlock({ position, color, size = [1, 1, 1] }: VoxelBlockProps) {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </RigidBody>
  );
}

export function Decor() {
  return (
    <group>
      <group position={[0, 0, 0]}>
        <StaticBlock
          position={[-2, 0.5, -2]}
          color="#c9b88f"
          size={[4, 1, 4]}
        />
        <StaticBlock
          position={[-2, 1.5, -3.5]}
          color="#a87b58"
          size={[4, 1, 1]}
        />
        <StaticBlock
          position={[-2, 2.5, -2]}
          color="#8b4513"
          size={[4, 1, 4]}
        />
      </group>

      <group position={[10, 0, 6]}>
        <StaticBlock position={[0, 0.5, 0]} color="#5b8e3e" size={[1, 1, 1]} />
        <StaticBlock position={[0, 1.5, 0]} color="#5b8e3e" size={[1, 1, 1]} />
        <StaticBlock position={[0, 2.5, 0]} color="#7ec850" size={[2, 1, 2]} />
        <StaticBlock position={[0, 3.5, 0]} color="#7ec850" size={[1, 1, 1]} />

        <StaticBlock position={[3, 0.5, 1]} color="#3a6f7a" size={[1, 1, 1]} />
        <StaticBlock position={[3, 1.5, 1]} color="#a4d4e0" size={[1, 1, 1]} />

        <StaticBlock position={[-3, 0.5, 0]} color="#7c4a8d" size={[1, 1, 1]} />
        <StaticBlock position={[-3, 1.5, 0]} color="#7c4a8d" size={[1, 1, 1]} />
        <StaticBlock position={[-3, 2.5, 0]} color="#c79bd6" size={[1, 1, 1]} />
      </group>

      <group position={[-10, 0, 8]}>
        <StaticBlock position={[0, 0.5, 0]} color="#444" size={[1, 1, 1]} />
        <StaticBlock position={[0, 1.5, 0]} color="#666" size={[1, 1, 1]} />
        <StaticBlock position={[1, 0.5, 0]} color="#444" size={[1, 1, 1]} />
        <StaticBlock position={[2, 0.5, 0]} color="#444" size={[1, 1, 1]} />
        <StaticBlock position={[2, 1.5, 0]} color="#666" size={[1, 1, 1]} />
        <StaticBlock position={[2, 2.5, 0]} color="#888" size={[1, 1, 1]} />
      </group>

      <group position={[8, 0, -10]}>
        <StaticBlock position={[0, 0.5, 0]} color="#cd5c5c" size={[3, 1, 3]} />
        <StaticBlock position={[0, 1.5, 0]} color="#dc7878" size={[3, 1, 3]} />
        <StaticBlock position={[0, 2.5, 0]} color="#f4a261" size={[2, 1, 2]} />
      </group>

      <StaticBlock position={[15, 0.5, 0]} color="#aaa" />
      <StaticBlock position={[-15, 0.5, 0]} color="#aaa" />
      <StaticBlock position={[0, 0.5, 15]} color="#aaa" />
      <StaticBlock position={[0, 0.5, -15]} color="#aaa" />
    </group>
  );
}
