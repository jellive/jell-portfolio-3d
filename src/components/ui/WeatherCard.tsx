"use client";

import type { Weather } from "@/lib/weather";

export function WeatherCard({ data }: { data: Weather | null }) {
  if (!data) return null;
  return (
    <div className="pointer-events-none absolute top-3 left-[300px] rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur">
      <span className="text-amber-300">SEOUL</span>{" "}
      {Math.round(data.temperatureC)}°C {data.emoji}
    </div>
  );
}
