import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Infrastructure Intelligence — Datazag",
  description:
    "The data behind Datazag: domains, DNS, infrastructure, certificates, relationships, risk and historical changes delivered as reports, APIs and cloud-native data shares.",
};

type CoverageSnapshot = {
  domains?: number;
  ips?: number;
  threat_ips?: number;
  infrastructure_ips?: number;
  asns?: number;
  prefixes?: number;
  certificates?: number;
  updated?: string;
};

type ActivitySnapshot = {
  alerts?: number | null;
  new_domains?: number | null;
  routing_changes?: number | null;
  certificates?: number | null;
  window?: string;
  updated?: string;
};

type StatusSnapshot = {
  certstream?: string;
  dns?: string;
  scores?: string;
  snapshot?: string;
  updated?: string;
};

const fallbackCoverage: Required<CoverageSnapshot> = {
  domains: 342010111,
  ips: 3210567890,
  threat_ips: 10543210,
  infrastructure_ips: 10543210,
  certificates: 428341,
  asns: 184532,
  prefixes: 1322123,
  updated: "2026-06-28T11:00:00+00:00",
};

const fallbackActivity: Required<ActivitySnapshot> = {
  alerts: 83,
  new_domains: 412,
  routing_changes: 17,
  certificates: null,
  window: "1h",
  updated: "2026-06-28T11:00:00+00:00",
};

const fallbackStatus: Required<StatusSnapshot> = {
  certstream: "live",
  dns: "live",
  scores: "live",
  snapshot: "06:00 UTC",
  updated: "2026-06-28T11:03:00+00:00",
};

const dataCategories = [
  {
    title: "Domains",
    count: "340M+ monitored",
    fields: ["Domain", "Root domain", "TLD", "Age", "Registrar", "Risk", "First seen", "History"],
  },
  {
    title: "DNS & email",
    count: "Hourly refresh",
    fields: ["A / AAAA", "MX", "NS", "TXT", "SPF", "DMARC", "BIMI", "MTA-STS", "TLS-RPT", "Mailbox provider"],
  },
  {
    title: "Infrastructure",
    count: "10M+ domain-linked IPs",
    fields: ["IP", "ASN", "ASN name", "Country", "Prefix", "Cloud", "Hosting", "CDN", "DNS provider"],
  },
  {
    title: "Certificates",
    count: "Live monitoring",
    fields: ["Issuer", "SANs", "Fingerprint", "Validity", "New issuance", "Reuse", "Platform hints"],
  },
  {
    title: "Relationships",
    count: "Graph built continuously",
    fields: ["Shared IPs", "Shared certs", "Shared DNS", "Related domains", "Campaign surface", "Evidence paths"],
  },
  {
    title: "History",
    count: "Iceberg / Delta time travel",
    fields: ["Snapshots", "Deltas", "First seen", "Last seen", "DNS changes", "Provider changes", "Risk trends"],
  },
];

const buildSteps = [
  { title: "Internet observations", text: "We observe domains, DNS, certificates, routing and platform signals as the internet changes." },
  { title: "Infrastructure expansion", text: "A single domain is expanded into its IPs, providers, certificates, routing context and surrounding infrastructure." },
  { title: "Platform identification", text: "We classify cloud, hosting, CDN, DNS, email and SaaS platforms using infrastructure evidence." },
  { title: "Relationship analysis", text: "Shared infrastructure exposes clusters, campaigns and connected assets that isolated indicators miss." },
  { title: "Historical comparison", text: "Snapshots and deltas show what changed, when it changed and whether the pattern is unusual." },
  { title: "Evidence generation", text: "Scores are supported by reason codes, confidence and observable evidence rather than opaque labels." },
];

const readyDatasets = [
  {
    title: "Mail Hygiene",
    ideal: "Email validation, customer onboarding, CRM and marketing data cleaning.",
    includes: ["Mailbox provider", "Disposable", "Parked", "SPF", "DMARC", "BIMI", "MTA-STS", "Domain risk"],
  },
  {
    title: "Infrastructure Labels",
    ideal: "SIEM enrichment, NetFlow, asset inventory, labelling and analytics.",
    includes: ["ASN", "ASN organisation", "Country", "Cloud provider", "Hosting provider", "CDN", "DNS provider"],
  },
  {
    title: "New Domain Feed",
    ideal: "Threat hunting, brand protection, fraud monitoring and early detection.",
    includes: ["First seen", "DNS", "Certificate", "Provider", "Platform", "Risk", "Relationships"],
  },
  {
    title: "Campaign Discovery",
    ideal: "SOC investigation, CTI, incident response and evidence packs.",
    includes: ["Related domains", "Shared IPs", "Shared certificates", "Concentration", "Campaign surface", "Evidence paths"],
  },
  {
    title: "Portfolio Intelligence",
    ideal: "Enterprise security, M&A, cyber insurance, supplier and client estate review.",
    includes: ["DNS posture", "Email posture", "Infrastructure exposure", "Platform inventory", "Historical changes", "Risk trends"],
  },
];

const deliveryOptions = [
  {
    title: "Reports",
    badge: "We analyse it for you",
    text: "Executive and technical reports for domains, portfolios, suppliers and client estates.",
    href: "/#free-report",
    cta: "Start with a report",
  },
  {
    title: "Alerts",
    badge: "We notify you",
    text: "Platform, keyword and brand impersonation alerts delivered through portal, webhook or workflow integrations.",
    href: "/alerts",
    cta: "View alert products",
  },
  {
    title: "API",
    badge: "You enrich in real time",
    text: "Cached lookups, live refresh and build-on-demand enrichment for products, fraud systems and SIEM pipelines.",
    href: "/pricing",
    cta: "See API pricing",
  },
  {
    title: "Cloud Data Shares",
    badge: "You analyse everything",
    text: "Native Iceberg and Delta datasets with flat-rate access, time travel, incremental updates and SQL-ready joins.",
    href: "/pricing",
    cta: "View data shares",
    highlight: true,
  },
];

const reasons = [
  { title: "Pre-enriched", text: "DNS, certificates, provider, network and history are already joined." },
  { title: "Ready to JOIN", text: "Designed for SQL, SIEM enrichment, analytics and ML workflows." },
  { title: "Relationship-aware", text: "Find the campaign, not just the domain." },
  { title: "Explainable", text: "Risk comes with reasons, evidence and confidence." },
  { title: "Historical", text: "See how infrastructure changed over time." },
  { title: "Cloud native", text: "Iceberg and Delta shares support time travel and incremental processing." },
];

const startPaths = [
  { title: "Download sample schema", text: "Inspect the fields and decide whether the data fits your workflow.", href: "/contact" },
  { title: "Request sample dataset", text: "Try a small sample before committing to a full data share.", href: "/contact" },
  { title: "Browse API pricing", text: "Use credits for real-time lookup, enrichment and live refresh.", href: "/pricing" },
  { title: "View cloud data shares", text: "Flat-rate datasets for analytics, hunting and modelling.", href: "/pricing" },
];

const sourceGroups = [
  "Active DNS resolution",
  "DNS record expansion",
  "Certificate Transparency",
  "Internet routing",
  "ASN and prefix analysis",
  "RPKI validation",
  "Platform fingerprinting",
  "Cloud and hosting identification",
  "Historical observations",
  "External reputation validation signals",
];

async function fetchJson<T>(baseUrl: string | undefined, path: string, fallback: T): Promise<T> {
  if (!baseUrl) return fallback;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/${path}`, {
      next: { revalidate: 900 },
    });

    if (!response.ok) return fallback;
    return { ...fallback, ...(await response.json()) };
  } catch {
    return fallback;
  }
}

function formatCompact(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 100_000_000 ? 0 : 1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k`;
  return value.toLocaleString();
}

function formatUpdated(value?: string) {
  if (!value) return "Updated hourly";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Updated hourly";
  return `Updated ${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`;
}

function Pill({ children }: { children: React.ReactNode }) {
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

function PipelineGraphic() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.14),transparent_32%),radial-gradient(circle_at_82%_82%,rgba(16,185,129,0.1),transparent_32%)]" />
      <div className="relative grid gap-3">
        {buildSteps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-3">
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
            <div className="flex-1 rounded-2xl border border-white/10 bg-[#030619]/65 px-4 py-3">
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBlock() {
  return (
    <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#020512] p-5 text-sm leading-6 text-slate-300"><code>{`SELECT
  logs.domain,
  dz.risk_score,
  dz.hosting_provider,
  dz.mailbox_provider,
  dz.primary_asn,
  dz.related_domain_count,
  dz.reason_codes
FROM dns_logs logs
LEFT JOIN datazag.infrastructure_intelligence dz
  ON logs.domain = dz.domain
WHERE dz.risk_score >= 80;`}</code></pre>
  );
}

export default async function InfrastructureIntelligencePage() {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_STATS_URL;
  const [coverage, activity, status] = await Promise.all([
    fetchJson<CoverageSnapshot>(baseUrl, "coverage.json", fallbackCoverage),
    fetchJson<ActivitySnapshot>(baseUrl, "activity.json", fallbackActivity),
    fetchJson<StatusSnapshot>(baseUrl, "status.json", fallbackStatus),
  ]);

  const linkedIps = coverage.infrastructure_ips ?? coverage.threat_ips;
  const coverageMetrics = [
    { value: formatCompact(coverage.domains), label: "Domains monitored" },
    { value: formatCompact(linkedIps), label: "IPs linked to domains" },
    { value: formatCompact(coverage.asns), label: "Networks profiled" },
    { value: "Live", label: "Certificate monitoring" },
    { value: "Hourly", label: "Priority refresh" },
    { value: status.snapshot ?? formatUpdated(status.updated ?? coverage.updated), label: "Latest snapshot" },
  ];

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Infrastructure Intelligence</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">The data behind Datazag.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Domains, DNS, infrastructure, certificates, relationships and risk delivered as reports, APIs and cloud-native data shares. Built for technical teams that want to evaluate the data quickly and move from sample to production without heavy integration work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#data" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Explore the data</a>
              <a href="#evaluate" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Start evaluating</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Coverage" title="Built at internet scale. Refreshed continuously." body={`Live catalogue metadata from Datazag's production snapshots. ${formatUpdated(activity.updated ?? status.updated)}.`} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverageMetrics.map((metric) => (
              <article key={metric.label} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                <p className="text-4xl font-semibold tracking-tight text-white">{metric.value}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/80">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="data" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What do you collect?"
            title="Scan the categories. Recognise the fields you need."
            body="The public page does not expose the full 100+ field schema. It shows enough for a technical buyer to decide whether the data is worth testing."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dataCategories.map((category) => (
              <article key={category.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-semibold text-cyan-100">{category.count}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.fields.map((field) => <Pill key={field}>{field}</Pill>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">How is it built?</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">We do the enrichment before you receive the data.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Datazag is not a repackaged threat feed. We continuously observe internet infrastructure, expand what we find, build relationships, compare history and generate evidence-backed intelligence.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm leading-6 text-slate-300">External reputation and abuse signals are used only as supporting validation where appropriate. They are not the primary source of detection and are not exposed as feed-membership flags in datasets.</p>
              </div>
            </div>
            <PipelineGraphic />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Ready-made datasets"
            title="Start with a dataset that matches your workflow."
            body="You can consume broad Infrastructure Intelligence, but most teams start with a curated view that exposes the fields they need and keeps SQL simple."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {readyDatasets.map((dataset) => (
              <article key={dataset.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{dataset.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{dataset.ideal}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {dataset.includes.map((item) => <Pill key={item}>{item}</Pill>)}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Need something more specific?</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
              We can publish curated data views that combine multiple intelligence products into one table tailored to your workflow. This is a paid option for teams that want fewer columns, simpler SQL and only the data they need.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Ready to JOIN"
                title="Turn one log value into context, evidence and action."
                body="Other vendors hand you raw attributes and leave interpretation to your team. Datazag returns infrastructure context, provider labels, relationships, risk and reason codes in one join."
              />
              <div className="mt-8">
                <CodeBlock />
              </div>
            </div>
            <div className="grid gap-4">
              {reasons.map((reason) => (
                <article key={reason.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Access"
            title="Choose how you want to consume the data."
            body="Start with a report or API sample, then move to alerts or full cloud data shares when you are ready to operationalise."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deliveryOptions.map((option) => (
              <article key={option.title} className={`flex min-h-[19rem] flex-col rounded-[1.5rem] border p-5 ${option.highlight ? "border-cyan-300/35 bg-cyan-300/[0.08]" : "border-white/10 bg-white/[0.035]"}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">{option.badge}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{option.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{option.text}</p>
                <a href={option.href} className="mt-auto pt-5 text-sm font-semibold text-cyan-100 hover:text-white">{option.cta} →</a>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Supported delivery</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Iceberg", "Delta", "Snowflake", "Databricks", "Azure", "AWS", "Google Cloud", "JSON API"].map((format) => <Pill key={format}>{format}</Pill>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sources and cadence"
            title="Transparent enough to evaluate. Simple enough to scan."
            body="Infrastructure Intelligence is built from observation, expansion and analysis. Supporting reputation signals are used for validation, not as the core product."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-xl font-semibold text-white">Core observation layers</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {sourceGroups.map((item) => <Pill key={item}>{item}</Pill>)}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-xl font-semibold text-white">Freshness model</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Certificates: live", "Priority infrastructure: hourly", "Full internet: ~40 hours", "Routing: every 2 hours", "RPKI: every 8 hours", "Snapshots: continuous"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-[#030619]/60 px-3 py-2 text-sm text-slate-300">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evaluate" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Evaluate"
            title="Try the data before you commit."
            body="The goal is simple: let a technical buyer spend 15 minutes deciding whether Datazag is useful. Start with the route that fits your evaluation style."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {startPaths.map((path) => (
              <article key={path.title} className="flex min-h-[15rem] flex-col rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5">
                <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{path.text}</p>
                <a href={path.href} className="mt-auto inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start here</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
