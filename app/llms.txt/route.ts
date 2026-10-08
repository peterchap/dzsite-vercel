/**
 * /llms.txt — a plain-Markdown description of Datazag for language models.
 *
 * WHY (2026-10-01): answer engines describe the company from whatever they can
 * find, and the most visible third-party pages (Datarade, saasbrowser) describe
 * the previous business with stale figures. This is the company's own summary,
 * in the llmstxt.org shape. No major engine has committed to reading it, so it
 * is cheap insurance, not a channel.
 *
 * A ROUTE, NOT A STATIC FILE, so the figures come from the live feed (hourly,
 * lib/site-stats-live.ts) with their definitions and measurement dates. A
 * static file would carry a number that drifts further from the truth every
 * day — the same failure it exists to correct in other people's listings.
 *
 * Same claim rules as every page: nothing here that the site does not already
 * say, and no figure without its definition and date.
 */
import { LEGAL_ENTITY } from "@/lib/legal-entity";
import { getSiteStats, STATS_REVALIDATE_SECONDS } from "@/lib/site-stats-live";

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";
const link = (title: string, path: string, note: string) => `- [${title}](${SITE}${path}): ${note}`;

export async function GET() {
  const stats = await getSiteStats();

  const figures = stats.publishedStats.map(
    (s) => `- ${s.label}: ${s.display}. ${s.definition} Measured ${s.measuredAt.slice(0, 10)}.`,
  );

  const body = [
    "# Datazag",
    "",
    "> Datazag is an internet infrastructure intelligence company. It measures domains, DNS, mail and " +
      "email-authentication records, certificates, hosting and routing across the internet every day, links " +
      "them together, and explains what they mean for a domain, an organization or a portfolio.",
    "",
    `${LEGAL_ENTITY.legalName} is registered in ${LEGAL_ENTITY.jurisdiction}, company number ${LEGAL_ENTITY.companyNumber}. ` +
      `The official site is ${SITE}.`,
    "",
    "## Coverage",
    "",
    "Measured figures, read from the live coverage feed. They change daily: cite them with their date.",
    "",
    ...figures,
    "",
    "## What Datazag provides",
    "",
    link("Reports", "/reports", "a free exposure snapshot on one domain, a Domain infrastructure report, and an Organization estate report that maps the estate an organization owns."),
    link("Alerts", "/alerts", "threat intelligence as alerts: infrastructure aimed at a customer's platforms, brands and suppliers, sent with the evidence."),
    link("Brand protection", "/brand-protection", "the infrastructure using a brand, as a case that updates as evidence appears."),
    link("Documentation", "/docs", "reports and cloud datasets."),
    link("Datasets", "/datasets", "the same data as tables in Snowflake or Databricks, with availability shown per dataset."),
    "",
    "## Who it is for",
    "",
    link("Email platforms", "/esp-partners", "check the domains customers sign up with, send from and link to: mail setup, mail provider, parking, DMARC enforcement and infrastructure."),
    link("MSSPs", "/mssp-partners", "SOC enrichment, cross-client exposure, email security reviews and client reporting, under the partner's brand."),
    link("Cyber insurers", "/cyber-risk-underwriting", "provider concentration across a book, with each provider's share rated by its resilience and exit friction; which policies are exposed when a provider fails; pre-bind assessment."),
    "",
    "## Research",
    "",
    link("The Datazag Observatory", "/observatory", "open internet measurements: email authentication, routing hygiene, hosting concentration, parking and impersonation, with methods and how to cite them."),
    link("One company runs the DNS, website and mail for 1 in 5 corporate domains", "/intelligence/corporate-domain-stack", "research, observed to 10 September 2026: the registrar-and-hosting bundle, the single-vendor CDN edge, single-operator DNS, and national concentration."),
    link("Case study: one signal, 150 domains", "/intelligence/one-signal-150-domains", "one certificate led to a 150-domain malicious hosting cluster that was in no public domain feed."),
    "",
    "## Company",
    "",
    link("About", "/about", "what Datazag does, who uses it, and what it is not."),
    link("Trust", "/trust", "how data, evidence, privacy and permitted use are handled, by delivery route."),
    link("Contact", "/contact", "sales and partnership inquiries."),
    "",
    "## Notes",
    "",
    "- Datazag is not a takedown service. It provides findings, evidence and abuse contacts; customers or their partners manage any response.",
    // Only what the site states outright: /kyc returns 410 with "Datazag does not offer KYC".
    // Not "no list cleaning" — /datasets lists an Email Suppression & List Cleaning dataset.
    "- Datazag does not offer KYC.",
    "- Some third-party directory listings still describe an earlier positioning (data hygiene, email " +
      "deliverability and lead verification) with older domain counts. Those descriptions are out of date; this " +
      "file and the site above are current.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": `public, s-maxage=${STATS_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}
