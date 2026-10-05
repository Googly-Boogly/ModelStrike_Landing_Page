import { ImageResponse } from "next/og";

export const alt = "ModelStrike — AI agent security and red teaming";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08090b",
          backgroundImage: "radial-gradient(circle at 80% 0%, rgba(195,52,58,0.28), transparent 55%)",
          color: "#ececee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "2px solid #2c3138",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#121519",
            }}
          >
            <div style={{ width: 4, height: 30, background: "#ef5357", borderRadius: 2, transform: "rotate(38deg)" }} />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 5 }}>
            <span>MODEL</span>
            <span style={{ color: "#ef5357" }}>STRIKE</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#ef5357" }}>AI AGENT SECURITY</div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.12, maxWidth: 980 }}>
            Your AI agent has access. We find out what happens when that access is abused.
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#a3a9b2" }}>Red teaming for AI agents, tools, MCP, and permissions</div>
      </div>
    ),
    size,
  );
}
