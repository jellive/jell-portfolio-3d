"use client";

import { useEffect } from "react";
import { useUIStore, useGameStore } from "@/stores/gameStore";
import { SKILLS } from "@/data/skills";
import { CAREER } from "@/data/career";
import { PROJECTS } from "@/data/projects";
import { CONTACTS } from "@/data/contact";
import { HOME_INTRO, type HomeIntro } from "@/data/home";
import { BLOG, type BlogLibrary } from "@/data/blog";
import { playInteract, playClose } from "@/lib/audio";

type Resolved =
  | { type: "home"; data: HomeIntro }
  | { type: "skill"; data: (typeof SKILLS)[number] }
  | { type: "career"; data: (typeof CAREER)[number] }
  | { type: "project"; data: (typeof PROJECTS)[number] }
  | { type: "contact"; data: (typeof CONTACTS)[number] }
  | { type: "blog"; data: BlogLibrary };

function resolve(id: string | null): Resolved | null {
  if (!id) return null;
  const [type, key] = id.split(":");
  if (type === "home") {
    return key === HOME_INTRO.id ? { type: "home", data: HOME_INTRO } : null;
  }
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
  if (type === "blog") {
    return key === BLOG.id ? { type: "blog", data: BLOG } : null;
  }
  return null;
}

function shortLabel(r: Resolved): string {
  switch (r.type) {
    case "home":
      return `${r.data.alternateName} 소개`;
    case "skill":
      return r.data.label;
    case "career":
      return `${r.data.year} ${r.data.company}`;
    case "project":
      return r.data.name;
    case "contact":
      return r.data.label;
    case "blog":
      return r.data.name;
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
      {opened.type === "home" ? <HomeView data={opened.data} /> : null}
      {opened.type === "skill" ? <SkillView data={opened.data} /> : null}
      {opened.type === "career" ? <CareerView data={opened.data} /> : null}
      {opened.type === "project" ? <ProjectView data={opened.data} /> : null}
      {opened.type === "contact" ? <ContactView data={opened.data} /> : null}
      {opened.type === "blog" ? <BlogView data={opened.data} /> : null}

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

function HomeView({ data }: { data: HomeIntro }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-md border border-white/20 bg-amber-200 text-xl">
          🏠
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">
            {data.role}
          </div>
          <div className="text-xl font-bold">
            {data.name}{" "}
            <span className="text-zinc-400 font-normal">
              / {data.alternateName}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs font-mono text-amber-300">
        {data.tagline}
      </div>
      <div className="mt-3 text-sm leading-relaxed text-zinc-200">
        {data.blurb}
      </div>
      <div className="mt-4 inline-flex items-center gap-2 rounded border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-mono font-bold text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        {data.status}
      </div>
    </>
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
      {c.subProjects && c.subProjects.length > 0 ? (
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="text-xs uppercase tracking-widest opacity-60 mb-2">
            주요 프로덕트
          </div>
          <ul className="space-y-2">
            {c.subProjects.map((sp) => (
              <li key={sp.name} className="text-sm">
                <div className="font-bold text-amber-200">{sp.name}</div>
                <div className="text-xs leading-relaxed text-zinc-300">
                  {sp.blurb}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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

function BlogView({ data }: { data: BlogLibrary }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-md border border-white/20 bg-amber-700 text-xl">
          📚
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">
            blog library
          </div>
          <div className="text-xl font-bold">{data.name}</div>
        </div>
      </div>
      <div className="mt-4 max-h-[50vh] overflow-y-auto pr-1 space-y-3">
        {data.posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
          >
            <div className="text-sm font-bold text-amber-200">{post.title}</div>
            <div className="mt-1 text-xs text-zinc-300 leading-relaxed">
              {post.blurb}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px] font-mono opacity-70">
              <span>{post.date}</span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded bg-white/10 px-1.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-amber-300 px-3 py-1.5 text-xs font-bold text-zinc-900 hover:bg-amber-200"
      >
        전체 블로그 보기 ↗
      </a>
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
