import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Threat Alerts — Datazag",
  description:
    "Early alerts for platform abuse, brand impersonation, suspicious subdomains and emerging attack infrastructure, with reason codes and evidence for operational workflows.",
};

const outcomes = [
  {
    title: "See infrastructure earlier",
    text: "Monitor domains, DNS, certificates and hosting changes before suspicious infrastructure becomes a full incident.",
  },
  {
    title: "Separate the response",
    text: "Platform abuse, brand impersonation and suspicious keyword infrastructure need different operational actions.",
  },
  {
    title: "Reduce noisy matches",
    text: "Candidate alerts are checked against known-good infrastructure, brand baselines, platform patterns and cloud footprints.",
  },
  {
    title: "Deliver into workflows",
    text: "Send reasoned alerts to SOC queues, partner portals, Palo Alto, Microsoft Sentinel, Splunk, webhooks, APIs or data shares.",
  },
];

const alertClasses = [
  {
    title: "Platform impersonation",
    response: "Block, enrich detections, watch related infrastructure and de-escalate known-good findings.",
    text: "Attackers often borrow trust from cloud, identity, email, payment, storage and collaboration platforms. The practical response is usually blocking and detection rather than takedown unless the customer owns the affected brand.",
    signals: ["Platform terms", "Login lures", "Known-good comparison", "Cloud allowlists", "Related infrastructure"],
  },
  {
    title: "Brand impersonation",
    response: "Prepare evidence, capture website state, identify abuse contacts and support takedown workflows.",
    text: "When the alert targets a brand the customer owns or represents, the workflow can move beyond blocking into evidence capture, abuse reporting and remediation tracking.",
    signals: ["Owned brands", "Aliases", "Suspicious wording", "Website evidence", "Abuse contacts"],
  },
  {
    title: "Keyword and subdomain infrastructure",
    response: "Investigate, block or watchlist suspicious lure terms that do not cleanly match a monitored brand.",
    text: "The apex domain may be parked or generic while the active subdomain carries the lure: login, secure, verify, billing, wallet, update or support.",
    signals: ["Suspicious subdomains", "Parked apex", "DNS activation", "Novelty", "Hosting context"],
  },
  {
    title: "Infrastructure anomalies",
    response: "Escalate suspicious domains and IPs discovered around bad actor infrastructure before they appear in conventional lists.",
    text: "When a candidate is linked to risky infrastructure, Datazag checks related IPs, prefixes, ASNs, DNS relationships and hosted domains to uncover other connected assets that may not yet have been detected elsewhere.",
    signals: ["Related domains", "Related IPs", "Shared hosting", "Prefix changes", "BGP/MOAS signals"],
  },
  {
    title: "Customer watchlists",
    response: "Monitor customer-specific brands, suppliers, platforms, domains and high-risk terms with tailored thresholds.",
    text: "Customer context changes how alerts are interpreted. A term that is harmless for one organisation may be important for another.",
    signals: ["Customer brands", "Suppliers", "Terms", "Domains", "Approved baselines"],
  },
];

const pipeline = [
  { title: "Observe", text: "New domains, subdomains, certificates, DNS and infrastructure changes are captured." },
  { title: "Match", text: "Candidates are matched against platforms, brands, keywords, watchlists and suspicious naming patterns." },
  { title: "Filter", text: "Known-good DNS, platform baselines, cloud allowlists and approved customer footprints reduce false positives." },
  { title: "Explain", text: "Reason codes, confidence context, infrastructure evidence and suggested action are attached to the alert." },
  { title: "Deliver", text: "Alerts are sent to the operational route that fits the team: webhook, API, SIEM, portal, report or data share." },
];

const alertExampleFields = [
  ["Incident ID", "INC-1782384515-13ec9b"],
  ["Classification", "RED → ISSUE_BLOCK_NOTICE"],
  ["Match", "Platform — exchange"],
  ["Customer", "Generic"],
  ["ASN Risk Score", "1.00 · critical"],
  ["ASN", "AS14618 Amazon AES"],
  ["Registration", "—"],
  ["Detected Hosting Infrastructure", "52.20.84.62 (behind aws)"],
  ["Confidence", "48/100"],
];

const alertExampleReasons = [
  "Platform impersonation targeting 'exchange' (Category: Microsoft 365)",
  "Domain not found in known 330M corpus",
  "infra: ELEVATED_NETWORK_TYPE",
  "infra: CERTSTREAM_ANOMALY",
  "infra: MALICIOUS_IP_DENSITY",
  "infra: PREFIX:BGP_MOAS_SPECIFIC_NEW_ORIGIN",
  "infra: ASN:critical",
  "infra: CDN_FRONTED:aws",
];

const alertAnnotations = [
  ["Classification", "RED → ISSUE_BLOCK_NOTICE tells the receiving workflow this is a block-notice candidate rather than a general observation."],
  ["Match", "The alert identifies the platform lure and category, here an Exchange/Microsoft 365-themed platform signal."],
  ["Infrastructure risk", "ASN score, hosting IP, CDN/fronting context and BGP/MOAS signals explain why the infrastructure is higher risk."],
  ["Reason codes", "Analysts and automations can see the individual signals that caused escalation instead of treating the alert as a black box."],
  ["Latency", "E2E latency shows how quickly the alert moved through the detection pipeline; DNS resolution phase is reported separately."],
];

const evidence = [
  ["Reason codes", "Why the candidate escalated: brand term, platform term, suspicious keyword, DNS activity, certificate event or infrastructure risk."],
  ["Infrastructure context", "Hosting provider, ASN, DNS, certificate, related domains, related IPs, novelty and relationship signals."],
  ["Known-good checks", "Comparison against approved customer infrastructure, brand DNS, platform baselines and cloud footprints."],
  ["Recommended action", "Block, investigate, watchlist, prepare evidence, route for review, de-escalate or monitor for content."],
  ["Feedback path", "Customer or analyst feedback can de-escalate accepted findings and improve future routing."],
];

const useCases = [
  {
    title: "SOC and threat hunting",
    text: "Prioritise emerging infrastructure before campaigns create incident volume.",
  },
  {
    title: "MSSP and MDR delivery",
    text: "Package early alerting, evidence and customer reporting into managed detection services.",
  },
  {
    title: "Brand protection",
    text: "Separate blocking workflows from evidence-pack and takedown workflows for owned brands.",
  },
  {
    title: "ESP abuse workflows",
    text: "Score suspicious links, domains and infrastructure flowing through email platforms.",
  },
  {
    title: "Data-driven security teams",
    text: "Join alerts with lakehouse, SIEM, ticketing and case-management workflows.",
  },
];

const delivery = [
  {
    title: "Webhooks",
    text: "Push alert events into launch integrations for Palo Alto, Microsoft Sentinel and Splunk, or into custom ticketing, SOAR and portal workflows.",
  },
  {
    title: "API",
    text: "Score, enrich and retrieve alert context inside products, review queues and case-management tools.",
  },
  {
    title: "SIEM and SOC tools",
    text: "Route alerts and reason fields into detection, investigation and response workflows, including Sentinel and Splunk environments.",
  },
  {
    title: "Reports and evidence packs",
    text: "Package findings for executives, customers, takedown workflows and account reviews.",
  },
  {
    title: "Cloud data shares",
    text: "Use Iceberg or Delta datasets for analytics, hunting, enrichment and historical review.",
  },
];

const falsePositiveControls = [
  ["Approved baselines", "Customer domains, brand DNS, known cloud footprints and recognised platform infrastructure are used to avoid obvious false positives."],
  ["Context before severity", "A naming match alone is not enough. DNS, certificates, hosting, novelty and relationship signals change routing and severity."],
  ["De-escalation feedback", "Accepted findings and known-good infrastructure can be de-escalated so teams are not forced to handle the same noise repeatedly."],
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

function AlertStackPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/20">
      <div className="rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Alert workflow</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">From signal to action</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">Observe internet changes, filter known-good infrastructure, attach reasons and deliver alerts into the workflow that can act.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-cyan-300/30" />
      <div className="rounded-[1.5rem] border border-white/10 bg-[#050b22] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Alert ingredients</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Domains", "DNS", "Certificates", "Infrastructure", "Brands", "Platforms", "Keywords", "Evidence"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-200">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AlertsPage() {
  return (
    <main className="overflow-hidden bg-[#030619] text-white">
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Threat Alerts</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Catch suspicious infrastructure before it reaches users.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Datazag monitors domains, DNS, certificates and infrastructure changes for early signs of platform abuse, brand impersonation and suspicious keyword-led infrastructure.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Each alert is delivered with reason codes, infrastructure context and a recommended action path so teams can block, investigate, watchlist, escalate or de-escalate with evidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Request alert access</a>
              <a href="#alert-types" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Explore alert types</a>
            </div>
          </div>
          <AlertStackPanel />
        </div>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Operational value"
            title="Earlier signals. Clearer actions. Less alert noise."
            body="Alerts are only useful when the receiving team knows what changed, why it matters and what action is appropriate."
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

      <section id="alert-types" className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Alert classes"
            title="Different infrastructure patterns need different responses."
            body="A platform lure, an owned-brand impersonation and a suspicious subdomain on a parked apex domain should not be routed in the same way."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {alertClasses.map((alertClass, index) => (
              <div key={alertClass.title} className={`grid gap-5 p-5 md:grid-cols-[0.26fr_0.36fr_0.38fr] md:items-start ${index > 0 ? "border-t border-white/10" : ""}`}>
                <div>
                  <h3 className="text-xl font-semibold text-white">{alertClass.title}</h3>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">Response</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{alertClass.response}</p>
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-400">{alertClass.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {alertClass.signals.map((signal) => <Tag key={signal}>{signal}</Tag>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Signal pipeline"
            title="From internet change to operational alert."
            body="The alert is the output of collection, matching, filtering, explanation and delivery. Each stage is designed to make the signal more usable."
          />
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#07102b]/80 p-5 md:p-7">
            <div className="grid gap-3 lg:grid-cols-5">
              {pipeline.map((step, index) => (
                <article key={step.title} className="relative rounded-2xl border border-white/10 bg-[#030619]/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-xs font-semibold text-cyan-100">{index + 1}</span>
                    {index < pipeline.length - 1 ? <span className="hidden text-cyan-200/40 lg:block">→</span> : null}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Annotated example"
            title="What a reasoned alert looks like."
            body="A useful alert is not just a domain and a severity. It shows the action path, the matched lure, the infrastructure context, the reason codes and how quickly the signal moved through the pipeline."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
              <div className="border-b border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/70">PLATFORM | RED</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Platform Risk Escalated | exchange.ws</h3>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                {alertExampleFields.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">Reason codes</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                  {alertExampleReasons.map((reason) => <li key={reason}>• {reason}</li>)}
                </ul>
              </div>
              <div className="border-t border-white/10 bg-cyan-300/[0.06] p-5">
                <p className="text-sm font-semibold text-cyan-100">E2E Latency: 4.415s | DNS Resolution Phase: -1ms</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
              {alertAnnotations.map(([title, text], index) => (
                <div key={title} className={`p-5 ${index > 0 ? "border-t border-white/10" : ""}`}>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Evidence"
            title="Every alert should explain itself."
            body="The goal is not to send more alerts. The goal is to give teams enough context to make a decision quickly and consistently."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
            {evidence.map(([title, text], index) => (
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
            title="Filtering happens before the alert reaches the team."
            body="Brand and platform terms collide with legitimate infrastructure every day. The alerting layer needs evidence, allowlists and feedback paths to stay operationally useful."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
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
            eyebrow="Use cases"
            title="One alert layer, multiple operational motions."
            body="The same infrastructure signal can support internal SOC work, managed services, brand protection, ESP abuse workflows and data-driven security operations."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {useCases.map((item) => (
              <article key={item.title} className="flex min-h-[14rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery"
            title="Use the route that fits the workflow."
            body="Alerts can be consumed as live operational events, enrichment calls, evidence packs or analytical datasets depending on the team using them."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {delivery.map((item) => (
              <article key={item.title} className="flex min-h-[16rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Start with the alert classes that match your workflow.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Begin with platform abuse, brand impersonation, keyword infrastructure, infrastructure anomalies or customer-specific watchlists, then route the alerts into the workflow that can act on them.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Request alert access</a>
          </div>
        </div>
      </section>
    </main>
  );
}
