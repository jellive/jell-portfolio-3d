"use client";

import { useState } from "react";

/**
 * Small share button: copies the current page URL to clipboard and shows
 * a "Copied!" toast for 1.5s. Falls back to a no-op when the API isn't
 * available (SSR, insecure context).
 */
export function CopyUrlButton() {
  const [toast, setToast] = useState(false);

  async function copy() {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast(true);
      setTimeout(() => setToast(false), 1500);
    } catch {
      /* clipboard blocked — silently ignore */
    }
  }

  function shareX() {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      "Check out Jell World — a 3D voxel portfolio",
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="pointer-events-auto absolute top-28 left-3 flex flex-col items-start gap-1">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur hover:bg-black/80"
        >
          copy URL
        </button>
        <button
          type="button"
          onClick={shareX}
          className="rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur hover:bg-black/80"
        >
          share to X
        </button>
      </div>
      {toast && (
        <div className="rounded-md bg-amber-300/95 px-2 py-1 font-mono text-[10px] text-zinc-900">
          Copied!
        </div>
      )}
    </div>
  );
}
