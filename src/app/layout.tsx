import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
        <noscript>
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "#0c0c1a",
              color: "#f1f1f3",
              fontFamily: "ui-monospace, monospace",
              padding: "24px",
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "32px",
                  color: "#ffcb52",
                  margin: "0 0 12px",
                }}
              >
                JavaScript required
              </h1>
              <p style={{ margin: "4px 0", color: "#aab" }}>
                Jell World is a 3D WebGL portfolio — please enable JavaScript to
                load the voxel scene.
              </p>
              <p style={{ margin: "12px 0", color: "#aab" }}>
                Or visit{" "}
                <a href="https://github.com/jellive" style={{ color: "#9cf" }}>
                  github.com/jellive
                </a>{" "}
                for a text bio.
              </p>
            </div>
          </div>
        </noscript>
        {children}
        <Script
          src="https://umami.jell.kr/script.js"
          data-website-id="f208ade9-555e-48ee-a607-52bd3451f0ea"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
