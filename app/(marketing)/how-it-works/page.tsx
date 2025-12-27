import Link from "next/link"
import { Globe, Cpu, Check, AlertTriangle, Bell, Zap, Server, Database } from "lucide-react"

export const metadata = {
    title: 'How It Works | Datazag',
    description: 'How Datazag detects phishing in under 60 seconds.',
}

export default function HowItWorksPage() {
    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="bg-[#131326] px-6 py-24 sm:py-32 lg:px-8 text-center">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                        How Datazag Detects Phishing in Under 60 Seconds
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Real-time streaming, per-client isolation, and live validation.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
                    {/* Step 1 */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-[#131326] text-white flex items-center justify-center font-bold text-xl">1</div>
                                <h2 className="text-2xl font-bold text-[#131326]">REAL-TIME CERTIFICATE MONITORING</h2>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                We monitor Certificate Transparency (CT) logs—a public record of every SSL certificate issued globally.
                            </p>
                            <p className="text-gray-600 mb-6">
                                When an attacker registers "amaz0n-login.com" and requests an SSL certificate from Let's Encrypt, we see it within seconds.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex gap-2"><Globe className="h-5 w-5 text-[#56A8F5]" /> 2.8M+ certificates analyzed daily</li>
                                <li className="flex gap-2"><Globe className="h-5 w-5 text-[#56A8F5]" /> 100% coverage of CT logs</li>
                                <li className="flex gap-2"><Globe className="h-5 w-5 text-[#56A8F5]" /> Zero batch processing—pure streaming</li>
                            </ul>
                        </div>
                        <div className="mt-8 lg:mt-0 bg-gray-50 rounded-xl p-8 border border-gray-200">
                            <div className="text-center text-sm font-mono text-gray-400 mb-4">Live Stream View</div>
                            <div className="space-y-2 font-mono text-xs">
                                <div className="p-2 bg-white rounded border border-gray-200 flex justify-between animate-pulse">
                                    <span>crt.sh | 18:04:22</span>
                                    <span className="text-green-600">Issued: let-us-encrypt.org</span>
                                </div>
                                <div className="p-2 bg-white rounded border border-gray-200 flex justify-between">
                                    <span>crt.sh | 18:04:21</span>
                                    <span className="text-green-600">Issued: secure-login.net</span>
                                </div>
                                <div className="p-2 bg-white rounded border border-gray-200 flex justify-between opacity-50">
                                    <span>crt.sh | 18:04:20</span>
                                    <span className="text-green-600">Issued: my-bank.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 mt-8 lg:mt-0 bg-gray-50 rounded-xl p-8 border border-gray-200">
                            <div className="space-y-4">
                                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="font-bold text-[#131326]">YOUR CONFIG</div>
                                    <div className="mt-2 text-sm text-gray-500">Brands: stripe, str1pe</div>
                                    <div className="text-sm text-gray-500">Keywords: login, verify, secure</div>
                                </div>
                                <div className="flex justify-center"><div className="h-8 w-0.5 bg-gray-300"></div></div>
                                <div className="p-4 bg-[#1E1E38] text-white rounded-lg shadow-sm">
                                    <div className="font-bold text-[#F27108]">MATCH FOUND</div>
                                    <div className="mt-2 text-sm">stripe-verify-account.com</div>
                                    <div className="text-xs text-red-300 mt-1">Typosquatting Detected</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-[#131326] text-white flex items-center justify-center font-bold text-xl">2</div>
                                <h2 className="text-2xl font-bold text-[#131326]">DEDICATED FEED PROCESSING</h2>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                Each customer gets their own isolated stream processor monitoring their custom brand patterns.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex gap-2"><Cpu className="h-5 w-5 text-[#F27108]" /> Exact brand names</li>
                                <li className="flex gap-2"><Cpu className="h-5 w-5 text-[#F27108]" /> Known typosquatting variations</li>
                                <li className="flex gap-2"><Cpu className="h-5 w-5 text-[#F27108]" /> Executive names</li>
                                <li className="flex gap-2"><Cpu className="h-5 w-5 text-[#F27108]" /> Product/service names</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-[#131326] text-white flex items-center justify-center font-bold text-xl">3</div>
                                <h2 className="text-2xl font-bold text-[#131326]">LIVE DNS VALIDATION</h2>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                The moment we detect a matching certificate, we validate it exists and check for risks in real-time.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex gap-2"><Check className="h-5 w-5 text-[#56A8F5]" /> Check if domain resolves (Live DNS)</li>
                                <li className="flex gap-2"><Check className="h-5 w-5 text-[#56A8F5]" /> Identify hosting provider (ASN)</li>
                                <li className="flex gap-2"><Check className="h-5 w-5 text-[#56A8F5]" /> Detect mailbox provider</li>
                                <li className="flex gap-2"><Check className="h-5 w-5 text-[#56A8F5]" /> Check for disposable infrastructure</li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-500">This happens in &lt;10 seconds and ensures zero false positives.</p>
                        </div>
                        <div className="mt-8 lg:mt-0 bg-gray-50 rounded-xl p-8 border border-gray-200">
                            <pre className="text-xs bg-[#1E1E38] text-green-400 p-4 rounded-lg overflow-x-auto">
                                {`> dig +short A stripe-verify.com
192.0.2.14

> whois 192.0.2.14
Org: Cheap Hosting Solutions
Country: RU

> MX lookup
mail.temp-mail.org (Disposable!)`}
                            </pre>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1 mt-8 lg:mt-0 bg-gray-50 rounded-xl p-8 border border-gray-200">
                            <div className="flex justify-center items-center h-48">
                                <div className="relative h-32 w-32 rounded-full border-8 border-red-500 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-[#131326]">98</span>
                                    <span className="absolute bottom-2 text-xs font-bold text-red-500 bg-white px-2 rounded">RISK</span>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">New Domain</span>
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High Risk Country</span>
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Typosquat</span>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-[#131326] text-white flex items-center justify-center font-bold text-xl">4</div>
                                <h2 className="text-2xl font-bold text-[#131326]">RISK SCORING & ENRICHMENT</h2>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                Every detection gets a risk score (0-100) based on pattern match, domain age, hosting, and our 310M domain database.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex gap-2"><AlertTriangle className="h-5 w-5 text-[#F27108]" /> Domain registered today</li>
                                <li className="flex gap-2"><AlertTriangle className="h-5 w-5 text-[#F27108]" /> Hosted in high-risk locations</li>
                                <li className="flex gap-2"><AlertTriangle className="h-5 w-5 text-[#F27108]" /> Using free email providers</li>
                                <li className="flex gap-2"><AlertTriangle className="h-5 w-5 text-[#F27108]" /> No SPF/DMARC/DKIM</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-full bg-[#131326] text-white flex items-center justify-center font-bold text-xl">5</div>
                                <h2 className="text-2xl font-bold text-[#131326]">INSTANT ALERT DELIVERY</h2>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                Alerts delivered in under 60 seconds with full threat intelligence via Webhooks, Email, Slack, or Dashboard.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex gap-2"><Bell className="h-5 w-5 text-[#56A8F5]" /> Webhooks (instant, &lt;1 second)</li>
                                <li className="flex gap-2"><Bell className="h-5 w-5 text-[#56A8F5]" /> Email (HTML format with details)</li>
                                <li className="flex gap-2"><Bell className="h-5 w-5 text-[#56A8F5]" /> Slack/Teams (Interactive)</li>
                            </ul>
                        </div>
                        <div className="mt-8 lg:mt-0 bg-gray-50 rounded-xl p-8 border border-gray-200">
                            <div className="bg-white p-4 rounded-lg shadow border border-gray-100 border-l-4 border-l-red-500">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-[#131326]">🚨 PHISHING DETECTED</div>
                                    <span className="text-xs text-gray-400">Just now</span>
                                </div>
                                <p className="text-sm mt-1">Suspicious domain <strong>stripe-login-secure.com</strong> detected.</p>
                                <div className="mt-3 flex gap-2">
                                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">Takedown</button>
                                    <button className="px-3 py-1 bg-gray-100 text-[#131326] text-xs rounded hover:bg-gray-200">Ignore</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Architecture */}
            <section className="py-24 bg-[#131326] text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">Technical Architecture</h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm">
                        <div className="p-6 bg-[#1E1E38] rounded-xl border border-white/10 w-full max-w-xs">
                            <Globe className="h-8 w-8 text-[#56A8F5] mx-auto mb-4" />
                            <div className="font-bold mb-2">CertStream</div>
                            <div className="text-gray-400">Global SSL Stream</div>
                        </div>
                        <div className="h-8 w-0.5 md:w-8 md:h-0.5 bg-gray-600"></div>
                        <div className="p-6 bg-[#1E1E38] rounded-xl border border-white/10 w-full max-w-xs">
                            <Server className="h-8 w-8 text-[#F27108] mx-auto mb-4" />
                            <div className="font-bold mb-2">Estuary (CDC)</div>
                            <div className="text-gray-400">Stream Processing</div>
                        </div>
                        <div className="h-8 w-0.5 md:w-8 md:h-0.5 bg-gray-600"></div>
                        <div className="p-6 bg-[#1E1E38] rounded-xl border border-white/10 w-full max-w-xs">
                            <Database className="h-8 w-8 text-[#56A8F5] mx-auto mb-4" />
                            <div className="font-bold mb-2">MotherDuck</div>
                            <div className="text-gray-400">Serverless Analytics</div>
                        </div>
                    </div>

                    <div className="mt-16 text-center text-gray-400">
                        <p>Built on FastAPI, Redis, and Google Cloud.</p>
                        <div className="mt-8">
                            <Link href="/docs" className="text-[#56A8F5] hover:text-[#56A8F5]/80 font-semibold">View API Documentation →</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
