import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title =
      searchParams.get("title") ||
      "Bespoke B2B Platforms & Custom Portals";
    const blueprint =
      searchParams.get("blueprint") ||
      "DUKATRIO ENGINEERING STUDIO // 10–14 DAY SPRINT";
    const badge = searchParams.get("badge") || "€4,800 FLAT · 100% IP HANDOVER";
    const metric =
      searchParams.get("metric") || "Sub-300ms TTFB · Dedicated European Cloud";

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
            backgroundColor: "#030712",
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(34, 211, 238, 0.18) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(99, 102, 241, 0.22) 0%, transparent 55%)",
            padding: "70px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Top Brand Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: "#0B0F17",
                  border: "2px solid #22d3ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)",
                }}
              >
                <span
                  style={{
                    fontSize: "30px",
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
                    fontSize: "26px",
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                    color: "#ffffff",
                  }}
                >
                  DukaTrio
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#94a3b8",
                    letterSpacing: "2.5px",
                  }}
                >
                  SYSTEMS ARCHITECTURE DESK
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(34, 211, 238, 0.12)",
                border: "1px solid rgba(34, 211, 238, 0.35)",
              }}
            >
              <span
                style={{
                  color: "#22d3ee",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                {badge}
              </span>
            </div>
          </div>

          {/* Main Title / Blueprint Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "1040px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                color: "#2dd4bf",
                fontFamily: "monospace",
                letterSpacing: "2px",
                fontWeight: 700,
              }}
            >
              {blueprint}
            </span>

            <h1
              style={{
                fontSize: "52px",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                margin: 0,
                color: "#ffffff",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Next.js 16 · PostgreSQL · Caddy TLS 1.3 · Zero Recurring SaaS Seat Rent
            </p>
          </div>

          {/* Bottom Telemetry Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "15px",
              color: "#64748b",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <span style={{ color: "#34d399", fontWeight: 700 }}>
                ● {metric}
              </span>
              <span>·</span>
              <span style={{ color: "#cbd5e1" }}>Dedicated Hetzner VPS</span>
            </div>
            <span style={{ color: "#22d3ee", fontWeight: 700 }}>
              https://dukatrio.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "OG Image generation error";
    return new Response(`Failed to generate OG image: ${errorMsg}`, {
      status: 500,
    });
  }
}
