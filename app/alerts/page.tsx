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
        { title: "Early signals", text: "Domains, certificates, DNS and hosting changes are observed before campaigns are active." },
        { title: "Evidence-led", text: "Alerts include the infrastructure context behind the risk, not just a score." },
        { title: "Workflow ready", text: "Deliver into webhooks, APIs, SIEM, SOAR, XDR or partner platforms." },
        { title: "Low noise", text: "Risk and confidence are designed to separate useful warnings from generic watchlists." },
      ]}
      narrative={{
        kicker: "The problem",
        title: "Most alerts arrive after the campaign has already started.",
        body: [
          "Attackers do not begin with an email. They begin with infrastructure. Domains are registered, certificates are issued, DNS is configured, hosting is activated and platforms are impersonated.",
          "Traditional controls often see the campaign once a link is clicked, a message is delivered or a blacklist has caught up. Datazag watches the preparation phase instead.",
        ],
      }}
      flowTitle="From internet change to actionable alert."
      flow={[
        { title: "Observe", text: "New domains, certs, DNS and infrastructure changes are captured." },
        { title: "Investigate", text: "Signals are enriched with infrastructure, threat and historical context." },
        { title: "Correlate", text: "Related domains, hosts, providers and campaigns are connected." },
        { title: "Deliver", text: "High-confidence alerts are sent where decisions are made." },
      ]}
      packagesTitle="Alert use cases."
      packages={[
        { title: "SOC and threat hunting", text: "Prioritise suspicious infrastructure before campaigns create incident volume." },
        { title: "Brand and platform impersonation", text: "Detect emerging infrastructure that imitates the platforms your organisation uses." },
        { title: "MSSP and MDR delivery", text: "Package early infrastructure intelligence into managed detection and customer reporting." },
      ]}
      finalTitle="See the infrastructure forming around your organisation."
      finalBody="Start with an external platform threat report, then move into real-time alerting for the signals that matter most."
    />
  );
}
