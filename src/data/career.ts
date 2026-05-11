export interface CareerSubProject {
  name: string;
  blurb: string;
}

export interface CareerEntry {
  id: string;
  year: number;
  company: string;
  role: string;
  stack: string;
  blurb: string;
  color: string;
  position: [number, number];
  subProjects?: CareerSubProject[];
}

export const CAREER: CareerEntry[] = [
  {
    id: "2016",
    year: 2016,
    company: "클라운지",
    role: "iOS Developer (연구원)",
    stack: "Swift · Objective-C · WebRTC",
    blurb:
      "첫 직장. 교육 콘텐츠 분야에서 iOS 개발 시작. Canvas/WebRTC 인터랙션 시스템.",
    color: "#38bdf8",
    position: [18, -2],
    subProjects: [
      {
        name: "KnowRecorder",
        blurb: "PDF + 음성 + 드로잉 녹화 교육 앱. iOS App Store 출시.",
      },
      {
        name: "KnowLounge",
        blurb: "WebRTC 실시간 화상수업 + 동기화 화이트보드 플랫폼.",
      },
      {
        name: "Gotalk",
        blurb: "WebRTC 1:1 / 다대다 영상통화 + 화면공유 + 채팅.",
      },
      {
        name: "ALO",
        blurb: "클라운지 시절 개발한 추가 교육 서비스.",
      },
    ],
  },
  {
    id: "2018",
    year: 2018,
    company: "크레버스 (청담러닝)",
    role: "iOS · Android · Web Developer",
    stack: "Swift · Kotlin · Spring · Web",
    blurb:
      "IT팀 대리. 3개 서비스 동시 개발. 520명 규모 기업 협업 프로세스 체득.",
    color: "#14b8a6",
    position: [18, -7],
    subProjects: [
      {
        name: "러닝포털 / i-Learning / 청담올림",
        blurb:
          "청담어학원 학생·학부모 종합 교육 플랫폼. Web + Android + iOS 네이티브 웹앱 동시 운영.",
      },
    ],
  },
  {
    id: "2021",
    year: 2021,
    company: "비주얼신",
    role: "Web Main Developer (책임연구원)",
    stack: "TypeScript · Nuxt · Unity WebGL",
    blurb:
      "디지털 트윈 3D 스캔/편집 서비스. CTO와 2인팀으로 매주 기술 방향 토론.",
    color: "#a855f7",
    position: [18, -12],
    subProjects: [
      {
        name: "finiroom",
        blurb:
          "iPhone LiDAR 공간 3D 모델링 + AR 가구 배치. iOS App Store 출시.",
      },
      {
        name: "glinda AIMI",
        blurb:
          "Unity WebGL 3D 웹 에디터. TS-Unity 양방향 통신. CES 2023 혁신상.",
      },
    ],
  },
  {
    id: "2024",
    year: 2024,
    company: "애즈플로우",
    role: "Full-stack (수석연구원)",
    stack: "Next.js · NestJS · TypeORM · MySQL",
    blurb:
      "VC 투자 SaaS 풀스택. 6명 스타트업에서 풀스택 성장. RAG 기반 지능형 검색 구축.",
    color: "#e11d48",
    position: [18, -17],
    subProjects: [
      {
        name: "AZFlow",
        blurb:
          "투자사·스타트업 분리 서비스. 펀드·LP·포트폴리오 + IR 문서 + RAG 검색.",
      },
    ],
  },
  // {
  //   id: "2026",
  //   year: 2026,
  //   company: "디버스랩",
  //   role: "Full-stack Lead (예정)",
  //   stack: "AI 영상분석 · Next.js · Python",
  //   blurb: "AI 영상분석 SaaS 풀스택 리드. 입사 예정.",
  //   color: "#f59e0b",
  //   position: [18, -22],
  // },
];
