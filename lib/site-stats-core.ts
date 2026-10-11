/**
 * SITE STATISTICS — the computation, separated from where the feed comes from.
 *
 * Everything here is a pure function of a feed snapshot. Two callers use it:
 *
 *   - lib/site-stats.ts        the COMMITTED snapshot (lib/site-stats.generated.ts,
 *                              written at build by scripts/refreshSiteStats.mjs).
 *                              Build-time, synchronous, the fallback of last resort.
 *   - lib/site-stats-live.ts   the LIVE feed (coverage.json), fetched at request
 *                              time and cached for an hour. What pages render.
 *
 * Why the split (2026-09-30): the figures used to reach the site only when it
 * was rebuilt, and rebuilds stopped being daily when production auto-deploys
 * were switched off on 2026-09-13. The "Measured …" dates on the site became a
 * record of the last manual deploy rather than of the last measurement. With
 * both paths running through this one function, a figure is validated the same
 * way whichever path delivered it, and the live path needs no deploy at all.
 *
 * The rules this module has always enforced are unchanged — see the history in
 * lib/site-stats.ts: bounds reject in BOTH directions, display values round
 * DOWN, a rejected figure is unpublished (never replaced by a constant), and
 * every figure carries its own as-of.
 */
import type { feedStats as GeneratedFeed } from "./site-stats.generated";

/** The shape the refresh script writes, and the shape parseCoverage returns. */
export type FeedStats = typeof GeneratedFeed;

/** The entire IPv4 address space. Nothing counting IPv4 addresses may exceed it. */
export const IPV4_ADDRESS_SPACE = 2 ** 32; // 4,294,967,296

/**
 * Bounds every published figure is checked against — see CEILING RULE in
 * lib/site-stats.ts. [min, max], inclusive. Keep in sync with COVERAGE_BOUNDS
 * in riskscore/orchestration/website_stats.py: the producer gates the same
 * figures with the same limits, and this is the second gate, not the only one.
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

/** Record age, in hours. Mirrors COVERAGE_BOUNDS["record_age_p*_hours"]. */
export const RECORD_AGE_BOUNDS: readonly [number, number] = [1, 400 * 24];

export function inBounds(key: string, value: number): boolean {
  const b = BOUNDS[key];
  if (!b) return true;
  return Number.isFinite(value) && value >= b[0] && value <= b[1];
}

/**
 * Last manual reconciliation against DuckLake. NOT a value source — see
 * "R2 IS THE SOURCE" in lib/site-stats.ts. Kept as a tripwire: a feed that has
 * moved a long way from it is worth a line in the log.
 */
export const COMMITTED = {
  domainsMonitored: 362_714_858,
  ipsHostingDomains: 13_585_332,
  ipv4Indexed: 3_134_235_878,
  networksProfiled: 79_028,
  statsAsOf: "2026-08-31",
} as const;

// A committed figure outside its bound fails the BUILD.
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

function publishable(key: string, feed: number | null | undefined, origin: string): number | null {
  if (typeof feed !== "number" || !Number.isFinite(feed) || feed <= 0) {
    console.error(
      `site-stats (${origin}): ${key} has no usable value in the feed — it will not be published. ` +
        `Check the producer and the R2 object; do not substitute a constant.`,
    );
    return null;
  }
  if (!inBounds(key, feed)) {
    const [lo, hi] = BOUNDS[key];
    console.error(
      `site-stats (${origin}): feed ${key} = ${feed.toLocaleString()} is outside its bound ` +
        `[${lo.toLocaleString()}, ${hi.toLocaleString()}] — REJECTED and not published. ` +
        `Fix the producer; do not widen the bound.`,
    );
    return null;
  }
  return feed;
}

function noteDivergence(key: string, value: number | null, reference: number, origin: string): void {
  if (value === null) return;
  const drift = Math.abs(value - reference) / reference;
  if (drift > 0.2) {
    console.warn(
      `site-stats (${origin}): ${key} = ${value.toLocaleString()} differs from the last ` +
        `reconciliation (${reference.toLocaleString()}) by ${(drift * 100).toFixed(1)}%. ` +
        `Publishing the feed value. If this is a producer regression, fix it upstream; ` +
        `if it is real, update COMMITTED so the tripwire stays useful.`,
    );
  }
}

/**
 * Display formatter — THE OBSERVATORY'S FORMAT (2026-10-01, Peter): millions and
 * billions to one decimal, rounded, no "+". It matches formatCount in
 * lib/observatory-figures.ts exactly, so a figure the two sites both print reads
 * the same on both (the guard asserts the two agree).
 *
 * This REPLACES the old floor rule, which rounded down to the nearest ten million
 * ("360M+" for 368.9M) so the claim could never run ahead of reality. That
 * guarantee is traded for consistency: rounding to one decimal can overstate by
 * at most 50,000 domains (about 0.01%), and every figure carries its exact
 * count's source and measurement date beside it.
 *
 * Thousands still floor to whole thousands ("79k"): no Observatory figure is
 * compared with them.
 */
export function fmtStat(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}k`;
  return String(n);
}

const fmtOrNull = (n: number | null): string | null => (n === null ? null : fmtStat(n));

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

export type PublishedStatKey = "domainsMonitored" | "ipsHostingDomains" | "ipv4Indexed" | "networksProfiled";

/** Definitions travel WITH the value (WU-C3) — see lib/site-stats.ts. */
const DEFINITIONS: Record<PublishedStatKey, { label: string; definition: string }> = {
  domainsMonitored: {
    label: "Domains monitored",
    // Coverage-feed definition (RESOLVED or NODATA). Replaced by OBSERVATORY_DOMAINS_DEFINITION
    // whenever the figure comes from the Observatory's corpus_domains.
    definition:
      "Distinct domains that resolve — every name answering with a record or " +
      "an empty response. Names that no longer exist (NXDOMAIN) and names whose " +
      "servers failed or timed out are excluded, so this counts the live corpus " +
      "rather than every domain ever queried.",
  },
  ipsHostingDomains: {
    label: "IPs hosting domains",
    definition:
      "Distinct IPv4 addresses that a domain in the measured corpus resolves to, " +
      "taken over the same population as the domain figure above.",
  },
  ipv4Indexed: {
    label: "IPv4 addresses indexed",
    definition:
      "IPv4 space announced in BGP and attributed to a network, counted once per " +
      "address however many announcements cover it — a more-specific prefix inside " +
      "its parent is not counted twice.",
  },
  networksProfiled: {
    label: "Networks profiled",
    definition:
      "Autonomous systems with ownership and routing context attached, used to " +
      "place infrastructure in the network that announces it.",
  },
};

/**
 * The definition of the Observatory's corpus_domains (its method: resolution_status
 * = RESOLVED). Used whenever the domain figure is read from the Observatory, so the
 * number and the words describing it always come from the same source.
 */
export const OBSERVATORY_DOMAINS_DEFINITION =
  "Domains in the Datazag corpus whose latest resolution returned records. Names that no longer " +
  "exist (NXDOMAIN) and names whose servers failed are excluded. This is the figure the Datazag " +
  "Observatory publishes as its corpus count.";

/** Where the domain figure came from. */
export type DomainsSource = "observatory" | "coverage";

/**
 * Everything a page needs, as PLAIN DATA. It crosses the server→client
 * boundary (SiteStatsProvider), so it may hold no functions.
 */
export type SiteStats = {
  /** "live" when read from coverage.json at request time, "snapshot" when from the build. */
  origin: "live" | "snapshot";
  /** "observatory" when the domain figure is the Observatory's corpus_domains. */
  domainsSource: DomainsSource;
  SITE_STATS: {
    domainsMonitored: number;
    ipsHostingDomains: number | null;
    ipv4Indexed: number | null;
    networksProfiled: number | null;
    /** Whole-page convenience date (YYYY-MM-DD). Per-figure, use STATS_AS_OF. */
    statsAsOf: string | null;
  };
  DISPLAY_STATS: {
    domainsMonitored: string;
    ipsHostingDomains: string | null;
    ipv4Indexed: string | null;
    networksProfiled: string | null;
  };
  STATS_AS_OF: Record<PublishedStatKey, string | null>;
  PUBLISHED_STATS: Record<PublishedStatKey, PublishedStat>;
  /** Only the figures that have a value, a display and an as-of. Map over THIS. */
  publishedStats: Array<PublishedStat & { key: PublishedStatKey; display: string; measuredAt: string }>;
  DOMAINS_DISPLAY: string;
  DOMAINS_CORPUS_PHRASE: string;
  /** "30 September 2026", or "" when the feed carries no date. */
  statsAsOfLabel: string;
  /** Measured record age (hours) and its as-of, each null until the feed carries it. */
  recordAge: { p50Hours: number | null; p95Hours: number | null; asOf: string | null };
  /** When the feed file was built. Used to prefer the newer of live and snapshot. */
  feedUpdated: string | null;
};

function recordAgeHours(v: number | null | undefined): number | null {
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  return v >= RECORD_AGE_BOUNDS[0] && v <= RECORD_AGE_BOUNDS[1] ? v : null;
}

function asOfLabel(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Compute every published figure from a feed snapshot. Returns NULL when the
 * corpus figure is unpublishable: it appears in running prose across the site
 * and cannot be omitted there, so the caller must fall back (live) or fail the
 * build (snapshot) rather than render the word "null" into a sentence.
 */
export function computeSiteStats(
  feed: FeedStats,
  origin: SiteStats["origin"],
  domainsSource: DomainsSource = "coverage",
): SiteStats | null {
  const domainsMonitored = publishable("domainsMonitored", feed.domainsMonitored, origin);
  if (domainsMonitored === null) return null;

  const raw = {
    domainsMonitored,
    ipsHostingDomains: publishable("ipsHostingDomains", feed.ipsHostingDomains, origin),
    ipv4Indexed: publishable("ipv4Indexed", feed.ipv4Indexed, origin),
    networksProfiled: publishable("networksProfiled", feed.networksProfiled, origin),
    statsAsOf: feed.feedUpdated?.slice(0, 10) ?? null,
  };
  noteDivergence("domainsMonitored", raw.domainsMonitored, COMMITTED.domainsMonitored, origin);
  noteDivergence("ipsHostingDomains", raw.ipsHostingDomains, COMMITTED.ipsHostingDomains, origin);
  noteDivergence("ipv4Indexed", raw.ipv4Indexed, COMMITTED.ipv4Indexed, origin);
  noteDivergence("networksProfiled", raw.networksProfiled, COMMITTED.networksProfiled, origin);

  const display = {
    domainsMonitored: fmtStat(domainsMonitored),
    ipsHostingDomains: fmtOrNull(raw.ipsHostingDomains),
    ipv4Indexed: fmtOrNull(raw.ipv4Indexed),
    networksProfiled: fmtOrNull(raw.networksProfiled),
  };

  // A figure borrows no one else's freshness: its own as-of, else the file's build time.
  const asOf: Record<PublishedStatKey, string | null> = {
    domainsMonitored: feed.asOf?.domainsMonitored ?? feed.feedUpdated ?? null,
    ipsHostingDomains: feed.asOf?.ipsHostingDomains ?? feed.feedUpdated ?? null,
    ipv4Indexed: feed.asOf?.ipv4Indexed ?? feed.feedUpdated ?? null,
    networksProfiled: feed.asOf?.networksProfiled ?? feed.feedUpdated ?? null,
  };

  const published = Object.fromEntries(
    (Object.keys(DEFINITIONS) as PublishedStatKey[]).map((key) => [
      key,
      {
        ...DEFINITIONS[key],
        ...(key === "domainsMonitored" && domainsSource === "observatory"
          ? { definition: OBSERVATORY_DOMAINS_DEFINITION }
          : {}),
        value: raw[key],
        display: display[key],
        measuredAt: asOf[key],
      },
    ]),
  ) as Record<PublishedStatKey, PublishedStat>;

  const p50 = recordAgeHours(feed.recordAgeP50Hours);
  const p95 = recordAgeHours(feed.recordAgeP95Hours);
  const bothAges = p50 !== null && p95 !== null;

  return {
    origin,
    domainsSource,
    SITE_STATS: raw,
    DISPLAY_STATS: display,
    STATS_AS_OF: asOf,
    PUBLISHED_STATS: published,
    publishedStats: (Object.entries(published) as Array<[PublishedStatKey, PublishedStat]>)
      .filter(([, s]) => s.value !== null && s.display !== null && s.measuredAt !== null)
      .map(([key, s]) => ({ ...s, key, display: s.display as string, measuredAt: s.measuredAt as string })),
    DOMAINS_DISPLAY: display.domainsMonitored,
    DOMAINS_CORPUS_PHRASE: `${display.domainsMonitored} domain corpus`,
    statsAsOfLabel: asOfLabel(raw.statsAsOf),
    // The pair is all-or-nothing: one percentile without the other reads as a different claim.
    recordAge: {
      p50Hours: bothAges ? p50 : null,
      p95Hours: bothAges ? p95 : null,
      asOf: bothAges ? (feed.asOf?.recordAge ?? feed.feedUpdated ?? null) : null,
    },
    feedUpdated: feed.feedUpdated ?? null,
  };
}

/**
 * coverage.json → FeedStats. The same mapping scripts/refreshSiteStats.mjs
 * applies at build (keep the two in step; the guard pins this one). Bounds are
 * NOT applied here — computeSiteStats applies them, once, for both paths.
 */
export function parseCoverage(coverage: unknown, fetchedAt: string, source: string): FeedStats {
  const c = (coverage ?? {}) as Record<string, unknown>;
  const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null);
  const str = (v: unknown): string | null => (typeof v === "string" ? v : null);
  const asOfBlock = (c.as_of ?? {}) as Record<string, unknown>;
  const updated = str(c.updated);
  const asOf = (key: string, value: number | null) => (value === null ? null : str(asOfBlock[key]) ?? updated);

  const values = {
    domainsMonitored: num(c.domains),
    ipsHostingDomains: num(c.infrastructure_ips),
    ipv4Indexed: num(c.ips),
    networksProfiled: num(c.asns),
    recordAgeP50Hours: num(c.record_age_p50_hours),
    recordAgeP95Hours: num(c.record_age_p95_hours),
  };
  return {
    ...values,
    asOf: {
      domainsMonitored: asOf("domains", values.domainsMonitored),
      ipsHostingDomains: asOf("infrastructure_ips", values.ipsHostingDomains),
      ipv4Indexed: asOf("ips", values.ipv4Indexed),
      networksProfiled: asOf("asns", values.networksProfiled),
      recordAge:
        values.recordAgeP50Hours !== null && values.recordAgeP95Hours !== null
          ? asOf("record_age_p50_hours", values.recordAgeP50Hours)
          : null,
    },
    feedUpdated: updated,
    fetchedAt,
    source,
  };
}
