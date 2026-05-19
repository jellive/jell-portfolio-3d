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

  return (
    <div className="pointer-events-auto absolute top-28 left-3 flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={copy}
        className="rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur hover:bg-black/80"
      >
        copy URL
      </button>
      {toast && (
        <div className="rounded-md bg-amber-300/95 px-2 py-1 font-mono text-[10px] text-zinc-900">
          Copied!
        </div>
      )}
    </div>
  );
}
