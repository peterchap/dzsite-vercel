import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Infrastructure Intelligence — Datazag",
  description:
    "Cloud-native cyber intelligence datasets for domains, DNS, certificates, infrastructure, risk, history and relationship analysis.",
};

const outcomes = [
  {
    title: "Bring intelligence to your warehouse",
    text: "Use Datazag datasets directly in cloud analytics, SIEM enrichment, threat hunting, fraud systems and data science workflows.",
  },
  {
    title: "Skip the raw-data engineering",
    text: "DNS, certificates, hosting, ASN, provider labels, risk scores, reason codes and relationships are already joined into usable views.",
  },
  {
    title: "Query current and historical state",
    text: "Use snapshots, deltas and point-in-time context to understand what changed, when it changed and how infrastructure evolved.",
  },
  {
    title: "Evaluate as a product, not a feed",
    text: "Start with sample schemas, small extracts or curated views before moving into full cloud data shares or marketplace delivery.",
  },
];

const datasetFamilies = [
  {
    title: "Domain Intelligence",
    sell: "Domain posture, risk, provider footprint, DNS state, email controls, history and relationship fields for enrichment and scoring.",
    fields: ["Domain", "First seen", "DNS posture", "Email posture", "Provider labels", "Risk score", "Reason codes"],
  },
  {
    title: "DNS and Mail Posture",
    sell: "Expanded DNS, MX, NS, TXT and email-authentication context for reporting, hygiene, compliance and portfolio analysis.",
    fields: ["A / AAAA", "MX", "NS", "TXT", "SPF", "DKIM", "DMARC", "BIMI", "MTA-STS"],
  },
  {
    title: "Certificate Intelligence",
    sell: "Certificate Transparency events, SAN expansion, issuer context, platform hints and relationship pivots for early infrastructure discovery.",
    fields: ["Issuer", "SANs", "Fingerprint", "Not before", "Not after", "New issuance", "Related domains"],
  },
  {
    title: "Infrastructure Labels",
    sell: "IP, ASN, prefix, cloud, hosting, CDN, country and provider attribution for logs, flows, customer records and security events.",
    fields: ["IP", "ASN", "Prefix", "Country", "Cloud", "Hosting", "CDN", "DNS provider", "Registrar"],
  },
  {
    title: "Relationship Graph",
    sell: "Shared infrastructure, related domains, shared certificates, DNS relationships and evidence paths for campaign discovery and investigation.",
    fields: ["Related domains", "Shared IPs", "Shared certs", "Shared DNS", "Clusters", "Evidence paths"],
  },
  {
    title: "Risk and History",
    sell: "Risk scores, threat bands, reasons, confidence context, snapshots, deltas and change indicators for model validation and time-aware analysis.",
    fields: ["Risk score", "Threat band", "Reasons", "Confidence", "Snapshots", "Deltas", "Time travel"],
  },
];

const dataProducts = [
  {
    title: "Domain Risk Dataset",
    text: "A joinable domain-level table for SOC enrichment, fraud scoring, ESP controls, customer hygiene and portfolio monitoring.",
    available: "Iceberg · Delta · Parquet · API",
  },
  {
    title: "DNS Posture Dataset",
    text: "Expanded DNS and email-authentication findings for remediation reporting, domain hygiene and systemic portfolio-risk analysis.",
    available: "Iceberg · Delta · Reports",
  },
  {
    title: "Infrastructure Reputation Dataset",
    text: "IP, ASN, prefix, provider and relationship context for investigating suspicious hosting, related assets and infrastructure reuse.",
    available: "Iceberg · Delta · Cloud share",
  },
  {
    title: "Certificate and New Domain Dataset",
    text: "Certificate and newly observed domain intelligence for early alerting, platform impersonation discovery and watchlist monitoring.",
    available: "Alerts · Iceberg · Delta",
  },
  {
    title: "Portfolio Intelligence View",
    text: "Curated views for domains, subsidiaries, suppliers, client estates and acquisition targets, with posture and trend context included.",
    available: "Reports · Cloud share · Custom view",
  },
];

const deliveryRoutes = [
  {
    title: "Cloud data shares",
    badge: "Primary data product",
    text: "Native cloud-native datasets for analytical teams that want to join Datazag intelligence with their own logs, assets, alerts and customer records.",
    href: "/contact",
    cta: "Request data share access",
    highlight: true,
    benefits: ["Iceberg", "Delta", "Parquet", "Incremental updates", "Snapshots", "Time travel", "Bring your own compute", "SQL-ready joins"],
  },
  {
    title: "Marketplace delivery",
    badge: "For cloud buyers",
    text: "Marketplace-ready packaging for teams buying through Snowflake, Databricks, Azure, AWS or Google Cloud procurement routes.",
    href: "/contact",
    cta: "Discuss marketplace access",
  },
  {
    title: "API enrichment",
    badge: "For products and workflows",
    text: "Real-time lookup and enrichment for portals, fraud systems, SIEM workflows, policy engines and partner platforms.",
    href: "/pricing",
    cta: "View API pricing",
  },
  {
    title: "Reports and alerts",
    badge: "For evaluation and operations",
    text: "Start with reports, then move priority domains, brands, platforms or infrastructure into operational alerting.",
    href: "/reports",
    cta: "View reports",
  },
];

const workDone = [
  ["Raw DNS records", "Expanded DNS, mail posture, provider labels and remediation context"],
  ["Raw IP address", "ASN, prefix, country, cloud, hosting and infrastructure risk"],
  ["Single domain", "Related domains, shared certificates, provider footprint and relationship paths"],
  ["Certificate event", "SAN expansion, platform hints, issuer context and early infrastructure pivots"],
  ["Point-in-time label", "Snapshots, deltas, first-seen, last-seen and change indicators"],
  ["Opaque score", "Risk score, threat band, confidence and reason codes"],
];

const useCases = [
  {
    title: "Threat hunting and SOC enrichment",
    text: "Join domains, IPs and alerts with provider labels, relationships, reasons and historical context.",
  },
  {
    title: "ESP and platform abuse controls",
    text: "Score customer domains, links, landing pages and infrastructure using explainable domain and provider intelligence.",
  },
  {
    title: "Portfolio and supplier risk",
    text: "Analyse posture and exposure across many domains, subsidiaries, suppliers, clients or acquisition targets.",
  },
  {
    title: "Cyber insurance and diligence",
    text: "Use historical and portfolio-wide evidence for underwriting, renewal, exposure analysis and M&A security review.",
  },
  {
    title: "Data science and AI workflows",
    text: "Use stable features, historical slices and reason fields for modelling, agents, analytics and decision support.",
  },
];

const evaluationPaths = [
  ["Sample schema", "Inspect the columns, keys, refresh model and example joins before committing to a full data share."],
  ["Small extract", "Test a bounded sample in your warehouse, lakehouse or enrichment workflow."],
  ["Curated view", "Start with a purpose-built table for one use case, such as domain risk, DNS posture or infrastructure labels."],
  ["Pilot data share", "Run a short evaluation with current and historical slices, then decide scope and commercial packaging."],
];

const sourceAndGovernance = [
  ["Observation layers", "Active DNS, Certificate Transparency, routing, ASN, provider, mail posture, platform and historical observations."],
  ["Derived intelligence", "Published datasets expose derived Datazag fields, public infrastructure facts and product-approved context."],
  ["Restricted inputs", "Internal-only validation signals and raw third-party feed membership are not published as standalone resale fields by default."],
  ["Schema discipline", "Field scope, refresh cadence, snapshot policy, historical coverage and permitted use are controlled per product."],
];

function FieldName({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[12px] leading-6 text-slate-300">{children}</span>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-slate-300">{children}</span>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-slate-300">{children}</span>;
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
    </div>
  );
}

function DataStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Cloud-native data product</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Infrastructure intelligence, ready to join.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Curated datasets for teams that want enriched domain, DNS, certificate, provider, relationship and risk intelligence in their own environment.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Delivery formats</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Iceberg", "Delta", "Parquet", "Cloud shares", "Marketplace", "API", "Snapshots", "Deltas"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeBlock() {
  return (
    <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#020512] p-5 text-sm leading-6 text-slate-300"><code>{`SELECT
  logs.domain,
  dz.risk_score,
  dz.threat_band,
  dz.hosting_provider,
  dz.primary_asn,
  dz.related_domain_count,
  dz.reason_codes
FROM security_logs logs
LEFT JOIN datazag.domain_risk dz
  ON logs.domain = dz.domain
WHERE dz.risk_score >= 80;`}</code></pre>
  );
}

export default function InfrastructureIntelligencePage() {
  const primaryDelivery = deliveryRoutes.find((route) => route.highlight) ?? deliveryRoutes[0];
  const secondaryDelivery = deliveryRoutes.filter((route) => route.title !== primaryDelivery.title);

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Infrastructure Intelligence</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Cloud-native cyber intelligence datasets.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag delivers enriched domains, DNS, certificates, infrastructure, risk, relationships and history as cloud data shares, marketplace-ready datasets, APIs and curated views.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Use the data in your own lakehouse, warehouse, SIEM, analytics platform or product without building the infrastructure graph yourself.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#datasets" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Explore datasets</a>
              <a href="#evaluate" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Start evaluating</a>
            </div>
          </div>
          <DataStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Data product value"
            title="Useful intelligence, already joined and ready to query."
            body="The value is not a raw list of domains or IPs. It is the enriched context, relationship mapping, risk reasoning and historical state that make the data usable inside real workflows."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{outcome.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="datasets" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Dataset families"
            title="The field groups technical buyers ask for first."
            body="Each dataset family can be delivered as a full table, curated view, sample extract, API-backed enrichment path or product-specific schema."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {datasetFamilies.map((family, index) => (
              <div key={family.title} className={`grid gap-5 p-5 md:grid-cols-[0.28fr_0.42fr_0.3fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-xl font-semibold text-white">{family.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{family.sell}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  {family.fields.map((field) => <FieldName key={field}>{field}</FieldName>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Already engineered"
            title="Less raw collection. More usable intelligence."
            body="Datazag packages expansion, labelling, relationship analysis, history and evidence before the data reaches your warehouse or application."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            <div className="hidden grid-cols-[0.45fr_auto_0.55fr] border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70 md:grid">
              <div>Traditional input</div>
              <div />
              <div>Datazag output</div>
            </div>
            {workDone.map(([input, output]) => (
              <div key={input} className="grid gap-3 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[0.45fr_auto_0.55fr] md:items-center">
                <div className="text-sm text-slate-400">{input}</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-sm text-cyan-100">→</div>
                <div className="text-sm font-semibold leading-6 text-white">{output}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Curated products"
            title="Start with the table that matches the workflow."
            body="Curated products reduce engineering effort by packaging the right fields for common security, fraud, platform, portfolio and analytics use cases."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {dataProducts.map((product) => (
              <article key={product.title} className="flex min-h-[16rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{product.text}</p>
                <p className="mt-auto border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/70">{product.available}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Ready to JOIN"
            title="Turn one log value into context, evidence and action."
            body="The data is designed for SQL joins, enrichment pipelines, SIEM workflows, notebook analysis and data science features."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <CodeBlock />
            <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70">Example output</p>
              <div className="mt-5 grid gap-3">
                {[["risk_score", "94"], ["threat_band", "critical"], ["hosting_provider", "Bulletproof Hosting Ltd"], ["primary_asn", "AS64500"], ["related_domain_count", "15"], ["reason_codes", "new_domain, shared_infra, risky_asn"]].map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[0.45fr_0.55fr] gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <code className="text-xs text-cyan-100">{key}</code>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery"
            title="Use the route that matches your buying and engineering model."
            body="Teams can evaluate with samples and curated views, then move into cloud data shares, marketplace delivery, API enrichment or operational reports and alerts."
          />
          <div className="mt-12 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">{primaryDelivery.badge}</p>
                <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{primaryDelivery.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{primaryDelivery.text}</p>
                <a href={primaryDelivery.href} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{primaryDelivery.cta}</a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(primaryDelivery.benefits ?? []).map((benefit) => (
                  <div key={benefit} className="rounded-xl border border-cyan-300/20 bg-[#030619]/70 px-4 py-3 text-sm font-semibold text-cyan-50">{benefit}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {secondaryDelivery.map((route) => (
              <article key={route.title} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">{route.badge}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{route.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{route.text}</p>
                <a href={route.href} className="mt-auto pt-5 text-sm font-semibold text-cyan-100 hover:text-white">{route.cta} →</a>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Supported formats and destinations</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Iceberg", "Delta", "Parquet", "Snowflake", "Databricks", "Azure", "AWS", "Google Cloud", "JSON API"].map((format) => <Pill key={format}>{format}</Pill>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Use cases"
            title="One intelligence layer, several data workflows."
            body="The same cloud-native datasets can support security operations, ESP abuse controls, portfolio reporting, diligence and analytical modelling."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="flex min-h-[14rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{useCase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sources and governance"
            title="Transparent enough to evaluate. Controlled enough to license."
            body="The Trust page covers the full governance model. This data-product page summarises the points technical and marketplace buyers usually need first."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {sourceAndGovernance.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/trust" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View trust and governance</a>
          </div>
        </div>
      </section>

      <section id="evaluate" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Evaluate"
            title="Try the data before you commit."
            body="A technical buyer should be able to inspect the schema, run a few joins and decide whether the data improves the workflow."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {evaluationPaths.map(([title, text]) => (
              <article key={title} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                <a href="/contact" className="mt-auto inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start here</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
