"use client";

import { useEffect } from "react";

/**
 * Registers public/sw.js on mount. No-op on SSR / unsupported browsers.
 */
export function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* registration blocked — silently skip */
    });
  }, []);
  return null;
}
