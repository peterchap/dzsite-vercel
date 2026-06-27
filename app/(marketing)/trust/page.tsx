import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Trust & Methodology — Datazag",
  description:
    "How Datazag collects public internet infrastructure data, normalises signals, scores risk, reduces false positives and builds license-clean intelligence products.",
};

export default function TrustPage() {
  return (
    <ProductConceptPage
      eyebrow="Trust & Methodology"
      title="Explainable internet intelligence, built from observable infrastructure."
      intro="Datazag observes public internet infrastructure, normalises it into connected entities, enriches it with context, and turns it into reasoned intelligence that customers can inspect, join, automate and challenge."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "View infrastructure intelligence", href: "/domain-intelligence" }}
      proof={[
        { title: "Public infrastructure", text: "Signals come from observable internet infrastructure such as domains, DNS, certificates, RDAP, ASN/BGP, RPKI and provider footprints." },
        { title: "Reasoned output", text: "Scores and alerts are paired with reason codes, evidence fields and context rather than unexplained labels." },
        { title: "False-positive controls", text: "Provider attribution, known-good infrastructure, cloud/CDN mapping and de-escalation workflows help reduce over-blocking." },
        { title: "License-clean exports", text: "Marketplace datasets are built from sellable derived intelligence and exclude sourced feeds that are internal-only." },
      ]}
      narrative={{
        kicker: "Principle",
        title: "Trust starts with showing how the signal was produced.",
        body: [
          "Security teams, ESPs, MSSPs, insurers and platform buyers cannot rely on a black-box score alone. They need to understand what was observed, how it was normalised, why a risk decision was made, and what evidence supports the output.",
          "Datazag is designed around that principle. The platform collects infrastructure signals, links them into stable entities, adds historical and provider context, generates risk signals, and exposes the reasoning in a form that can be read by humans or consumed by systems.",
          "The result is not just a feed of domains. It is an evidence layer for reports, alerts, API enrichment, data shares, partner services, portfolio monitoring and cloud marketplace datasets.",
        ],
      }}
      flowTitle="How Datazag turns observable infrastructure into usable intelligence."
      flow={[
        { title: "Observe", text: "Collect public infrastructure signals: domains, DNS, certificates, RDAP, ASN/BGP, RPKI, cloud/CDN ranges, mail posture and platform fingerprints." },
        { title: "Normalise", text: "Resolve noisy observations into entities such as domains, hostnames, IPs, prefixes, ASNs, providers, platforms, registrars and abuse contacts." },
        { title: "Score", text: "Attach risk scores, threat bands, confidence context, reason codes, posture findings, impersonation signals and historical features." },
        { title: "Evidence", text: "Deliver output as reports, alerts, API responses, webhooks, data shares and marketplace tables with supporting context attached." },
      ]}
      wideFlowLayout
      audiencesTitle="The methodology is designed for buyers who need evidence, not just data."
      audiences={[
        { title: "Security teams", text: "Need alert context, investigation trails and confidence before blocking, escalating or ignoring a signal." },
        { title: "ESPs and platforms", text: "Need explainable account, link and infrastructure risk that can support policy decisions without harming legitimate customers." },
        { title: "MSSPs and MDRs", text: "Need repeatable evidence they can show analysts, clients and account teams across many customer environments." },
        { title: "Data and AI teams", text: "Need stable fields, historical context and interpretable features for joins, models, agents and analytics workflows." },
        { title: "Insurers and risk teams", text: "Need portfolio-level posture, infrastructure exposure and time-aware evidence for underwriting, renewal or diligence." },
        { title: "Marketplace buyers", text: "Need to know what is derived, what is redistributable, what is excluded, and how freshness and schema scope are controlled." },
      ]}
      alertTypeSection={{
        kicker: "Methodology layers",
        title: "Each score or alert is built from several evidence layers.",
        intro: "The public page should not expose scoring internals in detail, but it should explain the kinds of evidence Datazag uses and how those signals become operational output.",
        stats: [
          { title: "Signals", text: "observable infrastructure events and facts." },
          { title: "Context", text: "provider, history, posture and relationship mapping." },
          { title: "Output", text: "reasoned scores, reports, alerts and datasets." },
        ],
        types: [
          {
            title: "Collection layer",
            subtitle: "Observable internet data",
            coverage: "Domains, DNS, TLS/certificates, RDAP, ASN/BGP, RPKI, prefixes, cloud/CDN ranges, mail posture and provider fingerprints.",
            action: "Capture the external infrastructure state that changes before, during and after malicious activity or operational exposure appears.",
            text: "Datazag focuses on infrastructure that can be observed from the outside. That makes the intelligence useful for customers who do not have an asset list, internal telemetry or prior knowledge of a campaign.",
            evidence: [
              "Domain and DNS observations",
              "Certificate and TLS context",
              "ASN, prefix and routing context",
              "Mail, provider and platform footprints",
            ],
          },
          {
            title: "Entity and enrichment layer",
            subtitle: "Normalised context",
            coverage: "Domains, hostnames, IPs, prefixes, ASNs, registrars, providers, platforms, abuse contacts, parking, mailbox/CDN/cloud attribution and historical state.",
            action: "Turn raw observations into stable, joinable records that customers can use in reports, APIs, warehouses and operational systems.",
            text: "The same domain can appear through DNS, certificates, mail records, provider footprints and infrastructure relationships. Normalisation links those observations into a usable evidence graph.",
            evidence: [
              "Provider and known-good infrastructure attribution",
              "Registrar and abuse-contact context",
              "Historical and point-in-time state",
              "Customer-joinable entities and fields",
            ],
          },
          {
            title: "Scoring and reasoning layer",
            subtitle: "Explainable risk",
            coverage: "Domain risk, ASN risk, prefix risk, posture findings, impersonation signals, confidence context, reason codes and operational classifications.",
            action: "Support blocking, triage, reporting, enrichment, portfolio analysis and data-product workflows with transparent evidence attached.",
            text: "A score is only useful if a team can see why it exists. Datazag pairs scores with reason fields and context so humans and systems can decide how much trust to place in the output.",
            evidence: [
              "Risk score and threat band",
              "Reason codes and supporting features",
              "Confidence and false-positive context",
              "Operational class and suggested use",
            ],
          },
          {
            title: "Publish and control layer",
            subtitle: "Safe delivery",
            coverage: "Reports, alerts, APIs, webhooks, cloud data shares, object storage exports, Iceberg/Delta tables and marketplace-ready datasets.",
            action: "Deliver only the fields appropriate for the product, licence, buyer use case, refresh cadence and evidence requirements.",
            text: "Different products expose different slices of the evidence layer. A free report, alert, API response and marketplace dataset may share the same underlying intelligence, but each has its own scope and delivery controls.",
            evidence: [
              "Field-level product scope",
              "License-clean marketplace exports",
              "Refresh and snapshot controls",
              "De-escalation and human review paths where appropriate",
            ],
          },
        ],
        note: "The methodology is designed to make Datazag useful in operational systems without asking customers to blindly trust a black-box feed.",
      }}
      flagshipFieldsTitle="What customers can inspect."
      flagshipFields={[
        { title: "Observed facts", text: "The underlying domain, DNS, certificate, mail, provider, ASN, prefix and registrar context that supports a finding." },
        { title: "Reason codes", text: "Readable explanations of why a domain, link, provider pattern, ASN or infrastructure relationship was considered relevant." },
        { title: "Confidence context", text: "Fields that help teams understand when to automate, when to escalate and when to route to human review." },
        { title: "Provider attribution", text: "Cloud, CDN, mailbox, hosting, platform and known-good context used to reduce accidental over-classification." },
        { title: "History", text: "Point-in-time and trend context where the product includes historical slices or data-share access." },
        { title: "Action context", text: "The intended operational use: report, alert, block, enrich, investigate, monitor, score, de-escalate or package into a partner service." },
      ]}
      licenseClean={{
        title: "Marketplace and data-share products are controlled at publish time.",
        body: "Datazag separates internal intelligence operations from sellable data products. Sourced threat feeds and restricted popularity data can inform internal scoring and investigation, but marketplace exports should expose only derived Datazag intelligence, public infrastructure facts and redistributable provider context.",
        included: [
          "Derived domain, DNS, mail, hosting and posture features",
          "Domain, ASN and prefix risk scores with reason context",
          "Native IP-to-ASN and infrastructure attribution",
          "Provider, cloud/CDN, MX/NS and technographic context",
          "Registrar, ASN and abuse-contact enrichment from public sources",
        ],
        excluded: [
          "Raw third-party threat-feed rows or direct feed membership",
          "Restricted popularity data or derived popularity buckets",
          "Internal-only investigative joins not cleared for redistribution",
          "Unfinished signals or fields not ready for the product's published schema",
        ],
      }}
      freshnessTitle="Freshness and history are part of the trust model."
      freshness={[
        { title: "Current state", text: "Reports, alerts and API responses are designed to reflect recent observable infrastructure state rather than stale static lists." },
        { title: "Regular refresh", text: "Domain, ASN, prefix and provider layers can have different cadences depending on how quickly the underlying data changes." },
        { title: "Point-in-time evidence", text: "Historical snapshots help answer what was known at a specific date, which matters for backtesting, underwriting and investigations." },
        { title: "Change detection", text: "Infrastructure changes such as DNS movement, provider changes, new certificates or routing context can be more useful than a one-time label." },
        { title: "Backtesting", text: "Data-share buyers can use historical slices to validate models, scoring thresholds and portfolio-risk assumptions." },
        { title: "Versioned products", text: "Published datasets should keep schema, refresh cadence and licence boundaries explicit so buyers know what they are consuming." },
      ]}
      exampleQueries={[
        {
          title: "Trace why a domain was flagged",
          code: `SELECT
  domain,
  risk_score,
  threat_level,
  reason_codes,
  primary_asn,
  hosting_provider,
  certificate_issuer
FROM datazag_domain_intelligence
WHERE domain = 'secure-login-example.net';`,
        },
        {
          title: "Review portfolio exposure by infrastructure risk",
          code: `SELECT
  c.customer_id,
  d.primary_asn,
  COUNT(*) AS risky_domains
FROM customer_domains c
JOIN datazag_domain_intelligence d
  ON c.domain = d.domain
WHERE d.threat_level IN ('high', 'critical')
GROUP BY c.customer_id, d.primary_asn
ORDER BY risky_domains DESC;`,
        },
      ]}
      exampleAlert={{
        kicker: "Example evidence output",
        title: "A useful finding should explain itself.",
        intro: "This is the standard Datazag should hold itself to: the customer should see the score, the reason, the infrastructure context and the intended use of the result.",
        severity: "TRUST | EVIDENCE",
        status: "Reasoned Finding",
        domain: "secure-login-example.net",
        fields: [
          { label: "Observed entity", value: "Domain, hostname, IP, ASN, prefix or provider relationship" },
          { label: "Finding", value: "Risk, posture, impersonation, infrastructure or provider-context signal" },
          { label: "Evidence", value: "DNS, certificate, hosting, ASN, registrar, provider and historical fields" },
          { label: "Reasoning", value: "Readable reason codes and supporting features" },
          { label: "Confidence", value: "Context for automation, review or de-escalation" },
          { label: "False-positive controls", value: "Known-good provider and platform attribution checked before escalation" },
          { label: "Delivery", value: "Report, alert, API response, webhook, data share or marketplace table" },
          { label: "Action", value: "Block, enrich, investigate, report, monitor, remediate or package into partner workflow" },
        ],
        reasons: [
          "A score without reasons is hard to operationalise",
          "Provider context helps reduce over-blocking",
          "History helps separate one-off state from meaningful change",
          "Evidence makes customer-facing reports and partner services more credible",
        ],
        latency: "Example only — fields and decision labels vary by product and package",
      }}
      packagesTitle="Where this methodology shows up."
      packages={[
        { title: "Free reports", text: "External domain, DNS, platform and impersonation findings explained in buyer-friendly language." },
        { title: "Threat alerts", text: "Platform, brand and keyword infrastructure alerts with reason codes, evidence and de-escalation paths." },
        { title: "Infrastructure intelligence", text: "API and data-share products with joinable fields, risk scores, history and licence-clean publish views." },
        { title: "MSSP services", text: "Partner-branded reports, alerts and portfolio monitoring powered by explainable Datazag evidence." },
        { title: "ESP controls", text: "Signup, outbound-link, customer-data and SMTP enrichment that supports explainable platform policy decisions." },
        { title: "Marketplace datasets", text: "Curated, derived datasets with product-specific fields, refresh cadences and redistribution boundaries." },
      ]}
      finalTitle="Use intelligence you can inspect."
      finalBody="Datazag is built to provide evidence, reasoning and licensing clarity around internet infrastructure signals, so teams can use the output in reports, alerts, APIs, data shares and partner products with more confidence."
    />
  );
}
