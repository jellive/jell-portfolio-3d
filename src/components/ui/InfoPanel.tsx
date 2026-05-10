"use client";

import { useEffect } from "react";
import { useUIStore, useGameStore } from "@/stores/gameStore";
import { SKILLS } from "@/data/skills";
import { CAREER } from "@/data/career";
import { PROJECTS } from "@/data/projects";
import { CONTACTS } from "@/data/contact";
import { playInteract, playClose } from "@/lib/audio";

type Resolved =
  | { type: "skill"; data: (typeof SKILLS)[number] }
  | { type: "career"; data: (typeof CAREER)[number] }
  | { type: "project"; data: (typeof PROJECTS)[number] }
  | { type: "contact"; data: (typeof CONTACTS)[number] };

function resolve(id: string | null): Resolved | null {
  if (!id) return null;
  const [type, key] = id.split(":");
  if (type === "skill") {
    const data = SKILLS.find((s) => s.id === key);
    return data ? { type: "skill", data } : null;
  }
  if (type === "career") {
    const data = CAREER.find((c) => c.id === key);
    return data ? { type: "career", data } : null;
  }
  if (type === "project") {
    const data = PROJECTS.find((p) => p.id === key);
    return data ? { type: "project", data } : null;
  }
  if (type === "contact") {
    const data = CONTACTS.find((c) => c.id === key);
    return data ? { type: "contact", data } : null;
  }
  return null;
}

function shortLabel(r: Resolved): string {
  switch (r.type) {
    case "skill":
      return r.data.label;
    case "career":
      return `${r.data.year} ${r.data.company}`;
    case "project":
      return r.data.name;
    case "contact":
      return r.data.label;
  }
}

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
          playClose();
        } else if (target) {
          setPanel(target);
          playInteract();
        }
      } else if (e.code === "Escape") {
        if (useUIStore.getState().panelOpen) {
          setPanel(null);
          playClose();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPanel]);

  const opened = resolve(panelOpen);

  if (!opened) {
    const target = resolve(nearby);
    if (!target) return null;
    return (
      <div className="pointer-events-none absolute left-1/2 bottom-24 -translate-x-1/2 rounded-md bg-black/70 px-4 py-2 text-sm text-white backdrop-blur">
        <span className="text-amber-300 font-bold">E</span>
        <span className="ml-2">{shortLabel(target)} 살펴보기</span>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(440px,92vw)] rounded-lg border border-white/10 bg-zinc-900/95 p-5 text-white shadow-2xl backdrop-blur">
      {opened.type === "skill" ? <SkillView data={opened.data} /> : null}
      {opened.type === "career" ? <CareerView data={opened.data} /> : null}
      {opened.type === "project" ? <ProjectView data={opened.data} /> : null}
      {opened.type === "contact" ? <ContactView data={opened.data} /> : null}

      <button
        type="button"
        onClick={() => {
          setPanel(null);
          playClose();
        }}
        className="mt-4 rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
      >
        close (E / Esc)
      </button>
    </div>
  );
}

function SkillView({ data: skill }: { data: (typeof SKILLS)[number] }) {
  return (
    <>
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
    </>
  );
}

function CareerView({ data: c }: { data: (typeof CAREER)[number] }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-md border border-white/20"
          style={{ background: c.color }}
        />
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">
            {c.year} · {c.role}
          </div>
          <div className="text-xl font-bold">{c.company}</div>
        </div>
      </div>
      <div className="mt-3 text-xs font-mono text-amber-300">{c.stack}</div>
      <div className="mt-3 text-sm leading-relaxed text-zinc-200">
        {c.blurb}
      </div>
    </>
  );
}

function ProjectView({ data: p }: { data: (typeof PROJECTS)[number] }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 grid place-items-center rounded-md border border-white/20 text-2xl"
          style={{ background: p.color }}
        >
          {p.emoji}
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">
            project
          </div>
          <div className="text-xl font-bold">{p.name}</div>
        </div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-zinc-200">
        {p.blurb}
      </div>
      {p.url ? (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded bg-amber-300 px-3 py-1.5 text-xs font-bold text-zinc-900 hover:bg-amber-200"
        >
          visit ↗
        </a>
      ) : null}
    </>
  );
}

function ContactView({ data: c }: { data: (typeof CONTACTS)[number] }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-md border border-white/20"
          style={{ background: c.color }}
        />
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">
            contact
          </div>
          <div className="text-xl font-bold">{c.label}</div>
        </div>
      </div>
      <div className="mt-3 break-all text-sm font-mono text-amber-300">
        {c.value}
      </div>
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-amber-300 px-3 py-1.5 text-xs font-bold text-zinc-900 hover:bg-amber-200"
      >
        open ↗
      </a>
    </>
  );
}
