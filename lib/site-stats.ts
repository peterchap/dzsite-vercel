/**
 * CANONICAL SITE STATISTICS — the only place numbers live (WU25 §2, WU26).
 *
 * Every statistic shown anywhere on datazag.com is imported from this module.
 * No stat literal ever appears in page copy, components, or metadata — the CI
 * drift guard (scripts/guards/checkCorpusDrift.mjs, `npm run guard`) fails the
 * build if a corpus-style literal appears in app/ or components/ source.
 *
 * DATA FLOW
 *   CertaLake publishes coverage.json to the public stats bucket daily (the
 *   same feed the /stats/:file rewrite in vercel.json fronts). Two paths read
 *   it, and both run through computeSiteStats in ./site-stats-core.ts:
 *
 *   LIVE (what pages render, 2026-09-30): lib/site-stats-live.ts fetches
 *     coverage.json at request time, cached for an hour, so a new measurement
 *     reaches the site within the hour with no deploy. Server components
 *     `await getSiteStats()`; client components `useSiteStats()`, fed by the
 *     SiteStatsProvider in app/layout.tsx.
 *   SNAPSHOT (this module): scripts/refreshSiteStats.mjs, wired as `prebuild`,
 *     writes lib/site-stats.generated.ts on every build. The constants below
 *     are computed from it. They are the fallback when the live fetch fails,
 *     the default a client component sees outside the provider, and what the
 *     CI guards assert against.
 *
 *   Why the live path exists: the snapshot only moves on a rebuild, and
 *   rebuilds stopped being daily when production auto-deploys were switched
 *   off on 2026-09-13. The "Measured …" dates became the date of the last
 *   manual deploy. Import the constants here ONLY where a request-time value
 *   is impossible (module-level copy objects); anywhere a component renders,
 *   read the live figures.
 *
 * REFRESH PROCEDURE
 *   Automatic: nothing to do — pages revalidate hourly against the feed.
 *   Manual:    `npm run stats:refresh` then commit the regenerated
 *              lib/site-stats.generated.ts, or edit COMMITTED in
 *              ./site-stats-core.ts when reconciling directly against DuckLake.
 *
 * DISPLAY FORMAT (2026-10-01, replacing the FLOOR RULE)
 *   Figures display in the Observatory's format: one decimal for millions and
 *   billions, rounded, no "+" (fmtStat in ./site-stats-core.ts, guarded to agree
 *   with formatCount in ./observatory-figures.ts). The domain figure itself is
 *   the Observatory's corpus_domains (./site-stats-live.ts), so both sites print
 *   the same number. The old rule rounded down to the nearest ten million so a
 *   claim could never run ahead of reality; consistency with the Observatory was
 *   chosen over that, at an overstatement of at most 0.05 million. The
 *   committed-floor ratchet was removed earlier (see R2 IS THE SOURCE).
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
import { computeSiteStats, type SiteStats } from "./site-stats-core";

export {
  BOUNDS,
  COMMITTED,
  IPV4_ADDRESS_SPACE,
  RECORD_AGE_BOUNDS,
  fmtStat,
  type PublishedStat,
  type PublishedStatKey,
  type SiteStats,
} from "./site-stats-core";

/**
 * Committed snapshot — the manual reconciliation point (update here when
 * checking directly against DuckLake, one commit, redeploy).
 *
 * Measured against the live DuckLake gold schema 2026-08-29:
 *   domainsMonitored  362,714,858  gold.dns_wide COUNT(DISTINCT domain) WHERE
 *                                  resolution_status IN ('RESOLVED','NODATA')
 *   ipv4Indexed     3,134,235,878  gold.asn_ip4 interval UNION (was a SUM that
 *                                  double-counted nested more-specifics by 1.17B)
 *   networksProfiled       79,028  gold.gold_risk_asn COUNT(*)
 * ipsHostingDomains acquired a producer on 2026-08-31 and is no longer carried
 * forward unverified: 13,585,332 distinct IPv4 addresses that a measured-corpus
 * domain resolves to (dns_wide.a_records, same MEASURED_SQL population as
 * domainsMonitored). ⚠️ The obvious source was the wrong one — gold.v_fact_domain_ip
 * gives 2,078,505 but covers 5.6% of the corpus, and publishing that under a
 * corpus-wide label would repeat the dead-name mistake at a different grain.
 *
 * ⚠️ domainsMonitored went DOWN on 2026-08-29, from 395,865,413. That is a
 * CORRECTION, not a shrinking corpus. The producer counted every row of
 * gold.dns_wide — which holds every domain ever ATTEMPTED, including 24.4M
 * NXDOMAIN, 9.7M SERVFAIL and 5.9M TIMEOUT. 39,926,798 dead names, 9.9% of the
 * published figure, were being sold as "domains monitored". Fixed in
 * riskscore/orchestration/website_stats.py (MEASURED_SQL); this file must not
 * drift back above it. A number moving down is what a correction looks like.
 */
/**
 * R2 IS THE SOURCE (13 Sep 2026). A figure is publishable only if the feed
 * carries it and it survives its bound. There is no constant to fall back to.
 *
 * What changed and why: COMMITTED used to win in three ways — as a substitute
 * for a missing feed value, as a substitute for a rejected one, and through a
 * floor that kept the published number from ever going DOWN. The floor is the
 * one that nearly caused an incident: on 2026-08-29 the producer was corrected
 * to exclude ~40M dead names, and the ratchet would have kept publishing the
 * inflated 395,865,413 while every guard passed. A correction is
 * indistinguishable from a lag if all you look at is the direction.
 *
 * So the ratchet is gone. A smaller number from the feed is now published,
 * because a smaller number is usually the honest one.
 *
 * BOUNDS STAY. They are the check that caught an IPv4 count larger than the
 * IPv4 address space, and they reject in BOTH directions. The difference is
 * what happens after a rejection: the figure becomes unpublishable rather than
 * silently becoming a constant.
 */
/**
 * The corpus figure is load-bearing in ~29 places of running prose ("scored
 * against X domains of prior observation"). A null there would render the word
 * "null" into a sentence, which is worse than any of the failures this module
 * exists to prevent. So an unpublishable corpus figure breaks the BUILD, which
 * is the same thing this file already does for an impossible committed value —
 * an unusable number must not reach a page.
 *
 * This cannot fire from a transient outage: scripts/refreshSiteStats.mjs fails
 * soft and leaves the last good lib/site-stats.generated.ts in place, so the
 * committed generated file always carries values. It fires only if that file is
 * genuinely broken, which is a thing to fix, not to paper over.
 */
/**
 * WHAT EACH FIGURE COUNTS (WU-C3).
 *
 * A number without its population is not a fact, it is a guess with a comma in
 * it. Six different coverage figures were in public circulation — 360M, 390M,
 * 315M, 340M, 330M, 267M — and the damaging pair were the two sitting eleven
 * lines apart on /docs, because a technical buyer reads that page linearly and
 * concludes the site does not know its own corpus.
 *
 * The pair was never one number typed twice. 395,865,413 counted every domain
 * ever ATTEMPTED, including 24.4M NXDOMAIN, 9.7M SERVFAIL and 5.9M TIMEOUT —
 * 39.9M dead names, 9.9% of the published figure. The producer was corrected on
 * 2026-08-29 and the honest figure went DOWN. Both numbers were "real"; only one
 * had a definition, and it was not written down anywhere a reader could see it.
 *
 * So the definition now travels WITH the value, from this module, and every
 * surface renders the same sentence. These strings were previously typed into
 * LiveInternetIntelligence.tsx — the only place a definition existed at all —
 * which meant the number and its meaning could drift apart silently.
 *
 * If two figures legitimately count different populations, BOTH may be
 * published: each with its definition attached, rendered from here. That reads
 * as precision. The same two numbers with no definitions read as contradiction.
 */
const snapshot = computeSiteStats(feedStats, "snapshot");
if (snapshot === null) {
  throw new Error(
    "site-stats: the corpus figure is not publishable from the committed snapshot. It appears in " +
      "running prose across the site and cannot be omitted there, so this fails the " +
      "build. Fix the producer or lib/site-stats.generated.ts — do not hardcode a value.",
  );
}

/** The whole build-time bundle. The live path falls back to this. */
export const SNAPSHOT_STATS: SiteStats = snapshot;

/** Raw values. `null` means "do not publish this". */
export const SITE_STATS = snapshot.SITE_STATS;
/** Pre-formatted display strings. */
export const DISPLAY_STATS = snapshot.DISPLAY_STATS;
/** Per-figure as-of — render it beside the figure it belongs to. */
export const STATS_AS_OF = snapshot.STATS_AS_OF;
export const PUBLISHED_STATS = snapshot.PUBLISHED_STATS;
/** Display string for the corpus domain figure. */
export const DOMAINS_DISPLAY: string = snapshot.DOMAINS_DISPLAY;
/** e.g. "369.4M domain corpus" — for the "…-domain corpus" phrasing. */
export const DOMAINS_CORPUS_PHRASE = snapshot.DOMAINS_CORPUS_PHRASE;

/** Only the figures that have a value. Surfaces MAP OVER THIS. */
export function publishedStats(): SiteStats["publishedStats"] {
  return snapshot!.publishedStats;
}

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
  return snapshot!.statsAsOfLabel;
}
