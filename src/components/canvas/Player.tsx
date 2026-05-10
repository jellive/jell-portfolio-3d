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
import { useMobileInputStore } from "@/stores/mobileStore";
import { playJump } from "@/lib/audio";

const SPEED = 5;
const JUMP_IMPULSE = 6;
const CAMERA_OFFSET = new THREE.Vector3(0, 6, 9);
const UP = new THREE.Vector3(0, 1, 0);

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const [, get] = useKeyboardControls<ControlName>();
  const setPosition = useGameStore((s) => s.setPosition);
  const setHeading = useGameStore((s) => s.setHeading);

  const tmpRef = useRef({
    direction: new THREE.Vector3(),
    camDir: new THREE.Vector3(),
    camRight: new THREE.Vector3(),
    targetCamPos: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
    smoothedLookAt: new THREE.Vector3(),
    lookAtInit: false,
  });

  useFrame((state, delta) => {
    if (!body.current) return;
    const { forward, backward, left, right, jump } = get();
    const mobile = useMobileInputStore.getState();
    const linvel = body.current.linvel();

    state.camera.getWorldDirection(tmpRef.current.camDir);
    tmpRef.current.camDir.y = 0;
    tmpRef.current.camDir.normalize();
    tmpRef.current.camRight.crossVectors(tmpRef.current.camDir, UP).normalize();

    let fwdAxis = (forward ? 1 : 0) - (backward ? 1 : 0);
    let rightAxis = (right ? 1 : 0) - (left ? 1 : 0);
    fwdAxis += -mobile.moveY;
    rightAxis += mobile.moveX;
    fwdAxis = THREE.MathUtils.clamp(fwdAxis, -1, 1);
    rightAxis = THREE.MathUtils.clamp(rightAxis, -1, 1);

    tmpRef.current.direction.set(0, 0, 0);
    tmpRef.current.direction.addScaledVector(tmpRef.current.camDir, fwdAxis);
    tmpRef.current.direction.addScaledVector(
      tmpRef.current.camRight,
      rightAxis,
    );

    if (tmpRef.current.direction.lengthSq() > 0) {
      tmpRef.current.direction.normalize().multiplyScalar(SPEED);
    }

    body.current.setLinvel(
      {
        x: tmpRef.current.direction.x,
        y: linvel.y,
        z: tmpRef.current.direction.z,
      },
      true,
    );

    const wantsJump = jump || mobile.jump;
    if (wantsJump && Math.abs(linvel.y) < 0.08) {
      body.current.applyImpulse({ x: 0, y: JUMP_IMPULSE, z: 0 }, true);
      playJump();
    }

    const pos = body.current.translation();
    setPosition([pos.x, pos.y, pos.z]);
    setHeading(Math.atan2(tmpRef.current.camDir.x, tmpRef.current.camDir.z));

    tmpRef.current.targetCamPos.set(
      pos.x + CAMERA_OFFSET.x,
      pos.y + CAMERA_OFFSET.y,
      pos.z + CAMERA_OFFSET.z,
    );
    const followFactor = 1 - Math.pow(0.001, delta);
    state.camera.position.lerp(tmpRef.current.targetCamPos, followFactor);
    tmpRef.current.lookAt.set(pos.x, pos.y + 1, pos.z);
    if (!tmpRef.current.lookAtInit) {
      tmpRef.current.smoothedLookAt.copy(tmpRef.current.lookAt);
      tmpRef.current.lookAtInit = true;
    } else {
      tmpRef.current.smoothedLookAt.lerp(tmpRef.current.lookAt, followFactor);
    }
    state.camera.lookAt(tmpRef.current.smoothedLookAt);
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
