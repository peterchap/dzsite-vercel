import { ImageResponse } from "next/og";

import { OG_SIZE, OgCard, type OgFigure } from "@/components/research/og-card";
import { getSiteStats } from "@/lib/site-stats-live";

/**
 * The homepage share card. A route rather than app/opengraph-image.tsx: a
 * root-level image file would be inherited by every page without its own,
 * overriding the CMS-authored share images. Figures read the live stats, and a
 * figure the feed did not publish is left off rather than filled in.
 */
export const revalidate = 3600;

export async function GET() {
  const { DISPLAY_STATS, statsAsOfLabel } = await getSiteStats();
  const candidates: Array<{ n: string | null; k: string }> = [
    { n: DISPLAY_STATS.domainsMonitored, k: "DOMAINS MONITORED" },
    { n: DISPLAY_STATS.ipsHostingDomains, k: "IPS HOSTING DOMAINS" },
    { n: DISPLAY_STATS.networksProfiled, k: "NETWORKS PROFILED" },
  ];
  const figures = candidates.filter((f): f is OgFigure => Boolean(f.n));
  return new ImageResponse(
    (
      <OgCard
        kicker="For MSSPs, email platforms, cyber insurers and data teams"
        title="Internet infrastructure intelligence you can act on."
        figures={figures}
        footer={`Coverage measured ${statsAsOfLabel}`}
      />
    ),
    { ...OG_SIZE },
  );
}
