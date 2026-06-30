import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Trust & Governance — Datazag",
  description:
    "How Datazag handles observable infrastructure data, evidence, licensing, privacy, false-positive controls and permitted use across reports, alerts, APIs and data shares.",
};

const principles = [
  {
    title: "Observable infrastructure",
    text: "Datazag focuses on public internet signals such as domains, DNS, certificates, hosting, ASN context, routing and provider footprints.",
  },
  {
    title: "Evidence over black boxes",
    text: "Reports, alerts and enrichment outputs include evidence, reason codes and context so teams can inspect why a finding exists.",
  },
  {
    title: "Product-specific scope",
    text: "A free report, alert, API response and data share do not expose the same fields. Each product has its own scope, use case and delivery controls.",
  },
  {
    title: "Clear licensing boundaries",
    text: "Datazag separates internal intelligence operations from sellable data products, partner services and marketplace-ready outputs.",
  },
];

const evidenceLayers = [
  {
    title: "Observed facts",
    text: "Domain, DNS, certificate, mail, hosting, ASN, prefix, registrar and provider context that supports a report or alert finding.",
    tags: ["Domains", "DNS", "Certificates", "ASN", "Providers"],
  },
  {
    title: "Reason codes",
    text: "Readable explanations of why a domain, IP, infrastructure relationship, platform pattern or posture issue was considered relevant.",
    tags: ["Risk reasons", "Posture reasons", "Alert reasons", "Evidence fields"],
  },
  {
    title: "Confidence context",
    text: "Signals that help teams decide whether to automate, block, investigate, de-escalate, monitor or route to human review.",
    tags: ["Confidence", "Severity", "Routing", "Review path"],
  },
  {
    title: "Known-good and provider context",
    text: "Cloud, CDN, mailbox, hosting, platform and customer-approved context used to reduce accidental over-classification.",
    tags: ["Cloud", "CDN", "MX", "NS", "Allowlists"],
  },
  {
    title: "History and change",
    text: "Where included, point-in-time records and change history help buyers understand what changed and when it changed.",
    tags: ["Snapshots", "Deltas", "Time travel", "Change detection"],
  },
];

const productControls = [
  ["Reports", "Designed for business-readable findings, DNS defence analysis, threat exposure, remediation priorities and portfolio summaries."],
  ["Alerts", "Designed for operational delivery with alert class, reason codes, infrastructure context, recommended action and de-escalation paths."],
  ["API", "Designed for real-time scoring and enrichment inside customer products, analyst workflows and partner platforms."],
  ["Cloud data shares", "Designed for analytical joins, historical review, data science, threat hunting and marketplace-style consumption."],
  ["Partner services", "Designed so MSSPs, ESPs and service providers can package intelligence into their own services without reselling raw data by default."],
];

const licensing = [
  {
    title: "Included by default",
    points: [
      "Use Datazag outputs inside the licensed product or workflow.",
      "Use reports, alerts and enrichment to support internal decisions and customer-facing managed services where contracted.",
      "Use permitted fields, schemas and delivery routes defined for the product purchased.",
    ],
  },
  {
    title: "Not included by default",
    points: [
      "Raw data resale, bulk redistribution or standalone sublicensing.",
      "Publishing Datazag data into another marketplace or public dataset.",
      "Allowing downstream resellers, franchisees or channel partners to use or resell Datazag-powered services without written approval.",
    ],
  },
  {
    title: "Handled by agreement",
    points: [
      "Partner-branded reporting and portal features.",
      "Portfolio-wide or multi-client use cases.",
      "Marketplace, data-share, white-label and downstream partner rights.",
    ],
  },
];

const privacy = [
  ["Public internet data", "Most intelligence products are built from externally observable infrastructure, not from customer inboxes, endpoint telemetry or private network traffic."],
  ["Report requests", "For free reports, the submitted work email is used to derive the domain, process the request and deliver the report."],
  ["Marketing consent", "Marketing follow-up should be separate from the processing needed to generate a requested report."],
  ["Customer context", "Customer-supplied brands, domains, watchlists or approved baselines are used to make outputs more relevant and reduce false positives."],
];

const falsePositiveControls = [
  ["Known-good infrastructure", "Provider attribution, customer-approved infrastructure and common platform footprints help avoid obvious misclassification."],
  ["Context before action", "A platform or brand term alone should not determine severity. DNS, certificate, hosting, history and relationship signals change routing."],
  ["De-escalation path", "Operational products can include review and de-escalation workflows so accepted or known-good findings do not remain noisy."],
  ["Human-readable evidence", "Reason codes and evidence fields give analysts and customers a way to challenge, validate or tune the output."],
];

const marketplaceBoundaries = [
  ["Derived intelligence", "Marketplace and data-share products should expose derived Datazag intelligence, public infrastructure facts and product-approved context."],
  ["Restricted inputs", "Internal-only feeds, restricted popularity data and raw third-party threat-feed rows are not published as standalone resale fields by default."],
  ["Schema discipline", "Published datasets need explicit field scope, refresh cadence, historical coverage and licensing boundaries."],
  ["Buyer clarity", "Customers should be able to understand what the dataset contains, how it can be used and what redistribution is not permitted."],
];

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

function TrustStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Buyer assurance</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Evidence, scope and licence clarity</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Trust comes from knowing what is included, what is excluded, how output can be used and where human review or contractual approval is needed.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Trust dimensions</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Evidence", "Reason codes", "Licensing", "Privacy", "False positives", "Data shares", "Partner use", "Governance"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrustPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Trust & Governance</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Use infrastructure intelligence you can inspect and govern.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag products are built around observable internet infrastructure, explainable evidence, controlled product scope and clear licensing boundaries.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              This page explains the trust model behind reports, alerts, APIs, data shares, marketplace datasets and partner-delivered services.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
              <a href="/alerts" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View alerts</a>
            </div>
          </div>
          <TrustStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trust principles"
            title="Evidence first. Scope explicit. Rights controlled."
            body="Buyers need more than a data feed. They need to understand what evidence supports the output, how it can be used and where the boundaries sit."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <article key={principle.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h2 className="text-lg font-semibold text-white">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What customers can inspect"
            title="The evidence behind reports, alerts and data products."
            body="The exact fields vary by product, but Datazag output is designed to expose enough context for a buyer to understand and challenge the result."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {evidenceLayers.map((layer, index) => (
              <div key={layer.title} className={`grid gap-5 p-5 md:grid-cols-[0.28fr_0.44fr_0.28fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-xl font-semibold text-white">{layer.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{layer.text}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Product controls"
            title="Different products expose different slices of the intelligence layer."
            body="A report, alert, API response and cloud data share can draw on the same intelligence foundation, but each has its own field scope and intended use."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {productControls.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Licensing and permitted use"
            title="Built for operational use, not uncontrolled raw data resale."
            body="Licensing should be simple to understand: use the intelligence in the contracted workflow, but do not redistribute raw data or extend rights to downstream partners without agreement."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {licensing.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                  {item.points.map((point) => <li key={point}>• {point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Privacy and customer context"
            title="External intelligence with clear customer-input boundaries."
            body="Most Datazag products focus on externally observable infrastructure. Customer-supplied context is used to make the output more relevant and reduce noise."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {privacy.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="False-positive controls"
            title="Useful intelligence needs tuning and challenge paths."
            body="Security teams need confidence that platform names, brand terms and provider patterns are not being treated as malicious without context."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {falsePositiveControls.map(([title, text]) => (
              <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Marketplace and data-share boundaries"
            title="Data products are controlled at publish time."
            body="Cloud marketplace and data-share buyers need to know what is included, what is excluded and what redistribution rights do not come with the product by default."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {marketplaceBoundaries.map(([title, text], index) => (
              <div key={title} className={`grid gap-3 p-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-white/10" : ""}`}>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Use intelligence with evidence and boundaries.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Start with a report or alert workflow, then agree the product scope, delivery route and permitted use that fits your team, partner model or data-share requirement.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Get a free report</a>
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Talk to us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
