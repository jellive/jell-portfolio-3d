"use client";

import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/stores/gameStore";
import { SKILLS } from "@/data/skills";
import { PROXIMITY_RADIUS } from "./SkillGarden";

export function ProximityDetector() {
  const setNearby = useGameStore((s) => s.setNearbyInteractable);

  useFrame(() => {
    const [px, , pz] = useGameStore.getState().position;
    let bestId: string | null = null;
    let bestDist = PROXIMITY_RADIUS * PROXIMITY_RADIUS;
    for (const s of SKILLS) {
      const dx = s.position[0] - px;
      const dz = s.position[1] - pz;
      const d2 = dx * dx + dz * dz;
      if (d2 < bestDist) {
        bestDist = d2;
        bestId = s.id;
      }
    }
    if (bestId !== useGameStore.getState().nearbyInteractable) {
      setNearby(bestId);
    }
  });

  return null;
}
