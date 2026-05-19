"use client";

import type { GhStats } from "@/lib/github";

export function GitHubStatsCard({ stats }: { stats: GhStats | null }) {
  if (!stats) return null;
  return (
    <a
      href="https://github.com/jellive"
      target="_blank"
      rel="noopener noreferrer"
      className="pointer-events-auto absolute top-[232px] right-3 rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur hover:bg-black/80"
    >
      <div className="font-bold tracking-widest text-amber-300">GITHUB</div>
      <div className="opacity-75 mt-1">@jellive</div>
      <div className="mt-1">
        repos <span className="text-amber-300">{stats.publicRepos}</span>
      </div>
      <div>
        followers <span className="text-amber-300">{stats.followers}</span>
      </div>
    </a>
  );
}
