/**
 * LIVE SITE STATISTICS — coverage.json read at request time, cached for an hour.
 *
 * SERVER ONLY. Import from server components, route handlers and layouts. A
 * client component reads the same bundle through useSiteStats()
 * (components/providers/SiteStatsProvider.tsx), which app/layout.tsx fills
 * from here.
 *
 * WHY (2026-09-30): the figures reached the site only on a rebuild, and
 * rebuilds stopped being daily when production auto-deploys were switched off
 * on 2026-09-13. The producer measures daily; the site now shows each
 * measurement within an hour of it landing, with no deploy in the loop.
 *
 * STILL STATIC. The fetch is cached (`revalidate: 3600`), so every route stays
 * statically rendered and is regenerated in the background at most hourly —
 * the certificate-counter lesson (never render a live, unvalidated number)
 * still holds, because a figure reaches the page only after computeSiteStats
 * has bounded it, exactly as at build.
 *
 * FAIL-SOFT, NEVER FAKE. Any failure — network, HTTP, JSON, an unpublishable
 * corpus figure — falls back to the committed snapshot, which carries its OWN
 * measurement dates. A stale figure is never stamped with today's date.
 */
import { cache } from "react";

import { computeSiteStats, parseCoverage, type SiteStats } from "./site-stats-core";
import { SNAPSHOT_STATS } from "./site-stats";

const FEED_BASE =
  process.env.CERTALAKE_STATS_URL ||
  process.env.NEXT_PUBLIC_WEBSITE_STATS_URL ||
  "https://pub-f2251a15327b429780b7ee354ff19e1b.r2.dev";

export const COVERAGE_URL = `${FEED_BASE.replace(/\/$/, "")}/coverage.json`;

/** Hourly. The producer runs daily; an hour bounds how late a new run can appear. */
export const STATS_REVALIDATE_SECONDS = 3600;

/**
 * Prefer the NEWER of live and snapshot. A CDN edge can serve an older
 * coverage.json than the one the last build saw; publishing it would move the
 * dates backwards, which reads exactly like a broken pipeline.
 */
function newer(live: SiteStats, snapshot: SiteStats): SiteStats {
  const l = live.feedUpdated ? Date.parse(live.feedUpdated) : NaN;
  const s = snapshot.feedUpdated ? Date.parse(snapshot.feedUpdated) : NaN;
  if (Number.isFinite(s) && (!Number.isFinite(l) || l < s)) return snapshot;
  return live;
}

async function loadSiteStats(): Promise<SiteStats> {
  try {
    const res = await fetch(COVERAGE_URL, {
      next: { revalidate: STATS_REVALIDATE_SECONDS, tags: ["site-stats"] },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const feed = parseCoverage(await res.json(), new Date().toISOString(), COVERAGE_URL);
    const live = computeSiteStats(feed, "live");
    if (live) return newer(live, SNAPSHOT_STATS);
    console.error("site-stats-live: the live corpus figure is unpublishable — serving the committed snapshot.");
  } catch (err) {
    console.error(
      `site-stats-live: could not read ${COVERAGE_URL} (${err instanceof Error ? err.message : String(err)}) — ` +
        "serving the committed snapshot with its own dates.",
    );
  }
  return SNAPSHOT_STATS;
}

/** One fetch per request, however many components ask. */
export const getSiteStats = cache(loadSiteStats);
