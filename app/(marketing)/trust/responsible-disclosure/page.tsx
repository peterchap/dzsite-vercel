import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Mail, ShieldCheck, HeartHandshake, Eye } from "lucide-react";

export const metadata: Metadata = {
    title: "Responsible Disclosure | Datazag",
    description: "Datazag takes the security of its systems and data seriously and welcomes responsible disclosure of security vulnerabilities.",
};

export default function ResponsibleDisclosurePage() {
    return (
        <PageShell>
            {/* Hero Section */}
            <div className="border-b border-slate-100 bg-slate-50/30">
                <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Trust & Safety</p>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                            Responsible Disclosure
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
                            Datazag takes the security of its systems and data seriously and welcomes responsible disclosure of security vulnerabilities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
                <div className="mx-auto max-w-3xl space-y-12">

                    {/* Reporting */}
                    <LegalSection title="Reporting a Vulnerability">
                        <p className="mb-8">
                            If you believe you have identified a security vulnerability affecting Datazag systems,
                            please report it responsibly by contacting our security team directly.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <ContactCard
                                icon={<Mail className="h-5 w-5 text-blue-600" />}
                                title="Primary Contact"
                                value="security@datazag.com"
                                href="mailto:security@datazag.com"
                            />
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    Encrypted communication via PGP available upon request.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="font-bold text-slate-900">Please include in your report:</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ReportItem text="A clear description of the issue" />
                                <ReportItem text="Steps to reproduce (if applicable)" />
                                <ReportItem text="Potential security impact" />
                                <ReportItem text="Any supporting materials (scripts, screenshots)" />
                            </ul>
                        </div>
                    </LegalSection>

                    {/* Guidelines */}
                    <LegalSection title="Disclosure Guidelines">
                        <p className="mb-8">
                            We ask that security researchers act in good faith and follow these guidelines to protect our users and infrastructure.
                        </p>
                        <div className="space-y-4">
                            <GuidelineCard
                                icon={<Eye className="h-5 w-5 text-slate-400" />}
                                title="No Public Disclosure"
                                text="Do not publicly disclose vulnerabilities before remediation has been completed and confirmed by our team."
                            />
                            <GuidelineCard
                                icon={<ShieldCheck className="h-5 w-5 text-slate-400" />}
                                title="Limited Access"
                                text="Do not access, modify, or delete data beyond what is strictly necessary to demonstrate the identified issue."
                            />
                            <GuidelineCard
                                icon={<HeartHandshake className="h-5 w-5 text-slate-400" />}
                                title="Act in Good Faith"
                                text="Act with integrity to avoid service disruption, privacy violations, or destruction of data during your research."
                            />
                        </div>
                    </LegalSection>

                    {/* Commitment */}
                    <LegalSection title="Our Commitment" border={false}>
                        <p className="mb-8 leading-relaxed">
                            Datazag values the contributions of the security community. When a vulnerability is reported in accordance with these guidelines, we commit to:
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            <CommitmentItem title="Prompt Acknowledgment" text="We will acknowledge receipt of your report promptly." />
                            <CommitmentItem title="Timely Investigation" text="Valid issues will be investigated and prioritized in a timely manner." />
                            <CommitmentItem title="Transparent Remediation" text="We will work with you to confirm and remediate confirmed vulnerabilities." />
                        </div>
                        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Thank You</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    We appreciate your help in keeping Datazag and the domain intelligence ecosystem secure.
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldCheck className="h-24 w-24" />
                            </div>
                        </div>
                    </LegalSection>

                </div>
            </div>
        </PageShell>
    );
}

// --- Local Components ---

function LegalSection({ title, children, border = true }: { title: string; children: React.ReactNode; border?: boolean }) {
    return (
        <section className={cn("space-y-6", border && "pb-10 border-b border-slate-100")}>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
            <div className="text-slate-600 leading-relaxed font-medium">
                {children}
            </div>
        </section>
    );
}

function ContactCard({ title, value, href, icon }: { title: string; value: string; href: string, icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-blue-100 transition-colors flex items-center gap-4"
        >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{title}</p>
                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{value}</p>
            </div>
        </a>
    );
}

function ReportItem({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-3 p-4 rounded-xl border border-slate-50 bg-slate-50/30">
            <div className="mt-1 h-5 w-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            </div>
            <span className="text-sm font-semibold text-slate-600 leading-tight">{text}</span>
        </li>
    );
}

function GuidelineCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
    return (
        <div className="p-6 rounded-2xl border border-slate-50 bg-white flex gap-5 group hover:border-slate-100 transition-colors">
            <div className="mt-1 shrink-0">{icon}</div>
            <div>
                <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
            </div>
        </div>
    );
}

function CommitmentItem({ title, text }: { title: string; text: string }) {
    return (
        <div className="flex items-baseline gap-4 py-4 border-b border-slate-50 last:border-0">
            <span className="min-w-[180px] text-sm font-black text-slate-900 uppercase tracking-widest shrink-0">{title}</span>
            <span className="text-sm text-slate-600">{text}</span>
        </div>
    );
}
