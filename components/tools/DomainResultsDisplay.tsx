"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Info,
    ExternalLink,
    ShieldAlert,
    Globe,
    Mail,
    Server,
    Search,
    Fingerprint,
    ShieldCheck,
    ArrowRight,
    Activity,
    Copy,
    Database
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/ui/copy-button";

interface DomainData {
    domain: string;
    mx_domain?: string;
    is_known_mbp?: boolean;
    mx_status?: string;
    a?: string;
    is_spf_block?: boolean;
    is_phishing?: boolean;
    is_disposable?: boolean;
    is_parked?: boolean;
    is_malware?: boolean;
    is_new_domain?: boolean;
    top_domain_rank?: number;
    mbp?: string;
    spf?: string;
    dmarc?: string;
    isp?: string;
    isp_country?: string;
    ns?: string;
    ptr?: string;
    cname?: string;
    mx?: string;
    www?: string;
    www_ptr?: string;
    www_cname?: string;
    mail_a?: string;
    mail_ptr?: string;
    mail_mx?: string;
    mail_spf?: string;
    mail_dmarc?: string;
    decision_flag?: boolean;
}

interface DomainResultsDisplayProps {
    data: DomainData;
}

type TabId = "overview" | "dns" | "infrastructure" | "security";

export function DomainResultsDisplay({ data }: DomainResultsDisplayProps) {
    const [activeTab, setActiveTab] = useState<TabId>("overview");

    const riskScore = data.is_phishing || data.is_malware ? 95 : (data.is_disposable || data.is_parked ? 75 : 15);
    const riskColor = riskScore > 80 ? "text-rose-600" : riskScore > 50 ? "text-amber-500" : "text-emerald-500";
    const riskBg = riskScore > 80 ? "bg-rose-50 border-rose-100" : riskScore > 50 ? "bg-amber-50 border-amber-100" : "bg-emerald-50 border-emerald-100";

    const tabs = [
        { id: "overview", label: "Intelligence Overview", icon: <Activity className="h-4 w-4" /> },
        { id: "dns", label: "DNS Records", icon: <Globe className="h-4 w-4" /> },
        { id: "infrastructure", label: "Infrastructure", icon: <Server className="h-4 w-4" /> },
        { id: "security", label: "Security Signals", icon: <ShieldCheck className="h-4 w-4" /> },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72 shrink-0 space-y-4 sticky top-64">
                <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Intelligence View</h3>
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabId)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                    activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={cn("p-6 rounded-3xl border-2 transition-all", riskBg)}>
                    <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Risk Profile</h3>
                    <div className="flex items-end gap-2">
                        <span className={cn("text-5xl font-black leading-none", riskColor)}>{riskScore}</span>
                        <span className="text-sm font-bold opacity-60 mb-1">/ 100</span>
                    </div>
                    <div className="mt-4 h-2 w-full bg-black/5 rounded-full overflow-hidden">
                        <div
                            className={cn("h-full transition-all duration-1000",
                                riskScore > 80 ? "bg-rose-500" : riskScore > 50 ? "bg-amber-500" : "bg-emerald-500"
                            )}
                            style={{ width: `${riskScore}%` }}
                        ></div>
                    </div>
                    <p className="mt-4 text-xs font-bold leading-relaxed opacity-80">
                        {riskScore > 80 ? "Critical Threat Detected. Immediate action required." : riskScore > 50 ? "Suspicious Activity. Manual review recommended." : "Low Risk Profile. Standard trust levels applied."}
                    </p>
                </div>
            </aside>

            {/* Main Data View */}
            <main className="flex-1 min-w-0 space-y-8">
                {/* Identity Card */}
                <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe className="h-64 w-64" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge className="bg-blue-500 hover:bg-blue-500 text-white font-black italic rounded-lg">VERIFIED INTEL</Badge>
                                <span className="text-slate-500 font-mono text-xs">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{data.domain}</h1>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Decision</p>
                                    <p className={cn("font-bold text-lg", data.decision_flag ? "text-emerald-400" : "text-rose-400")}>
                                        {data.decision_flag ? "Mailable" : "Rejected"}
                                    </p>
                                </div>
                                <div className="w-px h-8 bg-slate-800"></div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ISP Coverage</p>
                                    <p className="font-bold text-lg text-slate-200">{data.isp || "Unknown"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-white/10 hover:bg-white/20 border-white/10 rounded-2xl h-14 px-8 font-bold">
                                <Fingerprint className="h-5 w-5 mr-3 text-blue-400" />
                                Pivot Data
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    {activeTab === "overview" && <OverviewSection data={data} />}
                    {activeTab === "dns" && <DnsSection data={data} />}
                    {activeTab === "infrastructure" && <InfrastructureSection data={data} />}
                    {activeTab === "security" && <SecuritySection data={data} />}
                </div>

                {/* Portal Upsell */}
                <div className="bg-blue-600 rounded-[2rem] p-12 text-white shadow-2xl shadow-blue-600/20 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
                        <Database className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Unlock Full Historical Intelligence</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl text-lg font-medium opacity-90 leading-relaxed">
                        This preview shows current signals. Our full platform provides 10+ years of WHOIS history,
                        associated IPs, and real-time DNS monitoring for security teams.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl h-14 px-12 font-black shadow-xl">
                            Start Enterprise Trial
                        </Button>
                        <Button variant="outline" className="border-white/20 bg-transparent hover:bg-white/10 text-white rounded-2xl h-14 px-12 font-black">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function OverviewSection({ data }: { data: DomainData }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                        <Mail className="h-6 w-6 text-blue-500" />
                        Deliverability Profile
                    </h3>
                    <div className="space-y-4">
                        <InfoItem label="Mail Provider" value={data.mbp || "Custom Infrastructure"} />
                        <InfoItem label="Mail Status" value={data.mx_status === 'OK' ? "Operating Normally" : "Signal Anomalies Detected"} highlight={data.mx_status === 'OK'} />
                        <InfoItem label="Trusted MBP" value={data.is_known_mbp ? "Yes - Vetted Provider" : "No - Primary/Private Host"} highlight={data.is_known_mbp} />
                        <p className="pt-4 text-sm text-slate-500 leading-relaxed font-medium">
                            {data.is_known_mbp
                                ? "This domain uses a globally recognized mail provider with high reputation scoring."
                                : "This domain uses private or local infrastructure which may require additional scrutiny for high-volume sending."}
                        </p>
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                        <ShieldCheck className="h-6 w-6 text-emerald-500" />
                        Security Posture
                    </h3>
                    <div className="space-y-4">
                        <FlagItem label="Phishing Check" value={data.is_phishing} inverse />
                        <FlagItem label="Malware Check" value={data.is_malware} inverse />
                        <FlagItem label="Disposable Provider" value={data.is_disposable} inverse />
                        <FlagItem label="Parked / For Sale" value={data.is_parked} inverse />
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">Intelligence Interpretation</h3>
                    <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Contextual AI</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mail Server Context</p>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                            {data.mx_domain ? `Valid MX cluster identified at ${data.mx_domain}.` : "No primary MX cluster detected."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Summary</p>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                            {data.decision_flag ? "Intelligence suggests a legitimate, mailable commercial entity." : "High probability of service misuse or fraud attempt detected."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Standing</p>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                            {data.top_domain_rank ? `Ranked in the top ${Math.ceil(data.top_domain_rank / 1000) * 1000} most active global domains.` : "Limited global traffic signature detected."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DnsSection({ data }: { data: DomainData }) {
    const records = [
        { type: "A", value: data.a, label: "IPv4 Address" },
        { type: "NS", value: data.ns, label: "Name Server" },
        { type: "MX", value: data.mx, label: "Mail Exchanger" },
        { type: "TXT (SPF)", value: data.spf, label: "Sender Policy Framework" },
        { type: "TXT (DMARC)", value: data.dmarc, label: "DMARC Policy" },
        { type: "PTR", value: data.ptr, label: "Reverse DNS" },
        { type: "CNAME", value: data.cname, label: "Canonical Name" },
    ].filter(r => r.value);

    return (
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">Resource Records</h3>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="font-bold text-slate-400 h-8 hover:text-blue-600"><Copy className="h-3.5 w-3.5 mr-2" /> Copy All</Button>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-50 overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="border-slate-100 hover:bg-transparent">
                            <TableHead className="w-24 text-[10px] font-black uppercase tracking-widest pl-8">Type</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest">Value</TableHead>
                            <TableHead className="w-12 pr-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((record, i) => (
                            <TableRow key={i} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <TableCell className="pl-8 py-6">
                                    <Badge variant="outline" className="font-black border-slate-200 text-slate-400 bg-white">{record.type}</Badge>
                                </TableCell>
                                <TableCell className="py-6">
                                    <div className="space-y-1">
                                        <p className="font-mono text-sm text-slate-900 font-bold break-all select-all">{record.value}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{record.label}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="pr-8 text-right">
                                    <CopyButton text={record.value || ""} className="h-8 w-8 text-slate-300 hover:text-blue-600" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function InfrastructureSection({ data }: { data: DomainData }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InfrastructureStatCard title="Hosting ISP" value={data.isp || "None"} icon={<Server className="h-4 w-4" />} />
                <InfrastructureStatCard title="Country" value={data.isp_country || "GLOBAL"} icon={<Globe className="h-4 w-4" />} />
                <InfrastructureStatCard title="Mail Cluster" value={data.mbp || "Self-Hosted"} icon={<Mail className="h-4 w-4" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-500" />
                        Web Deployment
                    </h4>
                    <div className="space-y-4">
                        <DetailRow label="Primary WWW Host" value={`www.${data.domain}`} />
                        <DetailRow label="WWW A Record" value={data.www} />
                        <DetailRow label="WWW Pointer" value={data.www_ptr} />
                        <DetailRow label="WWW Canonical" value={data.www_cname} />
                    </div>
                </div>
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        Mail Deployment
                    </h4>
                    <div className="space-y-4">
                        <DetailRow label="Mail Subdomain" value={`mail.${data.domain}`} />
                        <DetailRow label="Mail Host IP" value={data.mail_a} />
                        <DetailRow label="Mail MX" value={data.mail_mx} />
                        <DetailRow label="Mail SPF" value={data.mail_spf} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecuritySection({ data }: { data: DomainData }) {
    return (
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-12">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">Security Threat Intel</h3>
                <Badge className="bg-rose-500 font-black tracking-wide">REAL-TIME</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic underline decoration-slate-100 underline-offset-8">Direct Threats</h4>
                    <ThreatItem title="Phishing Activity" description="Known campaigns targeting financial or retail credentials." status={data.is_phishing} />
                    <ThreatItem title="Malware Host" description="Domains associated with C2 nodes or payload distribution." status={data.is_malware} />
                    <ThreatItem title="Parked Sinkhole" description="Domains resolving to generic parking pages (common for spam traps)." status={data.is_parked} />
                </div>
                <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic underline decoration-slate-100 underline-offset-8">Structural Quality</h4>
                    <ThreatItem title="Disposable Email Provider" description="Domains used for temporary accounts and fraud signups." status={data.is_disposable} />
                    <ThreatItem title="Newly Registered" description="Registered in the last 30 days. Higher risk for seasonal phishing." status={data.is_new_domain} />
                    <ThreatItem title="SPF Blocklist" description="IP or Domain is actively listed on deliverability blocklists." status={data.is_spf_block} />
                </div>
            </div>
        </div>
    );
}

// --- Helper UI Components ---

function InfoItem({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">{label}</span>
            <span className={cn("text-sm font-bold text-slate-900 text-right", highlight && "text-blue-600")}>{value}</span>
        </div>
    );
}

function FlagItem({ label, value, inverse }: { label: string, value?: boolean, inverse?: boolean }) {
    const isPositive = inverse ? !value : value;
    return (
        <div className="flex items-center justify-between py-2.5">
            <span className="text-sm font-bold text-slate-500">{label}</span>
            <div className="flex items-center gap-2">
                <span className={cn("text-xs font-black uppercase tracking-widest", isPositive ? "text-emerald-500" : "text-rose-500")}>
                    {value ? "POSITIVE" : "NEGATIVE"}
                </span>
                {isPositive ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <ShieldAlert className="h-4 w-4 text-rose-500" />}
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value?: string }) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-slate-800 break-all">{value || <span className="text-slate-300 italic">Not detected</span>}</p>
        </div>
    );
}

function InfrastructureStatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
                <p className="text-lg font-black text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function ThreatItem({ title, description, status }: { title: string, description: string, status?: boolean }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50">
            <div className={cn("mt-1 p-2 rounded-lg", status ? "bg-rose-100 text-rose-600 shadow-lg shadow-rose-900/10" : "bg-emerald-100 text-emerald-600")}>
                {status ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
                <h5 className="font-bold text-slate-900">{title}</h5>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">{description}</p>
            </div>
        </div>
    );
}
