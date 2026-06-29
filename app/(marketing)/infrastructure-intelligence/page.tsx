import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Infrastructure Intelligence — Datazag",
  description:
    "Understand the internet your organisation depends on with Datazag Infrastructure Intelligence: domain, network, platform, relationship and historical intelligence delivered through reports, alerts, APIs and cloud data shares.",
};

type CoverageSnapshot = {
  domains?: number;
  ips?: number;
  threat_ips?: number;
  infrastructure_ips?: number;
  asns?: number;
  prefixes?: number;
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

const audiences = ["SOC teams", "Threat intelligence", "Fraud teams", "Data platforms", "Security vendors", "MSSPs"];

const intelligenceProducts = [
  {
    title: "Domain Intelligence",
    outcome: "Understand domains, DNS and email infrastructure.",
    detail: "Use this when you need to enrich domains, hosts, email infrastructure or DNS activity with current posture and explainable risk.",
    answers: ["What is this domain?", "Who hosts it?", "How is email configured?", "Is the domain risky?"],
    uses: ["DNS log enrichment", "Email security", "Fraud screening"],
    dictionary: ["domain", "dns_profile", "mail_posture", "risk_reason_codes"],
  },
  {
    title: "Network Intelligence",
    outcome: "Understand the infrastructure behind internet services.",
    detail: "Use this when you need to understand the IPs, ASNs, prefixes, routing context and hosting relationships behind domains and platforms.",
    answers: ["What network is this on?", "Who owns the ASN?", "Is the prefix stable?", "Is infrastructure concentrated?"],
    uses: ["Threat hunting", "Network risk", "Provider analysis"],
    dictionary: ["ip_address", "asn", "prefix", "network_risk"],
  },
  {
    title: "Platform Intelligence",
    outcome: "Understand the platforms your organisation depends on.",
    detail: "Use this when you need to map cloud, SaaS, email, CDN, DNS and provider exposure across your organisation, suppliers or campaigns.",
    answers: ["Which platforms are exposed?", "Which provider is behind it?", "Is this a trusted service?", "What is being impersonated?"],
    uses: ["Platform exposure", "Supplier review", "Impersonation detection"],
    dictionary: ["provider", "platform_category", "service_fingerprint", "exposure"],
  },
  {
    title: "Relationship Intelligence",
    outcome: "Reveal the campaign, not just the first indicator.",
    detail: "Use this when you need to expand one signal into related domains, IPs, certificates, providers, historical observations and campaign context.",
    answers: ["What else is connected?", "How concentrated is it?", "What changed recently?", "What should we block next?"],
    uses: ["Campaign discovery", "SOC triage", "Evidence packs"],
    dictionary: ["pivot_entity", "shared_infrastructure", "concentration_score", "campaign_context"],
    highlight: true,
  },
  {
    title: "Historical Intelligence",
    outcome: "Understand how infrastructure changes over time.",
    detail: "Use this when you need point-in-time context, deltas, trend analysis or historical evidence for investigations, models and reports.",
    answers: ["When did this appear?", "What changed?", "Was this present before?", "Is velocity abnormal?"],
    uses: ["Time travel", "Backtesting", "Portfolio trend analysis"],
    dictionary: ["snapshot_at", "first_seen", "change_flags", "velocity_features"],
  },
];

const relationshipContext = [
  { label: "Certificate", detail: "New issuance, SAN expansion, issuer patterns and certificate reuse become early pivots." },
  { label: "Domain", detail: "The observed name is treated as a starting point, not the whole investigation." },
  { label: "Related domains", detail: "Shared SAN entries, naming patterns, co-hosting and timing reveal nearby infrastructure." },
  { label: "Shared IPs", detail: "Domains concentrated on the same IP or small IP set can expose operational reuse." },
  { label: "Providers", detail: "Hosting, DNS, CDN, cloud and mail providers add attribution and false-positive context." },
  { label: "History", detail: "Previous DNS, hosting and routing changes show whether behaviour is new, stable or anomalous." },
  { label: "Campaign surface", detail: "Relationship analysis expands from one indicator to the wider infrastructure footprint." },
  { label: "Evidence", detail: "Risk, confidence, reason codes and relationship paths are packaged for action." },
];

const relationshipMethods = [
  { title: "Concentration analysis", example: "120 related domains on a narrow IP range", text: "Detect when domains, certificates or infrastructure cluster unusually around a small set of IPs, ASNs, prefixes or providers." },
  { title: "Infrastructure linkages", example: "One certificate pivots to shared hosting and related names", text: "Connect domains through shared certificates, DNS, CNAME chains, MX/NS providers, IPs, ASNs and historical observations." },
  { title: "Context scoring", example: "A neutral-looking domain inherits risk from its neighbours", text: "Use graph context to score domains that may not look suspicious in isolation but share infrastructure with higher-risk activity." },
];

const rawFeedBenefits = [
  { title: "Pre-enriched", text: "DNS, hosting, provider, network and historical context is already connected before delivery." },
  { title: "Pre-scored", text: "Risk scores, classifications and reason codes are computed against the wider infrastructure graph." },
  { title: "Explainable", text: "Every score is supported by the signals and relationships that contributed to the decision." },
  { title: "Continuously updated", text: "Hourly infrastructure updates and live signal ingestion keep teams close to today's internet." },
];

const deliveryOptions = [
  {
    title: "Reports",
    prompt: "I want answers about my organisation or portfolio.",
    text: "Executive and technical reports package findings, evidence and remediation into a readable assessment.",
    uses: ["Domain", "Platform", "Relationship", "Historical"],
    href: "/#free-report",
    cta: "Start with a report",
  },
  {
    title: "Alerts",
    prompt: "I need live detections before campaigns go active.",
    text: "Platform, keyword and brand intelligence delivered through portal, webhook or workflow integrations.",
    uses: ["Domain", "Platform", "Relationship", "Network"],
    href: "/alerts",
    cta: "View alert products",
  },
  {
    title: "API",
    prompt: "I am building an application or scoring workflow.",
    text: "Credit-based lookup and enrichment for products, portals, fraud engines and internal tools.",
    uses: ["Domain", "Network", "Platform", "Relationship"],
    href: "/pricing",
    cta: "See API pricing",
  },
  {
    title: "Cloud Data Shares",
    prompt: "I want to analyse everything in my data platform.",
    text: "Flat-rate cloud-native access for threat hunting, analytics, modelling and marketplace procurement.",
    uses: ["All products", "Historical", "Network", "Domain"],
    href: "/pricing",
    cta: "View data share options",
  },
];

const trustSignals = [
  "Live coverage metrics from hourly snapshots",
  "Risk scores with reason codes, not black-box labels",
  "Current state plus point-in-time history",
  "SQL, API and cloud-share delivery from the same intelligence layer",
];

const formats = ["Snowflake", "Databricks", "Azure", "AWS", "Google Cloud", "Iceberg", "Delta", "Parquet", "JSON API"];

const schemaGroups = [
  { title: "Identity", fields: ["domain", "root_domain", "first_seen", "last_seen"] },
  { title: "DNS & mail", fields: ["a_records", "mx_provider", "has_dmarc", "spf_policy"] },
  { title: "Infrastructure", fields: ["primary_ip", "primary_asn", "prefix", "hosting_provider"] },
  { title: "Risk", fields: ["risk_score", "threat_level", "confidence", "reason_codes"] },
  { title: "Relationships", fields: ["related_domains", "shared_ips", "campaign_context", "evidence"] },
  { title: "History", fields: ["snapshot_at", "dns_changed", "provider_changed", "trend_flags"] },
];

const startPaths = [
  { title: "Understand my organisation", text: "Start with a free report and see your visible platforms, DNS posture and infrastructure exposure.", href: "/#free-report", cta: "Get a free report" },
  { title: "Detect live campaigns", text: "Use platform, keyword and brand alerts to identify infrastructure before it reaches users.", href: "/alerts", cta: "View alerts" },
  { title: "Build with the API", text: "Add enrichment, scoring and infrastructure context to your own product or workflow.", href: "/pricing", cta: "See API plans" },
  { title: "Analyse full datasets", text: "Use cloud data shares for threat hunting, modelling, dashboards and large-scale joins.", href: "/pricing", cta: "View data shares" },
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

function PortfolioGraphic() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 shadow-2xl shadow-black/20 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.12),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="relative grid gap-5">
        <div className="mx-auto max-w-md rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.1] px-5 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Datazag Platform</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Infrastructure Intelligence</h3>
        </div>
        <div className="mx-auto h-10 w-px bg-cyan-300/35" />
        <div className="grid gap-3 md:grid-cols-5">
          {["Domain", "Network", "Platform", "Relationship", "Historical"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#030619]/70 p-4 text-center">
              <p className="text-sm font-semibold text-white">{item}</p>
              <p className="mt-1 text-xs text-slate-500">Intelligence</p>
            </div>
          ))}
        </div>
        <div className="mx-auto h-10 w-px bg-cyan-300/25" />
        <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-4">
          {deliveryOptions.map((item) => (
            <div key={item.title} className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.07] px-4 py-3 text-center text-sm font-semibold text-emerald-50">{item.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof intelligenceProducts)[number] }) {
  return (
    <article className={`flex h-full flex-col rounded-[1.5rem] border p-5 ${product.highlight ? "border-cyan-300/35 bg-cyan-300/[0.08]" : "border-white/10 bg-white/[0.035]"}`}>
      <h3 className="text-xl font-semibold text-white">{product.title}</h3>
      <p className="mt-4 text-base font-semibold leading-6 text-cyan-100">{product.outcome}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{product.detail}</p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#030619]/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Questions it answers</p>
        <div className="mt-3 grid gap-2">
          {product.answers.map((answer) => (
            <div key={answer} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs leading-5 text-slate-300">{answer}</div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.uses.map((item) => <Pill key={item}>{item}</Pill>)}
      </div>

      <div className="mt-auto pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Example fields</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.dictionary.map((field) => <code key={field} className="rounded-lg border border-white/10 bg-[#030619]/70 px-2.5 py-1.5 text-xs text-cyan-100">{field}</code>)}
        </div>
      </div>
    </article>
  );
}

function RelationshipVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(55,222,245,0.14),transparent_30%),radial-gradient(circle_at_82%_82%,rgba(16,185,129,0.1),transparent_32%)]" />
      <div className="relative grid gap-3">
        {relationshipContext.map((node, index) => (
          <div key={node.label} className="flex items-start gap-3">
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
            <div className={`flex-1 rounded-2xl border px-4 py-3 ${index >= 6 ? "border-emerald-300/25 bg-emerald-300/[0.08]" : "border-white/10 bg-[#030619]/65"}`}>
              <p className="text-sm font-semibold text-white">{node.label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{node.detail}</p>
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
  dz.threat_level,
  dz.primary_asn,
  dz.reason_codes,
  dz.related_domain_count
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
  const metrics = [
    { value: formatCompact(coverage.domains), label: "Domains monitored" },
    { value: formatCompact(linkedIps), label: "IPs hosting domains" },
    { value: formatCompact(coverage.asns), label: "Networks profiled" },
    { value: status.snapshot ?? formatUpdated(status.updated ?? coverage.updated), label: "Latest snapshot" },
  ];

  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Infrastructure Intelligence</p>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">Understand the internet your organisation depends on.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Datazag transforms domains, networks, platforms and relationships into explainable intelligence products that help security, fraud and data teams detect risk earlier, investigate faster and build better products.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#products" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Explore products</a>
                <a href="#start" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Find your next step</a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <article key={metric.label} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                    <p className="text-4xl font-semibold tracking-tight text-white">{metric.value}</p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/80">{metric.label}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#030619]/60 p-4 text-sm text-slate-300">
                Live catalogue metadata from Datazag's hourly infrastructure snapshots. {formatUpdated(activity.updated ?? status.updated)}.
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {audiences.map((audience) => (
              <div key={audience} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-slate-200">{audience}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The challenge"
            title="Most teams see the alert before they understand the infrastructure behind it."
            body="Every investigation starts with missing context: what is this domain, who hosts it, what else is connected, how risky is it and has it changed before? Infrastructure Intelligence gives that context back to the team before they lose time collecting it manually."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["One suspicious domain", "Many manual lookups", "Delayed decision"].map((item, index) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 text-center">
                <p className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-semibold text-cyan-100">{index + 1}</p>
                <h3 className="mt-4 text-lg font-semibold text-white">{item}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PortfolioGraphic />
          </div>
        </div>
      </section>

      <section id="products" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What do I get?"
            title="Choose the intelligence product that answers your question."
            body="Each product is a dataset family with questions it answers, common use cases and example fields. Relationship context carries across the portfolio."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {intelligenceProducts.map((product) => <ProductCard key={product.title} product={product} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Why it is different</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Relationship Intelligence reveals the campaign, not just the first indicator.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Datazag does not stop at a domain score. It measures concentration, follows linkages and uses context to score infrastructure that may not look suspicious on first view.
              </p>
              <div className="mt-6 grid gap-3">
                {relationshipMethods.map((method) => (
                  <div key={method.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <h3 className="text-sm font-semibold text-white">{method.title}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/70">{method.example}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{method.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <RelationshipVisual />
          </div>
        </div>
      </section>

      <section id="delivery" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How do I use it?"
            title="Choose the delivery model that matches your workflow."
            body="Reports and alerts package decisions. APIs and cloud data shares expose the underlying datasets so your own systems can enrich, score and analyse at scale."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deliveryOptions.map((option) => (
              <article key={option.title} className="flex flex-col rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                <p className="text-sm font-semibold text-cyan-100">{option.prompt}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{option.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{option.text}</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">Uses</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {option.uses.map((item) => <Pill key={item}>{item}</Pill>)}
                  </div>
                </div>
                <a href={option.href} className="mt-auto pt-5 text-sm font-semibold text-cyan-100 hover:text-white">{option.cta} →</a>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Available wherever your data lives</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {formats.map((format) => <Pill key={format}>{format}</Pill>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Can I trust it?"
            title="Live coverage, explainable scores and technical proof."
            body="The page starts with live coverage metrics. This section shows why those numbers can be used in operational workflows rather than treated as another static feed."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="grid gap-4">
              {trustSignals.map((signal) => (
                <div key={signal} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">{signal}</div>
              ))}
              <div className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.07] p-5">
                <p className="text-lg font-semibold text-white">Manual investigation becomes a single join.</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Enrich DNS, SMTP, web, proxy, firewall and authentication logs with risk, network context, reason codes and related infrastructure.</p>
              </div>
              <CodeBlock />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {schemaGroups.map((group) => (
                <article key={group.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <div className="mt-4 grid gap-2">
                    {group.fields.map((field) => (
                      <code key={field} className="rounded-lg border border-white/10 bg-[#030619]/70 px-3 py-2 text-xs text-slate-300">{field}</code>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="start" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How do I start?"
            title="Choose the next step that matches your need."
            body="You should not have to decode the product catalogue. Start with the path that matches the decision you are trying to make."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {startPaths.map((path) => (
              <article key={path.title} className="flex min-h-[16rem] flex-col rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5">
                <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{path.text}</p>
                <a href={path.href} className="mt-auto inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">{path.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
