import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * WU28-B — the productised benchmark (enterprise/MSSP CTA). Splits the funnel
 * by buyer weight: the free report stays for self-serve/mid-market; this is
 * the heavier evaluation that ends with evidence.
 *
 * GATE (WU28-B §4): this page exists UNLINKED for founder review. Before it is
 * linked from the homepage/nav or set to index:
 *   - the WU27-C corroboration join must have run internally over ≥1 full
 *     window, and the win-rate/lead-time distribution reviewed by founders.
 * Flip robots to index,follow and mount BenchmarkSection (components/story/
 * BenchmarkSection.tsx) when the gate is documented as cleared.
 *
 * SCOPE RULES (locked): only TWO metrics are ever promised — lead time and
 * unique detections (three-bucket). Precision is reported only if the customer
 * adjudicates a sample against the rubric. Analyst workload is never promised
 * or measured.
 */

export const metadata: Metadata = {
  title: "Benchmark Datazag Against Your Current Feeds | Datazag",
  description:
    "A fixed-scope evaluation: your protected platforms, brands and feed history in — a lead-time and unique-detection benchmark report out. The meeting ends with evidence, not a demonstration.",
  // GATE: unlinked review page — flip to index,follow when WU28-B §4 clears.
  robots: { index: false, follow: false },
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-400">{children}</div>
    </div>
  );
}

export default function BenchmarkPage() {
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      {/* ---------- Hero ---------- */}
      <section className="relative border-b border-white/10 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(55,222,245,0.10),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.09),transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Enterprise evaluation</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Benchmark Datazag against your current feeds.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The meeting ends with evidence, not a demonstration.
          </p>
        </div>
      </section>

      {/* ---------- The fixed shape ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">A fixed scope, stated up front.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Block title="What you provide">
              <p>Your protected platforms, brands and keywords — the same scoping inputs every customer gives us.</p>
              <p>
                Plus one of: <b className="text-slate-200">~90 days of feed/blocklist history</b> (retrospective
                mode), or <b className="text-slate-200">a 14-day live window</b> (blind mode).
              </p>
            </Block>
            <Block title="What you get back">
              <p>
                The <b className="text-slate-200">Benchmark Report</b> — a fixed-format deliverable. Retrospective
                mode: within 10 working days. Live mode: the window plus 5 working days.
              </p>
              <p>
                The report is yours to keep regardless of purchase — branded, and written to circulate in your SOC.
              </p>
            </Block>
          </div>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight md:text-4xl">Two metrics. Locked in advance.</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            These are the only two things we promise to measure — agreed before the evaluation starts, so
            the result can&rsquo;t be re-scoped after the fact.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Block title="1 · Lead time">
              <p>
                For detections both sides made, the distribution of{" "}
                <code className="rounded bg-[#030619]/70 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-200">
                  your_feed_ts − datazag_ts
                </code>{" "}
                — how far ahead (or behind) we were, as percentiles, not anecdotes.
              </p>
            </Block>
            <Block title="2 · Unique detections">
              <p>
                Datazag detections absent from your feeds during the window, classified into three buckets that
                are never merged:
              </p>
              <ul className="grid gap-1.5 pl-4">
                <li className="list-disc">corroborated later by public feeds,</li>
                <li className="list-disc">appeared in your feeds after the window,</li>
                <li className="list-disc">not yet seen anywhere — classified, not discarded.</li>
              </ul>
            </Block>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
            Precision can additionally be <i>reported</i> if your team adjudicates a random sample against our
            published rubric — but it is not promised. Analyst-workload impact is never promised or measured:
            it is not honestly measurable inside an evaluation window, and we won&rsquo;t pretend otherwise.
          </p>
        </div>
      </section>

      {/* ---------- Data handling ---------- */}
      <section className="relative border-b border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Where your data goes.</h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">
            Evaluations run under NDA, with our standard DPA available before any data moves. Your feed history
            is processed in our zero-egress R2 object storage, used only for the benchmark join, never merged
            into our corpus or shared, and deleted on delivery of the report (or immediately on request).
            Retrospective mode means your data is historical by definition; blind mode sends us nothing —
            we deliver detections and you score us.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
            Prefer that your data never moves at all? Warehouse-native evaluation is coming to the Snowflake
            and Databricks marketplaces — the same methodology as a JOIN in your own warehouse, against your
            own ground truth. Ask about early access below.
          </p>
        </div>
      </section>

      {/* ---------- Qualification form ---------- */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Start the conversation.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            A few details route this to the right person — not a generic inbox.
          </p>

          <form className="mt-8 grid max-w-2xl gap-4" action="/api/enquiry" method="post">
            <input type="hidden" name="source" value="benchmark_qualification" />
            <input type="hidden" name="enquiry_type" value="benchmark" />
            <input type="hidden" name="page" value="/benchmark" />
            {/* Honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-slate-300">
                Name
                <input required name="name" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-300">
                Work email
                <input required type="email" name="email" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium text-slate-300">
              Company
              <input required name="company" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-slate-300">
                Protected platforms (rough count)
                <select name="scope" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" defaultValue="">
                  <option value="" disabled>Select…</option>
                  <option value="platforms_1_10">1–10</option>
                  <option value="platforms_11_50">11–50</option>
                  <option value="platforms_50_plus">50+</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-slate-300">
                Preferred mode
                <select name="benchmark_mode" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" defaultValue="">
                  <option value="" disabled>Select…</option>
                  <option value="retrospective">Retrospective (~90 days of feed history)</option>
                  <option value="live">Live blind window (14 days)</option>
                  <option value="undecided">Not sure yet</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium text-slate-300">
              Current feed / blocklist sources
              <textarea name="message" rows={3} placeholder="e.g. Recorded Future, OpenPhish, internal blocklist…" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-300/50" />
            </label>
            <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
              <input required type="checkbox" name="processing_authorisation" className="mt-1" />
              I&rsquo;m authorised to discuss my organisation&rsquo;s security tooling and consent to Datazag
              processing these details to respond.
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Request the benchmark
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
