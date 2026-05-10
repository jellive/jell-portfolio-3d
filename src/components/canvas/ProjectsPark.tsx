"use client";

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { PROJECTS, type Project } from "@/data/projects";
import { useGameStore } from "@/stores/gameStore";

function ProjectBuilding({
  project,
  highlight,
}: {
  project: Project;
  highlight: boolean;
}) {
  const [x, z] = project.position;
  return (
    <group position={[x, 0, z]}>
      <RigidBody type="fixed" colliders="cuboid">
        <Shape
          shape={project.shape}
          color={project.color}
          highlight={highlight}
        />
      </RigidBody>
      <Text
        position={[0, 3.6, 0]}
        fontSize={0.3}
        color="#fff"
        outlineWidth={0.04}
        outlineColor="#000"
        anchorX="center"
      >
        {project.emoji} {project.name}
      </Text>
    </group>
  );
}

function Shape({
  shape,
  color,
  highlight,
}: {
  shape: Project["shape"];
  color: string;
  highlight: boolean;
}) {
  const emissive = highlight ? color : "#000";
  const emissiveIntensity = highlight ? 0.4 : 0;

  switch (shape) {
    case "tent":
      return (
        <>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[2.2, 1, 2.2]} />
            <meshStandardMaterial
              color={color}
              flatShading
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          <mesh position={[0, 1.6, 0]} castShadow>
            <coneGeometry args={[1.6, 1.4, 4]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
        </>
      );
    case "heart":
      return (
        <>
          <mesh position={[-0.45, 1, 0]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={color}
              flatShading
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          <mesh position={[0.45, 1, 0]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <boxGeometry args={[1.4, 1.4, 1]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
        </>
      );
    case "tomato":
      return (
        <>
          <mesh position={[0, 1, 0]} castShadow>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color={color}
              flatShading
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          <mesh position={[0, 2, 0]} castShadow>
            <coneGeometry args={[0.4, 0.5, 5]} />
            <meshStandardMaterial color="#5b8e3e" flatShading />
          </mesh>
        </>
      );
    case "tower":
      return (
        <>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[1.4, 1, 1.4]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[1.2, 1, 1.2]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={color}
              flatShading
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          <mesh position={[0, 3.2, 0]} castShadow>
            <coneGeometry args={[0.6, 0.6, 6]} />
            <meshStandardMaterial color="#fbbf24" flatShading />
          </mesh>
        </>
      );
    case "calendar":
      return (
        <>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[2, 2, 0.4]} />
            <meshStandardMaterial
              color={color}
              flatShading
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          <mesh position={[0, 1.85, 0.21]}>
            <boxGeometry args={[2.05, 0.4, 0.05]} />
            <meshStandardMaterial color="#1f2937" flatShading />
          </mesh>
        </>
      );
    case "gamepad":
      return (
        <>
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[2.4, 1, 1.4]} />
            <meshStandardMaterial
              color={color}
              flatShading
              emissive={emissive}
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          <mesh position={[-0.7, 1, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#1f2937" flatShading />
          </mesh>
          <mesh position={[0.7, 1, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#fbbf24" flatShading />
          </mesh>
        </>
      );
  }
}

export function ProjectsPark() {
  const nearby = useGameStore((s) => s.nearbyInteractable);
  return (
    <group>
      {PROJECTS.map((p) => (
        <ProjectBuilding
          key={p.id}
          project={p}
          highlight={nearby === `project:${p.id}`}
        />
      ))}
    </group>
  );
}
