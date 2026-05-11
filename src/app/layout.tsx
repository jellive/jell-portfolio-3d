import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://jell-portfolio-3d.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jell World — 3D Voxel Portfolio",
  description:
    "Walk a voxel world to explore Jell's skills, career, and projects. Built with Next.js, React Three Fiber, and Rapier.",
  keywords: [
    "portfolio",
    "voxel",
    "three.js",
    "react three fiber",
    "next.js",
    "developer portfolio",
    "Jell",
  ],
  authors: [{ name: "Jell", url: "https://github.com/jellive" }],
  openGraph: {
    type: "website",
    siteName: "Jell World",
    title: "Jell World — 3D Voxel Portfolio",
    description:
      "Walk a voxel world to explore Jell's skills, career, and projects.",
    url: SITE_URL,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jell World — 3D Voxel Portfolio",
    description:
      "Walk a voxel world to explore Jell's skills, career, and projects.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffc8a0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full bg-[#ffc8a0] text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
