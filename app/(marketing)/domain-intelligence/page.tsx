import type { Metadata } from "next";

import ProductConceptPage from "@/components/sections/blocks/ProductConceptPage";

export const metadata: Metadata = {
  title: "Infrastructure Intelligence API & Data Shares — Datazag",
  description:
    "Domain, DNS, ASN, prefix, hosting, mail, platform and impersonation intelligence delivered through API, cloud data shares and marketplace datasets.",
};

export default function DomainIntelligencePage() {
  return (
    <ProductConceptPage
      eyebrow="Infrastructure Intelligence"
      title="Internet infrastructure intelligence built to live inside your systems."
      intro="Datazag turns domains, DNS, certificates, hosting, ASN and prefix context, mail posture, platform fingerprints and impersonation signals into structured datasets you can query, join, enrich and operationalise."
      primaryCta={{ label: "Get a free report", href: "/#free-report" }}
      secondaryCta={{ label: "See pricing", href: "/pricing" }}
      proof={[
        { title: "342M+ domains", text: "Domain corpus, DNS posture and risk features from Datazag's own collection and enrichment pipeline." },
        { title: "78K+ ASNs", text: "ASN risk and reputation built from native BGP, RIR, RPKI, PeeringDB and infrastructure context." },
        { title: "1M+ prefixes", text: "Prefix and BGP-hygiene intelligence for routing risk, origin context and infrastructure attribution." },
        { title: "Sellable datasets", text: "Marketplace exports are built from derived intelligence and exclude sourced feeds that are internal-only." },
      ]}
      narrative={{
        kicker: "What we collect",
        title: "Datazag observes the internet infrastructure behind domains, platforms and attacks.",
        body: [
          "The core lake contains domain, DNS, certificate, registrar, hosting, mail, ASN, prefix, cloud/CDN, platform and impersonation intelligence. Those signals are normalised into entities that buyers can join to their own logs, customer records, campaigns, alerts and portfolios.",
          "The flagship product is the domain intelligence and risk dataset: a wide, one-row-per-domain view that combines DNS facts, mail posture, registrar context, hosting attribution, primary ASN/prefix, platform signals, impersonation context and explainable risk scoring.",
          "The wider catalogue extends beyond domains into infrastructure reputation: ASN risk, prefix hygiene, native IP-to-ASN lookup, MX/NS host intelligence, abuse-contact directories, cloud/CDN ranges, technographics and point-in-time historical slices.",
        ],
      }}
      flowTitle="From raw observation to marketplace-ready intelligence."
      flow={[
        { title: "Observe", text: "Collect domains, DNS, certificates, RDAP, hosting, ASN/BGP, RPKI, cloud/CDN ranges, mail posture and platform fingerprints." },
        { title: "Normalise", text: "Resolve entities such as domains, hostnames, IPs, prefixes, ASNs, providers, platforms, registrars and abuse contacts." },
        { title: "Score", text: "Generate risk scores, reason codes, posture findings, impersonation signals, infrastructure context and historical features." },
        { title: "Publish", text: "Export license-clean datasets through API, webhooks, Parquet, Iceberg, Delta, cloud data shares and marketplace listings." },
      ]}
      audiencesTitle="Different buyers use the same evidence layer in different workflows."
      audiences={[
        { title: "SOC and threat-hunting teams", text: "Enrich alerts, investigate domains, prioritise infrastructure risk and add context to SIEM, SOAR and case-management workflows." },
        { title: "ESPs and messaging platforms", text: "Check signup domains, outbound campaign links, customer data quality and SMTP logs before abuse damages deliverability." },
        { title: "MSSPs and MDRs", text: "Power white-label reports, portfolio monitoring, brand protection, SOC enrichment and client-facing account reviews." },
        { title: "Security and fraud platforms", text: "Embed domain, ASN, DNS and infrastructure intelligence inside products, scoring systems, APIs and AI-agent workflows." },
        { title: "Insurers, M&A and supplier-risk teams", text: "Assess domain posture, infrastructure hygiene, impersonation exposure and portfolio risk across many organisations." },
        { title: "Researchers and AI teams", text: "Use point-in-time slices, labelled features and historical context for modelling, backtesting and investigation copilots." },
      ]}
      alertTypeSection={{
        kicker: "Curated datasets",
        title: "Use-case-specific datasets, not one undifferentiated feed."
        ,intro: "The marketplace catalogue should make it easy for buyers to understand which package fits their workflow. Some customers need a full domain-risk table; others need ASN reputation, IP-to-ASN enrichment, brand impersonation data, cloud/CDN attribution or historical backtesting slices.",
        stats: [
          { title: "Domain", text: "risk, DNS, mail and impersonation features." },
          { title: "Network", text: "ASN, prefix, BGP and IP attribution." },
          { title: "Platform", text: "technographics, provider and abuse context." },
        ],
        types: [
          {
            title: "Domain Intelligence & Risk",
            subtitle: "Flagship dataset",
            coverage: "Domain corpus, DNS facts, MX/NS, SPF/DMARC/DKIM, TLS issuer, registrar, CNAME, parking flags, ASN/prefix attribution and domain risk scoring.",
            action: "Use for SOC enrichment, ESP link scoring, signup checks, brand protection, fraud workflows, ASM enrichment and domain reputation products.",
            text: "This is the headline marketplace product: a wide, flat, one-row-per-domain dataset built from Datazag's own scans and derived risk features. It is designed to be joined directly to logs, customer domains, links, alerts and portfolios.",
            evidence: [
              "342M+ domain corpus with DNS and risk context",
              "Risk score, threat band and decomposed reason signals",
              "Mail, registrar, TLS, hosting, cloud/CDN and provider attribution",
              "Publish view designed for Snowflake, Databricks and Iceberg/Delta delivery",
            ],
          },
          {
            title: "Network and ASN Reputation",
            subtitle: "Infrastructure risk",
            coverage: "ASN risk, prefix hygiene, MOAS state, RPKI invalidity, origin context, IP-to-ASN lookup, abuse contacts and hosting classification.",
            action: "Use for network reputation, infrastructure due diligence, bad-neighbourhood analysis, KYC for infrastructure, cyber underwriting and threat hunting.",
            text: "This package moves beyond domain-level signals into the infrastructure layer. It gives buyers a native view of ASNs, prefixes, routing posture and IP attribution without depending on third-party IP-intelligence resale.",
            evidence: [
              "78K+ ASNs with composite risk and reason codes",
              "1M+ prefixes with BGP and RPKI hygiene context",
              "Native IPv4-to-ASN range table for enrichment",
              "Derived from BGP, RIR, RPKI, PeeringDB and public infrastructure sources",
            ],
          },
          {
            title: "Platform, Mail and Abuse Context",
            subtitle: "Provider intelligence",
            coverage: "MX and NS host intelligence, cloud/CDN ranges, provider fingerprints, registrar and ASN abuse contacts, platform attribution and technographic signals.",
            action: "Use for deliverability analytics, platform-risk mapping, takedown workflows, customer data cleaning, supplier visibility and false-positive reduction.",
            text: "Provider context helps buyers understand what infrastructure a domain depends on. It can support ESP analytics, MSSP reporting, abuse workflows, brand protection and customer-facing remediation output.",
            evidence: [
              "MX and NS provider intelligence",
              "Cloud/CDN ranges and CNAME/provider attribution",
              "Registrar and ASN abuse-contact directories",
              "Platform and technographic fingerprints from DNS and public infrastructure patterns",
            ],
          },
          {
            title: "Impersonation and Historical Slices",
            subtitle: "Threat and backtesting",
            coverage: "Platform impersonation rollups, brand/typosquat context, point-in-time snapshots, trend datasets and historical risk slices.",
            action: "Use for brand protection, phishing detection, portfolio monitoring, model backtesting, AI-agent workflows and research into infrastructure change over time.",
            text: "Time-travel is a major differentiator. DuckLake snapshots allow buyers to ask what Datazag knew at a point in time, build trend views and backtest risk models without relying only on current-state data.",
            evidence: [
              "Platform and brand impersonation rollups",
              "Historical snapshots and point-in-time slices",
              "Trend and velocity products for portfolios and models",
              "Backtesting support for scoring, underwriting and research use cases",
            ],
          },
        ],
        note: "Licensing boundary matters. Derived intelligence is sellable: risk scores, DNS-derived features, ASN/prefix risk, IP-to-ASN lookup, technographics, provider attribution and abuse contacts. Sourced threat feeds and restricted popularity data can inform internal scoring, but must be excluded from marketplace exports.",
      }}
      datasetCatalogue={[
        { name: "Domain Intelligence & Risk", scale: "342M+ domains", cadence: "Daily", delivery: "API, Parquet, Iceberg, Delta, Snowflake/private shares", useCases: "SOC enrichment, ESP link scoring, fraud, brand protection, ASM", status: "Derived" },
        { name: "Network / ASN Reputation", scale: "78K+ ASNs", cadence: "Hourly/daily", delivery: "Data share, API, warehouse tables", useCases: "Infrastructure risk, hosting due diligence, underwriting, threat hunting", status: "Derived" },
        { name: "BGP / Prefix Hygiene", scale: "1M+ prefixes", cadence: "Hourly/daily", delivery: "Data share, Iceberg/Delta, analytics tables", useCases: "BGP security, RPKI monitoring, routing-risk analysis", status: "Derived" },
        { name: "Native IP-to-ASN Lookup", scale: "1M+ IPv4 ranges", cadence: "Daily", delivery: "Flat enrichment table, API, data share", useCases: "IP attribution, analytics, security enrichment, fraud scoring", status: "Derived" },
        { name: "Platform, Mail and Provider Intelligence", scale: "MX/NS/provider-level", cadence: "Weekly/daily by source", delivery: "Data share, API, report/portal enrichment", useCases: "Deliverability, provider mapping, false-positive reduction, takedown support", status: "Derived" },
        { name: "Historical / Point-in-Time Bundles", scale: "Snapshot and slice based", cadence: "Snapshot-driven", delivery: "Backtest bundles, warehouse tables, private shares", useCases: "Model backtesting, research, underwriting, portfolio trend analysis", status: "Derived" },
      ]}
      flagshipFieldsTitle="The flagship view should feel like a usable schema, not a vague feed."
      flagshipFields={[
        { title: "Domain identity", text: "Domain, root domain, hostname context, resolution status and active-resolving filter for marketplace exports." },
        { title: "DNS and mail posture", text: "A/AAAA, MX, NS, TXT-derived posture, SPF, DKIM, DMARC, primary MX/NS host and email-security indicators." },
        { title: "Registrar and certificate context", text: "Registrar and RDAP facts, TLS issuer, certificate observations and date fields where collected." },
        { title: "Hosting and provider attribution", text: "Primary ASN, prefix, cloud/CDN, hosting, mailbox provider, CNAME/provider fingerprints and infrastructure classification." },
        { title: "Risk and reason fields", text: "Risk score, threat level, confidence context, reason codes, fast-flux/DGA/concentration indicators and weaponization signals." },
        { title: "Impersonation context", text: "Platform, brand, typo and suspicious naming signals where available, with publish gates to keep marketplace views license-clean." },
      ]}
      licenseClean={{
        title: "Marketplace exports are built from sellable derived intelligence.",
        body: "The public data products should present licensing as a trust feature. Datazag can use internal-only sourced feeds to inform scoring and operations, but marketplace views should only expose derived intelligence, public infrastructure facts and redistributable provider context.",
        included: [
          "Domain, DNS and mail-posture derived features",
          "Domain, ASN and prefix risk scores with reason codes",
          "Native IP-to-ASN lookup and infrastructure attribution",
          "Provider, cloud/CDN, MX/NS and technographic context",
          "Registrar, ASN and abuse-contact enrichment from public sources",
        ],
        excluded: [
          "Sourced threat-feed rows and raw feed membership",
          "Restricted popularity data or derived popularity buckets",
          "Internal-only investigative joins not cleared for redistribution",
          "Signals not yet flowing into the lake or not ready for v1 export",
        ],
      }}
      freshnessTitle="The value is not just scale. It is fresh state plus history."
      freshness={[
        { title: "Daily domain refresh", text: "The domain corpus, DNS-wide facts and domain-risk layer are designed for regular refresh and marketplace-friendly publication." },
        { title: "Hourly/daily network context", text: "ASN and prefix intelligence can support more frequent updates where routing and infrastructure state changes matter." },
        { title: "Point-in-time snapshots", text: "DuckLake snapshots allow buyers to ask what the data showed at a specific date, not only what it shows today." },
        { title: "Backtesting and trend analysis", text: "Historical slices support model validation, underwriting research, portfolio change tracking and evidence-led reporting." },
        { title: "Delta-ready delivery", text: "Parquet on R2 can be exported to Iceberg or Delta for cloud-native incremental consumption." },
        { title: "Buyer-specific slices", text: "Datasets can be scoped by TLD, risk band, use case, portfolio, cloud marketplace package or private-offer agreement." },
      ]}
      exampleQueries={[
        {
          title: "Enrich SMTP logs with domain risk",
          code: "SELECT\n  l.sender_domain,\n  l.link_domain,\n  d.risk_score,\n  d.primary_asn,\n  d.reason_codes\nFROM smtp_logs l\nJOIN datazag_domain_intelligence d\n  ON l.link_domain = d.domain\nWHERE d.threat_level IN ('high', 'critical');",
        },
        {
          title: "Find risky customer domains by mail posture",
          code: "SELECT\n  domain,\n  has_dmarc,\n  primary_mx_host,\n  threat_level,\n  email_security_score\nFROM datazag_domain_intelligence\nWHERE has_dmarc = false\n  AND threat_level IN ('high', 'critical');",
        },
      ]}
      exampleAlert={{
        kicker: "Methodology",
        title: "How the data becomes trustworthy enough to operationalise."
        ,intro: "The page should explain enough methodology to build buyer trust without exposing scoring internals. The important message is that Datazag does not just redistribute raw indicators; it normalises, joins, scores and explains internet infrastructure signals.",
        severity: "DATA | METHODOLOGY",
        status: "Derived Intelligence Pipeline",
        domain: "observe → normalise → enrich → score → publish",
        fields: [
          { label: "Collection", value: "Domains, DNS, TLS/certificates, RDAP, BGP/RIR/RPKI, PeeringDB, cloud/CDN ranges and platform fingerprints" },
          { label: "Normalisation", value: "Domains, hostnames, IPs, prefixes, ASNs, providers, platforms, registrars and abuse contacts" },
          { label: "Enrichment", value: "Mail posture, parking, wildcard DNS, hosting, provider, ASN, prefix, platform and impersonation context" },
          { label: "Scoring", value: "Risk scores, threat bands, reason codes, posture findings and confidence context" },
          { label: "False-positive controls", value: "Provider attribution, known-good infrastructure, cloud/CDN mapping and licensing-clean publish gates" },
          { label: "History", value: "DuckLake snapshots for point-in-time analysis, trend reporting and model backtesting" },
          { label: "Delivery", value: "API, webhooks, Parquet, Iceberg, Delta, Snowflake, Databricks and cloud marketplace delivery" },
          { label: "Licensing", value: "Derived intelligence is publishable; sourced feeds and restricted popularity data are internal-only" },
        ],
        reasons: [
          "Derived datasets are built from Datazag collection and enrichment rather than simple resale of third-party feeds",
          "Risk scores are paired with reason codes and infrastructure context",
          "Publish views should enforce a licensing gate before marketplace export",
          "Time-travel snapshots support historical analysis and honest backtesting",
        ],
        latency: "Methodology summary — final product pages can expose dataset-specific schemas and refresh cadences",
      }}
      secondaryExampleAlert={{
        kicker: "Example marketplace product",
        title: "What the flagship publish view can look like.",
        intro: "The marketplace domain intelligence product should be a wide, flat, one-row-per-domain table assembled from the lake's DNS, risk, scenario and provider-attribution tables, then exported into Iceberg/Delta and listed through Snowflake or other cloud marketplaces.",
        severity: "DATA | MARKETPLACE",
        status: "Complete Domain Intelligence",
        domain: "gold.marketplace_domain_intelligence",
        fields: [
          { label: "Base", value: "DNS-wide domain record with A/AAAA, MX, NS, TXT, TLS, registrar and provider context" },
          { label: "Risk", value: "Domain risk score, threat level, reason context and scenario features" },
          { label: "Intent", value: "Weaponization score, live status and suspicious infrastructure context" },
          { label: "Mail posture", value: "MX intelligence, SPF, DMARC, DKIM and email-security indicators" },
          { label: "Impersonation", value: "Platform, brand, typo and suspicious naming context where available" },
          { label: "Provider attribution", value: "Hosting, cloud, CDN, mailbox and platform fingerprints" },
          { label: "Export", value: "Parquet on R2, Iceberg/Delta for marketplace and warehouse-native access" },
          { label: "License gate", value: "No sourced threat feeds and no restricted popularity buckets in sellable views" },
        ],
        reasons: [
          "Buyers get a single table that is easy to JOIN to their own logs and records",
          "The publish view separates sellable derived intelligence from internal-only sourced data",
          "Snowflake secure views can sit on top of the exported Iceberg table for sharing and masking",
          "The same model can be sliced by buyer, use case, risk band, TLD or delivery channel",
        ],
        latency: "Publish-view example — implementation depends on the marketplace export builder and package scope",
      }}
      packagesTitle="Infrastructure intelligence packages."
      packages={[
        { title: "Domain Risk Score Feed", text: "Full corpus or slices by risk band, TLD, customer use case or delivery model." },
        { title: "Domain Intelligence Dataset", text: "Wide one-row-per-domain table with DNS, mail, registrar, hosting, risk and provider context." },
        { title: "ASN and Prefix Reputation", text: "Network and routing-risk datasets for infrastructure due diligence and threat hunting." },
        { title: "Native IP-to-ASN Lookup", text: "Clean IPv4 range table for attribution, analytics, fraud, security and enrichment use cases." },
        { title: "Brand and Platform Impersonation", text: "Platform, brand, typo and impersonation context for detection, reports and monitoring." },
        { title: "Abuse and Provider Intelligence", text: "MX/NS provider intelligence, abuse contacts, cloud/CDN ranges and takedown support context." },
      ]}
      finalTitle="Bring infrastructure intelligence into your own stack."
      finalBody="Use the API for live decisions, data shares for bulk analytics, marketplaces for procurement-friendly access and curated datasets for specific security, fraud, ESP, MSSP and platform workflows."
    />
  );
}
