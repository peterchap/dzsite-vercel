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
 *   below the COMMITTED figure. Never round up; never raise COMMITTED above
 *   what DuckLake actually shows.
 *
 *   (The generator HAS since been repointed at DuckLake gold — the note here
 *   about the feed reporting ~325M from an unrepointed generator is resolved.
 *   riskscore/orchestration/website_stats.py now reads gold.dns_wide directly.)
 *
 * CEILING RULE — added 2026-08-22, after ipv4Indexed shipped an IMPOSSIBLE
 *   number. COMMITTED.ipv4Indexed was 4_300_000_000 and the feed agreed at
 *   4_320_469_598, so the site rendered "4.3B IPv4 addresses indexed" against
 *   an address space of 4_294_967_296. Every guard in this file pointed the
 *   same way — the floor rule, fmtStat's round-DOWN, "never round up" — all of
 *   them protecting against overstating growth, and none of them noticing a
 *   figure that could not exist. A floor cannot catch a ceiling violation.
 *
 *   The cause was upstream: the feed summed BGP-announced ranges, counting an
 *   address once per announcement covering it (a /24 inside its /16 counted
 *   twice). Fixed at the producer by taking the interval UNION; the honest
 *   figure is 3,129,369,541 (72.9% of IPv4), measured 2026-08-22.
 *
 *   BOUNDS below now gate BOTH sides. A feed value outside its bounds is
 *   REJECTED (the committed value is used instead, and the refresh script
 *   refuses to write it). A COMMITTED value outside its bounds THROWS at
 *   module load, which fails the build — an impossible number must break the
 *   deploy, not reach the page. Do not "fix" a bound violation by widening the
 *   bound.
 */

import { feedStats } from "./site-stats.generated";

/** The entire IPv4 address space. Nothing counting IPv4 addresses may exceed it. */
export const IPV4_ADDRESS_SPACE = 2 ** 32; // 4,294,967,296

/**
 * Bounds every published figure is checked against — see CEILING RULE above.
 * [min, max], inclusive. Keep in sync with COVERAGE_BOUNDS in
 * riskscore/orchestration/website_stats.py: the producer gates the same figures
 * with the same limits, and this is the second gate, not the only one.
 */
export const BOUNDS: Record<string, readonly [number, number]> = {
  domainsMonitored: [100_000_000, 2_000_000_000],
  ipsHostingDomains: [100_000, IPV4_ADDRESS_SPACE],
  ipv4Indexed: [1_000_000_000, IPV4_ADDRESS_SPACE],
  networksProfiled: [10_000, 120_000], // ~120k ASNs have ever been allocated
} as const;

function inBounds(key: string, value: number): boolean {
  const b = BOUNDS[key];
  if (!b) return true;
  return Number.isFinite(value) && value >= b[0] && value <= b[1];
}

/**
 * Committed snapshot — the manual reconciliation point (update here when
 * checking directly against DuckLake, one commit, redeploy).
 *
 * Measured against the live DuckLake gold schema 2026-08-22:
 *   domainsMonitored  395,865,413  gold.dns_wide COUNT(DISTINCT domain)
 *   ipv4Indexed     3,129,369,541  gold.asn_ip4 interval UNION (was a SUM that
 *                                  double-counted nested more-specifics by 1.17B)
 *   networksProfiled       79,021  gold.gold_risk_asn COUNT(*)
 * ipsHostingDomains is NOT in that schema and is carried forward unverified —
 * it has no producer behind it, which is its own problem, tracked separately.
 */
const COMMITTED = {
  domainsMonitored: 395_865_413,
  ipsHostingDomains: 10_500_000,
  ipv4Indexed: 3_129_369_541,
  networksProfiled: 79_021,
  statsAsOf: "2026-08-22",
} as const;

// A committed figure outside its bound fails the BUILD. This is the assertion
// that was missing: the impossible ipv4Indexed sat in this object for weeks and
// nothing between here and the rendered page disagreed with it.
for (const [key, value] of Object.entries(COMMITTED)) {
  if (typeof value === "number" && !inBounds(key, value)) {
    const [lo, hi] = BOUNDS[key];
    throw new Error(
      `site-stats: COMMITTED.${key} = ${value.toLocaleString()} is outside its bound ` +
        `[${lo.toLocaleString()}, ${hi.toLocaleString()}]. This figure cannot be published. ` +
        `Fix the number — do not widen the bound.`,
    );
  }
}

/**
 * Feed value if it is usable AND within bounds, else the committed value.
 * An out-of-bound feed value is rejected loudly rather than rendered: the feed
 * is a live source and a producer regression must not reach the page.
 */
function pickMetric(key: string, feed: number | null | undefined, committed: number): number {
  if (typeof feed !== "number" || !Number.isFinite(feed) || feed <= 0) return committed;
  if (!inBounds(key, feed)) {
    const [lo, hi] = BOUNDS[key];
    console.error(
      `site-stats: feed ${key} = ${feed.toLocaleString()} is outside its bound ` +
        `[${lo.toLocaleString()}, ${hi.toLocaleString()}] — rejected, using the committed value.`,
    );
    return committed;
  }
  return feed;
}

/** Effective raw values: validated feed values over the committed snapshot. */
export const SITE_STATS = {
  // Floor rule: never below committed while the feed lags DuckLake (see header).
  domainsMonitored: Math.max(
    pickMetric("domainsMonitored", feedStats.domainsMonitored, COMMITTED.domainsMonitored),
    COMMITTED.domainsMonitored,
  ),
  ipsHostingDomains: pickMetric("ipsHostingDomains", feedStats.ipsHostingDomains, COMMITTED.ipsHostingDomains),
  ipv4Indexed: pickMetric("ipv4Indexed", feedStats.ipv4Indexed, COMMITTED.ipv4Indexed),
  networksProfiled: pickMetric("networksProfiled", feedStats.networksProfiled, COMMITTED.networksProfiled),
  /** ISO date the figures are current to: feed timestamp, else committed date.
   *  This is a WHOLE-PAGE convenience only — it is one date across four figures
   *  measured at different times. Per-figure, use STATS_AS_OF. */
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
 * PER-FIGURE AS-OF. Each figure's own measurement time, or null when it has
 * none. Import THIS beside DISPLAY_STATS — a figure rendered without its own
 * as-of borrows the freshness of whatever is next to it on the page, which is
 * how a daily total came to sit under an hourly counter's "Updated" chip.
 *
 * A figure served from COMMITTED (feed absent or rejected) is stamped with the
 * committed reconciliation date, not with the feed's — it is exactly as old as
 * the last manual reconciliation and must say so.
 */
export const STATS_AS_OF = {
  domainsMonitored:
    (SITE_STATS.domainsMonitored === feedStats.domainsMonitored
      ? feedStats.asOf?.domainsMonitored
      : null) ?? `${COMMITTED.statsAsOf}T00:00:00Z`,
  ipsHostingDomains:
    (SITE_STATS.ipsHostingDomains === feedStats.ipsHostingDomains
      ? feedStats.asOf?.ipsHostingDomains
      : null) ?? `${COMMITTED.statsAsOf}T00:00:00Z`,
  ipv4Indexed:
    (SITE_STATS.ipv4Indexed === feedStats.ipv4Indexed
      ? feedStats.asOf?.ipv4Indexed
      : null) ?? `${COMMITTED.statsAsOf}T00:00:00Z`,
  networksProfiled:
    (SITE_STATS.networksProfiled === feedStats.networksProfiled
      ? feedStats.asOf?.networksProfiled
      : null) ?? `${COMMITTED.statsAsOf}T00:00:00Z`,
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
