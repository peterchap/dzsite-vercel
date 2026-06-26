import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Public starting prices for Datazag reports, real-time alerts, portfolio monitoring and cloud data products.",
};

export default function PricingPage() {
  return (
    <ProductConceptPage
      eyebrow="Pricing"
      title="Clear starting prices for reports, alerts and continuous intelligence."
      intro="Start with a free report, move into paid reporting or real-time alerts, then scale into portfolio monitoring and cloud data as the scope grows. Larger enterprise and partner deals are scoped separately, but the entry points should be visible."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See reports", href: "/reports" }}
      proof={[
        { title: "£0", text: "Free external platform threat report for one work email domain." },
        { title: "From £499/mo", text: "Real-time alerting entry tier for smaller teams and initial deployments." },
        { title: "From £2,499/mo", text: "Professional alerting and monitoring for operational security teams." },
        { title: "From £5,999/mo", text: "Scale tier for broader coverage, higher volume and enterprise workflows." },
      ]}
      narrative={{
        kicker: "The pricing logic",
        title: "Publish the entry points. Scope the larger deployments."
        ,body: [
          "Security buyers should not have to talk to sales just to understand whether a product is broadly in budget. Datazag should show credible starting prices for the common paths: reports, alerts and monitoring.",
          "The larger conversations still need scoping because coverage depends on brands, domains, portfolios, alert volume, data delivery and support requirements. But the page can make the price ladder clear before that conversation starts.",
          "Partner pricing is related but different. It needs to cover resale, white-label delivery, embedded intelligence, usage tiers, customer estates and revenue share. That should sit on the partner page rather than overload enterprise pricing.",
        ],
      }}
      flowTitle="A simple path from free report to enterprise coverage."
      flow={[
        { title: "Free", text: "Run a single-domain external report and identify visible DNS, platform and impersonation exposure." },
        { title: "Report", text: "Buy a deeper domain health, executive, supplier-risk, M&A or portfolio report." },
        { title: "Alert", text: "Move priority brands, domains or platforms into real-time monitoring and operational alerting." },
        { title: "Scale", text: "Expand into portfolio monitoring, cloud data delivery, API enrichment or enterprise coverage." },
      ]}
      alertTypeSection={{
        kicker: "Public tiers",
        title: "A pricing ladder buyers can understand."
        ,intro: "The public pricing should set expectations without pretending every deployment is identical. These tiers give buyers a starting point, then larger portfolios, cloud datasets and partner models can be priced against scope.",
        stats: [
          { title: "£0", text: "Free report for one domain." },
          { title: "£499+", text: "Entry alerting and monitoring." },
          { title: "£2,499+", text: "Professional operational coverage." },
        ],
        types: [
          {
            title: "Reports",
            subtitle: "Free and paid reports",
            coverage: "Single domains, organisations, subsidiaries, suppliers, clients or acquisition targets.",
            action: "Use reports for first value, remediation planning, executive visibility or due diligence.",
            text: "Reports are the easiest way to start. The free report gives useful external visibility. Paid reports go deeper into DNS, email posture, platform exposure, impersonation context and remediation priorities.",
            evidence: [
              "Free external platform threat report: £0",
              "Domain health report: from £995 one-off",
              "Portfolio report: from £2,500 one-off or recurring package",
              "Custom pricing for large portfolios, recurring board reports or managed remediation support",
            ],
          },
          {
            title: "Real-time alerts",
            subtitle: "Monthly monitoring",
            coverage: "Platform impersonation, brand impersonation, suspicious domains, certificates, DNS changes and related infrastructure.",
            action: "Use alerts when teams need blocking, investigation, takedown evidence or managed detection workflows.",
            text: "Alerts are priced as a monitoring product. The starting tiers let a buyer choose a sensible entry point before expanding coverage, volume, delivery channels or support.",
            evidence: [
              "Developer: from £499/month",
              "Professional: from £2,499/month",
              "Scale: from £5,999/month",
              "Custom enterprise pricing for larger coverage, high-volume alerting, SIEM/SOAR integration or managed review",
            ],
          },
        ],
        note: "Portfolio monitoring and cloud data usually become the larger enterprise conversations. Portfolio monitoring applies the report and alert model across many domains or organisations. Cloud data gives security and data teams direct access to Datazag intelligence through data shares, object storage or APIs.",
      }}
      exampleAlert={{
        kicker: "Example paid packages",
        title: "What buyers can choose without a long sales cycle.",
        intro: "The page should make the main paid routes visible. Exact inclusions can be refined, but showing starting prices helps buyers self-qualify and reduces friction.",
        severity: "PRICING | PUBLIC",
        status: "Published Starting Prices",
        domain: "Reports · Alerts · Portfolio · Cloud Data",
        fields: [
          { label: "Free report", value: "£0 · one submitted work email domain" },
          { label: "Domain health report", value: "From £995 one-off" },
          { label: "Portfolio report", value: "From £2,500 one-off or recurring" },
          { label: "Developer alerts", value: "From £499/month" },
          { label: "Professional alerts", value: "From £2,499/month" },
          { label: "Scale alerts", value: "From £5,999/month" },
          { label: "Cloud data", value: "From £3,000/month or annual data-share agreement" },
          { label: "Enterprise", value: "Custom where scope, data access or support requirements are large" },
        ],
        reasons: [
          "Gives buyers enough pricing information to self-qualify",
          "Keeps the free report as the low-friction entry point",
          "Separates simple entry tiers from genuinely scoped enterprise deployments",
          "Leaves partner pricing for a dedicated commercial page",
        ],
        latency: "Indicative public pricing — final scope can adjust limits, coverage and delivery terms",
      }}
      secondaryExampleAlert={{
        kicker: "What affects price",
        title: "Clear prices, with scope-based limits."
        ,intro: "The visible prices should be paired with a plain explanation of what changes the final package: monitored entities, alert volume, cadence, delivery model, data access and support level.",
        severity: "PRICING | DRIVERS",
        status: "Scope-Based Adjustments",
        domain: "Brands · domains · portfolios · data access · support",
        fields: [
          { label: "Monitored entities", value: "Brands, domains, subsidiaries, suppliers, clients or acquisition targets" },
          { label: "Coverage", value: "Platform monitoring, brand monitoring, DNS posture, infrastructure context" },
          { label: "Cadence", value: "One-off, monthly, continuous or real-time" },
          { label: "Delivery", value: "Report, dashboard, Slack, webhook, API, SIEM/SOAR, cloud data" },
          { label: "Data volume", value: "Hourly/daily updates, historical access, enrichment volume" },
          { label: "Workflow", value: "Blocking, remediation, evidence pack, takedown, portfolio governance" },
          { label: "Support", value: "Onboarding, tuning, quarterly reviews, managed reporting" },
          { label: "Contract", value: "Monthly plan, pilot, annual plan or enterprise agreement" },
        ],
        reasons: [
          "Published prices create confidence and reduce friction",
          "Scope-based limits prevent underpricing large or data-heavy deployments",
          "Procurement can map price to coverage, cadence and delivery requirements",
          "Partner economics can be handled separately without confusing enterprise buyers",
        ],
        latency: "Use this as the public pricing explanation before the final price card design is built",
      }}
      packagesTitle="Pricing paths."
      packages={[
        { title: "Free Report — £0", text: "Single-domain external report for first value, lead capture and initial remediation discussion." },
        { title: "Domain Health — from £995", text: "Paid domain health, executive, supplier-risk or M&A report for one organisation or target." },
        { title: "Portfolio Report — from £2,500", text: "One-off or recurring visibility across clients, subsidiaries, suppliers, vendors or brands." },
        { title: "Alerts — from £499/mo", text: "Real-time platform and brand impersonation alerts for operational security teams." },
        { title: "Cloud Data — from £3,000/mo", text: "Structured intelligence delivered through cloud data shares, object storage or APIs." },
        { title: "Partner Pricing — separate", text: "Separate commercial track for MSSPs, MDRs, ESPs, security vendors and white-label delivery." },
      ]}
      finalTitle="Show the price. Scope the edge cases."
      finalBody="The pricing page should give buyers enough information to decide whether Datazag is worth evaluating, while reserving custom pricing for large portfolios, cloud data, embedded partner models and complex enterprise deployments."
    />
  );
}
