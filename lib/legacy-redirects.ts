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
    source: "/samples/cross-estate-domain-risk-report.html",
    destination: "/samples/estate-attack-surface-report.html",
    reason: "The Cross-Estate Domain Risk Report was renamed the Organization estate report on 2026-10-07; the sample moved with it. Links to the old URL keep working.",
  },
  {
    source: "/legacy-home",
    destination: "/",
    reason: "A noindex reference copy of the old homepage, with the old positioning and API claims. Its page was deleted on 2026-10-02.",
  },
  {
    source: "/home",
    destination: "/",
    reason: "An alias for the homepage. Was a page that redirected on render; a 301 says the same without a route.",
  },
  {
    source: "/internet-never-stands-still",
    destination: "/",
    reason: "An old campaign path. Was a page that redirected on render; a 301 says the same without a route.",
  },
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
  {
    source: "/infrastructure-intelligence",
    destination: "/datasets",
    reason:
      "It was an overview of the datasets under a product name, and 'Infrastructure Intelligence' collides with the site-wide intelligence positioning. /datasets is the one canonical datasets overview, with live coverage and honest per-route availability (2026-09-28).",
  },
  {
    source: "/domain-intelligence",
    destination: "/datasets",
    reason: "Older name for the same datasets overview; previously redirected to /infrastructure-intelligence. Points straight at /datasets to avoid a chain.",
  },

  // ── 2026-09-28: legacy CMS pages retired for unmeasured claims ─────────────
  // Pre-repositioning Sanity `page` docs rendered by [...slug], live and in the
  // sitemap, carrying claims the site no longer makes (see lib/fp-status.ts).
  // Retired rather than patched, with founder sign-off. The CMS docs are left in
  // place, so removing an entry here brings a page back exactly as it was.
  {
    source: "/phishing-alerts",
    destination: "/alerts",
    reason: "Claimed a sub-minute detection latency, a two-hour detection window, a thousand-to-ten alert reduction and alert confidence. None is measured.",
  },
  {
    source: "/security-teams",
    destination: "/alerts",
    reason: "Claimed a false-positive figure under five percent and a two-hour detection window, both unmeasured. The hero also carried stray text.",
  },
  {
    source: "/incident-intelligence",
    destination: "/alerts",
    reason: "Old incident-report explainer from the previous positioning; /alerts documents what an alert contains.",
  },
  {
    source: "/mssp-partner-faq",
    destination: "/mssp-partners",
    reason: "Claimed MSSPs can 'detect phishing and brand abuse before email delivery', a detection and lead-time claim held pending FP measurement.",
  },
  {
    source: "/home2",
    destination: "/",
    reason: "A second, older homepage that was still indexed.",
  },
  {
    source: "/founding-program",
    destination: "/pricing",
    reason: "Published '40-50% below future standard rates' and '40-50% margins', commercial terms the partner pages say are handled privately.",
  },

  // ── 2026-09-28: nav brief page-inventory reconciliation ────────────────────
  // Pages that were in the sitemap but mapped to no nav item, because each is
  // a duplicate or an empty stub of a canonical page. One home per concept.
  {
    source: "/contact-us",
    destination: "/contact",
    reason: "A second contact page (CMS). /contact is the canonical form.",
  },
  {
    source: "/partner",
    destination: "/mssp-partners",
    reason: "Legacy partner page selling 'real-time phishing detection'. The partner offer now lives on the segment pages.",
  },
  {
    source: "/health-report",
    destination: "/#free-report",
    reason: "A stub that only carried a heading. The free report form lives on the homepage.",
  },
  {
    source: "/q1-2026-platform-impersonation-analysis",
    destination: "/observatory",
    reason: "An empty CMS page that rendered 'No content found yet. Add a hero or sections in Studio.' to visitors. Published findings live in the Observatory.",
  },
  {
    source: "/intelligence",
    destination: "/blog",
    reason: "The research index duplicated /blog, which already lists every research piece. Merged 2026-10-01. Pieces keep their /intelligence/<slug> URLs, which the Observatory registry links to.",
  },
  {
    source: "/docs/search-stream",
    destination: "/docs",
    reason: "Webhook reference for alert delivery. The API docs and the webhook reference were removed from /docs on 2026-10-01; the remaining docs cover reports and datasets.",
  },
  {
    source: "/domain-search",
    destination: "/datasets",
    reason: "Old light-theme lookup-results page ('Domain Intelligence'), reached only from the legacy DomainLookup CMS block, which now appears only on a page that already redirects. Retired 2026-09-29; domain data is offered through /datasets.",
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
