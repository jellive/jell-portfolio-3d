"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "jell-world:visits";

/**
 * localStorage-backed personal visit counter. Increments on every mount
 * and renders below the GitHub stats card. Empty until hydrated so SSR
 * stays clean.
 */
export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const prev = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
      const next = (Number.isFinite(prev) ? prev : 0) + 1;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      setCount(next);
    } catch {
      /* localStorage blocked — silently skip */
    }
  }, []);

  if (count === null) return null;
  return (
    <div className="pointer-events-none absolute top-[315px] right-3 flex items-center gap-1.5 rounded-md bg-black/60 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
      </span>
      visits <span className="text-amber-300">{count}</span>
    </div>
  );
}
