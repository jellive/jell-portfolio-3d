"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import {
  CapsuleCollider,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import type { ControlName } from "@/types/controls";
import { useGameStore } from "@/stores/gameStore";

const SPEED = 5;
const JUMP_IMPULSE = 6;
const CAMERA_OFFSET = new THREE.Vector3(0, 6, 9);

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const [, get] = useKeyboardControls<ControlName>();
  const setPosition = useGameStore((s) => s.setPosition);

  const direction = new THREE.Vector3();
  const camDir = new THREE.Vector3();
  const camRight = new THREE.Vector3();
  const targetCamPos = new THREE.Vector3();
  const lookAt = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!body.current) return;
    const { forward, backward, left, right, jump } = get();
    const linvel = body.current.linvel();

    state.camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();
    camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    direction.set(0, 0, 0);
    if (forward) direction.add(camDir);
    if (backward) direction.sub(camDir);
    if (left) direction.sub(camRight);
    if (right) direction.add(camRight);

    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(SPEED);
    }

    body.current.setLinvel(
      { x: direction.x, y: linvel.y, z: direction.z },
      true,
    );

    if (jump && Math.abs(linvel.y) < 0.08) {
      body.current.applyImpulse({ x: 0, y: JUMP_IMPULSE, z: 0 }, true);
    }

    const pos = body.current.translation();
    setPosition([pos.x, pos.y, pos.z]);

    targetCamPos.set(
      pos.x + CAMERA_OFFSET.x,
      pos.y + CAMERA_OFFSET.y,
      pos.z + CAMERA_OFFSET.z,
    );
    state.camera.position.lerp(targetCamPos, 1 - Math.pow(0.001, delta));
    lookAt.set(pos.x, pos.y + 1, pos.z);
    state.camera.lookAt(lookAt);
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={[0, 4, 0]}
      enabledRotations={[false, false, false]}
      linearDamping={0.5}
      mass={1}
    >
      <CapsuleCollider args={[0.5, 0.4]} />
      <group>
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 1, 4, 12]} />
          <meshStandardMaterial color="#ff6b6b" flatShading />
        </mesh>
        <mesh position={[0.18, 0.45, 0.32]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.18, 0.45, 0.32]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </RigidBody>
  );
}
