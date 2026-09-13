/**
 * LEGACY SURFACE 301 MAP (WU-C5) — the only place retired routes are listed.
 *
 * Pages that survived from the previous site. They were still indexed and still
 * carrying old-site framing ("Log Analytics", email-validation use cases), so
 * they are retired with permanent redirects rather than left to rot.
 *
 * Both consumers read this module, so a route can never be redirected in
 * next.config.ts while still being advertised in the sitemap:
 *   - next.config.ts  issues the 301s
 *   - app/sitemap.ts  excludes these sources from /sitemap.xml
 *
 * Adding a retired route here is the whole change — nothing else to update.
 */
export type LegacyRedirect = {
  /** The retired path, exactly as it was indexed. */
  source: string;
  /** Where that audience should land now. */
  destination: string;
  /** Why this target, so the choice survives the next reviewer. */
  reason: string;
};

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  {
    source: "/use-cases",
    destination: "/how-it-works",
    reason:
      "Rebuilt as an empty stub with a localhost canonical; /how-it-works carries the real explanation.",
  },
  {
    source: "/kyc",
    destination: "/contact",
    reason:
      "Old-site KYC framing. WU-C7 defers /enterprise, so this routes to a human rather than into a skeleton page.",
  },
  {
    source: "/cloud-marketplaces",
    destination: "/datasets",
    reason: "Marketplace availability is documented per dataset on /datasets.",
  },
  {
    source: "/log-analytics-threat-intelligence",
    destination: "/alerts",
    reason: "\"Log Analytics\" is retired lexicon (WU-C4); the live equivalent is /alerts.",
  },
];

/** Retired paths, for callers that only need to test membership. */
export const LEGACY_REDIRECT_SOURCES: ReadonlySet<string> = new Set(
  LEGACY_REDIRECTS.map((r) => r.source),
);

/** Normalises "use-cases", "/use-cases" and "//use-cases" to "/use-cases". */
export function isLegacyRedirectSource(pathOrSlug: string): boolean {
  const path = `/${pathOrSlug.replace(/^\/+/, "")}`;
  return LEGACY_REDIRECT_SOURCES.has(path);
}
