"use client";

import { useEffect, useState } from "react";

const TOTAL_CELLS = 16;
const STEP_MS = 90;

export function LoadingScreen() {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (filled >= TOTAL_CELLS) return;
    const id = window.setTimeout(
      () => setFilled((f) => Math.min(TOTAL_CELLS, f + 1)),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [filled]);

  const percent = Math.round((filled / TOTAL_CELLS) * 100);

  return (
    <div
      className="w-full h-full grid place-items-center text-white"
      style={{ background: "#ffc8a0" }}
    >
      <div className="flex flex-col items-center gap-4 text-zinc-900">
        <div className="text-2xl font-mono font-bold tracking-widest">
          JELL WORLD
        </div>
        <div
          className="flex gap-0.5 border-2 border-zinc-900 bg-zinc-900/10 p-1"
          style={{ width: TOTAL_CELLS * 14 + 8 }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 16,
                background: i < filled ? "#1a1a1a" : "transparent",
              }}
            />
          ))}
        </div>
        <div className="text-xs font-mono opacity-70">{percent}%</div>
      </div>
    </div>
  );
}
