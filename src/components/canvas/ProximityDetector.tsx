"use client";

import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/stores/gameStore";
import { SKILLS } from "@/data/skills";
import { CAREER } from "@/data/career";
import { PROJECTS } from "@/data/projects";
import { CONTACTS } from "@/data/contact";

const PROXIMITY_RADIUS = 2.6;
const RADIUS_SQ = PROXIMITY_RADIUS * PROXIMITY_RADIUS;

interface POI {
  id: string;
  x: number;
  z: number;
}

const POIS: POI[] = [
  ...SKILLS.map((s) => ({
    id: `skill:${s.id}`,
    x: s.position[0],
    z: s.position[1],
  })),
  ...CAREER.map((c) => ({
    id: `career:${c.id}`,
    x: c.position[0],
    z: c.position[1],
  })),
  ...PROJECTS.map((p) => ({
    id: `project:${p.id}`,
    x: p.position[0],
    z: p.position[1],
  })),
  ...CONTACTS.map((c) => ({
    id: `contact:${c.id}`,
    x: c.position[0],
    z: c.position[1],
  })),
];

export function ProximityDetector() {
  const setNearby = useGameStore((s) => s.setNearbyInteractable);

  useFrame(() => {
    const [px, , pz] = useGameStore.getState().position;
    let bestId: string | null = null;
    let bestDist = RADIUS_SQ;
    for (const p of POIS) {
      const dx = p.x - px;
      const dz = p.z - pz;
      const d2 = dx * dx + dz * dz;
      if (d2 < bestDist) {
        bestDist = d2;
        bestId = p.id;
      }
    }
    if (bestId !== useGameStore.getState().nearbyInteractable) {
      setNearby(bestId);
    }
  });

  return null;
}
