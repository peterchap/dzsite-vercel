'use client';

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/ui/copy-button";
import { HelpCircle, Zap, Shield, Rocket, ClipboardList, Info, AlertCircle, Link as LinkIcon, Terminal, Code2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

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

const TOC = [
    { id: "overview", label: "Overview" },
    { id: "auth", label: "Authentication" },
    { id: "endpoint", label: "Endpoint" },
    { id: "logic", label: "Decision Logic" },
    { id: "use-cases", label: "Use Cases" },
    { id: "performance", label: "Performance" },
    { id: "errors", label: "Errors" },
    { id: "faq", label: "FAQ" },
];

export function DocsClient() {
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
                        <span className="text-slate-300">/</span>
                        <span className="text-sm font-medium text-slate-500">v1.2 Reference</span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                        Domain Intelligence <span className="text-blue-600">API</span>
                    </h1>
                    <p className="mt-8 max-w-3xl text-xl text-slate-600 leading-relaxed font-medium">
                        Programmatic access to Datazag's continuously refreshed dataset of 315M+ domains.
                        Built for high-scale KYC, fraud prevention, and deliverability automation.
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
                            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Documentation</h3>
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
                            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Other APIs</h3>
                            <ul className="space-y-4">
                                <li><a href="/docs/search-stream" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Search Stream Webhooks</a></li>
                            </ul>
                        </div>
                        <div className="pt-8 border-t border-slate-100">
                            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Resources</h3>
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
                                The Datazag API is a RESTful interface for querying real-time signals on over 315 million domains.
                                Unlike static datasets, our API provides "Answers" by aggregating live DNS, hosting, and risk telemetry
                                into actionable binary flags and risk scores.
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
                                <p className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Header Name</p>
                                <div className="flex items-center justify-between">
                                    <code className="text-xl font-bold font-mono text-blue-600">X-API-Key</code>
                                    <Badge className="bg-blue-600 font-bold">Required</Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AuthNotice icon={<AlertCircle className="h-4 w-4 text-amber-500" />} text="Never expose your API key in client-side code." />
                                <AuthNotice icon={<Info className="h-4 w-4 text-blue-500" />} text="Rotate keys every 90 days for SOC2 compliance." />
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
                                <span className="text-slate-400">/api/</span>
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
                                        <span className="text-slate-400 font-mono text-xs">{p.type}</span>,
                                        p.required ? <span className="text-blue-600 font-bold text-xs">Required</span> : <span className="text-slate-300 font-bold text-xs italic">Optional</span>,
                                        <span className="text-slate-600 font-medium">{p.desc}</span>
                                    ])}
                                />
                            </div>

                            <div className="pt-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8">Implementation Examples</h3>
                                <Tabs defaultValue="curl" className="w-full">
                                    <TabsList className="bg-slate-100 p-1.5 rounded-2xl mb-6 inline-flex">
                                        <TabsTrigger value="curl" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-sm">cURL</TabsTrigger>
                                        <TabsTrigger value="python" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-sm">Python</TabsTrigger>
                                        <TabsTrigger value="node" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-sm">Node.js</TabsTrigger>
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
                                            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-tighter">{f.type}</span>,
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
                                The API is designed for automated decision systems. We recommend implementing the following
                                thresholds into your internal risk engine.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <LogicCard
                                    title="Hard Reject"
                                    color="rose"
                                    icon={<XCircleIcon />}
                                    text={<>Reject traffic if <code className="font-bold">is_phishing</code> or <code className="font-bold">is_disposable</code> is true.</>}
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
                                    text={<>Whitelists users where <code className="font-bold">has_spf</code> and <code className="font-bold">has_dmarc</code> are both true.</>}
                                />
                            </div>
                        </div>
                    </Section>

                    <Section id="use-cases" title="Core Industry Workflows">
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
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold border border-emerald-100">02</div>
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
                                    <h4 className="text-2xl font-bold mb-4 italic">High Velocity</h4>
                                    <p className="text-slate-400 mb-6 leading-relaxed">Average response time sits consistently under <strong>200ms</strong> globaly.</p>
                                    <div className="flex items-center gap-2 text-xs font-mono text-blue-300 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                                        <span className="text-blue-500 font-bold">PRO TIP:</span> Use ?exclude=infrastructure to save 40% bandwidth.
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

                    <Section id="faq" title="FAQ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <FaqItem
                                question="How fresh is the data?"
                                answer="Our database is refreshed continuously from hundreds of DNS sensor nodes. Critical infrastructure changes are typically detected and updated within 12–24 hours."
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
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title || language}</span>
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
                    {columns.map(c => <TableHead key={c} className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] h-14 pl-8">{c}</TableHead>)}
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
