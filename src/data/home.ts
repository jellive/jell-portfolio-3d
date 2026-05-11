export interface HomeIntro {
  id: string;
  name: string;
  alternateName: string;
  role: string;
  tagline: string;
  blurb: string;
  status: string;
}

export const HOME_INTRO: HomeIntro = {
  id: "intro",
  name: "유한군",
  alternateName: "Jell",
  role: "Full-Stack Developer",
  tagline: "8년+ 경력 · iOS/Flutter · React/Next.js · NestJS/Spring",
  blurb:
    "이 월드는 제 개발자 포트폴리오입니다. 동쪽으로 가면 경력, 서쪽으로 프로젝트 17개, 북쪽 우체국에서 연락처를 볼 수 있어요. 주변 식물·건물 가까이 가면 E로 상세 정보가 열립니다.",
  status: "OPEN TO WORK",
};

export const HOME_POSITION: [number, number] = [0, -3];
