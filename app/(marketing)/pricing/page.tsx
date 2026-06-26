import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Datazag pricing concepts for reports, real-time alerts, portfolio monitoring, cloud data and embedded partner intelligence.",
};

export default function PricingPage() {
  return (
    <ProductConceptPage
      eyebrow="Pricing and Packaging"
      title="Start with a report. Scale into alerts, portfolios and data."
      intro="Datazag packaging is designed around how organisations consume intelligence: a single report, real-time alerts, portfolio monitoring, cloud datasets or embedded partner delivery."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "Compare products", href: "/reports" }}
      proof={[
        { title: "Free entry point", text: "A single-domain report gives prospects a useful first view without scoping friction." },
        { title: "Clear upgrades", text: "Buyers can move from report to alerts, portfolio monitoring or cloud data." },
        { title: "Partner-ready", text: "MSSPs, ESPs and vendors can package Datazag intelligence into their own services." },
        { title: "Data products", text: "Cloud data shares and APIs support teams that want intelligence inside their own platforms." },
      ]}
      narrative={{
        kicker: "The packaging logic",
        title: "Different buyers need the same intelligence in different forms.",
        body: [
          "A security leader may need a clear report. A SOC may need real-time alerts. A partner may need embedded intelligence. A data team may need cloud-native datasets.",
          "Pricing should reflect those consumption patterns rather than forcing every buyer into the same product shape.",
        ],
      }}
      flowTitle="A simple path from first value to broader deployment."
      flow={[
        { title: "Free report", text: "Show immediate value from one domain or organisation." },
        { title: "Paid report", text: "Expand depth, remediation and executive reporting." },
        { title: "Alerts or portfolio", text: "Move into continuous monitoring across signals, brands or customers." },
        { title: "Data or partner", text: "Embed intelligence into platforms, data lakes and managed services." },
      ]}
      packagesTitle="Conceptual packages."
      packages={[
        { title: "Reports", text: "Free and paid external health, threat and portfolio reporting." },
        { title: "Alerts", text: "Real-time emerging infrastructure and impersonation alerts for operational teams." },
        { title: "Portfolio Monitoring", text: "Continuous reporting across clients, subsidiaries, brands, vendors or acquisition targets." },
        { title: "Cloud Data", text: "Hourly or daily datasets delivered through cloud data shares, object storage and APIs." },
        { title: "Partner / Embedded", text: "Custom packaging for MSSPs, MDRs, ESPs and security platforms." },
        { title: "Enterprise", text: "Larger deployments with custom coverage, data integration and commercial terms." },
      ]}
      finalTitle="Make the first step easy. Let serious buyers expand."
      finalBody="The pricing page should help prospects understand the path: report first, then alerts, portfolio monitoring, data products or partner delivery depending on their use case."
    />
  );
}
