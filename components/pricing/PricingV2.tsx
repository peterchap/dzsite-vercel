const productChooser = [
  { need: "Assess one domain", product: "Free Domain Health Report", href: "/#free-report" },
  { need: "Assess a portfolio", product: "Portfolio Risk Report", href: "#reports" },
  { need: "Monitor brand abuse", product: "Brand Protection Alerts", href: "#alerts" },
  { need: "Enrich workflows", product: "Intelligence API", href: "#api" },
  { need: "Analyse at scale", product: "Cloud Data Products", href: "#data-shares" },
];

const reports = [
  {
    name: "Domain Health Report",
    price: "£0",
    cadence: "free",
    description: "A free single-domain report covering platform-led threat exposure, DNS and email defence gaps, and remediation priorities.",
    features: ["One domain", "Platform threat exposure", "DNS and email defence analysis", "Remediation priorities", "Sample report available"],
    cta: "Get my free report",
    href: "/#free-report",
    highlight: true,
  },
  {
    name: "Portfolio Risk Report",
    price: "From £995",
    cadence: "per report",
    description: "Paid reporting across the domains an organisation owns, showing individual findings and systemic risk patterns.",
    features: ["Multiple domains", "Portfolio risk view", "Systemic weakness analysis", "Domain ranking", "Remediation programme"],
    cta: "Request portfolio report",
    href: "/contact",
  },
];

const alertProducts = [
  {
    name: "Platform Alerts",
    price: "£499",
    cadence: "/mo",
    description: "Platform impersonation monitoring for the platforms, vendors and workflows that matter to your organisation.",
    features: ["Platform impersonation signals", "Reason codes", "Webhook/API delivery", "Operational alert stream"],
    cta: "Discuss platform alerts",
    href: "/contact",
  },
  {
    name: "Keyword Alerts",
    price: "£499",
    cadence: "/mo",
    description: "Keyword-led suspicious infrastructure monitoring for terms such as login, payroll, invoice, VPN, support or HR.",
    features: ["Customer-defined keywords", "New domains and certificates", "Subdomain context", "Webhook/API delivery"],
    cta: "Discuss keyword alerts",
    href: "/contact",
  },
  {
    name: "Brand Protection Alerts",
    price: "From £2,500",
    cadence: "/mo",
    description: "Per-brand impersonation detection with staged alert updates, evidence packs, abuse contacts and de-escalation controls.",
    features: ["One protected brand", "Pre-DNS and DNS-stage alerts", "Website evidence updates", "Evidence pack and abuse contacts", "De-escalation button"],
    cta: "Protect a brand",
    href: "/contact",
    highlight: true,
  },
];

const apiPlans = [
  {
    name: "Developer",
    price: "£499",
    cadence: "/mo",
    features: ["100k credits", "Evaluation and integration", "Portal credit purchase", "REST API access"],
  },
  {
    name: "Business",
    price: "£2,499",
    cadence: "/mo",
    features: ["1M credits", "Commercial use", "Bulk enrichment", "Higher request rates"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    features: ["Custom volumes", "Custom fields", "SLA options", "Private terms"],
  },
];

const dataShares = [
  {
    name: "Standard",
    price: "From £5,000",
    cadence: "/mo",
    features: ["Core domain intelligence", "Cloud-native delivery", "Standard refresh cadence", "Direct or marketplace route"],
  },
  {
    name: "Advanced",
    price: "From £10,000",
    cadence: "/mo",
    features: ["Expanded DNS and infrastructure fields", "Historical context", "Priority data support", "Marketplace private offers"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    features: ["Full data package", "Custom cadence", "Enterprise procurement", "Partner terms by agreement"],
  },
];

const evaluation = [
  ["Report first", "Start with the free Domain Health Report or a paid portfolio report when you need a concrete assessment before monitoring."],
  ["Alert stream", "Use alerts when the workflow is operational: platform abuse, keywords, brand impersonation and incident updates."],
  ["API credits", "Use the API when intelligence needs to sit inside a product, portal, fraud workflow, SIEM process or enrichment pipeline."],
  ["Data share", "Use cloud datasets when the buyer wants SQL-ready intelligence inside a warehouse, lakehouse or marketplace procurement route."],
];

const faq = [
  {
    question: "Are these fixed list prices?",
    answer: "They are starting points. Final pricing can depend on scope, volume, refresh cadence, delivery route, marketplace procurement and contractual use rights.",
  },
  {
    question: "Can I start without a sales process?",
    answer: "Yes. The free report is the lowest-friction starting point. API credits and small evaluations are designed to keep initial testing practical.",
  },
  {
    question: "Can I buy through a cloud marketplace?",
    answer: "Yes. Cloud data products can be packaged for direct data shares or marketplace routes, including Snowflake, Databricks, Azure, AWS, Google Cloud or compatible lake formats where appropriate.",
  },
  {
    question: "Can partners resell Datazag data?",
    answer: "Raw data resale, standalone redistribution and downstream partner rights are not included by default. Partner-branded services and channel use cases are handled by agreement.",
  },
];

function CheckIcon() {
  return <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />;
}

function PriceCard({ item }: { item: { name: string; price: string; cadence?: string; description: string; features: string[]; cta: string; href: string; highlight?: boolean } }) {
  return (
    <article className={`flex h-full flex-col rounded-[1.5rem] border p-5 ${item.highlight ? "border-cyan-300/35 bg-cyan-300/[0.075]" : "border-white/10 bg-white/[0.035]"}`}>
      <div>
        <h3 className="text-xl font-semibold text-white">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
        <div className="mt-6 flex items-end gap-1">
          <span className="text-4xl font-semibold tracking-tight text-white">{item.price}</span>
          {item.cadence ? <span className="pb-1 text-sm text-slate-400">{item.cadence}</span> : null}
        </div>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-slate-300">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3"><CheckIcon /><span>{feature}</span></li>
        ))}
      </ul>
      <a href={item.href} className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${item.highlight ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200" : "border border-white/10 bg-white/[0.045] text-white hover:bg-white/[0.08]"}`}>
        {item.cta}
      </a>
    </article>
  );
}

function CompactPlanCard({ plan }: { plan: { name: string; price: string; cadence?: string; features: string[] } }) {
  return (
    <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
      <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-3xl font-semibold tracking-tight text-white">{plan.price}</span>
        {plan.cadence ? <span className="pb-1 text-sm text-slate-400">{plan.cadence}</span> : null}
      </div>
      <ul className="mt-5 grid gap-2 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3"><CheckIcon /><span>{feature}</span></li>
        ))}
      </ul>
    </article>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{body}</p>
    </div>
  );
}

export function PricingV2() {
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Pricing</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">Choose the buying path that matches the workflow.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Start with a free domain report, move into paid portfolio reports, subscribe to alerts, buy API credits, or consume Datazag as cloud-native datasets.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Prices below are starting points. Larger, partner-led, marketplace and data-share deployments are scoped by volume, delivery route and permitted use.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
              <a href="#pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View pricing</a>
            </div>
          </div>

          <div className="mt-12 grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 md:grid-cols-5">
            {productChooser.map((item) => (
              <a key={item.need} href={item.href} className="rounded-2xl border border-white/10 bg-[#030619]/50 p-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.055]">
                <p className="text-xs text-slate-500">Need to</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.need}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{item.product} →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative border-t border-white/10 py-20 md:py-28">
        <div id="reports" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Reports" title="Assess one domain or a whole portfolio." body="Reports are for buyers who need a concrete assessment before committing to continuous monitoring, brand protection or data access." />
          <div className="grid gap-5 md:grid-cols-2">
            {reports.map((item) => <PriceCard key={item.name} item={item} />)}
          </div>
        </div>
      </section>

      <section id="alerts" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Alerts" title="Subscribe to operational signals and alert updates." body="Alerts are for teams that need live monitoring, reason codes, evidence and delivery into operational workflows." />
          <div className="grid gap-5 lg:grid-cols-3">
            {alertProducts.map((item) => <PriceCard key={item.name} item={item} />)}
          </div>
        </div>
      </section>

      <section id="api" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Intelligence API" title="Buy credits for lookup, scoring and enrichment." body="Use API credits for product integrations, portals, fraud workflows, SIEM enrichment and customer-facing intelligence features." />
          <div className="grid gap-5 lg:grid-cols-3">
            {apiPlans.map((plan) => <CompactPlanCard key={plan.name} plan={plan} />)}
          </div>
        </div>
      </section>

      <section id="data-shares" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Cloud data products" title="Buy directly or through your marketplace route." body="For analytics teams, platforms and data buyers who want Datazag intelligence inside their warehouse, lakehouse, data marketplace or security analytics environment." />
          <div className="grid gap-5 lg:grid-cols-3">
            {dataShares.map((plan) => <CompactPlanCard key={plan.name} plan={plan} />)}
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-slate-300">
            Marketplace routes can include Snowflake, Databricks, Azure, AWS, Google Cloud and compatible Iceberg, Delta or Parquet delivery depending on customer requirements.
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How to start" title="Use the entry point that fits the decision." body="The right first step depends on whether the buyer needs an assessment, operational alerting, product integration or analytical data access." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {evaluation.map(([title, text]) => (
              <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeader eyebrow="FAQ" title="Pricing questions, answered directly." body="The goal is to help buyers understand cost and scope quickly without implying that every product is bought in exactly the same way." />
            </div>
            <div className="grid gap-4">
              {faq.map((item) => (
                <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
