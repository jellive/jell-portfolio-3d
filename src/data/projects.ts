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
    blurb: "Flutter 주간 위젯 플래너. WidgetKit 홈/잠금화면. App Store 출시.",
    url: "https://apps.apple.com/kr/app/wecanner/id6711342598",
    color: "#f59e0b",
    shape: "calendar",
    position: [-22, -12],
  },
  {
    id: "couple-planner",
    name: "Couple Planner",
    emoji: "💕",
    blurb: "Next.js 커플 일정 공유. Google Calendar 양방향 동기화 + Realtime.",
    url: "https://couple-planer.jell.kr",
    color: "#ec4899",
    shape: "heart",
    position: [-18, -12],
  },
  {
    id: "cookting",
    name: "냉장고를 부탁해",
    emoji: "🍅",
    blurb:
      "AI 요리 추천 모노레포. Flutter + NestJS + Next.js + AI 마이크로서비스.",
    url: "https://neangbu.jell.kr",
    color: "#dc2626",
    shape: "tomato",
    position: [-22, -8],
  },
  {
    id: "time-letter",
    name: "Time Letter",
    emoji: "💌",
    blurb: "타임캡슐 일기 앱. RN(Expo) + Next.js Turborepo. App Store 출시.",
    url: "https://apps.apple.com/kr/app/%EC%8B%9C%EA%B0%84%EC%9D%98-%ED%8E%B8%EC%A7%80/id6743721091",
    color: "#a78bfa",
    shape: "calendar",
    position: [-18, -8],
  },
  {
    id: "jellmodoro",
    name: "Jellmodoro",
    emoji: "🍅",
    blurb:
      "미니멀 포모도로 타이머. Swift → Flutter 풀스택 전환. App Store 출시.",
    url: "https://apps.apple.com/kr/app/jellmodoro/id6751464594",
    color: "#fb7185",
    shape: "tomato",
    position: [-22, -4],
  },
  {
    id: "dev-utils-hub",
    name: "Dev Utils Hub",
    emoji: "🛠",
    blurb: "Tauri + React 13개 도구 데스크톱 앱. Vitest 641 테스트.",
    color: "#7c3aed",
    shape: "gamepad",
    position: [-18, -4],
  },
  {
    id: "abroad-crawler",
    name: "Abroad Crawler",
    emoji: "🌍",
    blurb: "FastAPI + HTMX 해외 채용 크롤러. 12 sources, dual-network.",
    url: "https://abroad.jell.kr",
    color: "#0d9488",
    shape: "tent",
    position: [-22, 0],
  },
  {
    id: "jellhub",
    name: "JellHub",
    emoji: "🏠",
    blurb: "jell-server 통합 운영 대시보드. SSL 알림 + Telegram bot.",
    url: "https://hub.jell.kr",
    color: "#f97316",
    shape: "tent",
    position: [-18, 0],
  },
  {
    id: "threat-crawler",
    name: "threat-crawler",
    emoji: "🛡",
    blurb:
      "보안 위협 인텔리전스. 비동기 크롤러 + YARA/Sigma/DGA + Next.js 대시보드.",
    url: "https://threat.jell.kr",
    color: "#ef4444",
    shape: "tower",
    position: [-22, 4],
  },
  {
    id: "jellscan",
    name: "JellScan",
    emoji: "🔍",
    blurb: "OCR 문서 스캔 + LLM 후처리. Flutter + Next.js + NestJS Turborepo.",
    color: "#0ea5e9",
    shape: "tower",
    position: [-18, 4],
  },
  {
    id: "namu-arca-linker",
    name: "나무위키 아카라이브 링커",
    emoji: "🌳",
    blurb:
      "나무위키 실검 옆에 아카라이브 링크 자동 삽입 Chrome Extension (Manifest V3).",
    color: "#16a34a",
    shape: "calendar",
    position: [-22, 8],
  },
  {
    id: "hanwha-score",
    name: "한화 스코어 알림",
    emoji: "🦅",
    blurb:
      "KBO 한화 이글스 실시간 스코어 Chrome 뱃지 + 알림. MV3 + Service Worker.",
    color: "#f59e0b",
    shape: "tower",
    position: [-18, 8],
  },
  {
    id: "chzzk-obs",
    name: "Chzzk OBS Connector",
    emoji: "📺",
    blurb: "치지직 채팅 + 후원 OBS 오버레이 + TTS 실시간 알림.",
    color: "#22c55e",
    shape: "tower",
    position: [-22, 12],
  },
  {
    id: "cert-sync-manager",
    name: "Cert Sync Manager",
    emoji: "🔐",
    blurb: "Let's Encrypt 와일드카드 인증서 자동 발급 + SSH 다중 서버 배포.",
    color: "#64748b",
    shape: "tower",
    position: [-18, 12],
  },
  {
    id: "jell-utils",
    name: "jell-utils.js",
    emoji: "📦",
    blurb: "JS/TS 유틸 함수 라이브러리. npm 레지스트리 v0.2.0 공개.",
    url: "https://www.npmjs.com/package/jell-utils.js",
    color: "#fbbf24",
    shape: "tower",
    position: [-22, 16],
  },
  {
    id: "vinjari",
    name: "빈자리 (Vinjari)",
    emoji: "🏕",
    blurb:
      "캠핑장 예약 플랫폼 하이브리드 앱. Native-Web Bridge + 1,156 테스트.",
    color: "#84cc16",
    shape: "tent",
    position: [-18, 16],
  },
  {
    id: "app-promote",
    name: "jell.kr (app-promote)",
    emoji: "🌐",
    blurb:
      "Next.js 14 포트폴리오 메타 사이트. 23 프로젝트 + 이력서 + 블로그 통합.",
    url: "https://jell.kr",
    color: "#8b5cf6",
    shape: "tower",
    position: [-20, 20],
  },
];
