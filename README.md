# Jell World — 3D Voxel Portfolio

A Minecraft-style voxel open world where you walk around and explore my skills, projects, and career as a developer.

> "URL 하나로 와 소리 나는 포트폴리오"

## Tech

- **Next.js 16** (App Router, SSG)
- **React Three Fiber** + **drei** + **rapier** (3D + physics)
- **Tailwind 4** + **Zustand** (UI + state)
- **WebAudio** chiptune (no mp3 deps)

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

## Roadmap

Phase 1 (✅ shipped): voxel terrain, WASD player + physics, Skill Garden, info panel, minimap, mobile touch, chiptune audio.

Phase 2 (✅ shipped): Career Timeline (5 milestones with sub-projects), Projects Park (17 projects), Contact Station (4 mailboxes incl. LinkedIn), pastel sky polish, deploy hardening.
