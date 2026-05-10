export type SkillCategory = "frontend" | "mobile" | "backend" | "devops" | "ai";

export interface Skill {
  id: string;
  label: string;
  category: SkillCategory;
  level: 1 | 2 | 3;
  color: string;
  blurb: string;
  position: [number, number];
}

export const CATEGORY_META: Record<
  SkillCategory,
  { label: string; emoji: string; anchor: [number, number] }
> = {
  frontend: { label: "Frontend", emoji: "🌳", anchor: [-12, -10] },
  mobile: { label: "Mobile", emoji: "🌲", anchor: [-12, 6] },
  backend: { label: "Backend", emoji: "🌴", anchor: [12, -10] },
  devops: { label: "DevOps", emoji: "🍄", anchor: [12, 6] },
  ai: { label: "AI & Tools", emoji: "🌻", anchor: [0, 14] },
};

export const SKILLS: Skill[] = [
  {
    id: "react",
    label: "React / Next.js",
    category: "frontend",
    level: 3,
    color: "#61dafb",
    blurb: "Cookting · Couple Planner · Dev Utils Hub · app-promote.",
    position: [-12, -10],
  },
  {
    id: "typescript",
    label: "TypeScript",
    category: "frontend",
    level: 3,
    color: "#3178c6",
    blurb: "Daily driver — strict mode across all web projects.",
    position: [-14, -8],
  },
  {
    id: "vue",
    label: "Vue.js / Nuxt",
    category: "frontend",
    level: 2,
    color: "#41b883",
    blurb: "청담러닝(크레버스) 교육 플랫폼 + 비주얼신 Nuxt 3D 웹 에디터.",
    position: [-10, -8],
  },
  {
    id: "tailwind",
    label: "Tailwind",
    category: "frontend",
    level: 3,
    color: "#38bdf8",
    blurb: "Design system glue across every web project.",
    position: [-13, -12],
  },

  {
    id: "flutter",
    label: "Flutter",
    category: "mobile",
    level: 3,
    color: "#54c5f8",
    blurb: "Wecanner — App Store + Play Store shipped.",
    position: [-12, 6],
  },
  {
    id: "react-native",
    label: "React Native",
    category: "mobile",
    level: 2,
    color: "#61dafb",
    blurb: "Time Letter (Expo + EAS Update + Sentry). App Store 출시.",
    position: [-14, 8],
  },
  {
    id: "swift",
    label: "Swift / iOS",
    category: "mobile",
    level: 2,
    color: "#fa7343",
    blurb: "WidgetKit, ATS, App Store submission flow.",
    position: [-10, 8],
  },
  {
    id: "kotlin",
    label: "Kotlin / Android",
    category: "mobile",
    level: 2,
    color: "#7f52ff",
    blurb: "크레버스 Android 클라이언트 (러닝포털) + Wecanner WebView.",
    position: [-13, 4],
  },

  {
    id: "node",
    label: "Node / NestJS",
    category: "backend",
    level: 3,
    color: "#5fa04e",
    blurb: "Azflow VC platform — TypeORM + MySQL.",
    position: [12, -10],
  },
  {
    id: "spring",
    label: "Java · Kotlin / Spring",
    category: "backend",
    level: 2,
    color: "#6db33f",
    blurb: "크레버스 백엔드 — 러닝포털·i-Learning·청담올림 운영.",
    position: [14, -8],
  },
  {
    id: "fastapi",
    label: "Python / FastAPI",
    category: "backend",
    level: 2,
    color: "#009688",
    blurb: "abroad-crawler — 12 sources, dual-network nginx.",
    position: [10, -8],
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    category: "backend",
    level: 3,
    color: "#336791",
    blurb: "Supabase + jell-server unified instance.",
    position: [13, -12],
  },

  {
    id: "docker",
    label: "Docker",
    category: "devops",
    level: 3,
    color: "#2496ed",
    blurb: "29-container jell-server + private registry.",
    position: [12, 6],
  },
  {
    id: "github-actions",
    label: "GitHub Actions",
    category: "devops",
    level: 3,
    color: "#2088ff",
    blurb: "8-layer CI cascade survival skills.",
    position: [14, 8],
  },
  {
    id: "vercel",
    label: "Vercel",
    category: "devops",
    level: 3,
    color: "#ffffff",
    blurb: "Most jell.kr web apps ship here.",
    position: [10, 8],
  },
  {
    id: "nginx",
    label: "Nginx + certbot",
    category: "devops",
    level: 2,
    color: "#009639",
    blurb: "Reverse proxy + SSL across jell-server.",
    position: [13, 4],
  },

  {
    id: "claude",
    label: "Claude Code",
    category: "ai",
    level: 3,
    color: "#d97706",
    blurb: "Daily harness — TDD pair programmer.",
    position: [0, 14],
  },
  {
    id: "cursor",
    label: "Cursor",
    category: "ai",
    level: 3,
    color: "#22d3ee",
    blurb: "Background generation + agent loops.",
    position: [-2, 16],
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    category: "ai",
    level: 2,
    color: "#a78bfa",
    blurb: "Inline completions for boilerplate.",
    position: [2, 16],
  },
];
