"use client";

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { BLOG } from "@/data/blog";
import { useGameStore } from "@/stores/gameStore";

export function BlogLibrary() {
  const nearby = useGameStore((s) => s.nearbyInteractable);
  const highlight = nearby === `blog:${BLOG.id}`;
  const [x, z] = BLOG.position;

  return (
    <group position={[x, 0, z]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 2.8, 3]} />
          <meshStandardMaterial
            color="#5b3a1f"
            flatShading
            emissive={highlight ? "#5b3a1f" : "#000"}
            emissiveIntensity={highlight ? 0.4 : 0}
          />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <boxGeometry args={[4.4, 0.6, 3.4]} />
          <meshStandardMaterial color="#1f2937" flatShading />
        </mesh>
        {[-1.2, 0, 1.2].map((dx) => (
          <mesh key={dx} position={[dx, 1.6, 1.52]} receiveShadow>
            <boxGeometry args={[0.7, 1.4, 0.05]} />
            <meshStandardMaterial color="#c9b88f" flatShading />
          </mesh>
        ))}
      </RigidBody>
      <Text
        position={[0, 4, 0]}
        fontSize={0.4}
        color="#fff"
        outlineWidth={0.05}
        outlineColor="#000"
        anchorX="center"
      >
        📚 BLOG
      </Text>
    </group>
  );
}
