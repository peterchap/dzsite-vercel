'use client';

/**
 * /docs — reports and datasets. The API reference and the alert webhook
 * contract were removed on 2026-10-01; /docs/search-stream
 * now redirects here. Do not re-add endpoint or webhook docs without a
 * product decision behind them.
 */
import { useSiteStats } from "@/components/providers/SiteStatsProvider";
import { DOCS_FAQ } from "./faq";
import type { DatasetSummary } from "@/lib/datasets/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle, Shield, Zap, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

/**
 * REPORTS — deliberately NOT documented as an API, because there is not one.
 * Reports are produced and delivered as documents; saying so is more useful
 * than implying an endpoint a developer will go looking for.
 */
const REPORT_ROUTES = [
    { name: "Free Domain Health Report", how: "Self-serve. Enter a work email on the site; the report is generated in the customer portal and delivered by email.", scope: "One domain" },
    { name: "Domain Risk Report", how: "Requested through sales. Delivered as a document for technical and executive readers.", scope: "One domain, in depth" },
    { name: "Cross-Estate Domain Risk Report", how: "Requested through sales. Opens with estate discovery, so the scope is agreed before it runs.", scope: "Portfolio, estate or supplier group" },
];

const TOC = [
    { id: "overview", label: "Overview" },
    { id: "reports", label: "Reports" },
    { id: "datasets", label: "Datasets" },
    { id: "faq", label: "FAQ" },
];

export function DocsClient({ datasets = [] }: { datasets?: DatasetSummary[] }) {
    // Live coverage figures (hourly), from the provider in app/layout.tsx.
    const { DOMAINS_DISPLAY, PUBLISHED_STATS } = useSiteStats();

    return (
        <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Page Hero Section */}
            <header className="border-b bg-slate-50/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container mx-auto max-w-6xl px-6 py-24 lg:py-36 relative z-10">
                    <Badge variant="secondary" className="mb-6 px-3 bg-blue-50 text-blue-600 border-blue-100 font-bold uppercase tracking-wider text-[10px]">Documentation</Badge>
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                        Reports and <span className="text-blue-600">datasets</span>
                    </h1>
                    <p className="mt-8 max-w-3xl text-xl text-slate-600 leading-relaxed font-medium">
                        How Datazag data reaches you. Reports are documents about a domain or an estate. Datasets
                        are tables in your own warehouse, built from {DOMAINS_DISPLAY} domains of observation.
                    </p>
                    <div className="mt-12 flex flex-wrap gap-4">
                        <Button asChild size="lg" className="rounded-xl h-14 px-10 font-bold bg-slate-900 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                            <Link href="/datasets">Browse datasets</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-xl h-14 px-10 font-bold border-slate-200 bg-white hover:bg-slate-50">
                            <Link href="/reports/sample">See a sample report</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content with Sticky Table of Contents */}
            <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 px-6 py-16 lg:py-24">
                {/* Sticky Table of Contents for desktop */}
                <aside className="sticky top-32 hidden h-fit w-64 shrink-0 lg:block mt-2">
                    <nav className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Documentation</h3>
                            <ul className="space-y-4">
                                {TOC.map((t) => (
                                    <li key={t.id}>
                                        <a href={`#${t.id}`} className="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-all">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-3 group-hover:bg-blue-600 transition-colors"></span>
                                            {t.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* Documentation Sections */}
                <div className="min-w-0 flex-1 space-y-32">
                    <Section id="overview" title="Overview">
                        <div className="prose prose-slate max-w-none space-y-6">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Datazag observes public internet infrastructure: nameservers, mail routing,
                                email-authentication records, addressing and network placement. It does not
                                work from a static list. Reports and datasets are two ways to receive what it
                                sees. Both describe a domain. What you decide about that domain stays your call.
                            </p>
                            {/* WU-C3: the figure states its own population. This page previously
                                carried two different corpus numbers eleven lines apart, which a
                                technical buyer reads as the site not knowing its own coverage. */}
                            <p className="text-sm text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-4">
                                <span className="font-semibold text-slate-700">What {DOMAINS_DISPLAY} counts: </span>
                                {PUBLISHED_STATS.domainsMonitored.definition}{" "}
                                {PUBLISHED_STATS.domainsMonitored.measuredAt ? (
                                    <span className="whitespace-nowrap">
                                        Measured{" "}
                                        <time dateTime={PUBLISHED_STATS.domainsMonitored.measuredAt}>
                                            {PUBLISHED_STATS.domainsMonitored.measuredAt.slice(0, 10)}
                                        </time>.
                                    </span>
                                ) : null}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-center md:text-left">
                                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-100 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-blue-600 transition-colors">
                                        <Shield className="h-6 w-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-3">Infrastructure</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Where a domain lives: its nameserver, hosting address and country, and whether it resolves at all.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-emerald-100 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-emerald-600 transition-colors">
                                        <Zap className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-3">Mail and authentication</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Whether a domain publishes SPF and DMARC, and whether it runs its own mail or sits on a mailbox provider.</p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* ── REPORTS ───────────────────────────────────────────
                        Reports are documents, not an endpoint. Saying so beats
                        implying an API a developer will hunt for. */}
                    <Section id="reports" title="Reports">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Reports are documents. How each one is delivered is listed below.
                            </p>
                            <DataTable
                                columns={["Report", "Scope", "How it is delivered"]}
                                data={REPORT_ROUTES.map((r) => [
                                    <span key="n" className="font-bold text-slate-900">{r.name}</span>,
                                    <span key="s" className="text-slate-600 font-medium">{r.scope}</span>,
                                    <span key="h" className="text-slate-500 font-medium leading-relaxed">{r.how}</span>,
                                ])}
                            />
                            <p className="text-sm leading-relaxed text-slate-500">
                                Building report findings into your own product? Use the datasets below.{" "}
                                <Link href="/reports" className="font-bold text-blue-600 hover:underline">
                                    Report catalog
                                </Link>{" "}
                                ·{" "}
                                <Link href="/reports/sample" className="font-bold text-blue-600 hover:underline">
                                    Sample report
                                </Link>
                            </p>
                        </div>
                    </Section>

                    {/* ── DATASETS ──────────────────────────────────────────
                        Listed from lib/datasets, the same source /datasets
                        renders, so the two cannot disagree about what ships. */}
                    <Section id="datasets" title="Datasets">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Datasets are SQL tables. They arrive as cloud data shares and marketplace
                                listings for warehouse and lakehouse use: bulk analysis, historical review
                                and enrichment joins.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { t: "Typed schema", d: "Every column documented with its type and meaning, and join keys marked." },
                                    { t: "Worked SQL", d: "Runnable examples per dataset, including the join key conversions." },
                                    { t: "Stated refresh", d: "Each page states its own cadence and carries a changelog." },
                                ].map((c) => (
                                    <div key={c.t} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="font-bold text-slate-900">{c.t}</h4>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.d}</p>
                                    </div>
                                ))}
                            </div>

                            {datasets.length > 0 ? (
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-900">Published datasets</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {datasets.map((d) => (
                                            <Link
                                                key={d.slug}
                                                href={`/datasets/${d.slug}`}
                                                className="group block rounded-2xl border border-slate-100 bg-white p-6 transition-colors hover:border-blue-200"
                                            >
                                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600">{d.title}</h4>
                                                    {typeof d.columnCount === "number" ? (
                                                        <span className="text-xs font-mono uppercase tracking-tight text-slate-400">
                                                            {d.columnCount} columns
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{d.summary}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <p className="text-sm leading-relaxed text-slate-500">
                                Each page documents only what actually ships.{" "}
                                <Link href="/datasets" className="font-bold text-blue-600 hover:underline">
                                    Browse the dataset catalog
                                </Link>
                            </p>
                        </div>
                    </Section>

                    <Section id="faq" title="FAQ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {DOCS_FAQ.map((f) => (
                                <FaqItem key={f.question} question={f.question} answer={f.answer} />
                            ))}
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

// --- Reusable Internal Components ---

const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-40 group">
        <div className="flex items-center gap-3 mb-10">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                {title}
            </h2>
            <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-slate-50 text-slate-300 hover:text-blue-600 transition-all">
                <LinkIcon className="h-5 w-5" />
            </a>
        </div>
        <div>
            {children}
        </div>
    </section>
);

const DataTable = ({ columns, data }: { columns: string[], data: (string | React.ReactNode)[][] }) => (
    <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
        <Table>
            <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                    {columns.map(c => <TableHead key={c} className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em] h-14 pl-8">{c}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/30 transition-all border-b last:border-0 group">
                        {row.map((cell, j) => (
                            <TableCell key={j} className="py-6 pl-8">
                                {cell}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="space-y-4 p-2">
        <h4 className="flex items-center gap-3 font-extrabold text-slate-900 text-lg">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            {question}
        </h4>
        <p className="text-slate-500 pl-8 font-medium leading-relaxed border-l-2 border-slate-50 ml-2.5 italic">
            {answer}
        </p>
    </div>
);
