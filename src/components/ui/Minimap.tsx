"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/stores/gameStore";
import { CATEGORY_META, SKILLS, type SkillCategory } from "@/data/skills";

const SIZE = 168;
const WORLD_HALF = 24;
const SCALE = SIZE / (WORLD_HALF * 2);

interface ZoneDot {
  pos: [number, number];
  color: string;
  label: string;
}

const ZONE_DOTS: ZoneDot[] = [
  { pos: [0, -3], color: "#c9b88f", label: "H" },
  { pos: [0, -18], color: "#cd5c5c", label: "C" },
  { pos: [18, 18], color: "#4a7fc1", label: "P" },
  { pos: [-18, -18], color: "#7c4a8d", label: "B" },
  { pos: [18, -18], color: "#3a8a6f", label: "M" },
];

const CATEGORY_COLOR: Record<SkillCategory, string> = {
  frontend: "#61dafb",
  mobile: "#54c5f8",
  backend: "#5fa04e",
  devops: "#2496ed",
  ai: "#f59e0b",
};

function worldToMap(wx: number, wz: number): [number, number] {
  return [SIZE / 2 + wx * SCALE, SIZE / 2 + wz * SCALE];
}

export function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    function draw() {
      if (!ctx) return;

      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.fillStyle = "#1a2a1d";
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 8; i++) {
        const p = (SIZE / 8) * i;
        ctx.beginPath();
        ctx.moveTo(p, 0);
        ctx.lineTo(p, SIZE);
        ctx.moveTo(0, p);
        ctx.lineTo(SIZE, p);
        ctx.stroke();
      }

      ctx.fillStyle = "#3b6f3a";
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE * 0.45, 0, Math.PI * 2);
      ctx.fill();

      for (const z of ZONE_DOTS) {
        const [mx, my] = worldToMap(z.pos[0], z.pos[1]);
        ctx.fillStyle = z.color;
        ctx.fillRect(mx - 5, my - 5, 10, 10);
        ctx.fillStyle = "#000";
        ctx.font = "bold 8px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(z.label, mx, my + 0.5);
      }

      const nearby = useGameStore.getState().nearbyInteractable;
      for (const s of SKILLS) {
        const [mx, my] = worldToMap(s.position[0], s.position[1]);
        ctx.fillStyle = CATEGORY_COLOR[s.category];
        const r = nearby === s.id ? 3.5 : 2;
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const [px, , pz] = useGameStore.getState().position;
      const heading = useGameStore.getState().heading;
      const [mx, my] = worldToMap(px, pz);

      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(-heading);
      ctx.fillStyle = "#ffe066";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(5, 5);
      ctx.lineTo(0, 2);
      ctx.lineTo(-5, 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, SIZE - 1, SIZE - 1);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "bold 9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("N", SIZE / 2 - 3, 4);

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="pointer-events-none absolute top-3 right-3 rounded-md border border-white/15 bg-black/60 p-1 shadow-lg backdrop-blur">
      <canvas ref={canvasRef} aria-label="minimap" />
      <div className="mt-1 flex flex-wrap gap-1 px-1 pb-0.5 text-[8px] font-mono">
        {(Object.keys(CATEGORY_META) as SkillCategory[]).map((c) => (
          <span key={c} className="flex items-center gap-1 opacity-80">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: CATEGORY_COLOR[c] }}
            />
            {CATEGORY_META[c].label.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
