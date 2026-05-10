"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Terrain } from "./Terrain";
import { Player } from "./Player";
import { Decor } from "./Decor";
import { SkillGarden } from "./SkillGarden";
import { CareerTimeline } from "./CareerTimeline";
import { ProjectsPark } from "./ProjectsPark";
import { ContactStation } from "./ContactStation";
import { ProximityDetector } from "./ProximityDetector";

const SHOW_STATS = process.env.NODE_ENV !== "production";

export default function World({ isTouch = false }: { isTouch?: boolean }) {
  return (
    <Canvas
      shadows={!isTouch}
      camera={{ position: [0, 6, 9], fov: 60, near: 0.1, far: 200 }}
      dpr={isTouch ? [1, 1] : [1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <fog attach="fog" args={["#a8c8d8", 70, 160]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#9fb8d6", "#3b5530", 0.5]} />
      <directionalLight
        position={[30, 20, -20]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      <Sky
        sunPosition={[30, 20, -20]}
        turbidity={10}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
      />

      <Suspense fallback={null}>
        <Physics gravity={[0, -20, 0]}>
          <Terrain />
          <Decor />
          <SkillGarden />
          <CareerTimeline />
          <ProjectsPark />
          <ContactStation />
          <Player />
          <ProximityDetector />
        </Physics>
      </Suspense>

      {SHOW_STATS ? <Stats /> : null}
    </Canvas>
  );
}
