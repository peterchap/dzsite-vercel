import { ImageResponse } from "next/og";

import { OG_SIZE, OgCard } from "@/components/research/og-card";
import { STUDY, longDate } from "./data";

export const alt = "Most domains that publish DMARC do not enforce it — Datazag research";
export const size = OG_SIZE;
export const contentType = "image/png";

// Figures from data.ts, so the card cannot disagree with the page.
export default function OpengraphImage() {
  const h = STUDY.headline;
  return new ImageResponse(
    (
      <OgCard
        kicker="Datazag research"
        title={`${h.primaryPublish.toFixed(1)}% of domains publish DMARC. Only ${h.primaryEnforce.toFixed(1)}% enforce it.`}
        figures={[
          { n: `${h.primaryPublish.toFixed(1)}%`, k: "PUBLISH DMARC" },
          { n: `${h.primaryEnforce.toFixed(1)}%`, k: "ENFORCE IT" },
          { n: `${h.corporateNone.toFixed(1)}%`, k: "CORPORATE, REPORTS ONLY" },
        ]}
        footer={`Census of ${longDate(STUDY.censusOn)}`}
      />
    ),
    { ...size },
  );
}
