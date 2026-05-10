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
    position: [-3, -20],
  },
  {
    id: "email",
    label: "Email",
    value: "jellive7@gmail.com",
    href: "mailto:jellive7@gmail.com",
    color: "#dc2626",
    position: [0, -20],
  },
  {
    id: "blog",
    label: "Blog",
    value: "jellive.kr",
    href: "https://jellive.kr",
    color: "#3b82f6",
    position: [3, -20],
  },
];
