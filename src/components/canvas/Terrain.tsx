"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

const WORLD_SIZE = 48;
const BLOCK = 1;

type BlockType = "grass" | "dirt" | "stone" | "sand";

const COLORS: Record<BlockType, string> = {
  grass: "#7ec850",
  dirt: "#8b5a2b",
  stone: "#8a8a8a",
  sand: "#e8d8a0",
};

function pickBlockType(x: number, z: number): BlockType {
  const dx = x - WORLD_SIZE / 2;
  const dz = z - WORLD_SIZE / 2;
  const r2 = dx * dx + dz * dz;
  if (r2 < 36) return "grass";
  if (r2 < 144) return Math.random() < 0.15 ? "stone" : "grass";
  if (r2 < 324) return Math.random() < 0.3 ? "sand" : "dirt";
  return "stone";
}

interface InstancedBlocksProps {
  type: BlockType;
  positions: [number, number, number][];
}

function InstancedBlocks({ type, positions }: InstancedBlocksProps) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.set(p[0], p[1], p[2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [positions]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, positions.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[BLOCK, BLOCK, BLOCK]} />
      <meshStandardMaterial color={COLORS[type]} flatShading />
    </instancedMesh>
  );
}

export function Terrain() {
  const buckets = useMemo(() => {
    const grouped: Record<BlockType, [number, number, number][]> = {
      grass: [],
      dirt: [],
      stone: [],
      sand: [],
    };
    for (let x = 0; x < WORLD_SIZE; x++) {
      for (let z = 0; z < WORLD_SIZE; z++) {
        const wx = x - WORLD_SIZE / 2 + 0.5;
        const wz = z - WORLD_SIZE / 2 + 0.5;
        const t = pickBlockType(x, z);
        grouped[t].push([wx, -0.5, wz]);
      }
    }
    return grouped;
  }, []);

  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid" friction={1} restitution={0}>
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[WORLD_SIZE, BLOCK, WORLD_SIZE]} />
          <meshStandardMaterial visible={false} />
        </mesh>
      </RigidBody>

      {(Object.keys(buckets) as BlockType[]).map((t) =>
        buckets[t].length > 0 ? (
          <InstancedBlocks key={t} type={t} positions={buckets[t]} />
        ) : null,
      )}
    </group>
  );
}
