import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Reports — Datazag",
  description:
    "External platform threat reports, domain health checks and portfolio reporting for security teams, partners and executives.",
};

export default function ReportsPage() {
  return (
    <ProductConceptPage
      eyebrow="Health and Portfolio Reports"
      title="Show what the internet already reveals about an organisation."
      intro="Datazag reports turn external infrastructure, DNS posture, platform exposure and impersonation signals into clear findings for security teams, executives, customers and portfolio owners."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See alerting", href: "/alerts" }}
      proof={[
        { title: "DNS and email posture", text: "Assess SPF, DKIM, DMARC, BIMI, MTA-STS and related configuration weaknesses." },
        { title: "Platform exposure", text: "Identify the platforms, vendors and services visible from an organisation's external footprint." },
        { title: "Impersonation context", text: "Show where infrastructure may be forming around the platforms and brands an organisation relies on." },
        { title: "Executive-ready", text: "Translate technical findings into risk, evidence and remediation priorities." },
      ]}
      narrative={{
        kicker: "The problem",
        title: "Most organisations cannot see their external platform exposure clearly.",
        body: [
          "A company may know its main domain, but not all of the platforms, subdomains, email controls, suppliers and infrastructure signals that shape its real external risk.",
          "A good report should not just list records. It should explain what matters, why it matters, what is already exposed and what should be remediated first.",
        ],
      }}
      flowTitle="From domain to decision-ready report."
      flow={[
        { title: "Discover", text: "Start from a domain, portfolio, client list, subsidiary group or brand set." },
        { title: "Assess", text: "Analyse DNS, mail posture, infrastructure, vendors and platform exposure." },
        { title: "Connect", text: "Relate findings to impersonation, attack infrastructure and remediation evidence." },
        { title: "Report", text: "Produce a clear report for technical, executive or customer-facing use." },
      ]}
      packagesTitle="Report products."
      packages={[
        { title: "Free external platform threat report", text: "Single-domain entry report for lead capture, awareness and initial remediation." },
        { title: "Domain health report", text: "Deeper DNS, email, subdomain and infrastructure posture reporting for one organisation." },
        { title: "Portfolio report", text: "Continuous reporting across many domains, clients, subsidiaries, vendors or acquisition targets." },
      ]}
      finalTitle="Start with one domain. Expand to the whole portfolio."
      finalBody="The free report gives a fast view of one organisation. Portfolio reporting extends the same intelligence across customers, companies, subsidiaries or brands."
    />
  );
}
