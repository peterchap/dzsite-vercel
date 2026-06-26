import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Enterprise pricing for Datazag reports, real-time alerts, portfolio monitoring and cloud data products.",
};

export default function PricingPage() {
  return (
    <ProductConceptPage
      eyebrow="Enterprise Pricing"
      title="Start with a report. Scale into continuous intelligence."
      intro="Datazag enterprise pricing is based on how your organisation consumes intelligence: one-off reports, real-time alerts, portfolio monitoring, cloud datasets or a combination of these across brands, domains and teams."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "Talk to us", href: "/contact" }}
      proof={[
        { title: "Free report", text: "A single-domain report gives a useful first view without scoping friction." },
        { title: "Enterprise packages", text: "Paid plans are shaped around alert volume, monitored domains, report cadence, data access and support needs." },
        { title: "Cloud data", text: "Data products are priced separately for teams that want intelligence delivered into their own platforms or data lakes." },
        { title: "Partner pricing", text: "MSSP, MDR, ESP and embedded partner models are handled as a separate commercial track." },
      ]}
      narrative={{
        kicker: "The pricing logic",
        title: "The same intelligence has different value depending on how it is consumed.",
        body: [
          "A CISO may need executive reporting. A SOC may need real-time alerts. A portfolio owner may need recurring visibility across hundreds of domains. A data platform team may need structured datasets rather than a dashboard.",
          "For that reason, Datazag pricing should not force every buyer into the same plan. The enterprise pricing page should explain the packaging model clearly, then qualify the prospect into the right commercial conversation.",
          "Partner pricing is related but different. It needs to cover resale, white-label delivery, embedded intelligence, usage tiers, customer estates and revenue share. That should sit on the partner page rather than overload enterprise pricing.",
        ],
      }}
      flowTitle="A simple enterprise buying path."
      flow={[
        { title: "Free report", text: "Start with one domain and show immediate external exposure, DNS posture and platform-risk context." },
        { title: "Scope", text: "Define monitored brands, domains, portfolios, alert channels, report cadence and data delivery needs." },
        { title: "Package", text: "Choose reports, alerts, portfolio monitoring, cloud data or a combined enterprise plan." },
        { title: "Expand", text: "Add more brands, domains, teams, datasets, integrations or partner delivery once value is proven." },
      ]}
      alertTypeSection={{
        kicker: "Enterprise packages",
        title: "Four primary ways to buy Datazag."
        ,intro: "The enterprise page should make it easy for a buyer to understand which package fits their problem before asking for exact pricing. Public numbers can be added later, but the immediate goal is to make the buying paths clear.",
        stats: [
          { title: "Report", text: "Best first step for visibility, remediation and executive understanding." },
          { title: "Alert", text: "Best for SOC, threat hunting, brand protection and active monitoring." },
          { title: "Data", text: "Best for teams that want Datazag intelligence inside their own systems." },
        ],
        types: [
          {
            title: "Reports and assessments",
            subtitle: "One-off or recurring",
            coverage: "Single domains, organisations, subsidiaries, suppliers, clients or acquisition targets.",
            action: "Buy when the priority is visibility, remediation planning, executive reporting or due diligence.",
            text: "Reports are the easiest entry point. They turn external DNS, platform exposure, impersonation context and infrastructure posture into findings a business can act on.",
            evidence: [
              "Free external platform threat report",
              "Paid domain health report",
              "Portfolio and supplier-risk reports",
              "Executive summary and technical remediation queue",
            ],
          },
          {
            title: "Real-time alerts",
            subtitle: "Operational monitoring",
            coverage: "Platform impersonation, brand impersonation, suspicious domains, certificates, DNS changes and related infrastructure.",
            action: "Buy when teams need alerts for blocking, investigation, takedown evidence or managed detection workflows.",
            text: "Alerts are for teams that need to act before campaigns become operational. Pricing can be based on monitored entities, signal volume, delivery channels and support level.",
            evidence: [
              "Platform and brand impersonation alerts",
              "Slack, webhook, API, SIEM or SOAR delivery",
              "Evidence pack updates for brand takedown workflows",
              "De-escalation feedback and false-positive controls",
            ],
          },
        ],
        note: "Portfolio monitoring and cloud data usually become the larger enterprise conversations. Portfolio monitoring applies the report and alert model across many domains or organisations. Cloud data gives security and data teams direct access to Datazag intelligence through data shares, object storage or APIs.",
      }}
      exampleAlert={{
        kicker: "Example enterprise package",
        title: "What an enterprise package could include.",
        intro: "This placeholder shows the kind of commercial shape the pricing page should support. Exact pricing can stay behind a conversation while the page explains what drives cost and scope.",
        severity: "ENTERPRISE | CUSTOM",
        status: "Combined Intelligence Package",
        domain: "50 brands · 250 domains · real-time alerts · monthly portfolio report",
        fields: [
          { label: "Reports", value: "Monthly executive and technical portfolio report" },
          { label: "Alerts", value: "Platform and brand impersonation monitoring" },
          { label: "Delivery", value: "Slack, webhook and API access" },
          { label: "Evidence", value: "Brand evidence packs with screenshot and abuse contact when live sites appear" },
          { label: "Data access", value: "Optional cloud data share or API enrichment" },
          { label: "Support", value: "Onboarding, tuning and review cadence" },
          { label: "Pricing drivers", value: "Domains, brands, alert volume, data access and support level" },
          { label: "Commercial model", value: "Annual enterprise agreement" },
        ],
        reasons: [
          "Combines report, alert and portfolio use cases",
          "Supports operational security and executive visibility",
          "Allows scope to expand as more brands, domains or teams are added",
          "Keeps partner and embedded commercial models separate from enterprise pricing",
        ],
        latency: "Indicative package structure only — final pricing depends on scope and delivery model",
      }}
      secondaryExampleAlert={{
        kicker: "What affects pricing",
        title: "Pricing should be tied to scope, not arbitrary seat counts.",
        intro: "For Datazag, the main cost and value drivers are the amount of external surface being monitored, the alert and report cadence, the delivery model and how much data access the buyer needs.",
        severity: "PRICING | DRIVERS",
        status: "Scope-Based Commercial Model",
        domain: "Brands · domains · portfolios · data access · support",
        fields: [
          { label: "Monitored entities", value: "Brands, domains, subsidiaries, suppliers, clients or acquisition targets" },
          { label: "Coverage", value: "Platform monitoring, brand monitoring, DNS posture, infrastructure context" },
          { label: "Cadence", value: "One-off, monthly, continuous or real-time" },
          { label: "Delivery", value: "Report, dashboard, Slack, webhook, API, SIEM/SOAR, cloud data" },
          { label: "Data volume", value: "Hourly/daily updates, historical access, enrichment volume" },
          { label: "Workflow", value: "Blocking, remediation, evidence pack, takedown, portfolio governance" },
          { label: "Support", value: "Onboarding, tuning, quarterly reviews, managed reporting" },
          { label: "Contract", value: "Pilot, annual plan or enterprise agreement" },
        ],
        reasons: [
          "Security buyers understand scope-based pricing better than vague credits",
          "Procurement can map price to coverage, cadence and delivery requirements",
          "Partner economics can be addressed separately without confusing enterprise buyers",
          "The free report remains the low-friction entry point",
        ],
        latency: "Use this as the pricing explanation before publishing exact numbers",
      }}
      packagesTitle="Enterprise pricing paths."
      packages={[
        { title: "Free Report", text: "Single-domain external report for first value, lead capture and initial remediation discussion." },
        { title: "Reports", text: "Paid domain health, executive, supplier-risk, M&A or portfolio reports." },
        { title: "Alerts", text: "Real-time platform and brand impersonation alerts for operational security teams." },
        { title: "Portfolio Monitoring", text: "Recurring visibility across many domains, clients, subsidiaries, suppliers or brands." },
        { title: "Cloud Data", text: "Structured intelligence delivered through cloud data shares, object storage or APIs." },
        { title: "Partner Pricing", text: "Separate commercial track for MSSPs, MDRs, ESPs, security vendors and white-label delivery." },
      ]}
      finalTitle="Start small. Price the enterprise scope clearly."
      finalBody="The pricing page should make the entry point obvious, explain what drives enterprise pricing, and route partner or embedded opportunities into a separate commercial conversation."
    />
  );
}
