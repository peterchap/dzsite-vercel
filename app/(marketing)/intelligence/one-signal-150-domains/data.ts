/**
 * "One Signal, 150 Domains" case study — single source of the facts (WU23).
 *
 * Shared by the page, its generated OG image, and the homepage teaser card so
 * the stat triptych and headline never drift. Rebuilt native and on-domain from
 * the original artifact, with the WU23 §3 mandatory edits applied:
 *  - Spamhaus corroboration moved into section 01 (circularity fix, §3.1)
 *  - "0 in public DOMAIN feeds" everywhere (§3.2)
 *  - "IP reputation 95/100" → "Abuse score 95 / 100" (§3.3)
 *  - H1 "crime host" → "criminal hosting cluster" (§3.4)
 *  - dated flag / sweep / feed check / publication (§3.5)
 */

export const CASE_STUDY = {
  slug: "one-signal-150-domains",
  section: "/intelligence",
  path: "/intelligence/one-signal-150-domains",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://datazag.com",

  triptych: [
    { n: "1", k: "signal detected" },
    { n: "150", k: "domains uncovered" },
    { n: "0", k: "in public domain feeds" },
  ],

  teaserLine:
    "One certificate unravelled a 150-domain criminal hosting cluster — none of it in public domain feeds.",

  timestamps: {
    flagged: "Flagged 14 July 2026",
    feedsChecked: "Feeds checked 14 July 2026 09:00 UTC",
    sweptShort: "14 July 2026",
    feedSnapshot: "14 July 2026 09:00 UTC",
    publishedShort: "14 July 2026",
  },

  // Section 02 — the 5-step pivot sequence (the page's hero visual).
  pivotSteps: [
    { n: "01", action: "Start from the one flagged domain", aside: "→ its hosting network", result: "AS213790" },
    { n: "02", action: "Expand to the network's registered address space", aside: "", result: "5 × /24 · 1,270 IPs" },
    { n: "03", action: "Sweep every address for a live TLS service", aside: "", result: "171 responding" },
    { n: "04", action: "Read the certificate each host presents", aside: "— the names behind the IPs", result: "63 serving certs" },
    { n: "05", action: "Harvest the certificate domain names", aside: "", result: "→ 150 domains" },
  ],

  // Section 03 — inventory grid (2×3 desktop / 1-col mobile), indicators defanged.
  categories: [
    {
      title: "Financial & crypto phishing",
      text: "Credential-harvest lookalikes for banks and exchanges.",
      iocs: ["*.mabanqueparibas[.]com", "coinspot[.]support"],
    },
    {
      title: "Brand-impersonation certificates",
      text: "Forged certs naming brands they can't legitimately serve.",
      iocs: ["*.samsung.com (+50 SANs)", "www.apple.com", "ms-telemtry[.]com"],
    },
    {
      title: "Government & benefit scams",
      text: "The lead that started it all — a fake U.S. Social Security Administration portal.",
      iocs: ["e-socialstatement[.]com"],
    },
    {
      title: "Criminal marketplaces",
      text: "Stolen-card and narcotics storefronts.",
      iocs: ["carderz[.]to", "drugmaniac[.]to", "breakingbad[.]ws"],
    },
    {
      title: "Malware & stealer panels",
      text: "Command panels and stealer-log tooling.",
      iocs: ["apilogtool[.]online", "soft-setup[.]com", "panel.win-tools[.]net"],
    },
    {
      title: "Spam & anonymity infrastructure",
      text: "Bulk mailers, proxy services, a Tor hidden service.",
      iocs: ["smtp-zone[.]su", "proxiesfood[.]com", "*.onion"],
    },
  ],

  // Section 04 — Datazag vs public feeds comparison.
  comparison: [
    {
      label: "150 attacking domains",
      metric: "listed in public domain feeds",
      datazag: "150 found",
      feedWho: "Public feeds",
      feed: "0 listed",
      feedPct: 0,
    },
    {
      label: "5 malicious netblocks",
      metric: "flagged by public IP reputation lists",
      datazag: "5 mapped",
      feedWho: "Spamhaus / FireHOL",
      feed: "2 listed",
      feedPct: 40,
    },
  ],
} as const;

export function caseStudyUrl(): string {
  return `${CASE_STUDY.siteUrl.replace(/\/$/, "")}${CASE_STUDY.path}`;
}
