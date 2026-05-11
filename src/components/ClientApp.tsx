"use client";

import dynamic from "next/dynamic";
import { KeyboardControls } from "@react-three/drei";
import { CONTROLS_MAP } from "@/types/controls";
import { HUD } from "./ui/HUD";
import { InfoPanel } from "./ui/InfoPanel";
import { Minimap } from "./ui/Minimap";
import { MobileControls } from "./ui/MobileControls";
import { SoundConsent } from "./ui/SoundConsent";
import { LoadingScreen } from "./ui/LoadingScreen";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

const World = dynamic(() => import("./canvas/World"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function ClientApp() {
  const isTouch = useIsTouchDevice();

  return (
    <KeyboardControls map={CONTROLS_MAP}>
      <div className="relative w-full h-full">
        <World isTouch={isTouch} />
        <HUD isTouch={isTouch} />
        <Minimap />
        <InfoPanel />
        {isTouch ? <MobileControls /> : null}
        <SoundConsent />
      </div>
    </KeyboardControls>
  );
}
