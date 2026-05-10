export interface ContactPoint {
  id: string;
  label: string;
  value: string;
  href: string;
  color: string;
  position: [number, number];
}

export const CONTACTS: ContactPoint[] = [
  {
    id: "github",
    label: "GitHub",
    value: "@jellive",
    href: "https://github.com/jellive",
    color: "#1f2937",
    position: [-4.5, -20],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Han Goon Yoo",
    href: "https://www.linkedin.com/in/han-goon-yoo-429980113/",
    color: "#0a66c2",
    position: [-1.5, -20],
  },
  {
    id: "email",
    label: "Email",
    value: "jellive7@gmail.com",
    href: "mailto:jellive7@gmail.com",
    color: "#dc2626",
    position: [1.5, -20],
  },
  {
    id: "blog",
    label: "Blog",
    value: "jellive.kr",
    href: "https://jellive.kr",
    color: "#3b82f6",
    position: [4.5, -20],
  },
];
