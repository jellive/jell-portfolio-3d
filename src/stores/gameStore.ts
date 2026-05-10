import { create } from "zustand";

export type ZoneId =
  | "home"
  | "skill"
  | "career"
  | "projects"
  | "blog"
  | "contact";

interface GameState {
  position: [number, number, number];
  zone: ZoneId | null;
  nearbyInteractable: string | null;
  setPosition: (pos: [number, number, number]) => void;
  setZone: (zone: ZoneId | null) => void;
  setNearbyInteractable: (id: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  position: [0, 1, 0],
  zone: null,
  nearbyInteractable: null,
  setPosition: (pos) => set({ position: pos }),
  setZone: (zone) => set({ zone }),
  setNearbyInteractable: (id) => set({ nearbyInteractable: id }),
}));

interface UIState {
  soundOn: boolean;
  panelOpen: string | null;
  toggleSound: () => void;
  setPanel: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  soundOn: false,
  panelOpen: null,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  setPanel: (id) => set({ panelOpen: id }),
}));
