import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jell World — 3D Voxel Portfolio",
  description: "Explore Jell's portfolio in a Minecraft-style voxel world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-black text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
