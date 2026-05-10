"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Terrain } from "./Terrain";
import { Player } from "./Player";
import { Decor } from "./Decor";

const SHOW_STATS = process.env.NODE_ENV !== "production";

export default function World() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 9], fov: 60, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#bcd9e8", 50, 120]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      <Sky sunPosition={[20, 30, 10]} turbidity={6} rayleigh={1} />

      <Suspense fallback={null}>
        <Physics gravity={[0, -20, 0]}>
          <Terrain />
          <Decor />
          <Player />
        </Physics>
      </Suspense>

      {SHOW_STATS ? <Stats /> : null}
    </Canvas>
  );
}
