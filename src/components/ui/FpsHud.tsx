"use client";

import { useEffect, useState } from "react";

/**
 * Tiny FPS counter. Only renders when the URL has ?fps=1, or in dev builds.
 * Uses requestAnimationFrame timestamps; updates the display once per second.
 */
export function FpsHud() {
  const [enabled, setEnabled] = useState(false);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag =
      new URLSearchParams(window.location.search).get("fps") === "1" ||
      process.env.NODE_ENV === "development";
    if (!flag) return;
    setEnabled(true);

    let raf = 0;
    let frames = 0;
    let last = performance.now();
    const loop = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!enabled) return null;
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 font-mono text-[10px] text-white backdrop-blur">
      {fps} fps
    </div>
  );
}
