"use client";

import { useState } from "react";
import { useUIStore } from "@/stores/gameStore";
import { setSoundEnabled } from "@/lib/audio";
import { useHydrated } from "@/lib/useHydrated";

const STORAGE_KEY = "jell-world:sound-consent";

type Copy = {
  title: string;
  body: string;
  yes: string;
  no: string;
};

const COPY_KO: Copy = {
  title: "🎵 8-bit BGM",
  body: "이 월드는 칩튠 BGM과 효과음으로 분위기를 살립니다. 켜시겠어요? 언제든 좌상단 sound 버튼으로 토글할 수 있어요.",
  yes: "켜기",
  no: "지금은 조용히",
};

const COPY_EN: Copy = {
  title: "🎵 8-bit BGM",
  body: "This world has chiptune BGM and SFX for atmosphere. Want sound on? You can toggle it any time from the top-left sound button.",
  yes: "Turn on",
  no: "Stay silent",
};

export function SoundConsent() {
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);
  const toggleSound = useUIStore((s) => s.toggleSound);

  // 첫 렌더에서 한 번만 읽는다. hydrated 가 false 인 동안은 화면에 안 쓰이므로
  // 서버가 그린 것(아무것도 없음)과 하이드레이션 첫 렌더가 어긋나지 않는다.
  // 스토리지가 막힌 브라우저는 "이미 정했다"로 본다 — 저장을 못 하니 물어봐야 매번 다시 묻게 된다.
  const [needsConsent] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) === null;
    } catch {
      return false;
    }
  });

  // 예전에는 effect 안에서 setCopy/setOpen 을 했다(react-hooks/set-state-in-effect).
  // 둘 다 순수 읽기라 렌더 단계에서 파생하면 상태가 필요 없다.
  const copy: Copy =
    hydrated && (navigator.language || "").toLowerCase().startsWith("ko")
      ? COPY_KO
      : COPY_EN;
  const open = hydrated && needsConsent && !dismissed;

  function decide(accept: boolean) {
    if (accept) {
      toggleSound();
      void setSoundEnabled(true);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, accept ? "on" : "off");
    } catch {
      // 저장이 막혀도 이번 선택은 존중한다 — 모달이 남아 있는 것이 더 나쁘다.
    }
    setDismissed(true);
  }

  if (!open) return null;

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm">
      <div className="w-[min(360px,92vw)] rounded-lg border border-white/10 bg-zinc-900/95 p-6 text-white shadow-2xl">
        <div className="text-xl font-bold mb-2">{copy.title}</div>
        <div className="text-sm leading-relaxed text-zinc-300 mb-5">
          {copy.body}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => decide(true)}
            className="flex-1 rounded bg-amber-300 px-3 py-2 text-sm font-bold text-zinc-900 hover:bg-amber-200"
          >
            {copy.yes}
          </button>
          <button
            type="button"
            onClick={() => decide(false)}
            className="flex-1 rounded bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20"
          >
            {copy.no}
          </button>
        </div>
      </div>
    </div>
  );
}
