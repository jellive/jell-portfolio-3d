"use client";

import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Terrain } from "./Terrain";
import { Player } from "./Player";
import { Decor } from "./Decor";
import { SkillGarden } from "./SkillGarden";
import { CareerTimeline } from "./CareerTimeline";
import { ProjectsPark } from "./ProjectsPark";
import { ContactStation } from "./ContactStation";
import { BlogLibrary } from "./BlogLibrary";
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
      <color attach="background" args={["#ffc8a0"]} />
      <fog attach="fog" args={["#ffc8a0", 50, 140]} />

      <ambientLight intensity={0.55} color="#ffe0c0" />
      <hemisphereLight args={["#ffd0a0", "#3b5530", 0.6]} />
      <directionalLight
        position={[-10, 18, -15]}
        intensity={1.1}
        color="#ffd0a0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0005}
        shadow-normalBias={0.05}
      />

      <Suspense fallback={null}>
        <Physics gravity={[0, -20, 0]}>
          <Terrain />
          <Decor />
          <SkillGarden />
          <CareerTimeline />
          <ProjectsPark />
          <ContactStation />
          <BlogLibrary />
          <Player />
          <ProximityDetector />
        </Physics>
      </Suspense>

      {SHOW_STATS ? <Stats /> : null}
    </Canvas>
  );
}
