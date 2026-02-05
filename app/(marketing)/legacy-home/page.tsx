import Link from "next/link"
import { Shield, Database, Activity, Globe, ArrowRight } from "lucide-react"

export const metadata = {
    title: 'Legacy Home | Datazag',
    description: 'Legacy homepage for reference.',
}

export default function LegacyHomepage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#131326] px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-7xl text-center">
                    <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                        The Domain Intelligence Platform
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        Real-time threat detection powered by 310M enriched domains.
                        Detect phishing in seconds, not hours.
                    </p>

                    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
                        {/* Brand Protection Card */}
                        <div className="rounded-2xl bg-[#1E1E38] p-8 text-left border border-white/10 hover:border-[#F27108] transition-colors relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Shield className="h-24 w-24 text-[#F27108]" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="h-6 w-6 text-[#F27108]" />
                                <h2 className="text-xl font-semibold text-white">BRAND PROTECTION</h2>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Detect phishing in under 60 seconds with real-time streaming threat detection.
                            </p>
                            <ul className="space-y-2 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#F27108]" /> Security teams</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#F27108]" /> Fraud prevention</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#F27108]" /> Compliance</li>
                            </ul>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-gray-400">From £999/month</p>
                                <Link href="/brand-protection" className="inline-flex items-center justify-center rounded-md bg-[#F27108] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#F27108]/90 w-full">
                                    Start Free Trial
                                </Link>
                            </div>
                        </div>

                        {/* Domain Intelligence Card */}
                        <div className="rounded-2xl bg-[#1E1E38] p-8 text-left border border-white/10 hover:border-[#56A8F5] transition-colors relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Database className="h-24 w-24 text-[#56A8F5]" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="h-6 w-6 text-[#56A8F5]" />
                                <h2 className="text-xl font-semibold text-white">DOMAIN INTELLIGENCE</h2>
                            </div>
                            <p className="text-gray-400 mb-6">
                                310M domains with risk scores, enrichment, and historical data.
                            </p>
                            <ul className="space-y-2 mb-8 text-sm text-gray-300">
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#56A8F5]" /> Data scientists</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#56A8F5]" /> Security engineers</li>
                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#56A8F5]" /> Platform builders</li>
                            </ul>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-gray-400">From £299/month API</p>
                                <Link href="/domain-intelligence" className="inline-flex items-center justify-center rounded-md bg-[#131326] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-[#1E1E38] w-full border border-gray-600">
                                    Explore Data Products
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
                        <span className="flex items-center gap-2">⚡ &lt;Sub-60 second enforcement window</span>
                        <span className="flex items-center gap-2">🎯 &lt;1% false positives</span>
                        <span className="flex items-center gap-2">🌍 Infrastructure-led attribution across 315M+ domains</span>
                        <span className="flex items-center gap-2">☁️ API, feeds & webhooks for automated response</span>
                    </div>

                </div>
            </section>

            {/* Live Threat Feed Preview (Mock) */}
            <section className="py-16 bg-[#FBFDFB]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-[#131326] sm:text-4xl">
                            Live Threat Detections
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Watch threats being detected in real-time.
                        </p>
                    </div>

                    <div className="bg-[#131326] rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                        <div className="p-4 border-b border-white/10 bg-[#1E1E38] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-sm font-mono text-gray-300">LIVE FEED</span>
                            </div>
                            <span className="text-xs text-gray-500">2.8M certificates analyzed daily</span>
                        </div>
                        <div className="divide-y divide-white/10">
                            {[
                                { domain: 'amaz0n-secure-login.com', risk: 98, pattern: 'Typosquatting', asn: 'Russia', time: '47s ago' },
                                { domain: 'paypa1-verify-account.net', risk: 96, pattern: 'Homoglyph attack', asn: 'Nigeria', time: '2m ago' },
                                { domain: 'stripe-customer-portal.com', risk: 94, pattern: 'Brand impersonation', asn: 'China', time: '8m ago' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E1E38]/50 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <span className="text-red-400 font-mono text-sm">🚨 {item.domain}</span>
                                        <span className="text-xs text-gray-500 hidden sm:inline">|</span>
                                        <span className="text-xs text-gray-400">Risk: {item.risk}/100</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="hidden sm:inline">Pattern: {item.pattern}</span>
                                        <span className="hidden sm:inline">ASN: {item.asn}</span>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-[#1E1E38] text-center">
                            <Link href="/brand-protection" className="text-sm text-[#56A8F5] hover:text-[#56A8F5]/80 font-medium">
                                View All Detections →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Grid */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-[#131326] sm:text-4xl">
                            Who Uses Datazag?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Trusted by security teams, developers, and data scientists.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl bg-[#FBFDFB] border border-gray-100 hover:shadow-lg transition-shadow">
                            <Activity className="h-10 w-10 text-[#F27108] mb-4" />
                            <h3 className="text-xl font-bold text-[#131326] mb-2">Security Teams</h3>
                            <p className="text-gray-600">
                                Stop phishing attacks before they launch. Monitor for brand impersonation and takedown threats in real-time.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-[#FBFDFB] border border-gray-100 hover:shadow-lg transition-shadow">
                            <Database className="h-10 w-10 text-[#56A8F5] mb-4" />
                            <h3 className="text-xl font-bold text-[#131326] mb-2">Data Teams</h3>
                            <p className="text-gray-600">
                                Enrich your data warehouse with 310M domains. get daily updates on newly registered domains and risk scores.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-[#FBFDFB] border border-gray-100 hover:shadow-lg transition-shadow">
                            <Globe className="h-10 w-10 text-[#131326] mb-4" />
                            <h3 className="text-xl font-bold text-[#131326] mb-2">Developers</h3>
                            <p className="text-gray-600">
                                Integrate domain intelligence into your applications with our low-latency API. Build trust, not pipelines.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section className="py-24 bg-[#131326]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="text-lg text-gray-300 mb-8">
                                Whether you need real-time brand protection for one brand or raw data access for your enterprise, we have a plan for you.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <div className="h-2 w-2 rounded-full bg-[#F27108]" />
                                    <span>Brand Protection starts at £999/month</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <div className="h-2 w-2 rounded-full bg-[#56A8F5]" />
                                    <span>API Access starts at £299/month</span>
                                </div>
                            </div>
                            <div className="mt-10">
                                <Link href="/pricing" className="text-[#56A8F5] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                    View Full Pricing <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Visual pricing element/decoration */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#F27108] to-[#56A8F5] opacity-20 blur-2xl rounded-full" />
                            <div className="relative rounded-2xl bg-[#1E1E38]/50 border border-white/10 p-8 backdrop-blur-sm">
                                <div className="text-center">
                                    <span className="text-sm text-gray-400 font-medium tracking-widest uppercase">Start Today</span>
                                    <h3 className="mt-4 text-3xl font-bold text-white">14-Day Free Trial</h3>
                                    <p className="mt-4 text-gray-400">No credit card required. Full access to all features.</p>
                                    <Link href="/register" className="mt-8 inline-block w-full rounded-md bg-white px-8 py-3 text-base font-bold text-[#131326] shadow-sm hover:bg-gray-100">
                                        Start Free Trial
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
