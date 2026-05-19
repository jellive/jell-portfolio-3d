"use client";

const REPO = "https://github.com/jellive/jell-portfolio-3d";
const LINKEDIN = "https://www.linkedin.com/in/han-goon-yoo-429980113/";

export function GithubFooter() {
  return (
    <div className="pointer-events-auto absolute bottom-20 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      <a
        href={REPO}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-black/60 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur hover:bg-black/80 hover:text-white"
      >
        view on github
      </a>
      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-black/60 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur hover:bg-black/80 hover:text-white"
      >
        linkedin
      </a>
    </div>
  );
}
