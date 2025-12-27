import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Privacy Policy | Datazag",
    description: "This Privacy Policy explains how Datazag collects, uses, and protects personal data when you interact with our website, platform, and services.",
};

export default function PrivacyPolicyPage() {
    return (
        <PageShell>
            {/* Hero Section */}
            <div className="border-b border-slate-100 bg-slate-50/30">
                <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Legal</p>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
                            This Privacy Policy explains how Datazag collects, uses, and protects personal data when you interact with our website, platform, and services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
                <div className="mx-auto max-w-3xl space-y-12">
                    <LegalSection title="1. Introduction">
                        <p>
                            Datazag (“we”, “us”, “our”) is committed to protecting your privacy and handling personal data in a transparent and secure manner.
                        </p>
                        <p className="mt-4 font-semibold text-slate-900">This Privacy Policy applies to:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>Visitors to our website</li>
                            <li>Users of our customer portal</li>
                            <li>Customers and partners using our APIs, datasets, and services</li>
                            <li>Individuals who contact us or interact with us in a business context</li>
                        </ul>
                        <p className="mt-6">
                            This policy does not apply to personal data processed by our customers through their own use of our services, where we act as a data processor.
                        </p>
                    </LegalSection>

                    <LegalSection title="2. Who we are">
                        <p>
                            Datazag provides predictive domain intelligence to help security teams detect phishing, brand impersonation, and infrastructure abuse.
                        </p>
                        <p className="mt-4 font-semibold text-slate-900">For the purposes of applicable data protection laws, Datazag acts as:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>a data controller for personal data collected through our website and business operations</li>
                            <li>a data processor where we process personal data on behalf of customers under a Data Processing Agreement (DPA)</li>
                        </ul>
                    </LegalSection>

                    <LegalSection title="3. Personal data we collect">
                        <div className="space-y-6">
                            <DataPoint
                                title="Contact information"
                                description="Name, business email address, company name, and role when you contact us, request a demo, or sign up for updates."
                            />
                            <DataPoint
                                title="Account and portal data"
                                description="Information required to create and manage user accounts, including authentication details and access logs."
                            />
                            <DataPoint
                                title="Usage and technical data"
                                description="IP address, device information, browser type, and usage metadata related to access of our website or services."
                            />
                            <DataPoint
                                title="Communications"
                                description="Information you provide when you email us, submit forms, or communicate with us for support or commercial discussions."
                            />
                            <p className="pt-4 text-sm italic text-slate-500 border-t border-slate-50">
                                We do not intentionally collect sensitive personal data.
                            </p>
                        </div>
                    </LegalSection>

                    <LegalSection title="4. How we use personal data">
                        <p className="mb-4">We use personal data to:</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>Provide and operate our website and services</li>
                            <li>Respond to enquiries and demo requests</li>
                            <li>Manage customer relationships and accounts</li>
                            <li>Improve our products, services, and security</li>
                            <li>Monitor and protect our infrastructure from abuse</li>
                            <li>Comply with legal and regulatory obligations</li>
                        </ul>
                        <p className="mt-6 font-bold text-slate-900">We do not sell personal data.</p>
                    </LegalSection>

                    <LegalSection title="5. Legal bases for processing">
                        <div className="space-y-6">
                            <BasisPoint title="Legitimate interests" text="Operating, securing, and improving our services, and communicating with business contacts." />
                            <BasisPoint title="Contractual necessity" text="Providing services under a contract or pre-contractual request." />
                            <BasisPoint title="Consent" text="Where you have explicitly provided consent, such as for certain communications." />
                            <BasisPoint title="Legal obligation" text="Compliance with applicable laws and regulations." />
                        </div>
                    </LegalSection>

                    <LegalSection title="6. How we share personal data">
                        <p>We may share personal data with:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>Cloud infrastructure and service providers that support our operations</li>
                            <li>Professional advisors (legal, accounting, compliance)</li>
                            <li>Law enforcement or regulators where required by law</li>
                        </ul>
                        <p className="mt-6">
                            All service providers are required to protect personal data and process it only for specified purposes.
                        </p>
                        <p className="mt-4 font-bold text-slate-900 italic">
                            We do not share personal data for advertising or data brokerage purposes.
                        </p>
                    </LegalSection>

                    <LegalSection title="7. International data transfers">
                        <p>
                            Datazag operates globally and may process personal data in countries outside your jurisdiction.
                        </p>
                        <p className="mt-4">
                            Where required, we use appropriate safeguards such as contractual protections to ensure personal data remains protected in accordance with applicable data protection laws.
                        </p>
                    </LegalSection>

                    <LegalSection title="8. Data retention">
                        <p>
                            We retain personal data only for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.
                        </p>
                        <p className="mt-4 font-semibold text-slate-900">Retention periods depend on:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>the nature of the data</li>
                            <li>legal or contractual requirements</li>
                            <li>operational and security considerations</li>
                        </ul>
                    </LegalSection>

                    <LegalSection title="9. Data security">
                        <p>
                            We implement appropriate technical and organisational measures designed to protect personal data, including:
                        </p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>access controls and least-privilege principles</li>
                            <li>encryption in transit and at rest where appropriate</li>
                            <li>monitoring and logging of system access</li>
                            <li>separation of production and non-production environments</li>
                        </ul>
                        <p className="mt-6 text-sm text-slate-500 italic">
                            No system is completely secure, but we continuously improve our security practices.
                        </p>
                    </LegalSection>

                    <LegalSection title="10. Your rights">
                        <p>
                            Depending on your location, you may have rights under applicable data protection laws, including:
                        </p>
                        <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>the right to access your personal data</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>the right to correct inaccurate data</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>the right to request deletion of data</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>the right to object to or restrict processing</span>
                            </li>
                            <li className="flex items-start gap-2 text-blue-600 font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>the right to data portability</span>
                            </li>
                        </ul>
                        <p className="mt-6">
                            Requests can be made using the contact details below.
                        </p>
                    </LegalSection>

                    <LegalSection title="11. Cookies and analytics">
                        <p>Our website may use cookies and similar technologies to:</p>
                        <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600">
                            <li>operate core site functionality</li>
                            <li>understand usage and improve performance</li>
                        </ul>
                        <p className="mt-6">You can control cookies through your browser settings.</p>
                    </LegalSection>

                    <LegalSection title="12. Changes to this policy">
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                        </p>
                        <p className="mt-4 font-bold text-slate-900">The latest version will always be available on our website.</p>
                    </LegalSection>

                    <LegalSection title="13. Contact us" border={false}>
                        <p className="mb-6">If you have questions about this Privacy Policy or our data practices, you can contact us at:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ContactCard title="Email" value="privacy@datazag.com" href="mailto:privacy@datazag.com" />
                            <ContactCard title="Security Issues" value="security@datazag.com" href="mailto:security@datazag.com" />
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

function DataPoint({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-xl border border-slate-50 bg-slate-50/50 p-4">
            <h4 className="font-bold text-slate-900">{title}</h4>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
}

function BasisPoint({ title, text }: { title: string; text: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="font-bold text-slate-900 shrink-0 min-w-[160px]">{title}</span>
            <span className="text-slate-600 leading-relaxed">{text}</span>
        </div>
    );
}

function ContactCard({ title, value, href }: { title: string; value: string; href: string }) {
    return (
        <a
            href={href}
            className="group p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-blue-100 transition-colors"
        >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{value}</p>
        </a>
    );
}
