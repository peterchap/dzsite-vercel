import { ImageResponse } from "next/og";

import { OG_SIZE, OgCard } from "@/components/research/og-card";
import { STUDY, longDate } from "./data";

export const alt = "One company runs the nameservers, website and mail for one corporate domain in five — Datazag research";
export const size = OG_SIZE;
export const contentType = "image/png";

// Figures from data.ts, so the card cannot disagree with the page.
export default function OpengraphImage() {
  const s = STUDY;
  return new ImageResponse(
    (
      <OgCard
        kicker="Datazag research"
        title="One company runs the nameservers, website and mail for one corporate domain in five."
        figures={[
          { n: s.headline.oneCompanyThreeLayers.share, k: "ONE COMPANY, THREE LAYERS" },
          { n: s.bundleByMarket[1].share, k: "THE SAME, IN GERMANY" },
          { n: s.dns.singleOperator, k: "ONE NAMESERVER OPERATOR" },
        ]}
        footer={`Observed to ${longDate(s.observedTo)}`}
      />
    ),
    { ...size },
  );
}
