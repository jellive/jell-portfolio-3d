"use client";

const REPO = "https://github.com/jellive/jell-portfolio-3d";

export function GithubFooter() {
  return (
    <a
      href={REPO}
      target="_blank"
      rel="noopener noreferrer"
      className="pointer-events-auto absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur hover:bg-black/80 hover:text-white"
    >
      view on github
    </a>
  );
}
