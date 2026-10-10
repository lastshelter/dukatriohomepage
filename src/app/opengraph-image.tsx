import { ImageResponse } from "next/og";

export const alt = "DukaTrio Systems Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.25) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top Header / Monogram */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              backgroundColor: "#18181b",
              border: "2px solid #06b6d4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "#22d3ee",
              }}
            >
              D
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#ffffff",
              }}
            >
              DUKATRIO
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#a1a1aa",
                letterSpacing: "3px",
              }}
            >
              SYSTEMS STUDIO
            </span>
          </div>
        </div>

        {/* Center / Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1050px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(6, 182, 212, 0.12)",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span
              style={{
                color: "#22d3ee",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              PRODUCTION ARCHITECTURE &amp; FULL-STACK ENGINEERING
            </span>
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Systems Engineering &amp; High-Performance Web Infrastructure
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Next.js Platforms · Astro SEO Portals · Real-Time Desks · Cloud-Native Backends
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            fontSize: "16px",
            color: "#71717a",
            borderTop: "1px solid #27272a",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span style={{ color: "#22d3ee" }}>Core-01 Systems Optimal</span>
          <span>·</span>
          <span>Next.js 16 Standalone</span>
          <span>·</span>
          <span>AES-256 GCM Security</span>
          <span>·</span>
          <span style={{ color: "#38bdf8" }}>dukatrio.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
