import type { Metadata } from "next";

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
    detail: "Enrich domains with DNS posture, mail infrastructure, hosting context, subdomains, risk signals and explainable reason codes.",
    items: ["Domains", "DNS", "Mail", "Subdomains", "Risk"],
  },
  {
    title: "Network Intelligence",
    outcome: "Understand the infrastructure behind internet services.",
    detail: "Profile IPs, ASNs, prefixes, routing context, ownership signals and hosting relationships behind domains and platforms.",
    items: ["IPs", "ASNs", "Prefixes", "Routing", "Hosting"],
  },
  {
    title: "Platform Intelligence",
    outcome: "Understand the platforms your organisation depends on.",
    detail: "Map cloud, SaaS, email, CDN, provider and technographic exposure across domains, suppliers and trusted services.",
    items: ["Cloud", "SaaS", "Email", "CDN", "Providers"],
  },
  {
    title: "Relationship Intelligence",
    outcome: "Reveal the campaign, not just the first indicator.",
    detail: "Connect domains, IPs, certificates, providers and historical observations to identify related infrastructure and campaign surface.",
    items: ["Graph", "Pivots", "Campaigns", "Evidence", "Context"],
    highlight: true,
  },
  {
    title: "Historical Intelligence",
    outcome: "Understand how infrastructure changes over time.",
    detail: "Use snapshots, deltas, trend analysis and point-in-time context to track change, backtest models and support investigations.",
    items: ["Snapshots", "Deltas", "Trends", "History", "Backtests"],
  },
];

const rawFeedBenefits = [
  { title: "Pre-enriched", text: "DNS, hosting, provider, network and historical context is already connected before delivery." },
  { title: "Pre-scored", text: "Risk scores, classifications and reason codes are computed against the wider infrastructure graph." },
  { title: "Explainable", text: "Every score is supported by the signals and relationships that contributed to the decision." },
  { title: "Continuously updated", text: "Hourly infrastructure updates and live signal ingestion keep teams close to today's internet." },
];

const deliveryOptions = [
  { title: "Reports", text: "Executive and technical reports for domains, portfolios, partners and client estates." },
  { title: "Alerts", text: "Platform, keyword and brand intelligence delivered through portal, webhook or workflow integrations." },
  { title: "API", text: "Credit-based lookup and enrichment for products, portals, scoring engines and internal tools." },
  { title: "Cloud Data Shares", text: "Flat-rate cloud-native access for analytics, threat hunting, modelling and marketplace procurement." },
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

function RelationshipVisual() {
  const nodes = ["Certificate", "Domain", "Related domains", "Shared IPs", "Providers", "History", "Campaign surface", "Evidence"];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(55,222,245,0.14),transparent_30%),radial-gradient(circle_at_82%_82%,rgba(16,185,129,0.1),transparent_32%)]" />
      <div className="relative grid gap-3">
        {nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
            <div className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold ${index >= 6 ? "border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-50" : "border-white/10 bg-[#030619]/65 text-slate-200"}`}>{node}</div>
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
                <a href="#delivery" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">How to consume it</a>
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
            eyebrow="The platform"
            title="Infrastructure intelligence turns changing internet signals into decisions."
            body="Every organisation depends on infrastructure it does not fully control: domains, suppliers, cloud services, email providers, hosting networks and third-party platforms. Datazag connects those moving parts into intelligence products your teams can query, enrich and operationalise."
          />
          <div className="mt-12">
            <PortfolioGraphic />
          </div>
        </div>
      </section>

      <section id="products" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Choose what you need to understand"
            title="Five intelligence products. One infrastructure graph."
            body="Start with the product that matches your problem. Each product is powered by the same relationship intelligence layer, so context carries across reports, alerts, APIs and data shares."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {intelligenceProducts.map((product) => (
              <article key={product.title} className={`flex min-h-[24rem] flex-col rounded-[1.5rem] border p-5 ${product.highlight ? "border-cyan-300/35 bg-cyan-300/[0.08]" : "border-white/10 bg-white/[0.035]"}`}>
                <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                <p className="mt-4 text-base font-semibold leading-6 text-cyan-100">{product.outcome}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{product.detail}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {product.items.map((item) => <Pill key={item}>{item}</Pill>)}
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Relationship Intelligence</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Reveal the campaign, not just the first indicator.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Most tools analyse indicators in isolation. Datazag uses every signal as a pivot into surrounding infrastructure, exposing related domains, shared IPs, certificates, providers and historical context that would otherwise remain hidden.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-400">
                The result is intelligence your team can act on: block more of the campaign, enrich investigations with context, and explain why a decision was made.
              </p>
            </div>
            <RelationshipVisual />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Not a raw feed"
            title="Pre-enriched, pre-scored and ready to use."
            body="The old model hands analysts a list of attributes and leaves them to interpret it. Datazag delivers explainable intelligence with context, scores and relationships already attached."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {rawFeedBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery"
            title="Choose how you consume Infrastructure Intelligence."
            body="Use the same intelligence layer as reports, alerts, API enrichment or cloud-native data products inside your own analytics environment."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deliveryOptions.map((option) => (
              <article key={option.title} className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{option.text}</p>
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
            eyebrow="Technical proof"
            title="Query answers, not just attributes."
            body="Infrastructure Intelligence is designed to be joined into logs, products, data warehouses and security workflows without forcing teams to rebuild enrichment logic from scratch."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <CodeBlock />
              <div className="mt-5 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.07] p-5">
                <p className="text-lg font-semibold text-white">Manual investigation becomes a single join.</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Enrich DNS, SMTP, web, proxy, firewall and authentication logs with risk, network context, reason codes and related infrastructure.</p>
              </div>
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

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Start here</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">Start building with Infrastructure Intelligence.</h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">Explore the product family, review delivery options, or start with a free report to see how Datazag maps your own visible infrastructure.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
                <a href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View pricing</a>
                <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Request sample data</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
