import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Data Processing Agreement | Datazag",
    description: "This Data Processing Agreement (“DPA”) describes how Datazag processes personal data on behalf of customers in accordance with applicable data protection laws.",
};

export default function DataProcessingAgreementPage() {
    return (
        <PageShell>
            {/* Hero Section */}
            <div className="border-b border-slate-100 bg-slate-50/30">
                <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Legal</p>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                            Data Processing Agreement
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
                            This Data Processing Agreement (“DPA”) describes how Datazag processes personal data on behalf of customers in accordance with applicable data protection laws.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
                <div className="mx-auto max-w-3xl space-y-20">
                    <LegalSection title="Purpose of this agreement">
                        <p>
                            This Data Processing Agreement (“DPA”) forms part of the agreement between Datazag and the customer and applies where Datazag processes personal data on behalf of the customer in the course of providing its services.
                        </p>
                        <p className="mt-4">
                            This DPA is intended to ensure compliance with applicable data protection laws, including the EU General Data Protection Regulation (“GDPR”) and equivalent regulations in other jurisdictions.
                        </p>
                    </LegalSection>

                    <LegalSection title="Roles of the parties">
                        <p className="mb-8">
                            The relationship between the Customer and Datazag in relation to the processing of personal data is defined by the following roles:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DataPoint
                                title="Customer as controller"
                                description="The customer acts as the data controller and determines the purposes and means of processing personal data."
                            />
                            <DataPoint
                                title="Datazag as processor"
                                description="Datazag acts as a data processor and processes personal data only on documented instructions from the customer."
                            />
                        </div>
                    </LegalSection>

                    <LegalSection title="Categories of personal data processed">
                        <p>
                            Depending on the customer’s use of the services, Datazag may process limited categories of personal data, which may include:
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-600">
                            <li>Domain-associated email addresses</li>
                            <li>Technical metadata related to domains and infrastructure</li>
                            <li>Contact details provided for account administration</li>
                            <li>Log and usage data related to API or platform access</li>
                        </ul>
                        <p className="mt-6 italic text-sm text-slate-500">
                            Datazag does not intentionally process special category (sensitive) personal data.
                        </p>
                    </LegalSection>

                    <LegalSection title="Nature and purpose of processing">
                        <p>
                            Personal data is processed solely for the purpose of providing domain intelligence, phishing detection, enrichment, analytics, and related services as described in the applicable service documentation or agreement.
                        </p>
                    </LegalSection>

                    <LegalSection title="Security measures">
                        <p className="mb-8">
                            Datazag implements appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction.
                        </p>
                        <div className="space-y-4">
                            <DataDetail title="Technical safeguards" description="Encryption in transit, access controls, and logical separation of environments." />
                            <DataDetail title="Organisational measures" description="Restricted access on a least-privilege basis and internal security practices appropriate to the nature of the data processed." />
                            <DataDetail title="Ongoing improvement" description="Security controls are reviewed and improved as the platform evolves." />
                        </div>
                    </LegalSection>

                    <LegalSection title="Use of sub-processors">
                        <p>
                            Datazag may engage sub-processors to support service delivery (for example, cloud infrastructure providers). Datazag remains responsible for the performance of its sub-processors in accordance with this DPA.
                        </p>
                        <p className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-900 flex items-center justify-between">
                            <span>A current list of sub-processors is available upon request.</span>
                            <a href="mailto:legal@datazag.com" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Legal →</a>
                        </p>
                    </LegalSection>

                    <LegalSection title="Assistance with data subject requests">
                        <p>
                            Datazag will provide reasonable assistance to customers in fulfilling requests from data subjects exercising their rights under applicable data protection laws, to the extent required and technically feasible.
                        </p>
                    </LegalSection>

                    <LegalSection title="Personal data breaches">
                        <p>
                            Datazag will notify the customer without undue delay after becoming aware of a personal data breach affecting personal data processed on the customer’s behalf, and will provide reasonable information to assist the customer in meeting regulatory obligations.
                        </p>
                    </LegalSection>

                    <LegalSection title="Retention and deletion">
                        <p>
                            Upon termination of the services, Datazag will, at the customer’s request, delete or return personal data in accordance with applicable law and contractual obligations, unless retention is required by law.
                        </p>
                    </LegalSection>

                    <LegalSection title="International data transfers">
                        <p>
                            Where personal data is transferred internationally, Datazag ensures appropriate safeguards are in place in accordance with applicable data protection laws.
                        </p>
                    </LegalSection>

                    <LegalSection title="Governing terms">
                        <p>
                            This DPA is subject to the governing law and dispute resolution provisions set out in the applicable service agreement between Datazag and the customer.
                        </p>
                    </LegalSection>

                    <LegalSection title="Availability" border={false}>
                        <div className="bg-blue-600 p-10 rounded-[2rem] text-white shadow-xl shadow-blue-600/10">
                            <h3 className="text-2xl font-bold mb-4">Transparency & Execution</h3>
                            <p className="text-blue-100 mb-8 leading-relaxed font-medium">
                                This DPA is provided for transparency. Formal execution may occur as part of customer onboarding or upon request.
                            </p>
                            <a
                                href="mailto:legal@datazag.com"
                                className="inline-flex h-12 items-center px-6 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors"
                            >
                                Request Formal Execution
                            </a>
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
        <section className={cn("space-y-6", border && "pb-16 border-b border-slate-100")}>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
            <div className="text-slate-600 leading-relaxed font-medium">
                {children}
            </div>
        </section>
    );
}

function DataPoint({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
    );
}

function DataDetail({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1 h-5 w-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            </div>
            <div>
                <p className="font-bold text-slate-900">{title}</p>
                <p className="text-sm text-slate-500 mt-0.5">{description}</p>
            </div>
        </div>
    );
}
