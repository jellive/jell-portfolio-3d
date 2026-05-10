"use client";

import { useEffect, useRef, useState } from "react";
import { useMobileInputStore } from "@/stores/mobileStore";

const STICK_RADIUS = 56;
const THUMB_RADIUS = 24;

function dispatchKey(code: string, type: "keydown" | "keyup") {
  window.dispatchEvent(new KeyboardEvent(type, { code }));
}

function Joystick() {
  const baseRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ x: 0, y: 0 });
  const setAxes = useMobileInputStore((s) => s.setAxes);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;

    function getCenter() {
      const rect = el!.getBoundingClientRect();
      return {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
    }

    function onPointerDown(e: PointerEvent) {
      if (pointerIdRef.current !== null) return;
      pointerIdRef.current = e.pointerId;
      el!.setPointerCapture(e.pointerId);
      update(e);
    }

    function update(e: PointerEvent) {
      if (pointerIdRef.current !== e.pointerId) return;
      const { cx, cy } = getCenter();
      let dx = e.clientX - cx;
      let dy = e.clientY - cy;
      const len = Math.hypot(dx, dy);
      if (len > STICK_RADIUS) {
        dx = (dx / len) * STICK_RADIUS;
        dy = (dy / len) * STICK_RADIUS;
      }
      setThumb({ x: dx, y: dy });
      setAxes(dx / STICK_RADIUS, dy / STICK_RADIUS);
    }

    function onPointerMove(e: PointerEvent) {
      update(e);
    }

    function onPointerUp(e: PointerEvent) {
      if (pointerIdRef.current !== e.pointerId) return;
      pointerIdRef.current = null;
      try {
        el!.releasePointerCapture(e.pointerId);
      } catch {}
      setThumb({ x: 0, y: 0 });
      setAxes(0, 0);
    }

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [setAxes]);

  return (
    <div
      ref={baseRef}
      className="pointer-events-auto absolute bottom-6 left-6 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur"
      style={{
        width: STICK_RADIUS * 2,
        height: STICK_RADIUS * 2,
        touchAction: "none",
      }}
    >
      <div
        className="absolute rounded-full border-2 border-white/60 bg-white/40"
        style={{
          width: THUMB_RADIUS * 2,
          height: THUMB_RADIUS * 2,
          left: STICK_RADIUS - THUMB_RADIUS + thumb.x,
          top: STICK_RADIUS - THUMB_RADIUS + thumb.y,
          transition: pointerCapture(thumb) ? "none" : "all 80ms ease-out",
        }}
      />
    </div>
  );
}

function pointerCapture(thumb: { x: number; y: number }): boolean {
  return thumb.x !== 0 || thumb.y !== 0;
}

function ActionButton({
  label,
  className,
  onPressDown,
  onPressUp,
  onTap,
}: {
  label: string;
  className: string;
  onPressDown?: () => void;
  onPressUp?: () => void;
  onTap?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function down(e: PointerEvent) {
      e.preventDefault();
      el!.setPointerCapture(e.pointerId);
      onPressDown?.();
      onTap?.();
    }
    function up(e: PointerEvent) {
      try {
        el!.releasePointerCapture(e.pointerId);
      } catch {}
      onPressUp?.();
    }
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [onPressDown, onPressUp, onTap]);

  return (
    <button
      ref={ref}
      type="button"
      className={`pointer-events-auto rounded-full border-2 border-white/40 bg-white/20 font-mono text-base font-bold text-white backdrop-blur active:bg-white/40 ${className}`}
      style={{ touchAction: "none" }}
    >
      {label}
    </button>
  );
}

export function MobileControls() {
  const setJump = useMobileInputStore((s) => s.setJump);

  return (
    <div className="pointer-events-none absolute inset-0">
      <Joystick />
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 items-end">
        <ActionButton
          label="E"
          className="w-14 h-14"
          onTap={() => {
            dispatchKey("KeyE", "keydown");
            setTimeout(() => dispatchKey("KeyE", "keyup"), 60);
          }}
        />
        <ActionButton
          label="JUMP"
          className="w-20 h-20 text-sm"
          onPressDown={() => setJump(true)}
          onPressUp={() => setJump(false)}
        />
      </div>
    </div>
  );
}
