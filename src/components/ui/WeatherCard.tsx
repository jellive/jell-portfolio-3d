"use client";

import type { Weather } from "@/lib/weather";

export function WeatherCard({ data }: { data: Weather | null }) {
  if (!data) return null;
  return (
    <div className="pointer-events-none absolute top-3 left-[300px] rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur">
      <div>
        <span className="text-amber-300">SEOUL</span>{" "}
        {Math.round(data.temperatureC)}°C {data.emoji}
      </div>
      {data.sunrise && data.sunset ? (
        <div className="opacity-75 mt-0.5 text-[10px]">
          🌅 {data.sunrise} · 🌇 {data.sunset}
        </div>
      ) : null}
    </div>
  );
}
