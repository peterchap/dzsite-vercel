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
  // Floor raised from 100_000 on 2026-08-31, when this figure acquired a producer for the
  // first time. 1M is far below the measured 13.6M and far above what a broken a_records
  // column leaves behind. Keep in sync with COVERAGE_BOUNDS["infrastructure_ips"].
  ipsHostingDomains: [1_000_000, IPV4_ADDRESS_SPACE],
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
const COMMITTED = {
  domainsMonitored: 362_714_858,
  // 2026-08-31: this had NO PRODUCER. refreshSiteStats mapped it from
  // `coverage.infrastructure_ips`, a key website_stats.py had never emitted, so the feed
  // value was permanently null and this constant permanently won — a number with no source
  // at all, frozen since it was typed, rendering as "10M+ IPs hosting domains". The
  // producer now measures it corpus-wide from dns_wide.a_records under the same population
  // filter as domainsMonitored: 13,585,332. The claim was defensible all along.
  ipsHostingDomains: 13_585_332,
  ipv4Indexed: 3_134_235_878,
  networksProfiled: 79_028,
  statsAsOf: "2026-08-31",
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
function publishable(key: string, feed: number | null | undefined): number | null {
  if (typeof feed !== "number" || !Number.isFinite(feed) || feed <= 0) {
    console.error(
      `site-stats: ${key} has no usable value in the feed — it will not be published. ` +
        `Check the producer and the R2 object; do not substitute a constant.`,
    );
    return null;
  }
  if (!inBounds(key, feed)) {
    const [lo, hi] = BOUNDS[key];
    console.error(
      `site-stats: feed ${key} = ${feed.toLocaleString()} is outside its bound ` +
        `[${lo.toLocaleString()}, ${hi.toLocaleString()}] — REJECTED and not published. ` +
        `Fix the producer; do not widen the bound.`,
    );
    return null;
  }
  return feed;
}

/**
 * Divergence notice. COMMITTED is no longer a value source, but it is still the
 * last figure a human reconciled against DuckLake, which makes it a useful
 * tripwire: a feed that has moved a long way from it is either real growth, a
 * real correction, or a producer regression — and all three are worth a line in
 * the build log rather than silence.
 */
function noteDivergence(key: string, value: number | null, reference: number): void {
  if (value === null) return;
  const drift = Math.abs(value - reference) / reference;
  if (drift > 0.2) {
    console.warn(
      `site-stats: ${key} = ${value.toLocaleString()} differs from the last ` +
        `reconciliation (${reference.toLocaleString()}) by ${(drift * 100).toFixed(1)}%. ` +
        `Publishing the feed value. If this is a producer regression, fix it upstream; ` +
        `if it is real, update COMMITTED so the tripwire stays useful.`,
    );
  }
}

/** Raw values, straight from the R2 feed. `null` means "do not publish this". */
export const SITE_STATS = {
  domainsMonitored: publishable("domainsMonitored", feedStats.domainsMonitored),
  ipsHostingDomains: publishable("ipsHostingDomains", feedStats.ipsHostingDomains),
  ipv4Indexed: publishable("ipv4Indexed", feedStats.ipv4Indexed),
  networksProfiled: publishable("networksProfiled", feedStats.networksProfiled),
  /** ISO date the figures are current to, from the feed. Null if it says nothing.
   *  This is a WHOLE-PAGE convenience only — it is one date across four figures
   *  measured at different times. Per-figure, use STATS_AS_OF. */
  statsAsOf: feedStats.feedUpdated?.slice(0, 10) ?? null,
} as const;

noteDivergence("domainsMonitored", SITE_STATS.domainsMonitored, COMMITTED.domainsMonitored);
noteDivergence("ipsHostingDomains", SITE_STATS.ipsHostingDomains, COMMITTED.ipsHostingDomains);
noteDivergence("ipv4Indexed", SITE_STATS.ipv4Indexed, COMMITTED.ipv4Indexed);
noteDivergence("networksProfiled", SITE_STATS.networksProfiled, COMMITTED.networksProfiled);

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
if (SITE_STATS.domainsMonitored === null) {
  throw new Error(
    "site-stats: the corpus figure is not publishable from the feed. It appears in " +
      "running prose across the site and cannot be omitted there, so this fails the " +
      "build. Fix the producer or lib/site-stats.generated.ts — do not hardcode a value.",
  );
}

/** The corpus figure, proven publishable above. */
const DOMAINS_MONITORED: number = SITE_STATS.domainsMonitored;

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
const fmtOrNull = (n: number | null): string | null => (n === null ? null : fmtStat(n));

export const DISPLAY_STATS = {
  /** Always a string — an unpublishable corpus figure fails the build above. */
  domainsMonitored: fmtStat(DOMAINS_MONITORED), // "360M+"
  /** `null` means the feed did not give us a usable figure: render NOTHING. */
  ipsHostingDomains: fmtOrNull(SITE_STATS.ipsHostingDomains), // "10M+"
  ipv4Indexed: fmtOrNull(SITE_STATS.ipv4Indexed), // "3.1B"
  networksProfiled: fmtOrNull(SITE_STATS.networksProfiled), // "79k"
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
  domainsMonitored: feedStats.asOf?.domainsMonitored ?? feedStats.feedUpdated ?? null,
  ipsHostingDomains: feedStats.asOf?.ipsHostingDomains ?? feedStats.feedUpdated ?? null,
  ipv4Indexed: feedStats.asOf?.ipv4Indexed ?? feedStats.feedUpdated ?? null,
  networksProfiled: feedStats.asOf?.networksProfiled ?? feedStats.feedUpdated ?? null,
} as const;

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
export type PublishedStat = {
  /** Short label, as rendered beside the value. */
  label: string;
  /** Raw measured value, or null when the feed gave us nothing publishable. */
  value: number | null;
  /** Floored display string, or null. A null figure renders NOTHING. */
  display: string | null;
  /** What the number counts, and what it excludes. Render this with the value. */
  definition: string;
  /** ISO timestamp this figure was measured (NOT when the page was built). */
  measuredAt: string | null;
};

export const PUBLISHED_STATS = {
  domainsMonitored: {
    label: "Domains monitored",
    value: DOMAINS_MONITORED,
    display: DISPLAY_STATS.domainsMonitored,
    // The population, stated so the figure can be checked rather than believed.
    definition:
      "Distinct domains that resolve — every name answering with a record or " +
      "an empty response. Names that no longer exist (NXDOMAIN) and names whose " +
      "servers failed or timed out are excluded, so this counts the live corpus " +
      "rather than every domain ever queried.",
    measuredAt: STATS_AS_OF.domainsMonitored,
  },
  ipsHostingDomains: {
    label: "IPs hosting domains",
    value: SITE_STATS.ipsHostingDomains,
    display: DISPLAY_STATS.ipsHostingDomains,
    definition:
      "Distinct IPv4 addresses that a domain in the measured corpus resolves to, " +
      "taken over the same population as the domain figure above.",
    measuredAt: STATS_AS_OF.ipsHostingDomains,
  },
  ipv4Indexed: {
    label: "IPv4 addresses indexed",
    value: SITE_STATS.ipv4Indexed,
    display: DISPLAY_STATS.ipv4Indexed,
    definition:
      "IPv4 space announced in BGP and attributed to a network, counted once per " +
      "address however many announcements cover it — a more-specific prefix inside " +
      "its parent is not counted twice.",
    measuredAt: STATS_AS_OF.ipv4Indexed,
  },
  networksProfiled: {
    label: "Networks profiled",
    value: SITE_STATS.networksProfiled,
    display: DISPLAY_STATS.networksProfiled,
    definition:
      "Autonomous systems with ownership and routing context attached, used to " +
      "place infrastructure in the network that announces it.",
    measuredAt: STATS_AS_OF.networksProfiled,
  },
} as const satisfies Record<string, PublishedStat>;

export type PublishedStatKey = keyof typeof PUBLISHED_STATS;

/**
 * Only the figures that have a value. Surfaces MAP OVER THIS rather than over
 * the keys — a figure the feed could not supply is absent from the page
 * entirely, which is the rule: render nothing, not zero, not a constant.
 */
export function publishedStats(): Array<
  PublishedStat & { key: PublishedStatKey; display: string; measuredAt: string }
> {
  return (Object.entries(PUBLISHED_STATS) as Array<[PublishedStatKey, PublishedStat]>)
    .filter(([, s]) => s.value !== null && s.display !== null && s.measuredAt !== null)
    .map(([key, s]) => ({
      ...s,
      key,
      display: s.display as string,
      measuredAt: s.measuredAt as string,
    }));
}

/**
 * Display string for the corpus domain figure — the only approved way to
 * render the corpus size in copy. (Alias of DISPLAY_STATS.domainsMonitored,
 * kept as the established import across the site.)
 */
export const DOMAINS_DISPLAY: string = DISPLAY_STATS.domainsMonitored;

/** "360M+ domain corpus" — for the "…-domain corpus" phrasing. */
export const DOMAINS_CORPUS_PHRASE = `${DOMAINS_DISPLAY} domain corpus`;

/** Back-compat raw-value shape (pre-WU26 name). Prefer SITE_STATS. */
export const siteStats = {
  domainsMonitored: DOMAINS_MONITORED,
  ipsHosting: SITE_STATS.ipsHostingDomains,
  ipv4Indexed: SITE_STATS.ipv4Indexed,
  networksProfiled: SITE_STATS.networksProfiled,
  statsAsOf: SITE_STATS.statsAsOf,
} as const;

/** Human date for surfaces that want to cite freshness, e.g. "14 July 2026". */
export function statsAsOfLabel(): string {
  if (!SITE_STATS.statsAsOf) return "";
  const d = new Date(SITE_STATS.statsAsOf + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return SITE_STATS.statsAsOf;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
