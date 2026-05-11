"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/gameStore";
import { setSoundEnabled } from "@/lib/audio";

const STORAGE_KEY = "jell-world:sound-consent";

export function SoundConsent() {
  const [open, setOpen] = useState(false);
  const toggleSound = useUIStore((s) => s.toggleSound);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === null) {
      setOpen(true);
    }
  }, []);

  function decide(accept: boolean) {
    if (accept) {
      toggleSound();
      void setSoundEnabled(true);
    }
    window.localStorage.setItem(STORAGE_KEY, accept ? "on" : "off");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm">
      <div className="w-[min(360px,92vw)] rounded-lg border border-white/10 bg-zinc-900/95 p-6 text-white shadow-2xl">
        <div className="text-xl font-bold mb-2">🎵 8-bit BGM</div>
        <div className="text-sm leading-relaxed text-zinc-300 mb-5">
          이 월드는 칩튠 BGM과 효과음으로 분위기를 살립니다. 켜시겠어요? 언제든
          좌상단 sound 버튼으로 토글할 수 있어요.
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => decide(true)}
            aria-label="사운드 켜기"
            className="flex-1 rounded bg-amber-300 px-3 py-2 text-sm font-bold text-zinc-900 hover:bg-amber-200"
          >
            켜기
          </button>
          <button
            type="button"
            onClick={() => decide(false)}
            aria-label="사운드 끄고 계속"
            className="flex-1 rounded bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20"
          >
            지금은 조용히
          </button>
        </div>
      </div>
    </div>
  );
}
