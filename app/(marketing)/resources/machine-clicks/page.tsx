import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { MACHINE_CLICKS_EVIDENCE_URL, MACHINE_CLICKS_GUIDE_PATH } from "@/lib/machine-clicks";
import { GUIDE, REVIEWED } from "./copy";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Machine clicks: implementation guide — Datazag",
  description:
    "How to separate security-product link requests from human clicks: four signals, the hidden link, what to log, and why provider networks must come from vendors.",
  alternates: { canonical: MACHINE_CLICKS_GUIDE_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: MACHINE_CLICKS_GUIDE_PATH,
    title: "Classify machine clicks in your own traffic",
    description: "Four signals, the hidden link, what to log, and the pitfalls.",
    siteName: "Datazag",
  },
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-white/10 py-12 md:py-16">
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      <div className="mt-6 space-y-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{children}</div>
    </section>
  );
}

export default function MachineClicksGuidePage() {
  const g = GUIDE;

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <section className="relative border-b border-white/10 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.14),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.11),transparent_34%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            {g.eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">{g.title}</h1>
          {g.lead.map((p) => (
            <p key={p} className="mt-6 text-lg leading-8 text-slate-300">{p}</p>
          ))}
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">
            Last reviewed <time dateTime={REVIEWED}>{REVIEWED}</time>
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <Section id="supply" title={g.supply.title}>
          {g.supply.body.map((p) => <p key={p}>{p}</p>)}
        </Section>

        <Section id="signals" title={g.signals.title}>
          <p>{g.signals.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {g.signals.items.map((s) => (
              <div key={s.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{s.text}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-amber-200/90">Fails when: </span>
                  {s.fails}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="hidden-link" title={g.hiddenLink.title}>
          {g.hiddenLink.body.map((p) => <p key={p}>{p}</p>)}
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">Cautions</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
              {g.hiddenLink.cautions.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </Section>

        <Section id="log" title={g.log.title}>
          <p>{g.log.intro}</p>
          <ul className="list-disc space-y-2 pl-5">
            {g.log.items.map((i) => <li key={i}>{i}</li>)}
          </ul>
          <p>{g.log.outro}</p>
        </Section>

        <Section id="networks" title={g.networks.title}>
          {g.networks.body.map((p) => <p key={p}>{p}</p>)}
        </Section>

        <Section id="pitfalls" title={g.pitfalls.title}>
          <ul className="space-y-4">
            {g.pitfalls.items.map((p) => (
              <li key={p.key}>
                <span className="font-semibold text-white">{p.title}</span> {p.text}
              </li>
            ))}
          </ul>
        </Section>

        {/* Renders only once the Observatory evidence page is live (lib/machine-clicks.ts). */}
        {MACHINE_CLICKS_EVIDENCE_URL ? (
          <section className="border-t border-white/10 py-12 md:py-16">
            <a
              href={MACHINE_CLICKS_EVIDENCE_URL}
              className="block rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.075] p-6 transition hover:bg-cyan-300/[0.12]"
            >
              <h2 className="text-xl font-semibold text-white">{g.evidenceLink.title} →</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{g.evidenceLink.text}</p>
            </a>
          </section>
        ) : null}

        <p className="border-t border-white/10 pt-8 text-sm text-slate-400">
          For ESPs: <Link href="/esp-partners" className="text-cyan-200 underline-offset-4 hover:underline">email intelligence under your brand</Link>.
        </p>
      </article>
    </main>
  );
}
