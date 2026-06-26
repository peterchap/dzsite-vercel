import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Threat Alerts — Datazag",
  description:
    "Real-time alerts for emerging attack infrastructure, platform impersonation and phishing preparation.",
};

export default function AlertsPage() {
  return (
    <ProductConceptPage
      eyebrow="Real-time Threat Alerts"
      title="Catch attack infrastructure before it reaches users."
      intro="Datazag monitors the changing internet for early signs of phishing, impersonation and malicious infrastructure. New signals are investigated, correlated and delivered as actionable alerts into the workflows your team already uses."
      primaryCta={{ label: "Request alert access", href: "/#free-report" }}
      secondaryCta={{ label: "View report product", href: "/reports" }}
      proof={[
        { title: "85 platforms", text: "High-value cloud, identity, email, storage, payment and collaboration platforms are monitored for abuse." },
        { title: "Top 850 brands", text: "Brand impersonation coverage focuses on the world's most targeted brands and customer-specific brands." },
        { title: ">85% platform-led", text: "Observed impersonation activity is dominated by platform abuse, despite brand coverage being ten times larger." },
        { title: "Action-specific", text: "Platform hits support blocking. Brand hits can produce takedown evidence when a site appears." },
      ]}
      narrative={{
        kicker: "The problem",
        title: "Platform impersonation is the infrastructure layer behind many brand attacks.",
        body: [
          "Attackers do not only copy a company's brand. They reuse the platforms people already trust: login providers, cloud services, payment brands, email platforms, storage tools and collaboration suites.",
          "That is why platform impersonation often appears before, or alongside, brand impersonation. Datazag separates the two alert types because the operational response is different.",
        ],
      }}
      flowTitle="From internet change to actionable alert."
      flow={[
        { title: "Observe", text: "New domains, certs, DNS and infrastructure changes are captured." },
        { title: "Classify", text: "Signals are separated into platform impersonation, brand impersonation and supporting infrastructure context." },
        { title: "Enrich", text: "Alerts are enriched with hosting, ASN, corpus, certstream, DNS and confidence evidence." },
        { title: "Act", text: "Clients receive the right action path: block, investigate, de-escalate or prepare takedown." },
      ]}
      alertTypeSection={{
        kicker: "Alert types",
        title: "Platform and brand impersonation need different actions.",
        intro: "Datazag currently checks 85 high-value platforms and the world's top 850 brands. Even with ten times more brand coverage, more than 85% of observed hits are platform-led. The message is not simply that brands are copied; it is that platform impersonation often leads the attack chain that later becomes brand abuse.",
        stats: [
          { title: "85", text: "monitored platforms across identity, cloud, email, payments, storage and collaboration." },
          { title: "850", text: "top global brands monitored for direct brand impersonation patterns." },
          { title: ">85%", text: "of observed impersonation hits are platform-led rather than brand-led." },
        ],
        types: [
          {
            title: "Platform impersonation alerts",
            subtitle: "Block and reduce exposure",
            coverage: "Cloud, identity, email, collaboration, storage, payment and SaaS platforms.",
            action: "Block, investigate related infrastructure, monitor for brand crossover, or de-escalate if approved.",
            text: "A customer usually does not have standing to request takedown for a fake platform they do not own. The practical action is to block, enrich detection, and watch whether the same infrastructure begins targeting the customer's own brands or users.",
            evidence: [
              "Matched platform pattern and category",
              "Hosting, ASN and infrastructure risk",
              "Corpus novelty and certstream anomaly evidence",
              "Client de-escalate link for known-good or low-risk findings",
            ],
          },
          {
            title: "Brand impersonation alerts",
            subtitle: "Evidence pack and takedown",
            coverage: "Top global brands, customer-owned brands, subsidiaries, domains and known aliases.",
            action: "Prepare takedown evidence when a website appears, including screenshot and abuse contact, or de-escalate if approved.",
            text: "When the alert targets a brand the customer owns or represents, Datazag can update the alert with evidence suitable for takedown or abuse reporting once a live website appears.",
            evidence: [
              "Brand match and affected domain",
              "Website screenshot when content appears",
              "Hosting provider and abuse contact",
              "Client de-escalate link for accepted or false-positive findings",
            ],
          },
        ],
        note: "Both alert types support a client de-escalation action. The difference is the recommended response: platform impersonation is primarily a blocking and detection problem; brand impersonation can become an evidence and takedown workflow.",
      }}
      exampleAlert={{
        kicker: "Example platform alert",
        title: "What an operational platform alert looks like.",
        intro: "This example is based on a real platform-risk alert flowing into a Slack channel. The format is intentionally compact: enough context for a first decision, with reason codes that explain why the alert escalated.",
        severity: "PLATFORM | RED",
        status: "Platform Risk Escalated",
        domain: "www.apple-du.ph",
        fields: [
          { label: "Incident ID", value: "INC-1782484980-55c8ca" },
          { label: "Classification", value: "RED → ISSUE_BLOCK_NOTICE" },
          { label: "Match", value: "Platform — apple" },
          { label: "Customer", value: "Microsoft" },
          { label: "ASN risk score", value: "0.95 · medium" },
          { label: "ASN", value: "AS63949 Linode AS63949" },
          { label: "Detected hosting", value: "45.79.222.138" },
          { label: "Confidence", value: "48/100" },
        ],
        reasons: [
          "Platform impersonation targeting 'apple' (Category: Apple)",
          "Domain not found in known 330M corpus",
          "infra: ELEVATED_NETWORK_TYPE",
          "infra: CERTSTREAM_ANOMALY",
          "infra: ASN:medium",
          "infra: FAST_PATH_DENSITY_SURGE",
        ],
        latency: "E2E latency: 3.923s | DNS resolution phase: -1ms",
      }}
      packagesTitle="Alert use cases."
      packages={[
        { title: "SOC and threat hunting", text: "Prioritise suspicious infrastructure before campaigns create incident volume." },
        { title: "Brand and platform impersonation", text: "Separate blocking workflows from evidence-pack and takedown workflows." },
        { title: "MSSP and MDR delivery", text: "Package early infrastructure intelligence into managed detection and customer reporting." },
      ]}
      finalTitle="See the infrastructure forming around your organisation."
      finalBody="Start with an external platform threat report, then move into real-time alerting for platform abuse, brand impersonation and the infrastructure that connects them."
    />
  );
}
