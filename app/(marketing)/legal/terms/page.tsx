import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Terms of Service | Datazag",
    description: "These Terms govern access to and use of Datazag’s products, services, datasets, and APIs.",
};

export default function TermsOfServicePage() {
    return (
        <PageShell>
            {/* Hero Section */}
            <div className="border-b border-slate-100 bg-slate-50/30">
                <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Legal</p>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                            Terms of Service
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
                            These Terms govern access to and use of Datazag’s products, services, datasets, and APIs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
                <div className="mx-auto max-w-3xl space-y-12">
                    <LegalSection title="1. Introduction">
                        <p>
                            These Terms of Service (“Terms”) govern your access to and use of the services provided by Datazag (“Datazag”, “we”, “our”, or “us”), including our websites, APIs, datasets, real-time data streams, and related services (collectively, the “Services”).
                        </p>
                        <p className="mt-4">
                            By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, you may not access or use the Services.
                        </p>
                        <p className="mt-4">
                            If you are using the Services on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.
                        </p>
                    </LegalSection>

                    <LegalSection title="2. Description of the Services">
                        <p>
                            Datazag provides predictive domain intelligence and security-focused data products, including but not limited to:
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2 text-slate-600">
                            <li>Real-time phishing and brand impersonation detection streams</li>
                            <li>Domain intelligence datasets enriched with DNS, hosting, mailbox, firmographic, and technographic signals</li>
                            <li>APIs and data access mechanisms for security, fraud, and analytics use cases</li>
                        </ul>
                        <p className="mt-6">
                            The Services are intended to support security, risk, analytics, and trust-and-safety workflows. They do not replace professional judgement, incident response processes, or legal decision-making.
                        </p>
                    </LegalSection>

                    <LegalSection title="3. Acceptable Use">
                        <p>
                            You agree to use the Services only for lawful purposes and in accordance with these Terms.
                        </p>
                        <p className="mt-4 font-semibold text-slate-900">You must not:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>Use the Services to engage in illegal, abusive, or malicious activity</li>
                            <li>Attempt to reverse engineer, scrape, or misuse the Services beyond agreed access methods</li>
                            <li>Use the Services to violate the rights of others, including privacy or data protection rights</li>
                            <li>Circumvent rate limits, access controls, or security measures</li>
                        </ul>
                        <p className="mt-6">
                            We reserve the right to suspend or terminate access if we reasonably believe the Services are being misused.
                        </p>
                    </LegalSection>

                    <LegalSection title="4. Data Nature and Limitations">
                        <p>
                            The Services provide analytical and probabilistic intelligence derived from large-scale internet data sources.
                        </p>
                        <p className="mt-4 font-semibold text-slate-900">You acknowledge that:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>Datazag does not guarantee the accuracy, completeness, or timeliness of all data</li>
                            <li>Outputs may include false positives or false negatives</li>
                            <li>Risk scores, classifications, and verdicts are indicators, not facts</li>
                        </ul>
                        <p className="mt-6">
                            You are responsible for validating outputs before taking operational, legal, or enforcement action.
                        </p>
                    </LegalSection>

                    <LegalSection title="5. Beta and Early Access Services">
                        <p>
                            Some Services may be offered as beta, pilot, or early-access offerings.
                        </p>
                        <div className="mt-6 p-6 rounded-2xl bg-amber-50 border border-amber-100">
                            <h4 className="font-bold text-amber-900 mb-3">Beta Services Notice:</h4>
                            <ul className="list-disc pl-5 space-y-2 text-amber-800 text-sm">
                                <li>May be incomplete or subject to change</li>
                                <li>May experience interruptions or inaccuracies</li>
                                <li>Are provided for evaluation and feedback purposes</li>
                            </ul>
                            <p className="mt-4 text-xs font-bold text-amber-900">
                                Unless otherwise agreed in writing, Beta Services are provided “as is” and without warranties.
                            </p>
                        </div>
                    </LegalSection>

                    <LegalSection title="6. Intellectual Property">
                        <p>
                            All intellectual property rights in the Services, including software, data compilation, methodologies, and documentation, are owned by Datazag or its licensors.
                        </p>
                        <p className="mt-4">
                            You are granted a limited, non-exclusive, non-transferable right to access and use the Services in accordance with these Terms and any applicable commercial agreement.
                        </p>
                        <p className="mt-4 font-bold text-slate-900 italic">
                            You may not resell, sublicense, or redistribute the Services or data outputs except as expressly permitted.
                        </p>
                    </LegalSection>

                    <LegalSection title="7. Confidentiality">
                        <p>
                            Each party may receive confidential information from the other in connection with the Services.
                        </p>
                        <p className="mt-4">
                            Confidential information must not be disclosed to third parties except as required by law or with prior written consent.
                        </p>
                        <p className="mt-4">
                            This obligation does not apply to information that is publicly available or independently developed.
                        </p>
                    </LegalSection>

                    <LegalSection title="8. Privacy and Data Protection">
                        <p>
                            Datazag processes personal data in accordance with its Privacy Policy and applicable data protection laws.
                        </p>
                        <p className="mt-4">
                            Where Datazag acts as a data processor, processing will be governed by a Data Processing Agreement (“DPA”), available on request or incorporated into customer agreements.
                        </p>
                    </LegalSection>

                    <LegalSection title="9. Availability and Support">
                        <p>
                            We aim to provide reliable access to the Services but do not guarantee uninterrupted availability.
                        </p>
                        <p className="mt-4">
                            Maintenance, updates, or outages may occur. Support levels, service commitments, and response times may vary depending on your agreement with Datazag.
                        </p>
                    </LegalSection>

                    <LegalSection title="10. Disclaimer of Warranties">
                        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl font-mono text-sm uppercase tracking-tight leading-relaxed">
                            <p className="text-white font-bold mb-4">The Services are provided “as is” and “as available”.</p>
                            To the maximum extent permitted by law, Datazag disclaims all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        </div>
                    </LegalSection>

                    <LegalSection title="11. Limitation of Liability">
                        <p className="font-semibold text-slate-900">To the maximum extent permitted by law:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-4 text-slate-600">
                            <li>Datazag shall not be liable for indirect, incidental, consequential, or special damages</li>
                            <li>Datazag’s total liability arising from the Services shall not exceed the amounts paid by you to Datazag in the twelve months preceding the claim</li>
                        </ul>
                        <p className="mt-6 text-sm italic">
                            Nothing in these Terms excludes liability that cannot be excluded by law.
                        </p>
                    </LegalSection>

                    <LegalSection title="12. Termination">
                        <p>
                            You may stop using the Services at any time.
                        </p>
                        <p className="mt-4">
                            We may suspend or terminate access if you breach these Terms or if required to do so by law.
                        </p>
                        <p className="mt-4">
                            Upon termination, your right to access the Services will cease.
                        </p>
                    </LegalSection>

                    <LegalSection title="13. Changes to the Terms">
                        <p>
                            We may update these Terms from time to time. Updated Terms will be posted on our website with a revised effective date.
                        </p>
                        <p className="mt-4 font-bold text-slate-900">
                            Continued use of the Services after changes take effect constitutes acceptance of the updated Terms.
                        </p>
                    </LegalSection>

                    <LegalSection title="14. Governing Law">
                        <p>
                            These Terms are governed by the laws of [jurisdiction to be specified], without regard to conflict of law principles.
                        </p>
                    </LegalSection>

                    <LegalSection title="15. Contact" border={false}>
                        <p className="mb-6">If you have questions about these Terms, please contact:</p>
                        <div className="max-w-md">
                            <ContactCard title="Legal Dept" value="legal@datazag.com" href="mailto:legal@datazag.com" />
                        </div>
                    </LegalSection>
                </div>
            </div>
        </PageShell>
    );
}

function LegalSection({ title, children, border = true }: { title: string; children: React.ReactNode; border?: boolean }) {
    return (
        <section className={cn("space-y-6", border && "pb-10 border-b border-slate-100")}>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <div className="text-slate-600 leading-relaxed font-medium">
                {children}
            </div>
        </section>
    );
}

function ContactCard({ title, value, href }: { title: string; value: string; href: string }) {
    return (
        <a
            href={href}
            className="group p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-blue-100 transition-colors block"
        >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{value}</p>
        </a>
    );
}
