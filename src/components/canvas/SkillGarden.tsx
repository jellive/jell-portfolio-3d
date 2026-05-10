"use client";

import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { CATEGORY_META, SKILLS, type Skill } from "@/data/skills";
import { useGameStore } from "@/stores/gameStore";

const PROXIMITY_RADIUS = 2.2;

function SkillPlant({
  skill,
  highlight,
}: {
  skill: Skill;
  highlight: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = 0;

  useFrame((state) => {
    if (!groupRef.current) return;
    if (highlight) {
      groupRef.current.position.y =
        baseY + Math.sin(state.clock.elapsedTime * 4) * 0.08 + 0.15;
    } else {
      groupRef.current.position.y = baseY;
    }
  });

  const trunkColor = darken(skill.color);
  const heightUnits = skill.level;

  return (
    <group ref={groupRef} position={[skill.position[0], 0, skill.position[1]]}>
      {Array.from({ length: heightUnits }).map((_, i) => (
        <mesh key={i} position={[0, 0.5 + i, 0]} castShadow>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color={trunkColor} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.5 + heightUnits + 0.5, 0]} castShadow>
        <boxGeometry args={[1.6, 1, 1.6]} />
        <meshStandardMaterial
          color={skill.color}
          flatShading
          emissive={highlight ? skill.color : "#000"}
          emissiveIntensity={highlight ? 0.4 : 0}
        />
      </mesh>
      {highlight ? (
        <Text
          position={[0, 0.5 + heightUnits + 1.6, 0]}
          fontSize={0.35}
          color="#fff"
          outlineWidth={0.04}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
        >
          {skill.label}
        </Text>
      ) : null}
    </group>
  );
}

function CategorySign({
  anchor,
  label,
}: {
  anchor: [number, number];
  label: string;
}) {
  return (
    <group position={[anchor[0], 0, anchor[1]]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5a3a1a" flatShading />
      </mesh>
      <mesh position={[0, 3.3, 0]} castShadow>
        <boxGeometry args={[2.4, 0.9, 0.15]} />
        <meshStandardMaterial color="#c9a06a" flatShading />
      </mesh>
      <Text
        position={[0, 3.3, 0.09]}
        fontSize={0.32}
        color="#2a1a08"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function darken(hex: string): string {
  const c = new THREE.Color(hex);
  c.multiplyScalar(0.55);
  return `#${c.getHexString()}`;
}

export function SkillGarden() {
  const nearby = useGameStore((s) => s.nearbyInteractable);

  return (
    <group>
      {(Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]).map(
        (cat) => (
          <CategorySign
            key={cat}
            anchor={CATEGORY_META[cat].anchor}
            label={`${CATEGORY_META[cat].emoji} ${CATEGORY_META[cat].label}`}
          />
        ),
      )}
      {SKILLS.map((s) => (
        <SkillPlant key={s.id} skill={s} highlight={nearby === s.id} />
      ))}
    </group>
  );
}

export { PROXIMITY_RADIUS };
