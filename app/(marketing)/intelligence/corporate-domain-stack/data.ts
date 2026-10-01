/**
 * "The corporate domain stack" — the single source of every figure on the page.
 *
 * SOURCE: the CDN/DNS monoculture study, revision 2, results final 2026-09-11
 * (centralake /root/cdn_dns_results.json; brief at datazag-pipeline
 * work/cc-task-cdn-dns-monoculture.md). Text adapted from the study's outreach
 * note "The Corporate Domain Stack". Use ONLY rev 2: the 2026091[1a-d] sibling
 * files are snapshots from a fix chain and disagree with it.
 *
 * WHAT THIS PAGE MAY NOT SAY, per the study's own limits:
 *   - No change over time. There is no NS or edge history at the needed grain.
 *   - No resilience-tier or exit-friction weighting. This study has none (that
 *     model is the Cross-Estate report's, and it rates severity; see
 *     app/(marketing)/cyber-risk-underwriting/copy.ts).
 *   - Domains, never organisations. One company may hold hundreds of domains.
 *   - "Tracked" for the whole corpus, never "live": a tenth of it did not resolve.
 *   - CDN shares for the enterprise vendors are floors (apex evidence only).
 *   - .com carries no territory signal and is never ranked as a market.
 *
 * Deliberately NOT carried over from the outreach note:
 *   - its pipeline-speed figures (re-resolution rate, 30-day recency, dated
 *     2026-09-11). The site publishes live record age elsewhere; two differently
 *     dated freshness figures side by side read as a contradiction.
 *   - "no commercial relationship with any vendor named": not verifiable.
 *   - references to "The Corporate Mail Path" by title: it is not published here.
 */
export const STUDY = {
  slug: "corporate-domain-stack",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com",
  /** ISO publication date of this page. */
  publishedOn: "2026-10-01",
  /** Last day of the DNS and edge observation window. */
  observedTo: "2026-09-10",
  observedFrom: "2026-05-04",

  corpus: {
    tracked: 408_022_905,
    resolved: 367_238_077,
    notResolved: 40_784_828,
    operating: 285_659_182,
    corporate: 112_361_114,
    webDomains: 274_472_709,
  },

  headline: {
    oneCompanyThreeLayers: { domains: 22_975_657, share: "20.4%" },
    nsAndMail: "36.6%",
    cloudflareTriple: { domains: 1_402_264, share: "1.2%" },
    /** Of corporate domains routing mail through Cloudflare, share also on its NS and edge. */
    cloudflareMailAlsoNsEdge: "84%",
  },

  /** One company runs nameservers, website and mail: share of each market's corporate domains. */
  bundleByMarket: [
    { market: "France", domains: 1_819_661, share: "42.3%", leader: "OVHcloud" },
    { market: "Germany", domains: 8_032_534, share: "40.4%", leader: "IONOS" },
    { market: "Russia", domains: 2_084_175, share: "38.4%", leader: "Beget" },
    { market: "Switzerland", domains: 1_506_560, share: "33.8%", leader: "Hostpoint" },
    { market: ".eu", domains: 1_402_470, share: "29.9%", leader: "IONOS" },
    { market: "United Kingdom", domains: 3_607_307, share: "27.7%", leader: "IONOS" },
    { market: "Spain", domains: 992_585, share: "27.7%", leader: "IONOS" },
  ],

  edge: {
    frontedShare: "17.9%",
    fronted: 49_029_025,
    operators: [
      { name: "Cloudflare", pct: 94.11 },
      { name: "Fastly", pct: 2.84 },
      { name: "Amazon CloudFront", pct: 2.12 },
      { name: "Six others combined", pct: 0.93 },
    ],
    indonesiaFronted: "42%",
    germanyFronted: "5.5%",
    notChosen: 8_943_844,
    shopifyBlock: 5_235_782,
    cloudflareNsAlsoEdge: "83%",
  },

  dns: {
    singleOperator: "98.86%",
    twoOperators: "1.14%",
    deliberatePairsAtMost: "0.38%",
    registrarDefault: "36.6%",
    cloudflareAmongChosen: "one in four",
    unnamedOperatorShare: "13.6%",
    largestUnnamed: "0.7%",
    comLeaderShare: "27.2%",
  },

  /** Leading nameserver operator by national market (country-code domains only). */
  dnsByMarket: [
    { market: "Indonesia", domains: 517_528, leader: "Cloudflare", kind: "Managed DNS", share: "52.7%" },
    { market: "India", domains: 2_058_973, leader: "GoDaddy", kind: "Registrar default", share: "52.5%" },
    { market: "Canada", domains: 2_824_518, leader: "GoDaddy", kind: "Registrar default", share: "42.7%" },
    { market: "United States (.us)", domains: 1_288_810, leader: "GoDaddy", kind: "Registrar default", share: "42.7%" },
    { market: "Slovakia", domains: 457_142, leader: "WebSupport", kind: "Hosting", share: "41.7%" },
    { market: "Russia", domains: 5_075_486, leader: "REG.RU", kind: "Registrar default", share: "36.2%" },
    { market: "France", domains: 2_699_696, leader: "OVHcloud", kind: "Hosting", share: "35.4%" },
    { market: "Italy", domains: 2_576_696, leader: "Aruba", kind: "Hosting", share: "30.7%" },
    { market: "United Kingdom", domains: 7_645_656, leader: "GoDaddy", kind: "Registrar default", share: "30.7%" },
    { market: "Brazil", domains: 3_208_402, leader: "Registro.br", kind: "Registry-provided", share: "26.4%" },
  ],
} as const;

export const studyUrl = () => `${STUDY.siteUrl}/intelligence/${STUDY.slug}`;

export const fmt = (n: number) => n.toLocaleString("en-US");

/** "10 September 2026" */
export function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
