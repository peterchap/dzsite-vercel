import Link from "next/link"
import { Shield, Database } from "lucide-react"

interface HeroProps {
    heading: string
    subheading: string
    primaryCta?: {
        label: string
        link: string
    }
}

export function Hero({ heading, subheading, primaryCta }: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-[#131326] px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                    {heading}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                    {subheading}
                </p>

                {primaryCta && (
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href={primaryCta.link}
                            className="rounded-md bg-[#56A8F5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#56A8F5]/90"
                        >
                            {primaryCta.label}
                        </Link>
                    </div>
                )}

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
                        <div className="flex flex-col gap-3">
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
                        <div className="flex flex-col gap-3">
                            <Link href="/domain-intelligence" className="inline-flex items-center justify-center rounded-md bg-[#131326] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-[#1E1E38] w-full border border-gray-600">
                                Explore Data Products
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
                    <span className="flex items-center gap-2">⚡ &lt;60 sec detection</span>
                    <span className="flex items-center gap-2">🎯 &lt;1% false positives</span>
                    <span className="flex items-center gap-2">🌍 310M domains</span>
                    <span className="flex items-center gap-2">☁️ API + Data Shares</span>
                </div>

            </div>
        </section>
    )
}
