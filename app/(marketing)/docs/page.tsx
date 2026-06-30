import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation — Datazag",
    description:
        "Documentation hub for Datazag reports, alerts, brand protection, API enrichment, cloud data products, schemas, delivery routes and integration patterns.",
};

const docAreas = [
    {
        title: "Reports",
        text: "Understand the structure of Domain Health Reports, Portfolio Risk Reports, sample reports, findings, remediation priorities and consent flows.",
        href: "/reports",
        cta: "View reports",
    },
    {
        title: "Alerts",
        text: "Learn how platform, keyword and brand-protection alerts are classified, enriched, updated and delivered into operational workflows.",
        href: "/alerts",
        cta: "View alerts",
    },
    {
        title: "Brand Protection",
        text: "Review staged brand-protection alert updates, evidence packs, abuse contacts, website evidence and de-escalation controls.",
        href: "/brand-protection",
        cta: "View brand protection",
    },
    {
        title: "API enrichment",
        text: "Use API access for domain lookup, scoring, enrichment and product integration. Detailed endpoint references are provided during evaluation.",
        href: "/contact",
        cta: "Request API access",
    },
    {
        title: "Cloud data products",
        text: "Explore Infrastructure Intelligence datasets, schema samples, refresh cadence, cloud delivery routes and marketplace/private-offer packaging.",
        href: "/infrastructure-intelligence",
        cta: "View data products",
    },
    {
        title: "Partner integrations",
        text: "Plan MSSP, MDR, ESP and platform integrations using reports, alert streams, APIs, evidence packs and partner-branded services.",
        href: "/mssp-partners",
        cta: "View partners",
    },
];

const integrationPatterns = [
    ["Portal workflow", "Use reports, incident views, evidence packs and de-escalation controls inside a customer-facing or analyst-facing portal."],
    ["Webhook workflow", "Route alert updates into ticketing, SIEM, SOAR, customer dashboards or partner systems."],
    ["API workflow", "Score and enrich domains, links, accounts, suppliers or customer assets inside an existing product or process."],
    ["Data-share workflow", "Join Datazag Infrastructure Intelligence with internal data inside a warehouse, lakehouse or marketplace environment."],
];

const schemaFamilies = [
    ["Domain", "Domain identity, first-seen/last-seen context, naming signals, related assets and lifecycle history."],
    ["DNS", "A, AAAA, MX, NS, TXT, security posture, provider context and change history."],
    ["Certificate", "Certificate Transparency observations, SAN expansion, issuer context and new infrastructure discovery."],
    ["Infrastructure", "IP, ASN, prefix, hosting, provider, CDN, cloud and routing context."],
    ["Risk", "Scores, confidence, reason codes, watchlist context, severity and evidence references."],
    ["Evidence", "Screenshots, website state, logo checks, policy-page capture, abuse contacts and analyst/customer decisions where available."],
];

const nextDocs = [
    "API endpoint reference and authentication examples",
    "Webhook event schema for alert and incident updates",
    "Brand Protection evidence-pack schema",
    "Cloud data product sample schemas",
    "Marketplace private-offer and data-share setup notes",
    "Partner implementation playbooks for MSSPs and ESPs",
];

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
            {body ? <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{body}</p> : null}
        </div>
    );
}

export default function DocsPage() {
    return (
        <main className="overflow-hidden bg-[#030619] text-white">
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Documentation</p>
                        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">Build with Datazag Infrastructure Intelligence.</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                            This hub points to the main Datazag implementation areas: reports, alerts, brand protection, API enrichment, cloud data products and partner integrations.
                        </p>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                            Detailed endpoint references, sample schemas, webhook payloads and private-offer setup notes can be supplied during evaluation or onboarding.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a href="#areas" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Explore docs areas</a>
                            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">Request technical access</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="areas" className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Docs areas"
                        title="Start with the product or delivery route."
                        body="Datazag documentation is organised around how buyers use the intelligence: assessment, alerting, enrichment, data access or partner delivery."
                    />
                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {docAreas.map((area) => (
                            <article key={area.title} className="flex min-h-[17rem] flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                                <h2 className="text-xl font-semibold text-white">{area.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-slate-400">{area.text}</p>
                                <a href={area.href} className="mt-auto pt-5 text-sm font-semibold text-cyan-100 hover:text-white">{area.cta} →</a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        eyebrow="Integration patterns"
                        title="Use Datazag inside the workflow you already run."
                        body="Most implementations follow one of four patterns. The same underlying intelligence can be packaged differently depending on where it is consumed."
                    />
                    <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b22]">
                        {integrationPatterns.map(([title, text], index) => (
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
                        eyebrow="Schema families"
                        title="The fields usually group around six families."
                        body="Exact schemas depend on the product, buyer, delivery route and permitted use, but the main field families are consistent."
                    />
                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {schemaFamilies.map(([title, text]) => (
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
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Documentation backlog</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Documents to add next.</h2>
                            <p className="mt-5 text-base leading-7 text-slate-300">This list can guide the next documentation sprint once the first public pages are stable.</p>
                        </div>
                        <div className="grid gap-3">
                            {nextDocs.map((item) => (
                                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 py-24 md:py-32">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Technical access</p>
                    <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Request the reference that matches your use case.</h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        Contact Datazag for API examples, webhook event schemas, cloud data product samples, marketplace packaging or partner integration notes.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Request documentation</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
