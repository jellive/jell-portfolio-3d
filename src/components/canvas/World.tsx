"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Terrain } from "./Terrain";
import { Player } from "./Player";
import { Decor } from "./Decor";
import { SkillGarden } from "./SkillGarden";
import { ProximityDetector } from "./ProximityDetector";

const SHOW_STATS = process.env.NODE_ENV !== "production";

export default function World() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 9], fov: 60, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#cfe1ec", 60, 140]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#bcd9e8", "#3b5530", 0.4]} />
      <directionalLight
        position={[40, 25, 15]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      <Sky
        sunPosition={[40, 25, 15]}
        turbidity={3}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      <Suspense fallback={null}>
        <Physics gravity={[0, -20, 0]}>
          <Terrain />
          <Decor />
          <SkillGarden />
          <Player />
          <ProximityDetector />
        </Physics>
      </Suspense>

      {SHOW_STATS ? <Stats /> : null}
    </Canvas>
  );
}
