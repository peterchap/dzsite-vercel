import React from "react";

import { Container } from "@/components/ui/Container";

type Card = {
  title: string;
  text: string;
};

type ExampleField = {
  label: string;
  value: string;
};

type ExampleAlert = {
  kicker: string;
  title: string;
  intro: string;
  severity: string;
  status: string;
  domain: string;
  fields: ExampleField[];
  reasons: string[];
  latency?: string;
};

type AlertType = {
  title: string;
  subtitle: string;
  coverage: string;
  action: string;
  text: string;
  evidence: string[];
};

type AlertTypeSection = {
  kicker: string;
  title: string;
  intro: string;
  stats: Card[];
  types: AlertType[];
  note?: string;
};

type ProductConceptPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  proof: Card[];
  narrative: {
    kicker: string;
    title: string;
    body: string[];
  };
  flowTitle: string;
  flow: Card[];
  alertTypeSection?: AlertTypeSection;
  exampleAlert?: ExampleAlert;
  packagesTitle?: string;
  packages?: Card[];
  finalTitle: string;
  finalBody: string;
};

function ConceptButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#030619] ${
        secondary
          ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
          : "border-cyan-300/50 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
      }`}
    >
      {children}
    </a>
  );
}

function SignalBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(55,222,245,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_48%_78%,rgba(93,73,255,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030619] to-transparent" />
    </div>
  );
}

function Section({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="relative border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{kicker}</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
          <div className="mt-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

function FlowVisual({ items }: { items: Card[] }) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-4 md:gap-4">
      <div className="pointer-events-none absolute left-[10%] right-[10%] top-[2.35rem] hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/50 to-cyan-300/10 md:block" aria-hidden="true" />
      {items.map((item, index) => (
        <li key={item.title} className="relative">
          {index < items.length - 1 ? (
            <div className="absolute -right-3 top-[1.72rem] z-10 hidden h-5 w-5 rotate-45 border-r border-t border-cyan-300/50 md:block" aria-hidden="true" />
          ) : null}
          <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200 shadow-lg shadow-cyan-950/30">0{index + 1}</div>
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}

function IntelligencePanel({ label }: { label: string }) {
  return (
    <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.03] p-4 shadow-2xl shadow-cyan-950/30 md:p-6">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07102b] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(55,222,245,0.12),transparent_28%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_30%)]" />
        <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>{label}</span>
          <span>Output</span>
        </div>
        <div className="relative mt-8 space-y-4">
          {["Signal", "Context", "Correlation", "Confidence", "Action"].map((item, index) => (
            <div key={item} className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-cyan-300" style={{ opacity: 0.35 + index * 0.13 }} />
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/50 to-transparent" />
              <span className="w-32 text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertTypeComparison({ section }: { section: AlertTypeSection }) {
  return (
    <Section kicker={section.kicker} title={section.title}>
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-lg leading-8 text-slate-300">{section.intro}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {section.stats.map((stat) => (
              <div key={stat.title} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
                <p className="text-2xl font-semibold text-cyan-100">{stat.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {section.types.map((type) => (
            <article key={type.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{type.subtitle}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{type.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{type.text}</p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Coverage</p>
                  <p className="mt-2 text-sm font-medium text-slate-100">{type.coverage}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#030619]/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Primary action</p>
                  <p className="mt-2 text-sm font-medium text-slate-100">{type.action}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-2">
                {type.evidence.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-[#030619]/50 px-4 py-3 text-sm leading-6 text-slate-300">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      {section.note ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-300">{section.note}</div>
      ) : null}
    </Section>
  );
}

function ExampleAlertPanel({ exampleAlert }: { exampleAlert: ExampleAlert }) {
  return (
    <Section kicker={exampleAlert.kicker} title={exampleAlert.title}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-lg leading-8 text-slate-300">{exampleAlert.intro}</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Why this matters</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">The alert is designed to show the domain, the matched platform, the infrastructure context, the confidence and the evidence trail in a form that can flow straight into operational channels.</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-red-400/25 bg-red-400/[0.04] shadow-2xl shadow-red-950/20">
          <div className="border-b border-white/10 bg-[#07102b] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-200">{exampleAlert.severity}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{exampleAlert.status}</h3>
              </div>
              <div className="rounded-full border border-red-300/30 bg-red-300/10 px-4 py-2 text-sm font-semibold text-red-100">RED</div>
            </div>
            <p className="mt-4 font-mono text-sm text-cyan-100">{exampleAlert.domain}</p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {exampleAlert.fields.map((field) => (
              <div key={field.label} className="rounded-2xl border border-white/10 bg-[#030619]/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{field.label}</p>
                <p className="mt-2 break-words text-sm font-medium text-slate-100">{field.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reason codes</p>
            <ul className="mt-4 grid gap-2">
              {exampleAlert.reasons.map((reason) => (
                <li key={reason} className="rounded-xl border border-white/10 bg-[#030619]/70 px-4 py-3 text-sm leading-6 text-slate-300">{reason}</li>
              ))}
            </ul>
            {exampleAlert.latency ? (
              <p className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-100">{exampleAlert.latency}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function ProductConceptPage({
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
  proof,
  narrative,
  flowTitle,
  flow,
  alertTypeSection,
  exampleAlert,
  packagesTitle,
  packages,
  finalTitle,
  finalBody,
}: ProductConceptPageProps) {
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <section className="relative overflow-hidden py-24 md:py-32">
        <SignalBackdrop />
        <Container>
          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">{title}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{intro}</p>
              {(primaryCta || secondaryCta) ? (
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  {primaryCta ? <ConceptButton href={primaryCta.href}>{primaryCta.label}</ConceptButton> : null}
                  {secondaryCta ? <ConceptButton href={secondaryCta.href} secondary>{secondaryCta.label}</ConceptButton> : null}
                </div>
              ) : null}
            </div>
            <IntelligencePanel label={eyebrow} />
          </div>
        </Container>
      </section>

      <section className="relative border-t border-white/10 py-16 md:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            {proof.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h2 className="text-base font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Section kicker={narrative.kicker} title={narrative.title}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            {narrative.body.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-lg leading-8 text-slate-300 first:mt-0">{paragraph}</p>
            ))}
          </div>
          <FlowVisual items={flow} />
        </div>
      </Section>

      {alertTypeSection ? <AlertTypeComparison section={alertTypeSection} /> : null}

      <Section kicker="How it works" title={flowTitle}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <FlowVisual items={flow} />
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.04] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Decision-ready output</p>
            <p className="mt-4 text-2xl font-semibold text-white">Signals become evidence, evidence becomes confidence, confidence becomes action.</p>
            <p className="mt-5 text-sm leading-6 text-slate-300">The purpose is not to show more data. The purpose is to reduce uncertainty at the point where a team, customer or system has to make a decision.</p>
          </div>
        </div>
      </Section>

      {exampleAlert ? <ExampleAlertPanel exampleAlert={exampleAlert} /> : null}

      {packages?.length ? (
        <Section kicker="Packaging" title={packagesTitle ?? "Ways to use Datazag."}>
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <section className="relative border-t border-white/10 py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Next step</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{finalTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">{finalBody}</p>
            {primaryCta ? (
              <div className="mt-10 flex justify-center">
                <ConceptButton href={primaryCta.href}>{primaryCta.label}</ConceptButton>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  );
}
