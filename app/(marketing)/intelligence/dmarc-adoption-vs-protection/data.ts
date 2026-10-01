/**
 * "DMARC: adoption against protection" — the single source of every figure on the page.
 *
 * SOURCE: the email-posture census, run 2026-10-01 13:52–14:19 UTC by the email
 * research series (centralake /root/emailseries/census_posture.json, with the
 * exact query in census_posture.py and the run log in census.log). Read from
 * lake.gold.dns_wide at catalog snapshot 1728316, per file with delete vectors
 * applied: 457,749,012 file rows − 39,796,512 deleted = 417,952,500 live rows,
 * all 108 files processed. No sampling.
 *
 * TWO POPULATIONS. Never mix them in one claim.
 *   PRIMARY — "resolving, unparked" (Peter, 2026-10-01: exclude parked):
 *     domain = apex AND resolution_status = 'RESOLVED' AND NOT coalesce(is_parked,false)
 *     AND NOT a registry-wildcard phantom.   n = 327,769,422
 *   CORPORATE — the primary predicate AND has_a AND a usable MX (null MX '.'
 *     counts as unusable) AND SPF present.   n = 114,088,692
 * The primary population includes domains that send no mail, many of which
 * publish p=reject defensively or as a registrar default. That lifts its
 * enforcement share without anyone protecting a live mail stream, so for
 * claims about organizations' mail the corporate pair is the honest one.
 *
 * DEFINITIONS: DMARC from dmarc_record with an anchored p= parse; "enforcing" =
 * p=quarantine or p=reject; SPF -all = the record's final all-qualifier is -all;
 * MTA-STS = mta_sts_mode 'enforce'; BIMI = bimi_record non-empty.
 *
 * LIMITS the page must carry:
 *   - Each value is that domain's latest observation, not a single-day snapshot:
 *     the corpus is re-resolved on a rolling cycle of roughly 30–45 days.
 *   - is_parked misses some for-sale parking (about 12.1M domains on for-sale
 *     nameservers in the 2026-09-11 study), so some parked domains remain in the
 *     primary population. The effect is not measured.
 *   - High-DNSSEC and high-reject markets reflect registry and registrar defaults:
 *     frame them as a territory's estate, not as organizations' decisions.
 *   - Market = last label of the registrable domain (Public Suffix List, so
 *     co.uk → uk). Rankings use markets of 200,000 domains or more and exclude
 *     generic-use ccTLDs (.co .io .ai .me .tv). .cc, .sh and .cn are also left out,
 *     with the reason stated on the page (Peter, 2026-10-01): .cc and .sh behave as
 *     generic-use (SPF 7.6% and 5.2%); .cn is a real territory dominated by domains
 *     that send no mail (SPF 5.5%).
 *   - The .ph registry-wildcard topic is embargoed: never named here. Its
 *     phantom domains are filtered by the predicate above.
 */
export const STUDY = {
  slug: "dmarc-adoption-vs-protection",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com",
  publishedOn: "2026-10-01",
  /** The day the census was taken. Values are each domain's latest observation. */
  censusOn: "2026-10-01",

  primary: { n: 327_769_422 },
  corporate: { n: 114_088_692 },

  /** Global figures: [label, primary, corporate]. Shares as published by the census. */
  global: [
    { label: "SPF published", primary: "42.69%", corporate: "100% (by definition)" },
    { label: "SPF ends in -all", primary: "14.32%", corporate: "26.02%" },
    { label: "DMARC published", primary: "25.31%", corporate: "45.37%" },
    { label: "DMARC enforcing (quarantine or reject)", primary: "13.13%", corporate: "14.92%" },
    { label: "  of which p=reject", primary: "6.18%", corporate: "6.29%" },
    { label: "  of which p=quarantine", primary: "6.95%", corporate: "8.62%" },
    { label: "DMARC p=none (reports only)", primary: "12.17%", corporate: "30.44%" },
    { label: "DMARC reporting address (rua)", primary: "10.65%", corporate: "14.57%" },
    { label: "MTA-STS enforcing", primary: "0.044%", corporate: "0.106%" },
    { label: "DNSSEC signed", primary: "8.83%", corporate: "10.60%" },
    { label: "BIMI published", primary: "0.053%", corporate: "0.136%" },
  ],

  headline: {
    primaryPublish: 25.31,
    primaryEnforce: 13.13,
    primaryNone: 12.17,
    primaryEnforceOfPublishers: "51.9%",
    corporatePublish: 45.37,
    corporateEnforce: 14.92,
    corporateNone: 30.44,
    corporateEnforceOfPublishers: "32.9%",
    spfPrimary: 42.69,
  },

  /** Germany, p=reject only: the defensive-reject effect between the two populations. */
  deReject: { primary: "18.1%", corporate: "5.9%" },

  /** Primary population, DMARC enforcing, markets ≥ 200k domains. */
  primaryTop: [
    { market: "Netherlands", share: "33.3%" },
    { market: "Switzerland", share: "32.0%" },
    { market: "India", share: "29.2%" },
    { market: "Poland", share: "27.1%" },
    { market: "Norway", share: "24.9%" },
    { market: "Germany", share: "21.6%" },
    { market: "Brazil", share: "21.2%" },
  ],
  primaryBottom: [
    { market: "South Korea", share: "2.1%" },
    { market: "Russia", share: "3.6%" },
    { market: "Iran", share: "4.0%" },
    { market: "Vietnam", share: "4.0%" },
    { market: "Ukraine", share: "4.8%" },
    { market: "Italy", share: "5.8%" },
    { market: "Indonesia", share: "6.1%" },
  ],
  /** Primary population: published against enforcing, for markets readers will look for. */
  primarySelected: [
    { market: "Germany", published: "46.5%", enforcing: "21.6%" },
    { market: "Italy", published: "45.6%", enforcing: "5.8%" },
    { market: "France", published: "37.2%", enforcing: "13.7%" },
    { market: "United Kingdom", published: "33.3%", enforcing: "14.4%" },
    { market: "Australia", published: "30.8%", enforcing: "16.0%" },
    { market: "United States (.us)", published: "22.1%", enforcing: "13.3%" },
  ],
  gtlds: { com: "12.6%", net: "12.5%", org: "12.6%", other: "11.1%" },

  /** SPF published, primary population, for the three markets left out of rankings (Peter, 2026-10-01). */
  excluded: { cc: "7.6%", sh: "5.2%", cn: "5.5%" },

  /** Corporate population, DMARC enforcing, markets ≥ 200k domains. */
  corporateTop: [
    { market: "Denmark", share: "36.2%" },
    { market: "Switzerland", share: "35.2%" },
    { market: "Poland", share: "33.7%" },
    { market: "Norway", share: "32.9%" },
    { market: "Netherlands", share: "28.0%" },
    { market: "India", share: "25.7%" },
    { market: "Slovakia", share: "24.3%" },
  ],
  corporateBottom: [
    { market: "Italy", share: "5.3%", note: "60.9% publish; 55.6% are p=none" },
    { market: "Japan", share: "5.6%" },
    { market: "Russia", share: "6.7%" },
    { market: "Iran", share: "7.2%" },
    { market: "Hungary", share: "8.4%" },
    { market: "Argentina", share: "9.0%", note: "67.2% publish" },
  ],
  corporateSelected: [
    { market: "United Kingdom", published: "52.7%", enforcing: "14.5%" },
    { market: "Germany", published: "54.1%", enforcing: "10.9%" },
    { market: ".com", published: "42.6%", enforcing: "15.1%" },
  ],

  /** Primary population, DNSSEC signed. Follows registry policy and pricing. */
  dnssecTop: [
    { market: "Denmark", share: "71.1%" },
    { market: "Czechia", share: "69.0%" },
    { market: "Sweden", share: "63.8%" },
    { market: "Netherlands", share: "63.3%" },
    { market: "Slovakia", share: "61.6%" },
    { market: "Norway", share: "60.0%" },
    { market: "Switzerland", share: "57.2%" },
  ],
  dnssecLow: [
    { market: "United Kingdom", share: "4.6%" },
    { market: "Germany", share: "3.7%" },
    { market: "Australia", share: "2.3%" },
  ],
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
