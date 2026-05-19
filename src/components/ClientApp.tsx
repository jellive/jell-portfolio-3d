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
import { GitHubStatsCard } from "./ui/GitHubStatsCard";
import { KstClock } from "./ui/KstClock";
import { WeatherCard } from "./ui/WeatherCard";
import { FpsHud } from "./ui/FpsHud";
import { CopyUrlButton } from "./ui/CopyUrlButton";
import { VisitorCounter } from "./ui/VisitorCounter";
import { GithubFooter } from "./ui/GithubFooter";
import { RegisterSW } from "./ui/RegisterSW";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import type { GhStats } from "@/lib/github";
import type { Weather } from "@/lib/weather";

const World = dynamic(() => import("./canvas/World"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function ClientApp({
  githubStats,
  weather,
}: {
  githubStats: GhStats | null;
  weather: Weather | null;
}) {
  const isTouch = useIsTouchDevice();

  return (
    <KeyboardControls map={CONTROLS_MAP}>
      <div className="relative w-full h-full">
        <World isTouch={isTouch} />
        <HUD isTouch={isTouch} />
        <Minimap />
        <InfoPanel />
        <GitHubStatsCard stats={githubStats} />
        <KstClock />
        <WeatherCard data={weather} />
        <FpsHud />
        <CopyUrlButton />
        <VisitorCounter />
        <GithubFooter />
        <RegisterSW />
        {isTouch ? <MobileControls /> : null}
        <SoundConsent />
      </div>
    </KeyboardControls>
  );
}
