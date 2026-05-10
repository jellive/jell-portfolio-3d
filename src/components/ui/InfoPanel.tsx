"use client";

import { useEffect } from "react";
import { useUIStore, useGameStore } from "@/stores/gameStore";
import { SKILLS } from "@/data/skills";

export function InfoPanel() {
  const panelOpen = useUIStore((s) => s.panelOpen);
  const setPanel = useUIStore((s) => s.setPanel);
  const nearby = useGameStore((s) => s.nearbyInteractable);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "KeyE" || e.code === "Enter") {
        const current = useUIStore.getState().panelOpen;
        const target = useGameStore.getState().nearbyInteractable;
        if (current) {
          setPanel(null);
        } else if (target) {
          setPanel(target);
        }
      } else if (e.code === "Escape") {
        setPanel(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPanel]);

  if (!panelOpen) {
    if (!nearby) return null;
    const skill = SKILLS.find((s) => s.id === nearby);
    if (!skill) return null;
    return (
      <div className="pointer-events-none absolute left-1/2 bottom-24 -translate-x-1/2 rounded-md bg-black/70 px-4 py-2 text-sm text-white backdrop-blur">
        <span className="text-amber-300 font-bold">E</span>
        <span className="ml-2">{skill.label} 살펴보기</span>
      </div>
    );
  }

  const skill = SKILLS.find((s) => s.id === panelOpen);
  if (!skill) return null;

  return (
    <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(420px,90vw)] rounded-lg border border-white/10 bg-zinc-900/95 p-5 text-white shadow-2xl backdrop-blur">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-md border border-white/20"
          style={{ background: skill.color }}
        />
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">
            {skill.category}
          </div>
          <div className="text-xl font-bold">{skill.label}</div>
        </div>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-zinc-200">
        {skill.blurb}
      </div>
      <div className="mt-3 flex gap-1">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-2 w-8 rounded ${
              n <= skill.level ? "bg-amber-300" : "bg-zinc-700"
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPanel(null)}
        className="mt-4 rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
      >
        close (E / Esc)
      </button>
    </div>
  );
}
