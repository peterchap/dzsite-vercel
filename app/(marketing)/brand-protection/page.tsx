import Link from "next/link"
import { Check, Shield, Zap, Globe, Lock, Search } from "lucide-react"
import { LiveThreatFeed } from "@/components/marketing/LiveThreatFeed"

export const metadata = {
    title: 'Brand Protection | Datazag',
    description: 'Stop phishing attacks in under 60 seconds.',
}

export default function BrandProtectionPage() {
    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="bg-[#131326] px-6 py-24 sm:py-32 lg:px-8 text-center">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                        Stop Phishing Attacks Before They Launch
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Datazag detects brand impersonation in under 60 seconds—before attackers can target your customers.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/register"
                            className="rounded-md bg-[#F27108] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#F27108]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27108]"
                        >
                            Start Free Trial
                        </Link>
                        <Link href="/demo" className="text-sm font-semibold leading-6 text-white hover:text-[#56A8F5]">
                            Book Demo <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
                        <span>⚡ &lt;60 second detection</span>
                        <span>🎯 &lt;1% false positive rate</span>
                        <span>🏢 Trusted by 1,000+ brands</span>
                        <span>💰 From £999/month</span>
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <div className="bg-[#1E1E38] py-8 border-y border-white/5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Trusted by Leading Brands</p>
                    {/* Logos would go here, using placeholders for now */}
                    <div className="flex justify-center gap-12 opacity-50 grayscale">
                        <div className="h-8 w-24 bg-gray-500/20 rounded"></div>
                        <div className="h-8 w-24 bg-gray-500/20 rounded"></div>
                        <div className="h-8 w-24 bg-gray-500/20 rounded"></div>
                        <div className="h-8 w-24 bg-gray-500/20 rounded"></div>
                    </div>
                    <blockquote className="mt-8 max-w-2xl mx-auto text-gray-400 italic">
                        "Datazag detected 23 phishing domains in our first week—threats we would have completely missed."
                        <footer className="mt-2 text-sm not-italic opacity-70">— CISO, Beta Customer</footer>
                    </blockquote>
                </div>
            </div>

            {/* Live Threat Feed Section */}
            <section className="py-24 bg-[#FBFDFB]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-[#131326] sm:text-4xl mb-6">
                                Watch threats being detected in real-time
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Over 2.8M certificates analyzed daily. 247 threats detected in last 24 hours. Average detection time: 52 seconds.
                            </p>
                            <Link href="/brand-protection" className="text-[#56A8F5] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                View All Detections <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                        <div>
                            <LiveThreatFeed />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center max-w-3xl mx-auto">
                    <h2 className="text-base font-semibold leading-7 text-[#F27108]">THE PROBLEM</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-[#131326] sm:text-4xl">
                        Traditional Brand Protection is Too Slow
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Attackers launch phishing sites in minutes. Traditional detection takes hours or days. By the time you find out, customers are already compromised.
                    </p>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 text-left">
                        <div className="rounded-xl bg-red-50 p-6 border border-red-100">
                            <div className="text-red-600 font-bold mb-2 flex items-center gap-2">⏰ Netcraft</div>
                            <div className="text-2xl font-bold text-[#131326] mb-1">2-4 hours</div>
                            <div className="text-sm text-gray-500">to detect</div>
                        </div>
                        <div className="rounded-xl bg-red-50 p-6 border border-red-100">
                            <div className="text-red-600 font-bold mb-2 flex items-center gap-2">⏰ BrandShield</div>
                            <div className="text-2xl font-bold text-[#131326] mb-1">4-24 hours</div>
                            <div className="text-sm text-gray-500">to detect</div>
                        </div>
                        <div className="rounded-xl bg-green-50 p-6 border border-green-100 ring-2 ring-green-500">
                            <div className="text-green-600 font-bold mb-2 flex items-center gap-2">⚡ Datazag</div>
                            <div className="text-2xl font-bold text-[#131326] mb-1">Under 60s</div>
                            <div className="text-sm text-gray-500">to detect</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-[#131326] text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How We Detect Phishing 100x Faster</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Globe, title: "1. Monitor CT Logs", desc: "Every SSL certificate issued globally flows through our real-time streaming platform. 2.8M+ certificates/day." },
                            { icon: Search, title: "2. Match Patterns", desc: "Each customer gets their own dedicated feed monitoring custom patterns: typos, homoglyphs, brand variations." },
                            { icon: Check, title: "3. Validate DNS", desc: "We don't just detect certificates—we validate domains exist and recheck DNS records in real-time." },
                            { icon: Zap, title: "4. Alert Instantly", desc: "Webhooks, email, or Slack alerts delivered in under 60 seconds with full threat intelligence." }
                        ].map((item, i) => (
                            <div key={i} className="relative pl-4 border-l-2 border-[#56A8F5]">
                                <item.icon className="h-6 w-6 text-[#56A8F5] mb-4" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-[#131326] text-center mb-12">Better. Faster. More Affordable.</h2>
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Features</th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-bold text-[#56A8F5]">Datazag</th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Netcraft</th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">BrandShield</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {[
                                    { name: 'Detection Speed', datazag: '<60 sec', netcraft: '2-4 hours', brandshield: '4-24 hours' },
                                    { name: 'Per-Client Feed', datazag: '✓', netcraft: '✗', brandshield: '✗' },
                                    { name: 'Live DNS Check', datazag: '✓', netcraft: '✗', brandshield: '✗' },
                                    { name: 'False Positives', datazag: '<1%', netcraft: '~5%', brandshield: '~5%' },
                                    { name: 'Starting Price', datazag: '£999/mo', netcraft: '£4K+/mo', brandshield: '£2.5K+/mo' }
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? undefined : 'bg-gray-50'}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{row.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-bold text-[#56A8F5]">{row.datazag}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{row.netcraft}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{row.brandshield}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[#131326] py-24 text-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stop Waiting Hours for Threat Detection</h2>
                    <p className="mt-4 text-lg text-gray-300">Start your 14-day free trial and see threats detected in real-time—no credit card required.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/register" className="rounded-md bg-[#F27108] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#F27108]/90">
                            Start Free Trial
                        </Link>
                        <Link href="/docs" className="text-sm font-semibold leading-6 text-white">
                            See Documentation <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
