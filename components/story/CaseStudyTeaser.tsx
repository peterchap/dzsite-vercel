import Link from "next/link";

import { CASE_STUDY } from "@/app/(marketing)/intelligence/one-signal-150-domains/data";

/**
 * Homepage proof block (WU23 §5). Sits directly under the hero and is the
 * receipt for the hero's "we see them being built" claim. Supersedes the
 * generic Detection Advantage timeline as the primary proof slot.
 */
export function CaseStudyTeaser() {
  return (
    <section className="relative border-t border-white/10 py-14 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={CASE_STUDY.path}
          className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.05] md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#030619]/60">
              {CASE_STUDY.triptych.map((cell, i) => (
                <div key={cell.k} className={`px-5 py-4 ${i < 2 ? "border-r border-white/10" : ""}`}>
                  <div
                    className={`font-mono text-3xl font-bold tabular-nums md:text-4xl ${
                      i === 1 ? "text-emerald-300" : i === 2 ? "text-rose-300" : "text-white"
                    }`}
                  >
                    {cell.n}
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">{cell.k}</div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70">Case study</p>
              <p className="mt-3 max-w-2xl text-lg font-medium leading-7 text-white md:text-xl">
                {CASE_STUDY.teaserLine}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200">
                Read the investigation
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
