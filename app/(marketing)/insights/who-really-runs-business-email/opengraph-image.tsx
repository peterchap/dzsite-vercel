import { ImageResponse } from "next/og";

import { OG_SIZE, OgCard } from "@/components/research/og-card";
import { HEADLINES, REPORT } from "./data";

export const alt = "Who Really Runs Business Email? The State of Email Infrastructure 2026 — Datazag Insights";
export const size = OG_SIZE;
export const contentType = "image/png";

// Figures from data.ts, so the card cannot disagree with the page.
export default function OpengraphImage() {
  const h = HEADLINES;
  return new ImageResponse(
    (
      <OgCard
        kicker="Datazag Insights"
        title={`${REPORT.title} The keyhole effect, measured.`}
        figures={[
          { n: h.namedProviders, k: "CORPORATE MAIL DOMAINS RUN BY HOSTS AND OTHER PROVIDERS" },
          { n: h.microsoftToGoogleTop1000, k: "MICROSOFT TO GOOGLE, TOP 1000 MX" },
          { n: h.dmarcTop1000, k: "TOP 1000 ENFORCING DMARC" },
        ]}
        footer={`${REPORT.series} · snapshot of ${REPORT.snapshot}`}
      />
    ),
    { ...size },
  );
}
