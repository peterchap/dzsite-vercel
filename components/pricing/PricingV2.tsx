const productChooser = [
  { need: "Assess one domain", product: "Free Domain Health Report", href: "/#free-report" },
  { need: "Assess many domains", product: "Portfolio Health Report", href: "/contact" },
  { need: "Monitor new threats", product: "Threat Intelligence", href: "#threat-intelligence" },
  { need: "Integrate intelligence", product: "Intelligence API", href: "#api" },
  { need: "Analyse at scale", product: "Cloud Data Shares", href: "#data-shares" },
];

const reports = [
  {
    name: "Domain Health Report",
    price: "£0",
    cadence: "free",
    description: "A single-domain assessment that shows public DNS, platform and subdomain exposure.",
    features: ["One domain", "Executive summary", "DNS & subdomain health", "Platform exposure", "Prioritised remediation"],
    cta: "Get my free report",
    href: "/#free-report",
    highlight: true,
  },
  {
    name: "Portfolio Health Report",
    price: "From £995",
    cadence: "per report",
    description: "A paid assessment for multiple domains, brands, subsidiaries, clients or acquisition targets.",
    features: ["Multiple domains", "Portfolio risk view", "Domain comparisons", "Organisation-wide findings", "Executive PDF report"],
    cta: "Request report",
    href: "/contact",
  },
];

const threatProducts = [
  {
    name: "Platform Intelligence",
    price: "£499",
    cadence: "/mo",
    description: "Generic platform impersonation feed. Filter for the platforms and workflows that matter to you.",
    features: ["Platform impersonation patterns", "Customer-side filtering", "Webhooks/API delivery", "Continuous updates"],
    cta: "Start platform feed",
    href: "/contact",
  },
  {
    name: "Keyword Intelligence",
    price: "£499",
    cadence: "/mo",
    description: "Generic keyword intelligence feed for sensitive terms such as login, payroll, invoice, VPN or HR.",
    features: ["Customer-defined keywords", "New domains and certificates", "Subdomain context", "Webhooks/API delivery"],
    cta: "Start keyword feed",
    href: "/contact",
  },
  {
    name: "Brand Protection",
    price: "From £2,500",
    cadence: "/mo",
    description: "Per-brand monitoring, evidence and lifecycle context for customer-owned brands.",
    features: ["Single brand from £2,500/mo", "5 brands from £10,000/mo", "10 brands from £15,000/mo", "Evidence and lifecycle tracking"],
    cta: "Protect a brand",
    href: "/contact",
    highlight: true,
  },
];

const apiPlans = [
  { name: "Developer", price: "£499", cadence: "/mo", features: ["100k credits", "Evaluation and integration", "Portal credit purchase", "REST API access"] },
  { name: "Business", price: "£2,499", cadence: "/mo", features: ["1M credits", "Commercial use", "Bulk enrichment", "Higher request rates"] },
  { name: "Enterprise", price: "Custom", cadence: "", features: ["Custom volumes", "Custom fields", "SLA options", "Private terms"] },
];

const dataShares = [
  { name: "Standard", price: "£5,000", cadence: "/mo", features: ["Core domain intelligence", "Cloud-native delivery", "Direct or marketplace", "Standard refresh cadence"] },
  { name: "Advanced", price: "£10,000", cadence: "/mo", features: ["Expanded fields", "Historical context", "Priority data support", "Marketplace private offers"] },
  { name: "Enterprise", price: "£20,000", cadence: "/mo", features: ["Full data package", "Custom cadence", "Enterprise procurement", "Partner terms available"] },
];

const faq = [
  { question: "Can I buy without a sales call?", answer: "Yes. The free report and API credits are designed for low-friction entry. Larger data-share, brand and partner deployments may still need scope confirmation." },
  { question: "Can I buy through a cloud marketplace?", answer: "Yes. Cloud Data Shares can be purchased directly or through marketplace routes such as Snowflake, Databricks, Fabric or compatible lake formats." },
  { question: "Are Platform and Keyword Intelligence customised feeds?", answer: "They are generic feeds. Customers filter for the platforms, keywords and workflows relevant to them. Brand Protection is scoped per brand." },
  { question: "Can I start small and upgrade later?", answer: "Yes. Many customers can start with a report, move to monitoring, then add API credits or cloud data shares as usage grows." },
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Transparent pricing</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">No contact-sales wall to find out if Datazag is in budget.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Start with a free report, buy API credits through the portal, subscribe to threat intelligence, or purchase cloud data shares directly or through your marketplace.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
              <a href="#pricing" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View prices</a>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Reports" title="Assess a domain or portfolio." body="Reports are for buyers who need a clear assessment before committing to continuous monitoring or data access." />
          <div className="grid gap-5 md:grid-cols-2">
            {reports.map((item) => <PriceCard key={item.name} item={item} />)}
          </div>
        </div>
      </section>

      <section id="threat-intelligence" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Threat intelligence" title="Subscribe to the signals you need." body="Platform and keyword intelligence are generic feeds that customers filter. Brand Protection is priced per brand." />
          <div className="grid gap-5 lg:grid-cols-3">
            {threatProducts.map((item) => <PriceCard key={item.name} item={item} />)}
          </div>
        </div>
      </section>

      <section id="api" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Intelligence API" title="Buy credits through the portal." body="Use API credits for lookup, enrichment, scoring and product integrations. The figures below are starting packages and can be adjusted later." />
          <div className="grid gap-5 lg:grid-cols-3">
            {apiPlans.map((plan) => <CompactPlanCard key={plan.name} plan={plan} />)}
          </div>
        </div>
      </section>

      <section id="data-shares" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Cloud data shares" title="Buy directly or through your marketplace." body="For analytics teams, platforms and data buyers who want Datazag intelligence inside their cloud data environment." />
          <div className="grid gap-5 lg:grid-cols-3">
            {dataShares.map((plan) => <CompactPlanCard key={plan.name} plan={plan} />)}
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-slate-300">
            Marketplace routes can include Snowflake, Databricks, Microsoft Fabric and compatible Iceberg, Delta or parquet delivery depending on customer requirements.
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeader eyebrow="FAQ" title="Pricing questions, answered directly." body="The goal is to help buyers understand cost quickly without forcing every conversation through sales." />
            </div>
            <div className="grid gap-4">
              {faq.map((item) => (
                <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/80">Enterprise and partner packages</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Need more than one product?</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Combine reports, threat intelligence, API credits, data shares and partner delivery into one package. We can support direct contracts, marketplace purchase, private offers and partner terms.</p>
              </div>
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Build a package</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
