'use client';

import { useMemo, useState } from "react";
import { DOMAINS_DISPLAY, PUBLISHED_STATS } from "@/lib/site-stats";
import type { DatasetSummary } from "@/lib/datasets/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/ui/copy-button";
import { HelpCircle, Zap, Shield, Rocket, ClipboardList, AlertCircle, Link as LinkIcon, Terminal, Code2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Data for the documentation page ---
const SAMPLE_RESPONSE = `{
  "domain": "example.com",
  "ns": "ns1.provider.net",
  "soa": "hostmaster@example.com",
  "status": "active",
  "suffix": "com",
  "ip": "192.0.2.1",
  "country_dm": "US",
  "risk_score": 20,
  "flags": {
    "is_mailbox_provider": false,
    "is_phishing": false,
    "is_mailable": true,
    "is_disposable": false,
    "has_dmarc": true,
    "has_spf": true
  }
}`;

const ERROR_ROWS = [
    { code: 400, message: "Bad Request", desc: "Malformed domain or parameters" },
    { code: 401, message: "Unauthorized", desc: "Invalid or missing API key" },
    { code: 404, message: "Not Found", desc: "Domain not found" },
    { code: 429, message: "Too Many Requests", desc: "Rate limit exceeded" },
    { code: 500, message: "Internal Server Error", desc: "Unexpected server error" },
];

const PARAMS = [
    { name: "domain", type: "string", required: true, desc: "Domain host to query, e.g. example.com" },
    { name: "exclude", type: "string", required: false, desc: "Comma-separated list of fields to trim from the response" },
];

const FIELDS = [
    { key: "risk_score", type: "integer", desc: "Overall risk rating (0-100). Higher score indicates higher probability of abuse." },
    { key: "flags.is_phishing", type: "boolean", desc: "True if flagged on real-time phishing intelligence blacklists." },
    { key: "flags.is_disposable", type: "boolean", desc: "True if domain belongs to a temporary or disposable email provider." },
    { key: "flags.is_mailable", type: "boolean", desc: "Indicates if the domain is suitable for sending and receiving legitimate email." },
    { key: "flags.is_mailbox_provider", type: "boolean", desc: "True for well-known providers like Gmail, Outlook, Proton, etc." },
    { key: "flags.is_parked", type: "boolean", desc: "True if the domain resolves to a generic parking page or is for sale." },
];

/**
 * ALERT DELIVERY ROUTES — mirrors app/alerts/copy.ts. Alerts are not a REST
 * resource you poll; they are pushed, or consumed through a route the team
 * already operates. Documenting a GET /alerts endpoint would have been
 * inventing an API.
 */
const ALERT_ROUTES = [
    { name: "Webhooks", desc: "Signed HTTP POST per alert event. Launch integrations for Palo Alto, Microsoft Sentinel and Splunk, plus custom ticketing, SOAR and portal workflows.", primary: true },
    { name: "API", desc: "Score, enrich and retrieve alert context inside products, review queues and case-management tools." },
    { name: "SIEM and SOC tools", desc: "Route alerts and their reason fields into detection, investigation and response workflows." },
    { name: "Reports and evidence packs", desc: "Package findings for executives, customers, takedown workflows and account reviews." },
    { name: "Cloud data shares", desc: "Iceberg or Delta datasets for analytics, hunting, enrichment and historical review." },
];

/** Webhook contract facts — see /docs/search-stream for the full reference. */
const WEBHOOK_CONTRACT = [
    { label: "Transport", value: "HTTPS POST, JSON body" },
    { label: "Verification", value: "HMAC signature over the RAW request bytes" },
    { label: "Your timeout", value: "Respond 200 within 5 seconds" },
    { label: "Retries", value: "3 attempts if we do not receive a 200" },
    { label: "Deduplication", value: "Key on alert_id — retries reuse it" },
];

const ALERT_EVENT_SHAPE = `{
  "alert_id": "evt_889234-ab12-44c1",
  "timestamp": "2023-10-27T14:30:00Z",
  "event_type": "phishing_candidate_detected",
  "severity": "high",
  "brand_monitored": "Acme Corp",
  "threat_data": { "url": "...", "domain": "...", "ip_address": "...", "asn": "..." },
  "detection_logic": {
    "score": 95,
    "triggers": ["logo_match", "keyword_stuffing", "newly_registered_domain"]
  }
}`;

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
    { id: "auth", label: "Authentication" },
    { id: "endpoint", label: "Endpoint" },
    { id: "logic", label: "Decision Logic" },
    { id: "use-cases", label: "What teams build" },
    { id: "performance", label: "Performance" },
    { id: "errors", label: "Errors" },
    { id: "alerts", label: "Alerts" },
    { id: "reports", label: "Reports" },
    { id: "datasets", label: "Datasets" },
    { id: "faq", label: "FAQ" },
];

export function DocsClient({ datasets = [] }: { datasets?: DatasetSummary[] }) {
    const curl = useMemo(() => `curl -H "X-API-Key: YOUR_API_KEY" https://api.datazag.com/api/example.com`, []);
    const python = useMemo(() => `import requests\n\nurl = "https://api.datazag.com/api/example.com"\nheaders = {"X-API-Key": "YOUR_API_KEY"}\nr = requests.get(url, headers=headers, timeout=30)\nprint(r.json())`, []);
    const node = useMemo(() => `const url = 'https://api.datazag.com/api/example.com';\nconst response = await fetch(url, {\n  headers: { 'X-API-Key': 'YOUR_API_KEY' }\n});\nconsole.log(await response.json());`, []);

    return (
        <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Page Hero Section */}
            <header className="border-b bg-slate-50/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container mx-auto max-w-6xl px-6 py-24 lg:py-36 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Badge variant="secondary" className="px-3 bg-blue-50 text-blue-600 border-blue-100 font-bold uppercase tracking-wider text-[10px]">Developer Portal</Badge>
                        <span className="text-slate-500">/</span>
                        <span className="text-sm font-medium text-slate-500">v1.2 Reference</span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                        Infrastructure Intelligence <span className="text-blue-600">API</span>
                    </h1>
                    <p className="mt-8 max-w-3xl text-xl text-slate-600 leading-relaxed font-medium">
                        The query interface to the Datazag infrastructure graph. Ask it about a domain
                        and it answers from what is publicly observable — DNS state, mail and
                        authentication posture, hosting and network placement, and a risk score derived
                        from {DOMAINS_DISPLAY} domains of prior observation.
                    </p>
                    {/* The same graph reaches you four ways. Naming them up front
                        stops a developer reading the whole API reference before
                        discovering that alerts are pushed and datasets are SQL. */}
                    <p className="mt-6 max-w-3xl text-base text-slate-500 leading-relaxed font-medium">
                        The same graph reaches you four ways, and this page documents all of them:{" "}
                        <a href="#endpoint" className="font-bold text-slate-700 hover:text-blue-600">the API</a> for a
                        question you ask,{" "}
                        <a href="#alerts" className="font-bold text-slate-700 hover:text-blue-600">alerts</a> for events
                        pushed to you,{" "}
                        <a href="#reports" className="font-bold text-slate-700 hover:text-blue-600">reports</a> as
                        documents, and{" "}
                        <a href="#datasets" className="font-bold text-slate-700 hover:text-blue-600">datasets</a> as SQL
                        in your own warehouse.
                    </p>
                    <div className="mt-12 flex flex-wrap gap-4">
                        <Button asChild size="lg" className="rounded-xl h-14 px-10 font-bold bg-slate-900 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                            <a href="https://portal.datazag.com/register">Create API Key</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-xl h-14 px-10 font-bold border-slate-200 bg-white hover:bg-slate-50">
                            <a href="#endpoint">Explore Reference</a>
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
                        <div className="pt-8 border-t border-slate-100">
                            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Other APIs</h3>
                            <ul className="space-y-4">
                                <li><a href="/docs/search-stream" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Search Stream Webhooks</a></li>
                            </ul>
                        </div>
                        <div className="pt-8 border-t border-slate-100">
                            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Resources</h3>
                            <ul className="space-y-4">
                                <li><a href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"><Terminal className="h-4 w-4" /> SDK Libraries</a></li>
                                <li><a href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"><Code2 className="h-4 w-4" /> Postman Collection</a></li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* Documentation Sections */}
                <div className="min-w-0 flex-1 space-y-32">
                    <Section id="overview" title="Overview">
                        <div className="prose prose-slate max-w-none space-y-6">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                The Datazag API is a RESTful interface onto the same infrastructure graph that produces
                                Datazag reports and alerts. Every field below is derived from public internet infrastructure —
                                nameservers, mail routing, email-authentication records, addressing and network placement —
                                rather than from a static list. KYC, fraud and deliverability are things teams DO with it;
                                they are not what it is.
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
                                    <h4 className="font-bold text-slate-900 text-lg mb-3">Fraud Prevention</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Real-time domain scoring (0–100) identifies phishing, disposable, and typo-squatted domains instantly.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-emerald-100 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-emerald-600 transition-colors">
                                        <Zap className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-3">Deliverability Intelligence</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Validate SPF/DMARC health and categorize mailbox providers to optimize marketing ROI.</p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section id="auth" title="Authentication">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Datazag uses API keys to allow access to the API. Every request must include your private key in the header.
                            </p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <p className="text-sm font-bold text-slate-600 mb-4 uppercase tracking-widest">Header Name</p>
                                <div className="flex items-center justify-between">
                                    <code className="text-xl font-bold font-mono text-blue-600">X-API-Key</code>
                                    <Badge className="bg-blue-600 font-bold">Required</Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <AuthNotice icon={<AlertCircle className="h-4 w-4 text-amber-500" />} text="Never expose your API key in client-side code." />
                            </div>
                            <CodeBlock language="bash" text={'X-API-Key: YOUR_API_KEY'} />
                        </div>
                    </Section>

                    <Section id="endpoint" title="The Domain Endpoint">
                        <div className="space-y-12">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Retrieve a comprehensive profile for any hostname. Our system automatically resolves redirects
                                and parses parent domain context for subdomains.
                            </p>

                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 font-mono text-lg shadow-sm group">
                                <Badge className="px-4 py-1.5 bg-blue-600 text-[11px] font-black italic">GET</Badge>
                                <span className="text-slate-600">/api/</span>
                                <span className="text-slate-900 font-bold">{'{domain}'}</span>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <Cpu className="h-5 w-5 text-slate-400" />
                                    Query Parameters
                                </h3>
                                <DataTable
                                    columns={["Parameter", "Type", "Required", "Description"]}
                                    data={PARAMS.map(p => [
                                        <code className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{p.name}</code>,
                                        <span className="text-slate-600 font-mono text-xs">{p.type}</span>,
                                        p.required ? <span className="text-blue-600 font-bold text-xs">Required</span> : <span className="text-slate-500 font-bold text-xs italic">Optional</span>,
                                        <span className="text-slate-600 font-medium">{p.desc}</span>
                                    ])}
                                />
                            </div>

                            <div className="pt-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8">Implementation Examples</h3>
                                <Tabs defaultValue="curl" className="w-full">
                                    <TabsList className="bg-slate-100 p-1.5 rounded-2xl mb-6 inline-flex">
                                        <TabsTrigger value="curl" className="rounded-xl px-6 py-2.5 text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-bold text-sm">cURL</TabsTrigger>
                                        <TabsTrigger value="python" className="rounded-xl px-6 py-2.5 text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-bold text-sm">Python</TabsTrigger>
                                        <TabsTrigger value="node" className="rounded-xl px-6 py-2.5 text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-bold text-sm">Node.js</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="curl" className="mt-0 ring-offset-0 focus-visible:ring-0">
                                        <CodeBlock language="bash" text={curl} title="cURL Example" />
                                    </TabsContent>
                                    <TabsContent value="python" className="mt-0 ring-offset-0 focus-visible:ring-0">
                                        <CodeBlock language="python" text={python} title="Python (Requests)" />
                                    </TabsContent>
                                    <TabsContent value="node" className="mt-0 ring-offset-0 focus-visible:ring-0">
                                        <CodeBlock language="javascript" text={node} title="Node.js (Fetch API)" />
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8">Success Response</h3>
                                <CodeBlock language="json" text={SAMPLE_RESPONSE} title="JSON Payload" />

                                <div className="mt-12 space-y-6">
                                    <h4 className="text-xl font-bold text-slate-900 underline decoration-blue-500/30 underline-offset-8">Output Glossary</h4>
                                    <DataTable
                                        columns={["Property", "Data Type", "Definition"]}
                                        data={FIELDS.map(f => [
                                            <code className="text-slate-900 font-black">{f.key}</code>,
                                            <span className="text-slate-600 font-mono text-[10px] uppercase tracking-tighter">{f.type}</span>,
                                            <span className="text-slate-600 font-medium leading-relaxed">{f.desc}</span>
                                        ])}
                                    />
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section id="logic" title="Intelligent Decision logic">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                The API supplies signals. The thresholds are yours. Below is a starting point for an
                                internal risk engine, not a policy we set on your behalf — the patterns that fit a
                                payments signup and a B2B trial are not the same, and neither is the cost of getting
                                one wrong.
                            </p>
                            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
                                <p className="text-sm leading-relaxed text-slate-700">
                                    <span className="font-bold text-slate-900">A flag is an observation, not a verdict.</span>{" "}
                                    <code className="font-bold">is_disposable</code> says a domain belongs to a temporary
                                    mail provider — whether that should block a signup is a policy question about your
                                    users, not a risk finding. <code className="font-bold">is_phishing</code> reflects
                                    third-party phishing intelligence, which can be stale or wrong. Treat both as inputs
                                    you can weight, override and audit.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <LogicCard
                                    title="Strongest signal"
                                    color="rose"
                                    icon={<XCircleIcon />}
                                    text={<>A true <code className="font-bold">is_phishing</code> is the strongest single input. Many teams block on it outright; keep the response so a decision can be explained or reversed.</>}
                                />
                                <LogicCard
                                    title="Manual Review"
                                    color="amber"
                                    icon={<AlertTriangleIcon />}
                                    text={<>Flag for security audit if <code className="font-bold">risk_score &ge; 70</code> or the domain is new (&lt; 30 days).</>}
                                />
                                <LogicCard
                                    title="Preferred"
                                    color="emerald"
                                    icon={<CheckCircleIcon />}
                                    text={<>Allow-lists users where <code className="font-bold">has_spf</code> and <code className="font-bold">has_dmarc</code> are both true.</>}
                                />
                            </div>
                        </div>
                    </Section>

                    <Section id="use-cases" title="What teams build with it">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">01</div>
                                <h3 className="text-2xl font-extrabold text-slate-900">KYC & Compliance</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Prevent platform abuse by blocking domains typically associated with botnets and temporary accounts.
                                    Use the global rank signal to verify the authority of corporate email signups.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold border border-emerald-100">02</div>
                                <h3 className="text-2xl font-extrabold text-slate-900">Revenue Operations</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Automatically enrich inbound leads with infrastructure health. Discard un-mailable leads before
                                    they touch your CRM to maintain high IP reputation and reduce bounce rates.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section id="performance" title="Scaling & Performance">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-10 rounded-3xl bg-slate-900 text-white shadow-2xl">
                                    <Zap className="h-10 w-10 text-blue-400 mb-8" />
                                    <h4 className="text-2xl font-bold mb-4 italic">Response Size</h4>
                                    <p className="text-slate-400 mb-6 leading-relaxed">Responses carry the full infrastructure block by default. Request only the fields you score on to keep payloads small.</p>
                                    <div className="flex items-center gap-2 text-xs font-mono text-blue-300 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                                        <span className="text-blue-400 font-bold">PRO TIP:</span> Use ?exclude=infrastructure to drop the infrastructure block.
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center space-y-6 p-6">
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-slate-900">Default Rate Limits</h5>
                                        <p className="text-slate-500 text-sm">5,000 requests per hour per key. For bulk cleaning, we recommend our Snowflake sharing layer.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-slate-900">Global Coverage</h5>
                                        <p className="text-slate-500 text-sm">Lookup performance is consistent across USA, EU, and APAC via our edge-caching layer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section id="errors" title="Common Error Codes">
                        <DataTable
                            columns={["Status", "Message", "Definition"]}
                            data={ERROR_ROWS.map(e => [
                                <span className="font-bold text-slate-900">{e.code}</span>,
                                <span className="font-bold text-rose-600">{e.message}</span>,
                                <span className="text-slate-500 font-medium">{e.desc}</span>
                            ])}
                        />
                    </Section>

                    {/* ── ALERTS ────────────────────────────────────────────
                        Alerts are PUSHED. There is no alerts REST resource, so
                        this documents the webhook contract and the routes that
                        actually exist rather than inventing endpoints. */}
                    <Section id="alerts" title="Alerts">
                        <div className="space-y-10">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Alerts are not something you poll for. Datazag pushes an event when
                                infrastructure matching your watchlist is observed, and you consume it
                                through whichever route your team already operates.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ALERT_ROUTES.map((route) => (
                                    <div
                                        key={route.name}
                                        className={cn(
                                            "p-6 rounded-2xl border",
                                            route.primary
                                                ? "border-blue-200 bg-blue-50/60"
                                                : "border-slate-100 bg-slate-50",
                                        )}
                                    >
                                        <h4 className="font-bold text-slate-900">{route.name}</h4>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{route.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900">The webhook contract</h3>
                                <DataTable
                                    columns={["Property", "Value"]}
                                    data={WEBHOOK_CONTRACT.map((row) => [
                                        <span key="l" className="font-bold text-slate-900">{row.label}</span>,
                                        <span key="v" className="text-slate-600 font-medium">{row.value}</span>,
                                    ])}
                                />
                                <p className="text-sm leading-relaxed text-slate-500">
                                    Verify the signature against the <strong>raw request bytes</strong>. Hashing
                                    a parsed and re-serialized body is the single most common integration
                                    failure — read the body before any JSON middleware runs.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900">Event shape</h3>
                                <CodeBlock language="json" text={ALERT_EVENT_SHAPE} title="Alert event" />
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
                                    <p className="text-sm leading-relaxed text-slate-700">
                                        <span className="font-bold text-slate-900">detection_logic.triggers is the reason code list.</span>{" "}
                                        It states what actually fired — not just how high the score was — so an
                                        analyst can agree or disagree with a specific finding rather than with a
                                        number. This is the field to surface in a queue.
                                    </p>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-500">
                                    Full reference, including signature verification, retry semantics and
                                    troubleshooting:{" "}
                                    <Link href="/docs/search-stream" className="font-bold text-blue-600 hover:underline">
                                        Search Stream webhook documentation
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* ── REPORTS ───────────────────────────────────────────
                        Reports are documents, not an endpoint. Saying so beats
                        implying an API a developer will hunt for. */}
                    <Section id="reports" title="Reports">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Reports are produced documents rather than an API resource. There is no
                                reports endpoint to call — the delivery route differs by report, and each
                                one is listed below.
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
                                Building report findings into your own product? The same underlying signals
                                are available through the API above and the datasets below — that is the
                                supported integration path.{" "}
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
                                Datasets are SQL, not HTTP. They arrive as cloud data shares and marketplace
                                listings for warehouse and lakehouse use — bulk analysis, historical review
                                and enrichment joins that would be impractical one API call at a time.
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
                            <FaqItem
                                question="How fresh is the data?"
                                answer="Certificate Transparency is consumed continuously, so newly issued certificates are observed as they are logged. DNS and hosting records are re-resolved on a rolling schedule; the refresh cadence for each field is documented on the dataset page that ships it."
                            />
                            <FaqItem
                                question="Do you support subdomains?"
                                answer="Full hostnames are supported. The API intelligently analyzes the specific host while cross-referencing parent domain risk signals for a complete profile."
                            />
                            <FaqItem
                                question="Is batch processing available?"
                                answer="Yes. For processing millions of records, we provide native Snowflake Data Shares, S3 Parquet feeds, and Google BigQuery datasets."
                            />
                            <FaqItem
                                question="What identifies the 'is_mailable' flag?"
                                answer="It's a synthesis of MX record validity, SPF/DMARC health, and the absence of malicious flags or disposable provider associations."
                            />
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

const CodeBlock = ({ language, text, title }: { language: string, text: string, title?: string }) => (
    <div className="relative group overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
        <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100"></span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none">{title || language}</span>
            </div>
            <CopyButton text={text} className="h-9 w-9 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" />
        </div>
        <div className="relative">
            <pre className="overflow-x-auto p-8 font-mono text-sm leading-8 text-slate-800 bg-white">
                <code className="block">{text}</code>
            </pre>
        </div>
    </div>
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

const LogicCard = ({ title, color, icon, text }: { title: string, color: 'rose' | 'amber' | 'emerald', icon: React.ReactNode, text: React.ReactNode }) => {
    const colors = {
        rose: "bg-rose-50 border-rose-100 text-rose-900 icon-bg-rose-100 shadow-rose-900/5",
        amber: "bg-amber-50 border-amber-100 text-amber-900 icon-bg-amber-100 shadow-amber-900/5",
        emerald: "bg-emerald-50 border-emerald-100 text-emerald-900 icon-bg-emerald-100 shadow-emerald-900/5",
    };
    return (
        <div className={cn("p-8 rounded-3xl border-2 shadow-xl transition-transform hover:-translate-y-1", colors[color])}>
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h4 className="font-black uppercase tracking-widest text-[11px]">{title}</h4>
            </div>
            <p className="text-sm leading-relaxed font-medium opacity-80">{text}</p>
        </div>
    );
};

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

const AuthNotice = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-white/50 text-xs font-semibold text-slate-500">
        {icon}
        {text}
    </div>
);

const XCircleIcon = () => (
    <div className="p-2 rounded-lg bg-rose-200/50">
        <AlertCircle className="h-4 w-4 text-rose-600" />
    </div>
);
const AlertTriangleIcon = () => (
    <div className="p-2 rounded-lg bg-amber-200/50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
    </div>
);
const CheckCircleIcon = () => (
    <div className="p-2 rounded-lg bg-emerald-200/50">
        <AlertCircle className="h-4 w-4 text-emerald-600" />
    </div>
);
