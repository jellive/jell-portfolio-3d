"use client";

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { CAREER, type CareerEntry } from "@/data/career";
import { useGameStore } from "@/stores/gameStore";

function Milestone({
  entry,
  highlight,
}: {
  entry: CareerEntry;
  highlight: boolean;
}) {
  const [x, z] = entry.position;
  return (
    <group position={[x, 0, z]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1, 2.4]} />
          <meshStandardMaterial color={entry.color} flatShading />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1, 2.0]} />
          <meshStandardMaterial color={entry.color} flatShading />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow>
          <boxGeometry args={[1.4, 0.6, 1.4]} />
          <meshStandardMaterial
            color="#1f2937"
            flatShading
            emissive={highlight ? entry.color : "#000"}
            emissiveIntensity={highlight ? 0.5 : 0}
          />
        </mesh>
      </RigidBody>
      <mesh position={[0, 1.55, 1.05]}>
        <planeGeometry args={[1.4, 0.6]} />
        <meshBasicMaterial color="#fff8e0" />
      </mesh>
      <Text
        position={[0, 1.55, 1.06]}
        fontSize={0.22}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {entry.year}
      </Text>
      <Text
        position={[0, 3.4, 0]}
        fontSize={0.32}
        color="#fff"
        outlineWidth={0.04}
        outlineColor="#000"
        anchorX="center"
      >
        {entry.company}
      </Text>
    </group>
  );
}

function Path() {
  const xs = 18;
  return (
    <group>
      {Array.from({ length: 24 }).map((_, i) => {
        const z = -1 - i;
        return (
          <mesh
            key={i}
            position={[xs, 0.02, z]}
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[1.6, 0.9]} />
            <meshStandardMaterial color="#a87b58" flatShading />
          </mesh>
        );
      })}
    </group>
  );
}

export function CareerTimeline() {
  const nearby = useGameStore((s) => s.nearbyInteractable);
  return (
    <group>
      <Path />
      {CAREER.map((c) => (
        <Milestone
          key={c.id}
          entry={c}
          highlight={nearby === `career:${c.id}`}
        />
      ))}
    </group>
  );
}
