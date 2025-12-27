'use client';

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/ui/copy-button";
import {
    HelpCircle,
    Zap,
    Shield,
    Webhook,
    Lock,
    Code2,
    AlertCircle,
    Link as LinkIcon,
    Terminal,
    Mail,
    FileJson,
    RefreshCw,
    Play
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data for the documentation page ---
const SAMPLE_PAYLOAD = `{
  "alert_id": "evt_889234-ab12-44c1",
  "timestamp": "2023-10-27T14:30:00Z",
  "event_type": "phishing_candidate_detected",
  "severity": "high",
  "brand_monitored": "Acme Corp",
  "threat_data": {
    "url": "http://login-acmecorp-secure.com.badsite.net",
    "domain": "badsite.net",
    "ip_address": "203.0.113.45",
    "asn": "AS12345 Example ISP",
    "screenshot_url": "https://api.yourbrand.com/screenshots/123.png"
  },
  "detection_logic": {
    "score": 95,
    "triggers": [
      "logo_match",
      "keyword_stuffing",
      "newly_registered_domain"
    ]
  }
}`;

const TROUBLESHOOTING = [
    { issue: "Signature Mismatch", cause: "Hashing parsed JSON instead of raw bytes.", solution: "Ensure your code reads the request body before any JSON parsing middleware runs." },
    { issue: "403 Forbidden", cause: "Firewall blocking our IPs.", solution: "Whitelist 192.0.2.10 and 192.0.2.11 on your WAF or firewall." },
    { issue: "Timeouts / 5xx", cause: "Slow processing on your end.", solution: "Your endpoint must respond within 5 seconds. Offload heavy processing to a background job." },
    { issue: "Duplicate Events", cause: "Retry logic.", solution: "If we don't receive a 200 OK, we retry 3 times. Ensure your system checks alert_id to handle duplicates." },
];

const FIELDS = [
    { field: "alert_id", type: "string", desc: "Unique UUID for this event. Use this for deduplication in your SIEM." },
    { field: "timestamp", type: "string", desc: "ISO 8601 timestamp (UTC) of when the detection occurred." },
    { field: "event_type", type: "string", desc: "The classification of the event (e.g., phishing_candidate_detected)." },
    { field: "severity", type: "string", desc: "Normalized risk level: low, medium, high, or critical." },
    { field: "threat_data.url", type: "string", desc: "The full URL where the threat was detected." },
    { field: "threat_data.ip_address", type: "string", desc: "The hosting IP address of the malicious site." },
    { field: "detection_logic.score", type: "integer", desc: "A confidence score from 0-100 indicating the likelihood of phishing." },
];

const TOC = [
    { id: "overview", label: "Webhook Setup" },
    { id: "security", label: "Security & Auth" },
    { id: "examples", label: "Verification Examples" },
    { id: "schema", label: "Data Schema" },
    { id: "email", label: "Email Ingestion" },
    { id: "troubleshooting", label: "Troubleshooting" },
];

export function SearchStreamDocs() {
    const nodeCode = `const crypto = require('crypto');
const SIGNING_SECRET = process.env.SEARCH_STREAM_SECRET;

function verifySignature(req) {
  const signature = req.headers['x-searchstream-signature'];
  if (!signature) return false;

  const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
  const digest = hmac.update(req.rawBody).digest('hex');

  const signatureBuffer = Buffer.from(signature);
  const digestBuffer = Buffer.from(digest);

  return (
    signatureBuffer.length === digestBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, digestBuffer)
  );
}`;

    const pythonCode = `import hmac, hashlib, os

SIGNING_SECRET = os.getenv('SEARCH_STREAM_SECRET')

def verify_signature(request_headers, raw_body_bytes):
    incoming_signature = request_headers.get('X-SearchStream-Signature')
    if not incoming_signature:
        return False

    secret_bytes = bytes(SIGNING_SECRET, 'utf-8')
    expected_signature = hmac.new(
        key=secret_bytes, 
        msg=raw_body_bytes, 
        digestmod=hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(incoming_signature, expected_signature)`;

    const phpCode = `<?php
$secret = getenv('SEARCH_STREAM_SECRET');
$headers = getallheaders();
$signature = $headers['X-SearchStream-Signature'] ?? '';
$payload = file_get_contents('php://input');

$expected = hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    exit('Invalid Signature');
}
// Proceed with processing...
?>`;

    return (
        <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Header */}
            <header className="border-b bg-slate-50/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container mx-auto max-w-6xl px-6 py-24 lg:py-36 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Badge variant="secondary" className="px-3 bg-blue-50 text-blue-600 border-blue-100 font-bold uppercase tracking-wider text-[10px]">Developer Portal</Badge>
                        <span className="text-slate-300">/</span>
                        <span className="text-sm font-medium text-slate-500">Phishing Search Stream</span>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                        Search Stream <span className="text-blue-600">Webhooks</span>
                    </h1>
                    <p className="mt-8 max-w-3xl text-xl text-slate-600 leading-relaxed font-medium">
                        Real-time delivery of phishing candidates and brand infringements directly to your security stack
                        via high-availability webhooks.
                    </p>
                    <div className="mt-12 flex flex-wrap gap-4">
                        <Button asChild size="lg" className="rounded-xl h-14 px-10 font-bold bg-slate-900 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                            <a href="https://portal.datazag.com/dashboard/integrations">Configure Webhook</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-xl h-14 px-10 font-bold border-slate-200 bg-white hover:bg-slate-50">
                            <a href="/docs">Back to API Docs</a>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 px-6 py-16 lg:py-24">
                {/* TOC */}
                <aside className="sticky top-32 hidden h-fit w-64 shrink-0 lg:block mt-2">
                    <nav className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Search Stream</h3>
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
                                <li><a href="/docs" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Domain Intelligence API</a></li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* Sections */}
                <div className="min-w-0 flex-1 space-y-32">
                    {/* Webhook Configuration */}
                    <Section id="overview" title="Webhook Configuration">
                        <div className="prose prose-slate max-w-none space-y-6">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                The primary method for ingestion is a Webhook. We send a JSON payload via an HTTP POST request
                                to a URL you configure in your portal.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                    <Webhook className="h-8 w-8 text-blue-600 mb-6" />
                                    <h4 className="font-bold text-slate-900 text-lg mb-3">Endpoint Requirements</h4>
                                    <ul className="text-sm text-slate-500 space-y-2 list-disc pl-4">
                                        <li>Accept HTTP <strong>POST</strong> requests.</li>
                                        <li>Accept <code className="text-blue-600 font-bold">application/json</code>.</li>
                                        <li>Return <strong>200 OK</strong> within 5 seconds.</li>
                                        <li>Be publicly accessible (or allowlist our egress IPs).</li>
                                    </ul>
                                </div>
                                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                    <RefreshCw className="h-8 w-8 text-amber-500 mb-6" />
                                    <h4 className="font-bold text-slate-900 text-lg mb-3">Retry Logic</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                        If we don't receive a 200 OK, we attempt delivery 3 times with exponential backoff:
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold border-b border-slate-200 pb-1"><span>Attempt</span><span>Backoff</span></div>
                                        <div className="flex justify-between text-xs text-slate-500"><span>1</span><span>Immediate</span></div>
                                        <div className="flex justify-between text-xs text-slate-500"><span>2</span><span>+5 seconds</span></div>
                                        <div className="flex justify-between text-xs text-slate-500"><span>3</span><span>+30 seconds</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Security & Auth */}
                    <Section id="security" title="Security & Authentication">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Since webhooks receive raw threat data, it is critical to verify requests originate from Datazag.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl border border-slate-200 bg-white">
                                    <Lock className="h-6 w-6 text-blue-600 mb-4" />
                                    <h4 className="font-bold text-slate-900 mb-2">Signature Verification <Badge className="ml-2 bg-rose-600">Required</Badge></h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                        Every request includes a <code className="text-blue-600 font-bold">X-SearchStream-Signature</code> header.
                                        This is an HMAC-SHA256 hash of the raw request body.
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl border border-slate-200 bg-white">
                                    <Shield className="h-6 w-6 text-emerald-600 mb-4" />
                                    <h4 className="font-bold text-slate-900 mb-2">IP Allowlisting <Badge variant="secondary" className="ml-2">Optional</Badge></h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                        Restrict traffic to our egress IPs for additional network security.
                                    </p>
                                    <div className="font-mono text-xs bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                                        <span>192.0.2.10</span>
                                        <span>192.0.2.11</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
                                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
                                <div>
                                    <h5 className="font-bold text-amber-900 text-sm">Caution for Developers</h5>
                                    <p className="text-xs text-amber-700 mt-1 leading-relaxed font-medium">
                                        Do not rely solely on payload content. Always verify the signature against the **raw** request body
                                        before any middleware modifications (like JSON parsing) to prevent tampering.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Code Examples */}
                    <Section id="examples" title="Verification Examples">
                        <div className="space-y-8">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Verify the signature using your unique <code className="font-bold">Signing Secret</code>
                                available in your dashboard.
                            </p>
                            <Tabs defaultValue="node" className="w-full">
                                <TabsList className="bg-slate-100 p-1.5 rounded-2xl mb-6 inline-flex">
                                    <TabsTrigger value="node" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-sm">Node.js</TabsTrigger>
                                    <TabsTrigger value="python" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-sm">Python</TabsTrigger>
                                    <TabsTrigger value="php" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-sm">PHP</TabsTrigger>
                                </TabsList>
                                <TabsContent value="node">
                                    <CodeBlock language="javascript" text={nodeCode} title="Express.js Verification" />
                                </TabsContent>
                                <TabsContent value="python">
                                    <CodeBlock language="python" text={pythonCode} title="Flask/Django Verification" />
                                </TabsContent>
                                <TabsContent value="php">
                                    <CodeBlock language="php" text={phpCode} title="PHP Verification" />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </Section>

                    {/* Schema & Payload */}
                    <Section id="schema" title="Data Schema">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <FileJson className="h-6 w-6 text-blue-500" />
                                    Example Payload
                                </h3>
                                <CodeBlock language="json" text={SAMPLE_PAYLOAD} title="Phishing Detection Event" />
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900">Field Reference</h3>
                                <DataTable
                                    columns={["Field", "Type", "Description"]}
                                    data={FIELDS.map(f => [
                                        <code className="text-blue-600 font-bold">{f.field}</code>,
                                        <span className="text-slate-400 font-mono text-[10px] uppercase">{f.type}</span>,
                                        <span className="text-slate-600 font-medium">{f.desc}</span>
                                    ])}
                                />
                            </div>
                        </div>
                    </Section>

                    {/* Email Ingestion */}
                    <Section id="email" title="Alternative: Email Ingestion">
                        <div className="p-10 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <Mail className="h-48 w-48" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-bold">Structured Email Alerts</h3>
                                <p className="text-slate-400 max-w-2xl leading-relaxed">
                                    If your environment cannot support webhooks, we deliver structured alerts via email.
                                    This is common for legacy ticketing systems or manual security review.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm pt-4">
                                    <div className="space-y-2">
                                        <p className="font-bold text-blue-400 uppercase tracking-widest text-[10px]">Format</p>
                                        <p>Multipart MIME (Text summary + .json attachment)</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-bold text-blue-400 uppercase tracking-widest text-[10px]">Subject</p>
                                        <p>[Alert] Phishing Candidate Detected: {"<Domain>"} - {"<Level>"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Troubleshooting */}
                    <Section id="troubleshooting" title="Troubleshooting & Support">
                        <div className="space-y-8">
                            <DataTable
                                columns={["Issue", "Likely Cause", "Solution"]}
                                data={TROUBLESHOOTING.map(t => [
                                    <span className="font-bold text-rose-600">{t.issue}</span>,
                                    <span className="text-slate-600 italic font-medium">{t.cause}</span>,
                                    <span className="text-slate-900 font-semibold">{t.solution}</span>
                                ])}
                            />

                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
                                        <Play className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">Integration Testing</h4>
                                </div>
                                <p className="text-slate-600 mb-6 font-medium">
                                    You can trigger a manual test event from your dashboard at any time to verify your endpoint setup.
                                </p>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                                    <span>Dashboard</span> <ArrowRight className="h-3 w-3" /> <span>Settings</span> <ArrowRight className="h-3 w-3" /> <span>Integrations</span>
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

// --- Internal Helper Components ---

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
        <div>{children}</div>
    </section>
);

const CodeBlock = ({ language, text, title }: { language: string, text: string, title?: string }) => (
    <div className="relative group overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
        <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-100"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title || language}</span>
            </div>
            <CopyButton text={text} className="h-9 w-9 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" />
        </div>
        <pre className="overflow-x-auto p-8 font-mono text-sm leading-8 text-slate-800 bg-white">
            <code>{text}</code>
        </pre>
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
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/30 transition-all border-b last:border-0">
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

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}
