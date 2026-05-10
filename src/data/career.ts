export interface CareerEntry {
  id: string;
  year: number;
  company: string;
  role: string;
  stack: string;
  blurb: string;
  color: string;
  position: [number, number];
}

export const CAREER: CareerEntry[] = [
  {
    id: "2016",
    year: 2016,
    company: "케이라운지",
    role: "iOS Developer (연구원)",
    stack: "Swift · Objective-C · WebRTC",
    blurb:
      "첫 직장. KnowRecorder 교육 콘텐츠 앱 — Canvas 드로잉 + WebRTC 실시간 스트리밍.",
    color: "#38bdf8",
    position: [18, -2],
  },
  {
    id: "2018",
    year: 2018,
    company: "크레버스 (청담러닝)",
    role: "iOS · Android · Web Developer",
    stack: "Swift · Kotlin · Spring · Web",
    blurb:
      "IT팀 대리. 러닝포털 · i-Learning · 청담올림 3개 서비스 동시 개발. 크로스 플랫폼.",
    color: "#14b8a6",
    position: [18, -7],
  },
  {
    id: "2021",
    year: 2021,
    company: "비주얼신",
    role: "Web Main Developer (책임연구원)",
    stack: "TypeScript · Nuxt · Unity WebGL",
    blurb:
      "디지털 트윈 3D 스캔/편집 서비스. glinda AIMI 웹 에디터 메인 개발. CES 2023 혁신상.",
    color: "#a855f7",
    position: [18, -12],
  },
  {
    id: "2024",
    year: 2024,
    company: "애즈플로우",
    role: "Full-stack (수석연구원)",
    stack: "Next.js · NestJS · TypeORM · MySQL",
    blurb: "VC 투자 SaaS 풀스택. 펀드 · LP · 포트폴리오 관리 시스템.",
    color: "#e11d48",
    position: [18, -17],
  },
  {
    id: "2026",
    year: 2026,
    company: "디버스랩",
    role: "Full-stack Lead (예정)",
    stack: "AI 영상분석 · Next.js · Python",
    blurb: "AI 영상분석 SaaS 풀스택 리드. 입사 예정.",
    color: "#f59e0b",
    position: [18, -22],
  },
];
