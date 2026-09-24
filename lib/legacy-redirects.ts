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

/**
 * GONE, not moved (spec §8, 23 Sep 2026).
 *
 * A 301 says "this moved, and here is where". For a claim we no longer make
 * that is the wrong sentence: /kyc redirecting to a live page reads as "our
 * KYC offering is over here", which is the implication being retired. 410 says
 * the page is gone and is not coming back — what we actually mean, and the
 * status on which search engines drop an indexed URL fastest.
 *
 * The KYC framing has to go twice over. The ESP brief forbids KYC as a claim,
 * and Datazag sells TO the vendors who perform KYC, so implying we do it
 * competes with the customers being pitched.
 *
 * Each path here needs a route handler returning 410 (app/kyc/route.ts).
 * Listing it here is what keeps it out of the sitemap.
 */
export type GoneRoute = {
  /** The retired path, exactly as it was indexed. */
  path: string;
  /** Why it is gone rather than redirected. */
  reason: string;
  /** The one line shown to a human who lands on it. */
  pointer: string;
};

export const GONE_ROUTES: GoneRoute[] = [
  {
    path: "/kyc",
    reason:
      "Datazag does not offer KYC, and sells to the vendors who do. A redirect would carry the claim to whatever page it landed on.",
    pointer:
      "Datazag does not offer KYC. If you assess the domains your senders use, the ESP page is the nearest thing we do offer.",
  },
];

/** Retired paths of either kind, for callers that only need membership. */
export const RETIRED_PATHS: ReadonlySet<string> = new Set([
  ...LEGACY_REDIRECTS.map((r) => r.source),
  ...GONE_ROUTES.map((r) => r.path),
]);

/** Normalizes "use-cases", "/use-cases" and "//use-cases" to "/use-cases". */
export function isRetiredPath(pathOrSlug: string): boolean {
  const path = `/${pathOrSlug.replace(/^\/+/, "")}`;
  return RETIRED_PATHS.has(path);
}
