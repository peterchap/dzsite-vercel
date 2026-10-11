import type { Metadata } from "next";

import { BlogConfirmationBanner } from "@/components/blog/BlogConfirmationBanner";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { ResearchList } from "@/components/research/ResearchList";
import { latestResearch } from "@/lib/research";

/**
 * DATAZAG INSIGHTS (/insights) — original findings and industry reports based on
 * the data lake. One of the four parts of the brand (2026-10-11): Datazag, the
 * Observatory, Insights and the Engineering blog.
 *
 * The listing reads lib/research.ts, the one list of published pieces. Pieces are
 * code pages under /insights/<slug>. Until 2026-10-11 they lived at
 * /intelligence/<slug> and were listed on /blog; both old paths 301 here.
 */
export const metadata: Metadata = {
    title: "Datazag Insights — original findings from the data lake",
    description:
        "Original findings and industry reports based on the Datazag data lake. Each piece is dated and names what it measured.",
};

export default function InsightsPage() {
    const pieces = latestResearch();

    return (
        <main className="relative overflow-hidden bg-[#030619] text-white">
            <BlogConfirmationBanner />
            {/* The header is kept short so the pieces start above the fold. The small
                labels use ! because globals.css forces h2 sizes with !important. */}
            <section id="insights" className="relative pb-20 pt-12 md:pb-28 md:pt-16">
                <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.14),transparent_36%),radial-gradient(circle_at_82%_60%,rgba(139,92,246,0.11),transparent_38%)]" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Datazag Insights</p>
                        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Original findings from the data lake.</h1>
                        <p className="mt-4 text-base leading-7 text-slate-300">
                            Findings and industry reports on domains, DNS, mail and hosting. Each piece is dated and names what it measured. The
                            daily figures behind them are in the{" "}
                            <a href="https://observatory.datazag.com" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                                Datazag Observatory
                            </a>
                            .
                        </p>
                    </div>
                    <ResearchList pieces={pieces} />
                </div>
            </section>

            <section className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Subscribe</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Get Datazag updates.</h2>
                    <p className="mt-5 text-base leading-7 text-slate-300">New findings and product notes, sent when we publish.</p>
                    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-left">
                        <BlogSubscribe />
                    </div>
                </div>
            </section>
        </main>
    );
}
