import type { Metadata } from "next";
import Link from "next/link";

/**
 * APIs — COMING SOON (/apis).
 *
 * The brand line reads "Datasets · APIs · Alert Feeds · Reports" (2026-10-11), but
 * the API docs and API pricing came off the site on 2026-10-01. Peter's decision:
 * keep "APIs" in the line and link it here, so the word does not point at nothing.
 *
 * This page promises ONE thing: that the Sender Diligence API is in development.
 * It states no date, no endpoint, no price and no feature. Add those only when
 * the API ships, and remove the noindex then.
 *
 * It is at /apis, not /api, because app/api holds the route handlers.
 */
export const metadata: Metadata = {
    title: "APIs — coming soon — Datazag",
    description: "The Datazag Sender Diligence API is in development. Datazag data is available today as datasets, alert feeds and reports.",
    robots: { index: false, follow: true },
};

const AVAILABLE_NOW = [
    { title: "Datasets", text: "SQL-ready data in your warehouse or lakehouse.", href: "/datasets" },
    { title: "Alert feeds", text: "Threat alerts delivered to Microsoft Sentinel.", href: "/alerts" },
    { title: "Reports", text: "Assessments of one domain or a whole estate.", href: "/reports" },
];

export default function ApisPage() {
    return (
        <main className="relative overflow-hidden bg-[#030619] text-white">
            <section className="relative py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">APIs</p>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Coming soon.</h1>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        The Sender Diligence API is in development. It is not available yet.
                    </p>
                    <p className="mt-4 text-base leading-7 text-slate-300">
                        If an API would suit how you work,{" "}
                        <Link href="/contact" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                            tell us what you need
                        </Link>
                        . It helps us decide what to build first.
                    </p>
                </div>
            </section>

            <section className="border-t border-white/10 py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">Available today</h2>
                    <ul className="mt-8 grid gap-4 md:grid-cols-3">
                        {AVAILABLE_NOW.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="group block h-full rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
                                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                                    <span className="mt-4 inline-flex text-sm font-semibold text-cyan-200">See {item.title.toLowerCase()} →</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
