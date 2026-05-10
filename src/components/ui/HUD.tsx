"use client";

import { useGameStore, useUIStore } from "@/stores/gameStore";
import { setSoundEnabled } from "@/lib/audio";

export function HUD({ isTouch = false }: { isTouch?: boolean }) {
  const position = useGameStore((s) => s.position);
  const soundOn = useUIStore((s) => s.soundOn);
  const toggleSound = useUIStore((s) => s.toggleSound);

  function onToggleSound() {
    const next = !useUIStore.getState().soundOn;
    toggleSound();
    void setSoundEnabled(next);
  }

  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <div className="absolute top-3 left-3 rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur">
        <div className="font-bold tracking-widest">JELL WORLD</div>
        <div className="opacity-75 mt-1">
          x {position[0].toFixed(1)} · y {position[1].toFixed(1)} · z{" "}
          {position[2].toFixed(1)}
        </div>
      </div>

      {!isTouch ? (
        <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-3 py-2 font-mono text-[11px] leading-tight text-white backdrop-blur">
          <div>
            <span className="text-amber-300">WASD</span> move
          </div>
          <div>
            <span className="text-amber-300">SPACE</span> jump
          </div>
          <div>
            <span className="text-amber-300">E</span> interact
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onToggleSound}
        className={`pointer-events-auto absolute rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur hover:bg-black/80 ${
          isTouch ? "top-16 left-3" : "bottom-3 right-3"
        }`}
      >
        sound: {soundOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}
