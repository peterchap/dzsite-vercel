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
    Database,
    Lock,
    Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/ui/copy-button";
import { DomainData } from "@/lib/api";

interface DomainResultsDisplayProps {
    data: DomainData;
}

type TabId = "overview" | "dns" | "infrastructure" | "security";

export function DomainResultsDisplay({ data }: DomainResultsDisplayProps) {
    const [activeTab, setActiveTab] = useState<TabId>("overview");

    // Calculate or infer risk score for display
    let riskScore = data.risk_score;
    if (riskScore === undefined || riskScore === null) {
        // Fallback mapping based on risk_level
        const map: Record<string, number> = { "low": 10, "medium": 50, "high": 85, "critical": 95 };
        riskScore = map[data.risk_level?.toLowerCase() || "low"] || 10;

        // Override with explicit flags if present
        if (data.is_malware || data.is_phishing) riskScore = 95;
        else if (data.is_parked || data.is_disposable) riskScore = 75;
    }

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
                        {data.risk_level?.toUpperCase() || (riskScore > 80 ? "CRITICAL RISK" : "LOW RISK")}
                    </p>
                </div>

                {data._meta?.timings && (
                    <div className="px-6 py-4 rounded-3xl bg-slate-50 border border-slate-100">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Lookup Timings</h3>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Total</span>
                                <span className="font-mono">{data._meta.timings.total_ms?.toFixed(0)}ms</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Fetch</span>
                                <span className="font-mono">{data._meta.timings.fetch_ms?.toFixed(0)}ms</span>
                            </div>
                        </div>
                    </div>
                )}
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
                                <Badge className={cn("font-black italic rounded-lg text-white", data.status === "ALIVE" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-600")}>
                                    {data.status || "UNKNOWN"}
                                </Badge>
                                <span className="text-slate-500 font-mono text-xs">Generated {new Date().toLocaleTimeString()}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight break-all">{data.domain}</h1>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Registered Domain</p>
                                    <p className="font-bold text-lg">{data.registered_domain || data.domain}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-800"></div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ISP Coverage</p>
                                    <p className="font-bold text-lg text-slate-200">{data.isp || "Unknown"}</p>
                                </div>
                            </div>
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
                        <InfoItem label="MX Status" value={data.mx ? "Active" : "No MX Records"} highlight={!!data.mx} />
                        <InfoItem label="Trusted Provider" value={data.is_known_mbp ? "Yes - Vetted" : "No - Unverified"} highlight={data.is_known_mbp} />
                        <InfoItem label="SPF Auth" value={data.spf ? "Present" : "Missing / None"} highlight={!!data.spf} />
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                        <ShieldCheck className="h-6 w-6 text-emerald-500" />
                        Security Posture
                    </h3>
                    <div className="space-y-4">
                        <FlagItem label="Phishing Detected" value={data.is_phishing} inverse />
                        <FlagItem label="Malware Host" value={data.is_malware} inverse />
                        <FlagItem label="Disposable Email" value={data.is_disposable} inverse />
                        <FlagItem label="Parked Domain" value={data.is_parked} inverse />
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">Advanced Analysis</h3>
                    <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Contextual AI</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DGA Entropy</p>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                            {data.dga_sld_entropy ? `${data.dga_sld_entropy.toFixed(2)} / 5.0` : "N/A"}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Level</p>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed capitalize">
                            {data.risk_level || "Unknown"}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                            {data.top_domain_rank ? `Top ${Math.ceil(data.top_domain_rank / 1000)}k` : "Unranked"}
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
        { type: "AAAA", value: data.aaaa, label: "IPv6 Address" },
        { type: "NS", value: data.ns1, label: "Name Server" },
        { type: "MX", value: data.mx, label: "Mail Exchanger" },
        { type: "TXT (SPF)", value: data.spf, label: "Sender Policy Framework" },
        { type: "TXT (DMARC)", value: data.dmarc, label: "DMARC Policy" },
        { type: "TXT (BIMI)", value: data.bimi, label: "Brand Indicators" },
        { type: "SOA", value: data.soa, label: "Start of Authority" },
        { type: "PTR", value: data.ptr, label: "Reverse DNS" },
        { type: "CNAME", value: data.cname, label: "Canonical Name" },
    ].filter(r => r.value);

    return (
        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-2xl font-black text-slate-900">Resource Records</h3>
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

            {/* MX IPs Drilldown */}
            {data.mx_ips && data.mx_ips.length > 0 && (
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Cpu className="h-5 w-5 text-blue-500" />
                        MX Infrastructure Nodes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {data.mx_ips.map((ip, i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 font-mono text-sm font-bold text-slate-600 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                {ip}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-500" />
                        Web Deployment
                    </h4>
                    <div className="space-y-4">
                        <DetailRow label="Primary WWW Host" value={data.www || "Unreachable"} />
                        <DetailRow label="WWW A Record" value={data.www_a} />
                        <DetailRow label="WWW Pointer" value={data.www_ptr} />
                        <DetailRow label="HTTPS Cert" value={data.https_cert_ok !== undefined ? (data.https_cert_ok ? "Valid" : "Invalid") : "Unknown"} />
                    </div>
                </div>
                <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        Mail Deployment
                    </h4>
                    <div className="space-y-4">
                        <DetailRow label="Mail Host IP" value={data.mail_a} />
                        <DetailRow label="Mail MX" value={data.mail_mx} />
                        <DetailRow label="SMTP Cert" value={data.smtp_cert_ok !== undefined ? (data.smtp_cert_ok ? "Valid" : "Invalid/None") : "Unknown"} />
                        <DetailRow label="MX Host Final" value={data.mx_host_final} />
                        <DetailRow label="MX PTR" value={data.mx_ptr} />
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
                    <ThreatItem title="DGA Suspect" description="Algorithmic domain generation often used by botnets." status={data.is_dga_suspect} />
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

