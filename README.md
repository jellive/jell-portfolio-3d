# Jell World — 3D Voxel Portfolio

A Minecraft-style voxel open world where you walk around and explore Jell's skills, projects, and career as a developer.

> "URL 하나로 와 소리 나는 포트폴리오"

Live: <https://jell-portfolio-3d.vercel.app> (`app.jell.kr` mirrors via DNS).
Arcade embed: arcade.jell.kr is iframed via CSP `frame-ancestors`.

## Tech

- **Next.js 16** (App Router, SSG, server-side fetch with ISR)
- **React Three Fiber** + **drei** + **rapier** (3D + physics)
- **Tailwind 4** + **Zustand** (UI + state)
- **WebAudio** chiptune (no mp3 deps)

## HUD widgets

| Slot                   | Widget              | Source                                                                            |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------- |
| top-left primary       | JELL WORLD position | `HUD.tsx`                                                                         |
| top-left + sound btn   | Sound toggle        | `HUD.tsx`                                                                         |
| top-left next          | KST clock (HH:MM)   | `KstClock.tsx` — `Intl.DateTimeFormat(timeZone: "Asia/Seoul")` 60s polling        |
| top-left further       | Seoul weather       | `WeatherCard.tsx` — Open-Meteo `temperature_2m` + WMO emoji, 1h ISR               |
| top-left (under sound) | Copy URL            | `CopyUrlButton.tsx` — `navigator.clipboard.writeText(location.href)` + 1.5s toast |
| top-right              | Minimap             | `Minimap.tsx`                                                                     |
| top-right under it     | GitHub stats card   | `GitHubStatsCard.tsx` — `api.github.com/users/jellive`, 1h ISR                    |
| top-right further      | Visitor counter     | `VisitorCounter.tsx` — localStorage `jell-world:visits`, pulsing live dot         |
| bottom-left            | WASD/SPACE/E hint   | `HUD.tsx`                                                                         |
| bottom-right           | FPS counter         | `FpsHud.tsx` — only when `?fps=1` or `NODE_ENV=development`                       |
| centered dialog        | SoundConsent KO/EN  | `SoundConsent.tsx` — KO copy when `navigator.language` starts with `ko-`          |

## Run locally

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm build && pnpm start
```

## Controls

- **WASD** / arrow keys — move
- **Space** — jump
- **E** / Enter — interact with nearby zone (skill / career / project / contact)
- **Esc** — close panel
- Mobile: virtual joystick + JUMP / E buttons appear automatically

## Server-side data flow

`src/app/page.tsx` runs `Promise.all([fetchGithubStats("jellive"), fetchSeoulWeather()])` server-side. Both libs use `next: { revalidate: 3600 }` so the page is cached for 1 hour and re-fetches on demand. Failures degrade silently (the widget renders nothing instead of breaking the page).

## Roadmap

Phase 1 (✅ shipped): voxel terrain, WASD player + physics, Skill Garden, info panel, minimap, mobile touch, chiptune audio.

Phase 2 (✅ shipped): Career Timeline (4 milestones with sub-projects), Projects Park (17 projects), Contact Station (4 mailboxes incl. LinkedIn), pastel sky polish, deploy hardening.

Phase 3 (✅ shipped, polish-batch): GitHub stats card, KST clock, Seoul weather widget, multilingual SoundConsent, FPS HUD, Copy URL button + toast, Visitor counter with live pulse dot. See the corresponding sub-tasks in the [jell-arcade S → AH polish history](https://github.com/jellive/jell-arcade#polish-history).
