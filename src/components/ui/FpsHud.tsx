"use client";

import { useEffect, useState } from "react";
import { useHydrated } from "@/lib/useHydrated";

/**
 * Tiny FPS counter. Only renders when the URL has ?fps=1, or in dev builds.
 * Uses requestAnimationFrame timestamps; updates the display once per second.
 */
export function FpsHud() {
  const hydrated = useHydrated();
  const [fps, setFps] = useState(0);

  // 하이드레이션 뒤에만 브라우저 값을 읽는다. 예전에는 effect 안에서 setEnabled(true) 를
  // 했는데, 그게 마운트 직후 캐스케이딩 렌더를 만들어 react-hooks/set-state-in-effect 에
  // 걸렸다. 렌더 단계에서 파생하면 상태 자체가 필요 없다.
  const enabled =
    hydrated &&
    (new URLSearchParams(window.location.search).get("fps") === "1" ||
      process.env.NODE_ENV === "development");

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 font-mono text-[10px] text-white backdrop-blur">
      {fps} fps
    </div>
  );
}
