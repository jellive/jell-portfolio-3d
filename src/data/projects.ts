export interface Project {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  url?: string;
  color: string;
  shape: "tent" | "heart" | "tomato" | "tower" | "calendar" | "gamepad";
  position: [number, number];
}

export const PROJECTS: Project[] = [
  {
    id: "wecanner",
    name: "Wecanner",
    emoji: "📅",
    blurb: "Flutter 주간 위젯 플래너. App Store + Play Store 출시.",
    color: "#f59e0b",
    shape: "calendar",
    position: [-18, -2],
  },
  {
    id: "couple-planner",
    name: "Couple Planner",
    emoji: "💕",
    blurb: "Next.js 커플 일정 공유. Google Calendar 양방향 동기화.",
    color: "#ec4899",
    shape: "heart",
    position: [-18, 4],
  },
  {
    id: "cookting",
    name: "냉장고를 부탁해",
    emoji: "🍅",
    blurb: "AI 요리 추천 모노레포. Next.js + NestJS + AI 서버.",
    color: "#dc2626",
    shape: "tomato",
    position: [-18, 10],
  },
  {
    id: "jell-watch",
    name: "Jell Watch",
    emoji: "⌚",
    blurb: "Apple Watch 컴플리케이션 — 시간 + 컨텍스트 정보.",
    color: "#94a3b8",
    shape: "tower",
    position: [-12, -2],
  },
  {
    id: "abroad-crawler",
    name: "Abroad Crawler",
    emoji: "🌍",
    blurb: "FastAPI + HTMX 해외 채용 크롤러. 12 sources, dual-network.",
    color: "#0d9488",
    shape: "tent",
    position: [-12, 4],
  },
  {
    id: "dev-utils-hub",
    name: "Dev Utils Hub",
    emoji: "🛠",
    blurb: "Tauri + React 13 도구 모음 데스크톱 앱.",
    color: "#7c3aed",
    shape: "gamepad",
    position: [-12, 10],
  },
];
