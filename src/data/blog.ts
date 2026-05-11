export interface BlogPost {
  id: string;
  title: string;
  blurb: string;
  date: string;
  tags: string[];
  url: string;
}

export interface BlogLibrary {
  id: string;
  name: string;
  url: string;
  posts: BlogPost[];
  position: [number, number];
}

export const BLOG: BlogLibrary = {
  id: "library",
  name: "Jell's Blog",
  url: "https://blog.jell.kr",
  position: [6, -15],
  posts: [
    {
      id: "flutter-bridge",
      title: "Flutter WebView Bridge 최적화: 3,341줄 코드 제거",
      blurb: "빈자리 앱 Bridge 리팩터링에서 얻은 Clean Architecture 인사이트.",
      date: "2025.01",
      tags: ["Flutter", "Clean Architecture", "WebView"],
      url: "https://blog.jell.kr",
    },
    {
      id: "lidar-finiroom",
      title: "LiDAR로 공간을 스캔하다: finiroom iOS 앱 개발기",
      blurb: "ARKit + LiDAR로 실내 공간 3D 모델링한 기술적 도전과 해결책.",
      date: "2024.06",
      tags: ["iOS", "ARKit", "LiDAR"],
      url: "https://blog.jell.kr",
    },
    {
      id: "tdd-1156",
      title: "TDD로 1,156개 테스트 작성하기",
      blurb: "RED-GREEN-REFACTOR 사이클을 500+ 시간 지켜온 경험.",
      date: "2024.12",
      tags: ["TDD", "Flutter", "Testing"],
      url: "https://blog.jell.kr",
    },
    {
      id: "unity-react-bridge",
      title: "Unity WebGL과 React 간 양방향 통신",
      blurb:
        "glinda AIMI 3D 쇼룸에서 JS ↔ Unity 0.1초 이내 통신을 달성한 방법.",
      date: "2023.08",
      tags: ["Unity", "WebGL", "React"],
      url: "https://blog.jell.kr",
    },
    {
      id: "next14-migration",
      title: "Next.js 14 App Router 마이그레이션 완전 가이드",
      blurb: "Pages Router → App Router 전환의 함정과 해결책.",
      date: "2024.03",
      tags: ["Next.js", "React", "TypeScript"],
      url: "https://blog.jell.kr",
    },
  ],
};
