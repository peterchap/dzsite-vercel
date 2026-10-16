/**
 * "Who Really Runs Business Email?" — The State of Email Infrastructure 2026.
 *
 * The report is a fixed snapshot (Observatory, 8 October 2026), so its figures are
 * published values, held here once and read by the page and the share card. They are
 * the report's own numbers: change them only with the report.
 *
 * Page images and the PDF are rendered from the design canvas
 * ("Who Really Runs Business Email? — Publication") into public/insights/<slug>/.
 */
export const REPORT = {
  slug: "who-really-runs-business-email",
  title: "Who Really Runs Business Email?",
  series: "The State of Email Infrastructure 2026",
  publishedOn: "2026-10-15",
  snapshot: "8 October 2026",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com",
} as const;

export const reportUrl = () => `${REPORT.siteUrl}/insights/${REPORT.slug}`;

const ASSETS = `/insights/${REPORT.slug}`;
export const REPORT_PDF = `${ASSETS}/who-really-runs-business-email-datazag-2026.pdf`;
export const pageImage = (n: number) => `${ASSETS}/page-${String(n).padStart(2, "0")}.webp`;

/** The headline figures, as the report states them (page 2). */
export const HEADLINES = {
  namedProviders: "53.8%",
  microsoftToGoogleTop1000: "9 : 1",
  dmarcTop1000: "73.3%",
  dmarcNamedProvider: "14.2%",
  gatewayTop1000: "37.6%",
  gatewayCorporate: "2.34%",
} as const;

/** The five findings (page 5), in the report's words. */
export const FINDINGS = [
  {
    title: "Microsoft dominates big business. At internet scale, it is level with Google.",
    text: "Google runs 12.16% of corporate mail domains and Microsoft 11.92%. Among the Top 1000 companies, Microsoft appears in 32.6% of MX records and Google in 3.7%.",
  },
  {
    title: "Hosting companies are the overlooked giants of business email.",
    text: "They handle 53.8% of corporate mail domains, against 24% for Microsoft and Google together. None appears in a Top 1000 list.",
  },
  {
    title: "Dedicated gateways are an enterprise layer.",
    text: "37.6% of Top 1000 companies route mail through one, against 2.34% of corporate mail domains.",
  },
  {
    title: "DMARC adoption is not DMARC protection.",
    text: "73.3% of Top 1000 domains enforce DMARC at quarantine or reject. Across mail domains with a named provider, 14.2% do.",
  },
  {
    title: "Provider defaults appear to set the outcome.",
    text: "Two brands in one hosting group show it best: 1&1 enforces DMARC on 0.8% of its domains, Strato on 97.8%.",
  },
] as const;

/** Page labels, in order: the alt text of each page image. */
export const PAGES = [
  "Cover",
  "At a glance",
  "Executive summary and contents",
  "How to read this research",
  "What we found, and why it matters",
  "Chapter 01: Microsoft dominates big business. The wider internet tells another story.",
  "Chapter 01: two views of email infrastructure, and the evidence behind the gateway",
  "Chapter 01: why the Top 1000 leans to Microsoft, and the next 1,000",
  "Chapter 02: there is no single global email market",
  "Chapter 03: the overlooked giants of business email",
  "Chapter 03: the mechanism is the bundle",
  "Chapter 04: why enterprise email security looks different",
  "Chapter 05: DMARC adoption is not DMARC protection",
  "Chapter 05: case study, how provider defaults shape security outcomes",
  "Chapter 05: why the gap matters",
  "Chapter 06: the millions of mail domains hiding in plain sight",
  "Chapter 06: own-domain MX is not the same as self-hosting",
  "Chapter 06: the tail is concentrated enough to name",
  "Chapter 07: what it means",
  "Research populations and methodology",
  "What this measures and what it does not, and sources",
  "From internet-wide measurements to intelligence you can use",
] as const;
