/**
 * Canonical site statistics — single source of truth (WU25 §2).
 *
 * The corpus domain figure had drifted across the site (326M ticker, 340M+
 * engine, 315M+ MSSP, 310M legacy). The live figure from DuckLake is ~368M
 * unique domains. Every surface (homepage ticker, engine section, MSSP/ESP
 * pages, pricing, OG descriptions, docs) MUST import from here — no corpus
 * number is ever typed into page copy again.
 *
 * Rule: the DISPLAY figure rounds DOWN from the real figure. Headroom means the
 * public claim is never accidentally ahead of reality between refreshes. Never
 * round up.
 *
 * A CI guard (scripts/guards/checkCorpusDrift.mjs, `npm run guard`) fails the
 * build if a corpus literal (/\d{3}M/) appears in app/ or components/ source
 * outside this module.
 */

/** Raw figures, as most recently reconciled against DuckLake. */
export const siteStats = {
  /** Unique domains monitored in the corpus. */
  domainsMonitored: 368_000_000,
  /** IPv4 addresses currently linked to domains in the corpus. */
  ipsHosting: 10_500_000,
  /** Total IPv4 space indexed for context and correlation. */
  ipv4Indexed: 3_200_000_000,
  /** ASNs profiled for ownership and routing context. */
  networksProfiled: 184_000,
  /** ISO date the figures above were last reconciled. */
  statsAsOf: "2026-07-14",
} as const;

/**
 * Display string for the corpus domain figure. Derived from
 * siteStats.domainsMonitored (368M) rounded DOWN to 360M+. This is the only
 * approved way to render the corpus size in copy.
 */
export const DOMAINS_DISPLAY = "360M+";

/** "360M+ domain" — for the "…-domain corpus" phrasing used in several sections. */
export const DOMAINS_CORPUS_PHRASE = `${DOMAINS_DISPLAY} domain corpus`;

/** Human date for surfaces that want to cite freshness, e.g. "14 July 2026". */
export function statsAsOfLabel(): string {
  const d = new Date(siteStats.statsAsOf + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return siteStats.statsAsOf;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
