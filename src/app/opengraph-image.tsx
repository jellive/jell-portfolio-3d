import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jell World — 3D Voxel Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #ffc8a0 0%, #f4a87c 50%, #7ec850 100%)",
        fontFamily: "monospace",
        padding: 64,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "#1a3a14",
            letterSpacing: 8,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          JELL · WORLD
        </div>
        <div
          style={{
            fontSize: 88,
            color: "#fff",
            fontWeight: 900,
            textShadow: "4px 4px 0 #1a3a14",
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          3D Voxel Portfolio
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#1a3a14",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          walk · explore · interact
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 56,
          fontSize: 22,
          color: "#1a3a14",
          opacity: 0.75,
          fontWeight: 700,
        }}
      >
        jell-portfolio-3d.vercel.app
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 56,
          display: "flex",
          gap: 12,
        }}
      >
        {["#7ec850", "#54c5f8", "#5fa04e", "#2496ed", "#f59e0b"].map((c) => (
          <div
            key={c}
            style={{
              width: 32,
              height: 32,
              background: c,
              border: "3px solid #1a3a14",
            }}
          />
        ))}
      </div>
    </div>,
    size,
  );
}
