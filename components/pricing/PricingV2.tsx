import { CurrencyText } from "@/components/ui/CurrencyText";
import { PAID_REPORT_BUY_URL, PRICING, SNAPSHOT_BUY_URL, launchedSkus, priceMarker, type Sku } from "@/lib/pricing";

// The pricing page (brief: report pricing ladder, 8 Oct 2026). Every price, scope line,
// delivery time and unit definition comes from the shared pricing config
// (@datazag/site-chrome/pricing, read through lib/pricing.ts). Prices render through
// CurrencyText, which converts {{PRICE:cents}} markers to the visitor's currency; the
// markers are built from the config, never typed (scripts/guards/checkPriceGuard.mjs).

const checkoutLive = process.env.NEXT_PUBLIC_REPORTS_CHECKOUT_LIVE === "true";
const scopeLive = process.env.NEXT_PUBLIC_SCOPE_LIVE === "true";

// Where each SKU starts. Estates start with the free scope: discovery is shown free, and
// the tier follows the domains you include.
const START: Record<string, { label: string; href: string }> = {
  free_snapshot: { label: "Get a free report", href: "/#free-report" },
  domain_report: checkoutLive
    ? { label: "Buy the report", href: PAID_REPORT_BUY_URL }
    : { label: "Contact us", href: "/contact" },
  org_estate_10: { label: "Start with a free scope", href: scopeLive ? "/#free-scope" : "/contact" },
  org_estate_50: { label: "Start with a free scope", href: scopeLive ? "/#free-scope" : "/contact" },
  org_estate_250: { label: "Start with a free scope", href: scopeLive ? "/#free-scope" : "/contact" },
  portfolio_25: { label: "Upload your portfolio", href: SNAPSHOT_BUY_URL },
  portfolio_50: { label: "Upload your portfolio", href: SNAPSHOT_BUY_URL },
  diligence: { label: "Request a diligence edition", href: "/contact?enquiry=diligence" },
};

const includes = [
  "Public DNS, email authentication and registration, checked live",
  "Certificates, subdomains and the SaaS platforms a domain relies on",
  "Platform impersonation and look-alike domains",
  "Evidence for every finding, the fix and how to verify it",
  "PDF and HTML, with CSV and JSON exports on paid reports",
];

const excludes = [
  "Endpoint security",
  "Internal networks",
  "Identity and access management",
  "Patch posture",
];

const faq = [
  {
    question: "What if discovery finds more domains than my tier covers?",
    answer: "Discovered domains are shown free. They count toward your cap only if you include them. We offer the next tier, and never bill more automatically.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, if we cannot generate your report. Once a report is delivered, the purchase is final.",
  },
  {
    question: "Can I get an invoice?",
    answer: "Every purchase comes with a receipt and an invoice. Add your company tax ID at checkout and it appears on both.",
  },
  {
    question: "How are VAT and sales tax handled?",
    answer: "Prices are in US dollars, before tax. Any VAT or sales tax for your location is calculated at checkout.",
  },
  {
    question: "Can I buy through a cloud marketplace?",
    answer: "Data shares are offered through Snowflake, Databricks and Azure, or delivered directly from Cloudflare R2.",
  },
  {
    question: "Do partners get different pricing?",
    answer: "Managed service partners buy the same reports at a partner discount set on their account.",
  },
];

function CheckIcon() {
  return <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />;
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

function LadderRow({ s }: { s: Sku }) {
  const start = START[s.sku];
  const free = s.price_usd === 0;
  return (
    <tr className="border-b border-white/10 align-top">
      <td className="py-4 pr-4">
        <p className="font-semibold text-white">{s.product}</p>
        <p className="mt-1 text-sm leading-6 text-slate-400">{s.scope}</p>
      </td>
      <td className="py-4 pr-4 text-sm text-slate-300">{s.delivery}</td>
      <td className="py-4 pr-4 text-xl font-semibold text-white"><CurrencyText value={priceMarker(s)} /></td>
      <td className="py-4 text-right">
        {start ? (
          <a href={start.href} className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${free ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200" : "border border-white/10 bg-white/[0.045] text-white hover:bg-white/[0.08]"}`}>
            {start.label}
          </a>
        ) : null}
      </td>
    </tr>
  );
}

export function PricingV2() {
  const ladder = launchedSkus();
  const alerts = PRICING.subscriptions.filter((s) => s.launch && s.sku.startsWith("alerts_"));
  const shares = PRICING.subscriptions.filter((s) => s.launch && s.sku.startsWith("data_share_"));
  const per = (i: "month" | "year") => (i === "month" ? "/mo" : "/yr");
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.12),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Pricing</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">Clear prices, clear scope, fast delivery.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Start free, then buy the report that fits your estate. Every report is bought online and delivered by email.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
              <a href="#reports" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">See the reports</a>
            </div>
          </div>
        </div>
      </section>

      <section id="reports" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Reports" title="One domain, one organization or a whole portfolio." body="Each tier states what it covers and how fast it arrives. Prices are in US dollars, one-off." />
          <div className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.035] px-5">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="py-3 pr-4 font-semibold">Report and scope</th>
                  <th className="py-3 pr-4 font-semibold">Delivery</th>
                  <th className="py-3 pr-4 font-semibold">Price</th>
                  <th className="py-3" />
                </tr>
              </thead>
              <tbody>
                {ladder.map((s) => <LadderRow key={s.sku} s={s} />)}
                <tr className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-white">Annual monitoring</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{PRICING.monitoring.cadence}, for any report above.</p>
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-300">Every quarter</td>
                  <td className="py-4 pr-4 text-sm text-white">{PRICING.monitoring.multiplier} × the report price, per year</td>
                  <td className="py-4 text-right text-sm text-slate-400">Add at checkout</td>
                </tr>
                <tr className="align-top">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-white">Data and alerts</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">The datasets and alert feeds behind every report.</p>
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-300">Ongoing</td>
                  <td className="py-4 pr-4 text-sm text-white"><a href="#alerts" className="underline underline-offset-4">See below</a></td>
                  <td className="py-4 text-right"><a href="/datasets" className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Browse the datasets</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {([
              ["Registered domain", PRICING.units.registered_domain],
              ["Organization", PRICING.units.organization],
              ["Discovery", PRICING.units.discovery],
            ] as const).map(([term, def]) => (
              <article key={term} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-semibold text-white">{term}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{def}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-base font-semibold text-white">Every report includes</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-300">
                {includes.map((x) => <li key={x} className="flex gap-3"><CheckIcon /><span>{x}</span></li>)}
              </ul>
            </article>
            <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-base font-semibold text-white">Reports do not cover</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Reports look at what anyone can see from outside. They do not assess:</p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-300">
                {excludes.map((x) => <li key={x} className="flex gap-3"><CheckIcon /><span>{x}</span></li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="alerts" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Alerts" title="Live signals delivered into your workflow." body="For teams that monitor platform abuse, attacker infrastructure and brand impersonation day to day." />
          <div className="grid gap-5 lg:grid-cols-3">
            {alerts.map((a) => (
              <article key={a.sku} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{a.product}</h3>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  <CurrencyText value={priceMarker(a)} /><span className="text-sm font-normal text-slate-400">{a.quoted ? "" : per(a.interval)}</span>
                </p>
                <a href="/alerts" className="mt-4 inline-block text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline">How alerts work →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="data-shares" className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Cloud data products" title="Datazag data inside your warehouse." body="Buy directly, or through Snowflake, Databricks or Azure. Direct delivery comes from Cloudflare R2." />
          <div className="grid gap-5 lg:grid-cols-3">
            {shares.map((d) => (
              <article key={d.sku} className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{d.product}</h3>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  <CurrencyText value={priceMarker(d)} /><span className="text-sm font-normal text-slate-400">{d.quoted ? "" : per(d.interval)}</span>
                </p>
              </article>
            ))}
          </div>
          <a href="/datasets" className="mt-6 inline-block text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline">Browse the datasets →</a>
        </div>
      </section>

      <section className="relative border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeader eyebrow="FAQ" title="Pricing questions, answered." body="Scope, refunds, invoices and tax, in plain terms." />
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
