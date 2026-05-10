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
    id: "2019",
    year: 2019,
    company: "크레버스",
    role: "Backend Engineer",
    stack: "Kotlin · Spring · MySQL",
    blurb: "첫 직장. 교육 도메인 레거시 API 개선과 신규 기능 개발.",
    color: "#6db33f",
    position: [18, -2],
  },
  {
    id: "2021",
    year: 2021,
    company: "네오플랫",
    role: "Mobile / Full-stack",
    stack: "Flutter · WebView · Node",
    blurb:
      "프롭테크 스타트업. Flutter WebView 기반 부동산 클라이언트 + 백엔드.",
    color: "#54c5f8",
    position: [18, -7],
  },
  {
    id: "2023",
    year: 2023,
    company: "디지털다임",
    role: "Frontend Lead",
    stack: "Vue 3 · React · TypeScript",
    blurb: "MICE 플랫폼 Vue3 마이그레이션 + React 신규 모듈 리드.",
    color: "#41b883",
    position: [18, -12],
  },
  {
    id: "2026",
    year: 2026,
    company: "Azflow",
    role: "Full-stack",
    stack: "NestJS · TypeORM · React",
    blurb: "VC/투자 플랫폼. 펀드/LP/포트폴리오 데이터 도메인 풀스택.",
    color: "#014a8f",
    position: [18, -17],
  },
];
