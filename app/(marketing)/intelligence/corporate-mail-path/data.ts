/**
 * "The corporate mail path" — the single source of every figure on the page.
 *
 * SOURCE: the email-gateway accumulation study, observed 2026-09-08 (centralake
 * /root/accum_results_v2.json, the population posture baseline; per the email
 * research series, 2026-10-01). Text adapted from the study's outreach note
 * "The Corporate Mail Path" (artifact, rev 2026-09-14).
 *
 * POPULATION: "corporate" — accepts mail (a usable MX), not parked, resolves a
 * website (A record), publishes SPF. 112,873,998 domains on 2026-09-08. This is
 * the same definition as the DMARC post's "domains that run mail", measured on a
 * different date (114,088,692 on 2026-10-01), so baselines differ slightly
 * between the two pages and each states its own date.
 *
 * Deliberately NOT carried over from the outreach note:
 *   - "405,558,480 resolved domains": that is the not-deleted row count, not the
 *     resolving corpus. The page names only the corporate population.
 *   - pipeline-speed figures (re-resolution rate, 30-day recency): dated
 *     2026-09-08, they read against the live record-age line elsewhere.
 *   - "74.9% appeared in certificate transparency before the zone files":
 *     an earlier-than comparison, held by the claim rules.
 *   - zone-file entry/exit churn and the 19-day operator-migration count: the
 *     note gives no dates for the window, and the page claims no change over time.
 *   - "re-rated between renewals", "compared against three months ago": change
 *     claims the page does not make.
 *   - "no commercial relationship with any vendor named": not verifiable.
 *   - the "run it on your own portfolio" extract offer: not confirmed as a
 *     service (2026-10-01). Add it back only once it is one.
 *   - "severity weighting" as a product feature: the study reports DMARC
 *     enforcement per vendor estate; it computes no weighting.
 */
export const STUDY = {
  slug: "corporate-mail-path",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com",
  /** Peter, 2026-10-01: fortnightly slot 3. */
  publishedOn: "2026-10-29",
  observedOn: "2026-09-08",

  corporate: { n: 112_873_998 },

  layers: {
    gateway: { domains: 2_482_563, share: 2.2, vendors: 80, top3: "61.3%", hhi: "2,581" },
    mailbox: { share: 24.0, microsoft: "12.0%", google: "12.0%" },
    singleOperator: "98.4%",
    globalGatewayLeader: "49.0%",
    gatewayInCom: "55.6%",
    namedOperatorShare: "72%",
    largestUnattributed: "0.029%",
  },

  /** Leading email security gateway by national market, share of that market's gateway-fronted domains. */
  gatewayByMarket: [
    { market: "Slovakia", domains: 22_606, leader: "MX Hub", share: "95.8%", runnerUp: "Proofpoint", runnerShare: "1.5%" },
    { market: "Sweden", domains: 99_388, leader: "Loopia", share: "94.7%", runnerUp: "Ziff Davis", runnerShare: "1.5%" },
    { market: "South Africa", domains: 77_488, leader: "N-able", share: "83.3%", runnerUp: "Mimecast", runnerShare: "10.4%" },
    { market: "Netherlands", domains: 50_383, leader: "SolarWinds", share: "55.8%", runnerUp: "Antispam Login", runnerShare: "16.0%" },
    { market: "Germany", domains: 89_565, leader: "Hornetsecurity", share: "55.6%", runnerUp: "SolarWinds", runnerShare: "9.7%" },
    { market: "Canada", domains: 35_682, leader: "Proofpoint", share: "51.4%", runnerUp: "Megamailservers", runnerShare: "13.6%" },
    { market: "France", domains: 33_640, leader: "mailinblack", share: "40.4%", runnerUp: "Vade Secure", runnerShare: "15.4%" },
    { market: "Italy", domains: 18_499, leader: "Ilger", share: "39.0%", runnerUp: "Proofpoint", runnerShare: "13.7%" },
    { market: "Australia", domains: 63_512, leader: "Proofpoint", share: "32.2%", runnerUp: "SolarWinds", runnerShare: "24.8%" },
    { market: "United Kingdom", domains: 106_321, leader: "Proofpoint", share: "26.5%", runnerUp: "Mimecast", runnerShare: "20.3%" },
  ],

  /** Corporate domains whose inbound mail runs through Microsoft or Google. */
  mailboxByMarket: [
    { market: "Australia", domains: 1_365_901, microsoft: "38.5%", google: "15.9%", combined: "54.4%" },
    { market: "Canada", domains: 1_138_934, microsoft: "27.2%", google: "14.6%", combined: "41.7%" },
    { market: ".com", domains: 51_303_552, microsoft: "14.4%", google: "16.8%", combined: "31.2%" },
    { market: "United Kingdom", domains: 3_617_238, microsoft: "19.5%", google: "8.8%", combined: "28.3%" },
    { market: "Belgium", domains: 686_440, microsoft: "20.2%", google: "5.6%", combined: "25.8%" },
    { market: "Netherlands", domains: 2_392_714, microsoft: "15.4%", google: "4.7%", combined: "20.0%" },
    { market: "South Africa", domains: 735_005, microsoft: "10.6%", google: "3.4%", combined: "14.0%" },
    { market: "France", domains: 1_824_644, microsoft: "7.0%", google: "4.4%", combined: "11.4%" },
    { market: "Germany", domains: 8_044_353, microsoft: "7.3%", google: "1.5%", combined: "8.8%" },
  ],

  /** Share of each gateway's customer domains that also run Microsoft 365 behind it. */
  pairing: [
    { vendor: "Barracuda", pct: 77.0 },
    { vendor: "Hornetsecurity", pct: 63.5 },
    { vendor: "Mimecast", pct: 51.6 },
    { vendor: "Proofpoint", pct: 14.2 },
    { vendor: "Loopia", pct: 0.6 },
    { vendor: "N-able", pct: 0.3 },
  ],
  pairedDomains: { barracudaM365: "about 99,600", mimecastM365: "about 84,400" },

  /** Each vendor's customer estate — configured by the domain owner, not the vendor. */
  estates: [
    { operator: "Proofpoint", domains: 1_216_970, single: "97.3%", publishes: "45.7%", enforces: "31.4%" },
    { operator: "Mimecast", domains: 163_449, single: "94.3%", publishes: "67.3%", enforces: "43.3%" },
    { operator: "Loopia", domains: 142_245, single: "99.7%", publishes: "6.8%", enforces: "0.9%" },
    { operator: "SolarWinds", domains: 140_869, single: "95.0%", publishes: "41.7%", enforces: "13.7%" },
    { operator: "Barracuda", domains: 129_365, single: "92.0%", publishes: "67.7%", enforces: "34.8%" },
    { operator: "Hornetsecurity", domains: 105_582, single: "92.7%", publishes: "65.3%", enforces: "42.7%" },
    { operator: "N-able", domains: 81_257, single: "77.5%", publishes: "26.3%", enforces: "3.6%" },
    { operator: "Zix", domains: 55_425, single: "95.5%", publishes: "49.3%", enforces: "23.8%" },
    { operator: "Trend Micro", domains: 40_086, single: "78.6%", publishes: "58.2%", enforces: "31.0%" },
    { operator: "Megamailservers", domains: 39_578, single: "98.6%", publishes: "8.4%", enforces: "2.3%" },
    { operator: "Sophos", domains: 30_283, single: "87.3%", publishes: "60.2%", enforces: "35.4%" },
    { operator: "MX Hub", domains: 28_414, single: "98.6%", publishes: "95.9%", enforces: "0.8%" },
  ],
  baseline: { publishes: "44.4%", enforces: "14.5%", gatewaySegmentEnforces: "27.6%" },
} as const;

export const studyUrl = () => `${STUDY.siteUrl}/intelligence/${STUDY.slug}`;

export const fmt = (n: number) => n.toLocaleString("en-US");

export function longDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
