import { create } from "zustand";

interface MobileInputState {
  moveX: number;
  moveY: number;
  jump: boolean;
  setAxes: (x: number, y: number) => void;
  setJump: (down: boolean) => void;
}

export const useMobileInputStore = create<MobileInputState>((set) => ({
  moveX: 0,
  moveY: 0,
  jump: false,
  setAxes: (x, y) => set({ moveX: x, moveY: y }),
  setJump: (down) => set({ jump: down }),
}));
