"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "jell-world:visits";

/**
 * 방문 수는 localStorage 라는 **외부 저장소**에 있다. 증가는 커밋된 마운트에서 한 번
 * 내리는 명령이고, 화면은 그 저장소를 구독해 읽는다.
 *
 * 예전에는 effect 안에서 곧바로 setCount 를 했는데 그게 마운트 직후 캐스케이딩 렌더를
 * 만들어 react-hooks/set-state-in-effect 에 걸렸다. 증가는 부작용이라 렌더 단계로
 * 옮길 수 없으므로(getSnapshot 은 순수해야 한다), 저장소 모델을 그대로 코드에 옮겼다.
 */
function createVisitStore() {
  let snapshot: number | null = null;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => null,
    /** 저장소를 한 칸 올리고 그 값을 공개한다. 실패하면 아무것도 안 바꾼다(카운터가 안 뜬다). */
    increment() {
      try {
        const prev = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
        const next = (Number.isFinite(prev) ? prev : 0) + 1;
        window.localStorage.setItem(STORAGE_KEY, String(next));
        snapshot = next;
        listeners.forEach((listener) => listener());
      } catch {
        /* localStorage blocked — silently skip */
      }
    },
  };
}

/**
 * localStorage-backed personal visit counter. Increments on every mount
 * and renders below the GitHub stats card. Empty until hydrated so SSR
 * stays clean.
 */
export function VisitorCounter() {
  // 컴포넌트 인스턴스마다 하나. 모듈 스코프에 두면 진짜 remount 에서 안 오르고
  // 인스턴스가 둘일 때 한 번만 오른다 — 지금 의미(마운트마다 +1)와 달라진다.
  const [store] = useState(createVisitStore);
  const count = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  // StrictMode(개발)는 setup -> cleanup -> setup 으로 두 번 부른다. 예전 코드는 그때
  // 실제로 2가 올라갔다(개발에서만). ref 가드로 커밋된 마운트당 한 번으로 맞춘다.
  const incremented = useRef(false);
  useEffect(() => {
    if (incremented.current) return;
    incremented.current = true;
    store.increment();
  }, [store]);

  if (count === null) return null;
  return (
    <div className="pointer-events-none absolute top-[315px] right-3 flex items-center gap-1.5 rounded-md bg-black/60 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
      </span>
      visits <span className="text-amber-300">{count}</span>
    </div>
  );
}
