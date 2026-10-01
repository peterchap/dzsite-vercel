/**
 * The share card for a research post or the homepage, rendered by next/og.
 *
 * One layout so every post's card looks like the same publication: a kicker,
 * the headline, up to three figures, and the dated footer. Figures come from
 * the post's data.ts, never typed here, so the card cannot drift from the page.
 */
export const OG_SIZE = { width: 1200, height: 630 };

export type OgFigure = { n: string; k: string };

export function OgCard({ kicker, title, figures = [], footer }: { kicker: string; title: string; figures?: OgFigure[]; footer: string }) {
  const colors = ["#fbbf24", "#2fd4bd", "#e8ebf1"];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#030619",
        padding: "64px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 12, height: 12, borderRadius: 12, background: "#fbbf24" }} />
        <div style={{ color: "#828b9b", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>{kicker}</div>
      </div>

      <div style={{ display: "flex", color: "#ffffff", fontSize: 58, fontWeight: 800, lineHeight: 1.08, maxWidth: 1040 }}>{title}</div>

      {figures.length > 0 ? (
        <div style={{ display: "flex", borderRadius: 20, overflow: "hidden", border: "1px solid #1e2634" }}>
          {figures.slice(0, 3).map((f, i) => (
            <div
              key={f.k}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "26px 32px",
                borderRight: i < Math.min(figures.length, 3) - 1 ? "1px solid #1e2634" : "none",
                background: "#0b1120",
              }}
            >
              <div style={{ color: colors[i], fontSize: 64, fontWeight: 800 }}>{f.n}</div>
              <div style={{ color: "#828b9b", fontSize: 19, letterSpacing: 1.5, marginTop: 6 }}>{f.k}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex" }} />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#b7becb", fontSize: 24, fontWeight: 700 }}>{footer}</div>
        <div style={{ color: "#616a77", fontSize: 22 }}>datazag.com</div>
      </div>
    </div>
  );
}
