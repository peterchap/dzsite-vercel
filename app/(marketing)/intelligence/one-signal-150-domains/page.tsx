import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { CASE_STUDY, caseStudyUrl } from "./data";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(CASE_STUDY.siteUrl),
    title: "One Signal, 150 Domains — Infrastructure Intelligence Case Study | Datazag",
    description:
      "One certificate → a 150-domain malicious hosting cluster → 0 in public domain feeds. How Datazag pivoted a single signal into an entire criminal hosting operation before any feed caught it.",
    alternates: { canonical: caseStudyUrl() },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: caseStudyUrl(),
      title: "One Signal, 150 Domains — Infrastructure Intelligence Case Study",
      description:
        "One certificate → a 150-domain malicious hosting cluster → 0 in public domain feeds.",
      siteName: "Datazag",
    },
    twitter: {
      card: "summary_large_image",
      title: "One Signal, 150 Domains — Datazag Infrastructure Intelligence",
      description:
        "One certificate → a 150-domain malicious hosting cluster → 0 in public domain feeds.",
    },
  };
}

/** Defanged indicator — rendered as text/code, NEVER a clickable link (WU23 §3.4). */
function Ioc({ children }: { children: ReactNode }) {
  return (
    <code className="mx-0.5 inline-block whitespace-nowrap rounded-md border border-white/10 bg-[#030619]/70 px-1.5 py-0.5 font-mono text-[0.82em] text-slate-200">
      {children}
    </code>
  );
}

function SectionLabel({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="mb-7 flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold text-rose-300">{num}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">{children}</h2>
    </div>
  );
}

export default function OneSignal150DomainsPage() {
  const c = CASE_STUDY;

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      {/* ---------- Hero ---------- */}
      <section className="relative border-b border-white/10 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(244,63,94,0.10),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(45,212,191,0.10),transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Threat Intelligence · Case Study
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            One signal exposed an entire <span className="text-rose-300">criminal hosting cluster</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A single certificate — on a domain that looked completely legitimate — unraveled a
            150-domain bulletproof hosting operation. Not one of those domains had been caught by any
            public domain feed.
          </p>

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">
            {c.timestamps.flagged} · {c.timestamps.feedsChecked}
          </p>

          {/* Stat triptych 1 / 150 / 0 */}
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 sm:grid-cols-3">
            {[
              { n: "1", k: "signal detected", tone: "text-white" },
              { n: "150", k: "domains uncovered", tone: "text-emerald-300" },
              { n: "0", k: "in public domain feeds", tone: "text-rose-300" },
            ].map((cell, i) => (
              <div
                key={cell.k}
                className={`p-6 ${i < 2 ? "border-b border-white/10 sm:border-b-0 sm:border-r" : ""}`}
              >
                <div className={`font-mono text-5xl font-bold tabular-nums md:text-6xl ${cell.tone}`}>{cell.n}</div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-slate-400">{cell.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 01 The domain that looked legitimate ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionLabel num="01">The domain that looked legitimate</SectionLabel>
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed text-white md:text-2xl">
              Our pipeline flagged <Ioc>mail.e-socialstatement[.]com</Ioc> — a polished replica of the
              U.S. Social Security Administration&rsquo;s member portal.
            </p>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Look at the page and you&rsquo;d move on. So would an automated website scanner: clean
              layout, federal-blue styling, the right words. Nothing on the surface says
              &ldquo;phishing.&rdquo;
            </p>
            <p className="mt-5 text-base leading-7 text-slate-300">
              But the domain resolved into <Ioc>AS213790</Ioc>, an Iranian network our pipeline scores{" "}
              <b className="text-white">1.0 for bulletproof behavior</b> with an{" "}
              <b className="text-white">abuse score of 95 / 100</b> — parts of which Spamhaus DROP
              independently lists as criminal-controlled address space. The U.S. Social Security
              Administration does not host on Iranian bulletproof infrastructure. The surface lied.
              The infrastructure didn&rsquo;t.
            </p>
          </div>

          {/* Fact bar */}
          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: "Network", v: "AS213790 · IR", crit: false },
              { l: "Bulletproof", v: "1.00", crit: true },
              { l: "Abuse score", v: "95 / 100", crit: true },
              { l: "Domains on ASN", v: "44", crit: false },
            ].map((f) => (
              <div key={f.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.13em] text-slate-400">{f.l}</div>
                <div className={`mt-2 font-mono text-xl font-bold tabular-nums ${f.crit ? "text-rose-300" : "text-white"}`}>{f.v}</div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="mt-7 max-w-3xl rounded-r-xl border-l-[3px] border-rose-400/80 bg-white/[0.03] px-6 py-5">
            <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
              <span className="text-slate-500 line-through decoration-slate-600">Has a website</span>
              &nbsp;≠&nbsp; is legitimate.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Phishing pages are built to look real — that&rsquo;s the entire point. A surface check
              waves them through. Only the infrastructure gives them away.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 02 The pivot (hero visual: numbered vertical stepper) ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionLabel num="02">The pivot: one lead becomes the whole map</SectionLabel>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            A confirmed-bad domain isn&rsquo;t an endpoint — it&rsquo;s a thread. Attackers register
            throwaway domains cheaply but reuse hosting, so the infrastructure is what ties a campaign
            together. We pulled the thread.
          </p>

          <ol className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30">
            {c.pivotSteps.map((step, i) => {
              const last = i === c.pivotSteps.length - 1;
              return (
                <li
                  key={step.n}
                  className={`grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 px-5 py-5 sm:grid-cols-[64px_1fr_auto] sm:px-6 ${
                    last ? "bg-emerald-300/[0.06]" : ""
                  } ${i > 0 ? "border-t border-white/10" : ""}`}
                >
                  <span className="font-mono text-sm font-bold tracking-wide text-rose-300">{step.n}</span>
                  <span className="text-[15px] font-semibold leading-6 text-white">
                    {step.action}
                    {step.aside ? <span className="font-normal text-slate-400"> {step.aside}</span> : null}
                  </span>
                  <span className="col-start-2 whitespace-nowrap text-left font-mono text-sm font-bold tabular-nums text-emerald-300 sm:col-start-3 sm:text-right">
                    {step.result}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 max-w-3xl border-l-2 border-white/15 pl-4 font-mono text-sm leading-6 text-slate-300">
            The certificate is the tell. Attackers hide domains behind bare IP addresses, but the TLS
            certificate a server presents names them out loud. Mapped in minutes on{" "}
            {c.timestamps.sweptShort} — no prior knowledge of a single one of these domains.
          </p>
        </div>
      </section>

      {/* ---------- 03 What was hiding on the network (2×3 grid) ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionLabel num="03">What was hiding on the network</SectionLabel>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            One tenant, <Ioc>offshorehost[.]info</Ioc>, advertises the service by name. The rest is a
            full-spectrum cybercrime host. Indicators defanged.
          </p>

          <div className="mt-8 grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
            {c.categories.map((cat) => (
              <article key={cat.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-rose-400" />
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{cat.text}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.iocs.map((i) => (
                    <Ioc key={i}>{i}</Ioc>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 04 The part that matters: we were first ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionLabel num="04">The part that matters: we were first</SectionLabel>
          <p className="max-w-3xl text-xl leading-relaxed text-white md:text-2xl">
            We checked every domain and IP against the public threat feeds the industry runs on —
            OpenPhish, URLhaus, ThreatFox, Feodo Tracker, Spamhaus, FireHOL.
          </p>

          <div className="mt-8 grid gap-5">
            {c.comparison.map((row) => (
              <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-base font-bold text-white">{row.label}</span>
                  <span className="font-mono text-sm text-slate-400">{row.metric}</span>
                </div>
                <div className="mt-5 grid gap-3">
                  <ComparisonBar who="Datazag" tone="ahead" pct={100} value={row.datazag} />
                  <ComparisonBar who={row.feedWho} tone="known" pct={row.feedPct} value={row.feed} empty={row.feedPct === 0} />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-5 font-mono text-xs text-slate-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-emerald-400" />Datazag infrastructure detection
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-amber-400" />Public threat feeds
              </span>
            </div>
          </div>

          <div className="mt-8 grid max-w-3xl gap-4">
            <p className="text-base leading-7 text-slate-300">
              <b className="text-white">Public domain feeds are reactive.</b> A domain gets listed{" "}
              <i>after</i> it&rsquo;s been reported attacking someone. Every one of these 150 was still
              invisible to them — the operation was mapped while it was still being built.
            </p>
            <p className="text-base leading-7 text-slate-300">
              <b className="text-white">Public IP lists corroborate, but don&rsquo;t cover.</b>{" "}
              Spamhaus DROP independently flags 2 of the 5 netblocks — strong third-party validation
              that the network is criminal. Yet even Spamhaus misses 3 of the 5, including the block
              serving the fake Apple, the BNP Paribas lookalike, and a Tor service.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Takeaway ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[22ch] text-3xl font-bold tracking-tight text-white md:text-5xl">
            The threat announces itself at the <span className="text-emerald-300">infrastructure</span>,
            long before the domain.
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-2.5 font-mono text-xs uppercase tracking-[0.12em] text-amber-300">Domain-first · reactive</div>
              <p className="text-[15px] leading-7 text-slate-300">
                Wait for a domain to attack, get reported, and propagate to a feed. By then the
                campaign has run — and the next hundred domains are already registered.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/[0.06] p-6">
              <div className="mb-2.5 font-mono text-xs uppercase tracking-[0.12em] text-emerald-300">Infrastructure-first · proactive</div>
              <p className="text-[15px] leading-7 text-slate-300">
                Find the reused, expensive thing — the hosting — and every domain on it falls out at
                once. One signal, the whole operation, before the phishing page ever lands in an inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- What this means if it's your feed (buyer translation + CTAs) ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.10),transparent_34%),radial-gradient(circle_at_82%_74%,rgba(0,194,255,0.10),transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            What this means if it&rsquo;s your feed
          </h2>
          <div className="mt-7 grid max-w-3xl gap-5">
            <p className="text-base leading-7 text-slate-300">
              These 150 domains and 5 netblocks would have arrived as scored, annotated records in
              your SIEM or warehouse — before the first phishing email was sent — because the
              intelligence is delivered as data into the stack you already run.
            </p>
            <p className="text-base leading-7 text-slate-300">
              For MSSPs, one investigation like this, white-labeled across your client base, is a
              retention artifact no reactive feed can produce.
            </p>
            <p className="text-base leading-7 text-slate-400">
              Not every flagged certificate unravels a 150-domain cluster. Every one is checked the
              same way.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#free-report"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              See what&rsquo;s pointing at your domain
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to us about the feed
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Methodology footnote ---------- */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
            Datazag · Infrastructure Intelligence
          </p>
          <p className="mt-3 max-w-[72ch] text-xs leading-6 text-slate-500">
            Findings from a single investigation conducted by the Datazag detection pipeline.
            Indicators are defanged; domains named are assessed as malicious infrastructure. Feed
            snapshot taken {c.timestamps.feedSnapshot}. Public-feed comparison reflects ingested feed
            snapshots (OpenPhish, URLhaus, ThreatFox, Feodo Tracker, Spamhaus DROP/ASN-DROP, FireHOL)
            and may differ from live feed state. Published {c.timestamps.publishedShort}.
          </p>
        </div>
      </section>
    </main>
  );
}

function ComparisonBar({
  who,
  tone,
  pct,
  value,
  empty = false,
}: {
  who: string;
  tone: "ahead" | "known";
  pct: number;
  value: string;
  empty?: boolean;
}) {
  const fill = tone === "ahead" ? "bg-emerald-400 text-slate-950" : "bg-amber-400 text-slate-950";
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-3.5 sm:grid-cols-[132px_1fr]">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400">{who}</span>
      <div className="relative h-7 overflow-hidden rounded-md border border-white/10 bg-[#030619]/60">
        {empty ? (
          <span className="flex h-full items-center px-3 font-mono text-xs font-bold text-slate-400">{value}</span>
        ) : (
          <span
            className={`absolute inset-y-0 left-0 flex items-center rounded-md px-3 font-mono text-xs font-bold ${fill}`}
            style={{ width: `${pct}%` }}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
}
