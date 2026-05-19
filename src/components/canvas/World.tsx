"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, lazy, useEffect, useState } from "react";
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
const Stats = SHOW_STATS
  ? lazy(() => import("@react-three/drei").then((m) => ({ default: m.Stats })))
  : null;

// ── Time-of-day palette (real wall-clock based) ──────────────────────
interface Palette {
  bg: string;
  fog: string;
  amb: string;
  hemiSky: string;
  hemiGround: string;
  dir: string;
  dirIntensity: number;
  ambIntensity: number;
  hemiIntensity: number;
}

// Default = dawn pastel (matches original SSR-stable initial render)
const DAWN: Palette = {
  bg: "#ffc8a0",
  fog: "#ffc8a0",
  amb: "#ffe0c0",
  hemiSky: "#ffd0a0",
  hemiGround: "#3b5530",
  dir: "#ffd0a0",
  dirIntensity: 1.1,
  ambIntensity: 0.55,
  hemiIntensity: 0.6,
};
const DAY: Palette = {
  bg: "#bcd8f5",
  fog: "#bcd8f5",
  amb: "#eaf0ff",
  hemiSky: "#bcd8f5",
  hemiGround: "#4a6a3a",
  dir: "#fffce6",
  dirIntensity: 1.3,
  ambIntensity: 0.7,
  hemiIntensity: 0.65,
};
const DUSK: Palette = {
  bg: "#ff8a5b",
  fog: "#ff8a5b",
  amb: "#ffb888",
  hemiSky: "#ff8a5b",
  hemiGround: "#3a3528",
  dir: "#ffaa55",
  dirIntensity: 1.0,
  ambIntensity: 0.6,
  hemiIntensity: 0.55,
};
const NIGHT: Palette = {
  bg: "#1a1d3a",
  fog: "#1a1d3a",
  amb: "#3a4055",
  hemiSky: "#1a1d3a",
  hemiGround: "#1a221a",
  dir: "#6080ff",
  dirIntensity: 0.35,
  ambIntensity: 0.35,
  hemiIntensity: 0.4,
};

function paletteForHour(h: number): Palette {
  if (h >= 5.5 && h < 10) return DAWN;
  if (h >= 10 && h < 17) return DAY;
  if (h >= 17 && h < 20) return DUSK;
  return NIGHT;
}

export default function World({ isTouch = false }: { isTouch?: boolean }) {
  // SSR-safe: default DAWN, hydrate to wall-clock on client mount
  const [pal, setPal] = useState<Palette>(DAWN);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setPal(paletteForHour(d.getHours() + d.getMinutes() / 60));
    };
    update();
    const id = setInterval(update, 60_000); // re-eval every minute
    return () => clearInterval(id);
  }, []);

  return (
    <Canvas
      shadows={!isTouch}
      camera={{ position: [0, 6, 9], fov: 60, near: 0.1, far: 200 }}
      dpr={isTouch ? [0.75, 1] : [1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      performance={{ min: 0.3 }}
      frameloop="always"
    >
      <color attach="background" args={[pal.bg]} />
      <fog
        attach="fog"
        args={[pal.fog, isTouch ? 30 : 50, isTouch ? 90 : 140]}
      />

      <ambientLight intensity={pal.ambIntensity} color={pal.amb} />
      <hemisphereLight
        args={[pal.hemiSky, pal.hemiGround, pal.hemiIntensity]}
      />
      <directionalLight
        position={[-10, 18, -15]}
        intensity={pal.dirIntensity}
        color={pal.dir}
        castShadow={!isTouch}
        shadow-mapSize-width={isTouch ? 1024 : 2048}
        shadow-mapSize-height={isTouch ? 1024 : 2048}
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

      {SHOW_STATS && Stats ? (
        <Suspense fallback={null}>
          <Stats />
        </Suspense>
      ) : null}
    </Canvas>
  );
}
