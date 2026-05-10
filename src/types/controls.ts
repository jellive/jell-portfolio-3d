import type { KeyboardControlsEntry } from "@react-three/drei";

export type ControlName =
  | "forward"
  | "backward"
  | "left"
  | "right"
  | "jump"
  | "interact";

export const CONTROLS_MAP: KeyboardControlsEntry<ControlName>[] = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "interact", keys: ["KeyE", "Enter"] },
];
