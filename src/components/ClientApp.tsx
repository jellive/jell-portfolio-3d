"use client";

import dynamic from "next/dynamic";
import { KeyboardControls } from "@react-three/drei";
import { CONTROLS_MAP } from "@/types/controls";
import { HUD } from "./ui/HUD";
import { InfoPanel } from "./ui/InfoPanel";
import { Minimap } from "./ui/Minimap";

const World = dynamic(() => import("./canvas/World"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center bg-[#0e0e1a] text-white">
      <div className="text-center">
        <div className="text-2xl font-mono tracking-widest animate-pulse">
          LOADING WORLD…
        </div>
        <div className="mt-2 text-xs opacity-60">first paint takes a sec</div>
      </div>
    </div>
  ),
});

export default function ClientApp() {
  return (
    <KeyboardControls map={CONTROLS_MAP}>
      <div className="relative w-full h-full">
        <World />
        <HUD />
        <Minimap />
        <InfoPanel />
      </div>
    </KeyboardControls>
  );
}
