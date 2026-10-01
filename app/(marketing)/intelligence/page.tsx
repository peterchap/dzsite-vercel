import type { Metadata } from "next";

import { ResearchList } from "@/components/research/ResearchList";
import { latestResearch } from "@/lib/research";

/**
 * /intelligence — the research index. Every piece is listed from lib/research.ts.
 * Until 2026-10-01 this path returned 404 and the research had no home page.
 */
export const metadata: Metadata = {
  title: "Research — Datazag",
  description:
    "Dated findings measured across the Datazag DNS corpus: concentration, email authentication and infrastructure, with the population and method stated.",
};

export default function IntelligenceIndexPage() {
  const pieces = latestResearch();
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <section className="relative border-b border-white/10 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(251,191,36,0.10),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(45,212,191,0.10),transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Datazag research</p>
          <h1 className="mt-6 max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            What the internet&rsquo;s infrastructure actually looks like.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Findings measured across the Datazag DNS corpus. Each piece is dated, names the population it measured and says what it does not
            show. The daily figures behind them are in the{" "}
            <a href="https://observatory.datazag.com" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Datazag Observatory
            </a>
            .
          </p>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ResearchList pieces={pieces} />
        </div>
      </section>
    </main>
  );
}
