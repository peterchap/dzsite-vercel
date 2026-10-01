import { ImageResponse } from "next/og";

import { OG_SIZE, OgCard } from "@/components/research/og-card";
import { STUDY, longDate } from "./data";

export const alt = "Email security gateways cover few corporate domains; Microsoft and Google run the mailboxes — Datazag research";
export const size = OG_SIZE;
export const contentType = "image/png";

// Figures from data.ts, so the card cannot disagree with the page.
export default function OpengraphImage() {
  const L = STUDY.layers;
  return new ImageResponse(
    (
      <OgCard
        kicker="Datazag research"
        title={`Email security gateways cover ${L.gateway.share}% of corporate domains. Microsoft and Google run the mailboxes for ${L.mailbox.share.toFixed(0)}%.`}
        figures={[
          { n: `${L.gateway.share}%`, k: "BEHIND A GATEWAY" },
          { n: `${L.mailbox.share.toFixed(0)}%`, k: "MICROSOFT OR GOOGLE MAILBOX" },
          { n: L.singleOperator, k: "ONE MAIL OPERATOR" },
        ]}
        footer={`Observed ${longDate(STUDY.observedOn)}`}
      />
    ),
    { ...size },
  );
}
