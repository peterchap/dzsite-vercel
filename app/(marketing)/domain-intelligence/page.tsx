import Link from "next/link"
import { Database, Server, Cloud, Code, CheckCircle, Globe, Zap } from "lucide-react"
import { draftMode } from "next/headers";
import { sanityFetch } from "@/sanity/fetch";
import { sanityPreviewFetch } from "@/sanity/preview";
import { pageBySlugQuery } from "@/sanity/queries";
import type { PageDoc } from "@/sanity/types";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { HeroSplitCta } from "@/components/sections/blocks/HeroSplitCta";

export const metadata = {
    title: 'Domain Intelligence API & Data Shares | Datazag',
    description: '310M enriched domains with risk scores, hosting intelligence, and real-time updates.',
}

export default async function DomainIntelligencePage() {
    const preview = (await draftMode()).isEnabled;
    const fetcher = preview ? sanityPreviewFetch : sanityFetch;
    const page = await fetcher<PageDoc>(pageBySlugQuery, { slug: "domain-intelligence" });

    return (
        <main className="flex flex-col">
            {/* Hero Section */}
            {page?.hero && page.hero._type === "section.heroSplitCta" ? (
                <HeroSplitCta {...(page.hero as any)} />
            ) : (
                <section className="bg-[#131326] px-6 py-24 sm:py-32 lg:px-8 text-center">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                            Domain Intelligence API & Data Shares
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            310M enriched domains with risk scores, hosting intelligence, and real-time updates.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/docs"
                                className="rounded-md bg-[#1E1E38] px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-[#2d2d50]"
                            >
                                View API Docs
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-md bg-[#56A8F5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#56A8F5]/90"
                            >
                                Start Free Trial
                            </Link>
                        </div>
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
                            <span>Available via:</span>
                            <span className="flex items-center gap-1"><Code className="h-4 w-4" /> API</span>
                            <span className="flex items-center gap-1"><Database className="h-4 w-4" /> Snowflake</span>
                            <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> AWS Data Exchange</span>
                            <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> Azure</span>
                            <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> Google Cloud</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Studio-managed sections for this page */}
            {Array.isArray(page?.sections) && page!.sections!.length > 0 ? (
                <SectionRenderer sections={page!.sections} />
            ) : null}

            {/* What You Get */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-[#131326] sm:text-4xl">What You Get</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-[#FBFDFB] border border-gray-100 hover:border-[#56A8F5] transition-colors">
                            <Globe className="h-10 w-10 text-[#56A8F5] mb-4" />
                            <h3 className="text-xl font-bold text-[#131326] mb-4">310 Million Domains</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#56A8F5] shrink-0" /> 3 years of historical DNS data</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#56A8F5] shrink-0" /> Daily updates from CertStream</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#56A8F5] shrink-0" /> Real-time validation</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#56A8F5] shrink-0" /> Company linkage (top 5M domains)</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#FBFDFB] border border-gray-100 hover:border-[#F27108] transition-colors">
                            <Server className="h-10 w-10 text-[#F27108] mb-4" />
                            <h3 className="text-xl font-bold text-[#131326] mb-4">Risk Scores (0-100)</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#F27108] shrink-0" /> ML-powered threat detection</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#F27108] shrink-0" /> Validated against real phishing campaigns</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#F27108] shrink-0" /> Updated based on changes</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#F27108] shrink-0" /> Confidence intervals included</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#FBFDFB] border border-gray-100 hover:border-[#131326] transition-colors">
                            <Database className="h-10 w-10 text-[#131326] mb-4" />
                            <h3 className="text-xl font-bold text-[#131326] mb-4">Enrichment Data</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#131326] shrink-0" /> DNS records (A, MX, NS, TXT)</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#131326] shrink-0" /> ASN & hosting provider</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#131326] shrink-0" /> Geographic location</li>
                                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-[#131326] shrink-0" /> Tech stack identification</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Access Options */}
            <section className="py-24 bg-[#131326] text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Access Options</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 rounded-xl bg-[#1E1E38] border border-white/10">
                            <Code className="h-8 w-8 text-[#56A8F5] mb-4" />
                            <h3 className="text-lg font-bold mb-2">API (REST)</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>&lt;200ms response time</li>
                                <li>Global CDN distribution</li>
                                <li>Rate limits: 10-1000 req/sec</li>
                                <li>From £299/month</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl bg-[#1E1E38] border border-white/10">
                            <Database className="h-8 w-8 text-[#56A8F5] mb-4" />
                            <h3 className="text-lg font-bold mb-2">Snowflake Share</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>Zero-copy data sharing</li>
                                <li>Query in your warehouse</li>
                                <li>Daily automated updates</li>
                                <li>From £2,500/month</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl bg-[#1E1E38] border border-white/10">
                            <Cloud className="h-8 w-8 text-[#56A8F5] mb-4" />
                            <h3 className="text-lg font-bold mb-2">AWS Data Exchange</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>S3 delivery</li>
                                <li>Automated updates</li>
                                <li>Pay-as-you-go option</li>
                                <li>From £2,500/month</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl bg-[#1E1E38] border border-white/10">
                            <Server className="h-8 w-8 text-[#56A8F5] mb-4" />
                            <h3 className="text-lg font-bold mb-2">Bulk Downloads</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>CSV, JSON, Parquet</li>
                                <li>Full or incremental</li>
                                <li>Custom pricing</li>
                                <li>Contact Sales</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* API Example */}
            <section className="py-24 bg-[#FBFDFB]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-[#131326] sm:text-4xl mb-6">
                                Builder-Friendly API
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Integrate domain intelligence into your Security Operations Center (SOC), application, or data pipeline with a single HTTP request.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#56A8F5]">
                                        <Code className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">Simple REST Design</h3>
                                        <p className="mt-2 leading-7 text-gray-600">Standard HTTP methods, JSON responses, and predictable error handling.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#56A8F5]">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">Extremely Fast</h3>
                                        <p className="mt-2 leading-7 text-gray-600">Optimized for low-latency lookups (&lt;200ms) to support real-time user flows.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <div className="rounded-xl bg-[#1E1E38] shadow-2xl p-6 overflow-hidden">
                                <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-mono border-b border-gray-700 pb-4">
                                    <span className="text-green-400">GET</span>
                                    <span>/v1/domain/lookup?domain=suspicious-example.com</span>
                                </div>
                                <pre className="text-sm text-gray-300 overflow-x-auto font-mono">
                                    {`{
  "domain": "suspicious-example.com",
  "risk_score": 87,
  "confidence": 0.94,
  "created_at": "2024-12-14",
  "age_days": 1,
  "dns": {
    "a_records": ["192.0.2.1"],
    "mx_records": ["mail.free-email.com"]
  },
  "hosting": {
    "asn": "AS54321",
    "provider": "Cheap VPS Co",
    "country": "RU"
  },
  "flags": {
    "newly_registered": true,
    "high_risk_country": true,
    "free_email_mx": true
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Tables */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-[#131326] text-center mb-12">Flexible Pricing</h2>

                    {/* Toggle (Visual Only for now) or separate sections */}
                    <div className="text-center mb-8">
                        <span className="inline-block px-4 py-1 rounded-full bg-[#131326] text-white text-sm font-semibold">API Pricing</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'API Starter', price: '£299', lookups: '50K lookups/mo', rate: '10 req/sec', cta: 'Start Free Trial' },
                            { name: 'API Professional', price: '£1,499', lookups: '500K lookups/mo', rate: '100 req/sec', cta: 'Start Free Trial', featured: true },
                            { name: 'API Enterprise', price: '£4,999', lookups: '5M+ lookups/mo', rate: 'Custom', cta: 'Contact Sales' }
                        ].map((plan, i) => (
                            <div key={i} className={`p-8 rounded-2xl border ${plan.featured ? 'border-[#56A8F5] shadow-xl relative' : 'border-gray-200'}`}>
                                {plan.featured && <span className="absolute top-0 right-0 -mt-3 mr-4 px-3 py-1 bg-[#56A8F5] text-white text-xs font-bold rounded-full">POPULAR</span>}
                                <h3 className="text-xl font-bold text-[#131326]">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold tracking-tight text-[#131326]">{plan.price}</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                                </div>
                                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    <li className="flex gap-x-3"><CheckCircle className="h-5 w-5 flex-none text-[#56A8F5]" /> {plan.lookups}</li>
                                    <li className="flex gap-x-3"><CheckCircle className="h-5 w-5 flex-none text-[#56A8F5]" /> {plan.rate}</li>
                                    <li className="flex gap-x-3"><CheckCircle className="h-5 w-5 flex-none text-[#56A8F5]" /> Support included</li>
                                </ul>
                                <Link
                                    href={plan.cta === 'Contact Sales' ? '/contact' : '/register'}
                                    className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${plan.featured ? 'bg-[#56A8F5] text-white hover:bg-[#56A8F5]/90' : 'bg-[#131326] text-white hover:bg-[#1E1E38]'}`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-gray-500">Need bulk data or Snowflake shares? <Link href="/contact" className="text-[#56A8F5] font-semibold">Contact our data team →</Link></p>
                    </div>
                </div>
            </section>
        </main>
    )
}
