"use client";

import { Text } from "@react-three/drei";
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

function HomeZone() {
  return (
    <group position={[0, 0, -3]}>
      <StaticBlock position={[0, 0.5, 0]} color="#c9b88f" size={[4, 1, 4]} />
      <StaticBlock position={[-2, 1.5, 0]} color="#a87b58" size={[0.4, 1, 4]} />
      <StaticBlock position={[2, 1.5, 0]} color="#a87b58" size={[0.4, 1, 4]} />
      <StaticBlock position={[0, 1.5, -2]} color="#a87b58" size={[4, 1, 0.4]} />
      <StaticBlock position={[0, 2.5, 0]} color="#8b4513" size={[5, 1, 5]} />
      <Text
        position={[0, 3.4, 0]}
        fontSize={0.4}
        color="#fff"
        outlineWidth={0.04}
        outlineColor="#000"
        anchorX="center"
      >
        🏠 HOME
      </Text>
    </group>
  );
}

function ZoneMarker({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={position}>
      <StaticBlock position={[0, 0.5, 0]} color={color} size={[2, 1, 2]} />
      <StaticBlock position={[0, 1.5, 0]} color={color} size={[1.4, 1, 1.4]} />
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.28}
        color="#fff"
        outlineWidth={0.03}
        outlineColor="#000"
        anchorX="center"
      >
        {label}
      </Text>
      <Text
        position={[0, 2.25, 0]}
        fontSize={0.18}
        color="#ddd"
        outlineWidth={0.02}
        outlineColor="#000"
        anchorX="center"
      >
        coming soon
      </Text>
    </group>
  );
}

export function Decor() {
  return (
    <group>
      <HomeZone />
      <ZoneMarker position={[0, 0, -18]} color="#cd5c5c" label="💼 CAREER" />
      <ZoneMarker position={[18, 0, 18]} color="#4a7fc1" label="🚀 PROJECTS" />
      <ZoneMarker position={[-18, 0, -18]} color="#7c4a8d" label="📚 BLOG" />
      <ZoneMarker position={[18, 0, -18]} color="#3a8a6f" label="📬 CONTACT" />
    </group>
  );
}
