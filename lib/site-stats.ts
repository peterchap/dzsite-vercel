/**
 * CANONICAL SITE STATISTICS — the only place numbers live (WU25 §2, WU26).
 *
 * Every statistic shown anywhere on datazag.com is imported from this module.
 * No stat literal ever appears in page copy, components, or metadata — the CI
 * drift guard (scripts/guards/checkCorpusDrift.mjs, `npm run guard`) fails the
 * build if a corpus-style literal appears in app/ or components/ source.
 *
 * DATA FLOW
 *   CertaLake publishes coverage.json to the public stats bucket (the same
 *   feed the /stats/:file rewrite in vercel.json fronts). The refresh script
 *   (scripts/refreshSiteStats.mjs, wired as `prebuild`) fetches it on every
 *   build and writes lib/site-stats.generated.ts. A daily Vercel cron
 *   (/api/cron/refresh-stats) triggers a redeploy so the pull happens at
 *   least once a day. This module merges feed values over the COMMITTED
 *   snapshot below, validates them, and derives the display strings.
 *
 * REFRESH PROCEDURE
 *   Automatic: nothing to do — daily cron redeploy pulls the feed.
 *   Manual:    `npm run stats:refresh` then commit the regenerated
 *              lib/site-stats.generated.ts, or edit COMMITTED below when
 *              reconciling directly against DuckLake.
 *
 * FLOOR RULE
 *   Display values round DOWN (fmtStat) so the public claim is never ahead of
 *   reality between refreshes. Additionally, domainsMonitored never drops
 *   below the COMMITTED figure: DuckLake holds ~368M unique domains, but the
 *   CertaLake coverage feed currently reports ~325M because its generator has
 *   not been repointed at DuckLake gold. Until that upstream fix lands, the
 *   committed figure is the floor — the refresh script warns on every pull
 *   while the gap exists. Never round up; never raise COMMITTED above what
 *   DuckLake actually shows.
 */

import { feedStats } from "./site-stats.generated";

/**
 * Committed snapshot — the manual reconciliation point (update here when
 * checking directly against DuckLake, one commit, redeploy).
 */
const COMMITTED = {
  domainsMonitored: 368_000_000,
  ipsHostingDomains: 10_500_000,
  ipv4Indexed: 4_300_000_000,
  networksProfiled: 79_000,
  statsAsOf: "2026-07-14",
} as const;

function pickMetric(feed: number | null | undefined, committed: number): number {
  return typeof feed === "number" && Number.isFinite(feed) && feed > 0 ? feed : committed;
}

/** Effective raw values: validated feed values over the committed snapshot. */
export const SITE_STATS = {
  // Floor rule: never below committed while the feed lags DuckLake (see header).
  domainsMonitored: Math.max(
    pickMetric(feedStats.domainsMonitored, COMMITTED.domainsMonitored),
    COMMITTED.domainsMonitored,
  ),
  ipsHostingDomains: pickMetric(feedStats.ipsHostingDomains, COMMITTED.ipsHostingDomains),
  ipv4Indexed: pickMetric(feedStats.ipv4Indexed, COMMITTED.ipv4Indexed),
  networksProfiled: pickMetric(feedStats.networksProfiled, COMMITTED.networksProfiled),
  /** ISO date the figures are current to: feed timestamp, else committed date. */
  statsAsOf: feedStats.feedUpdated?.slice(0, 10) ?? COMMITTED.statsAsOf,
} as const;

/**
 * Display formatter: rounds DOWN to a safe public claim.
 * 368M -> "360M+"  |  10.5M -> "10M+"  |  4.32B -> "4.3B"  |  78,756 -> "78k"
 * Never rounds up: the public claim must always be defensible against the
 * live corpus between refreshes.
 */
export function fmtStat(n: number): string {
  if (n >= 1_000_000_000) {
    const b = Math.floor(n / 100_000_000) / 10; // one decimal, floored
    return `${b}B`;
  }
  if (n >= 100_000_000) {
    const m = Math.floor(n / 10_000_000) * 10; // nearest 10M, floored
    return `${m}M+`;
  }
  if (n >= 1_000_000) {
    const m = Math.floor(n / 1_000_000);
    return `${m}M+`;
  }
  if (n >= 1_000) {
    const k = Math.floor(n / 1_000);
    return `${k}k`;
  }
  return String(n);
}

/** Pre-formatted display strings — import THESE in components/copy/metadata. */
export const DISPLAY_STATS = {
  domainsMonitored: fmtStat(SITE_STATS.domainsMonitored), // "360M+"
  ipsHostingDomains: fmtStat(SITE_STATS.ipsHostingDomains), // "10M+"
  ipv4Indexed: fmtStat(SITE_STATS.ipv4Indexed), // "4.3B"
  networksProfiled: fmtStat(SITE_STATS.networksProfiled), // "79k"
} as const;

/**
 * Display string for the corpus domain figure — the only approved way to
 * render the corpus size in copy. (Alias of DISPLAY_STATS.domainsMonitored,
 * kept as the established import across the site.)
 */
export const DOMAINS_DISPLAY = DISPLAY_STATS.domainsMonitored;

/** "360M+ domain corpus" — for the "…-domain corpus" phrasing. */
export const DOMAINS_CORPUS_PHRASE = `${DOMAINS_DISPLAY} domain corpus`;

/** Back-compat raw-value shape (pre-WU26 name). Prefer SITE_STATS. */
export const siteStats = {
  domainsMonitored: SITE_STATS.domainsMonitored,
  ipsHosting: SITE_STATS.ipsHostingDomains,
  ipv4Indexed: SITE_STATS.ipv4Indexed,
  networksProfiled: SITE_STATS.networksProfiled,
  statsAsOf: SITE_STATS.statsAsOf,
} as const;

/** Human date for surfaces that want to cite freshness, e.g. "14 July 2026". */
export function statsAsOfLabel(): string {
  const d = new Date(SITE_STATS.statsAsOf + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return SITE_STATS.statsAsOf;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
