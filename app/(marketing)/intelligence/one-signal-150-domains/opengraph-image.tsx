import { ImageResponse } from "next/og";

export const alt = "One Signal, 150 Domains — Datazag Infrastructure Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated OG card with the 1 / 150 / 0 stat triptych (WU23 §2).
export default function OpengraphImage() {
  const trio = [
    { n: "1", k: "SIGNAL DETECTED", color: "#e8ebf1" },
    { n: "150", k: "DOMAINS UNCOVERED", color: "#2fd4bd" },
    { n: "0", k: "IN PUBLIC DOMAIN FEEDS", color: "#ff5563" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030619",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff5563" }} />
          <div style={{ color: "#828b9b", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>
            Threat Intelligence · Case Study
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          <span>One signal exposed an entire&nbsp;</span>
          <span style={{ color: "#ff5563" }}>criminal hosting cluster</span>
          <span>.</span>
        </div>

        <div style={{ display: "flex", gap: 0, borderRadius: 20, overflow: "hidden", border: "1px solid #1e2634" }}>
          {trio.map((cell, i) => (
            <div
              key={cell.k}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "32px 36px",
                borderRight: i < 2 ? "1px solid #1e2634" : "none",
                background: "#0b1120",
              }}
            >
              <div style={{ color: cell.color, fontSize: 92, fontWeight: 800 }}>{cell.n}</div>
              <div style={{ color: "#828b9b", fontSize: 20, letterSpacing: 2, marginTop: 8 }}>{cell.k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#b7becb", fontSize: 26, fontWeight: 700 }}>Datazag · Infrastructure Intelligence</div>
          <div style={{ color: "#616a77", fontSize: 22 }}>datazag.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
