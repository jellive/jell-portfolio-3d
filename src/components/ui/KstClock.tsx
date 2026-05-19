"use client";

import { useEffect, useState } from "react";

export function KstClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(fmt.format(new Date()));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <div className="pointer-events-none absolute top-3 left-[200px] rounded-md bg-black/60 px-3 py-2 font-mono text-xs text-white backdrop-blur">
      <span className="text-amber-300">KST</span> {time}
    </div>
  );
}
