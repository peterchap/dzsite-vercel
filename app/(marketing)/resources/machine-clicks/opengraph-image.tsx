import { ImageResponse } from "next/og";

import { OG_SIZE, OgCard } from "@/components/research/og-card";

export const alt = "Classify machine clicks in your own traffic — Datazag implementation guide";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Datazag guide"
        title="Classify machine clicks in your own traffic."
        footer="Four signals, the hidden link, what to log"
      />
    ),
    { ...size },
  );
}
