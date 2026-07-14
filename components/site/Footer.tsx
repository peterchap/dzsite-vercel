type NavLink = { label: string; href: string };
import { normalizeHref } from "@/lib/links";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { BrandingLogo } from "@/components/site/BrandingLogo";
import Link from "next/link";

const defaultProductLinks: NavLink[] = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Reports", href: "/reports" },
    { label: "Threat Alerts", href: "/alerts" },
    { label: "Brand Protection", href: "/brand-protection" },
    { label: "Infrastructure Intelligence", href: "/infrastructure-intelligence" },
    { label: "Pricing", href: "/pricing" },
];

const defaultTrustLinks: NavLink[] = [
    { label: "Trust", href: "/trust" },
    { label: "Responsible Disclosure", href: "/trust/responsible-disclosure" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "DPA", href: "/legal/dpa" },
];

const defaultCompanyLinks: NavLink[] = [
    { label: "About", href: "/about" },
    { label: "Intelligence", href: "/intelligence/one-signal-150-domains" },
    { label: "MSSP Partners", href: "/mssp-partners" },
    { label: "ESP Partners", href: "/esp-partners" },
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Contact", href: "/contact" },
];

function linkLabels(links: NavLink[] = []) {
    return links.map((link) => link.label).join("|").toLowerCase();
}

function shouldUseDefaultProductLinks(links: NavLink[] = []) {
    if (links.length === 0) return true;
    const labels = linkLabels(links);
    return labels.includes("domain intelligence") || !labels.includes("brand protection") || !labels.includes("infrastructure intelligence");
}

function shouldUseDefaultTrustLinks(links: NavLink[] = []) {
    if (links.length === 0) return true;
    const labels = linkLabels(links);
    return !labels.includes("privacy") || !labels.includes("terms") || !labels.includes("trust");
}

function shouldUseDefaultCompanyLinks(links: NavLink[] = [], fallbackLinks: NavLink[] = []) {
    if (links.length === 0 && fallbackLinks.length === 0) return true;
    const labels = linkLabels(links.length > 0 ? links : fallbackLinks);
    return !labels.includes("about") || !labels.includes("contact") || !labels.includes("blog") || !labels.includes("documentation");
}

export function Footer({
    title,
    footerLinks = [],
    productLinks = [],
    trustLinks = [],
    companyLinks = [],
    footerAbout,
    securityEmail,
    copyright,
    social,
}: {
    title?: string;
    footerLinks?: NavLink[];
    productLinks?: NavLink[];
    trustLinks?: NavLink[];
    companyLinks?: NavLink[];
    footerAbout?: string;
    securityEmail?: string;
    copyright?: string;
    social?: { linkedin?: string; x?: string; github?: string };
}) {
    const currentYear = new Date().getFullYear();
    const displayCopyright = copyright?.replace("{year}", currentYear.toString()) ?? `© ${currentYear} ${title ?? "Datazag"}. All rights reserved.`;
    const resolvedProductLinks = shouldUseDefaultProductLinks(productLinks) ? defaultProductLinks : productLinks;
    const resolvedTrustLinks = shouldUseDefaultTrustLinks(trustLinks) ? defaultTrustLinks : trustLinks;
    const resolvedCompanyLinks = shouldUseDefaultCompanyLinks(companyLinks, footerLinks) ? defaultCompanyLinks : companyLinks.length > 0 ? companyLinks : footerLinks;
    const resolvedFooterAbout = footerAbout && !footerAbout.toLowerCase().includes("predictive domain intelligence")
        ? footerAbout
        : "Infrastructure Intelligence for external domain, DNS, certificate, hosting, provider and platform risk.";

    return (
        <footer className="border-t border-white/10 bg-slate-950 pt-24 pb-12">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Link href="/" className="group inline-flex items-center">
                                    <BrandingLogo className="text-2xl group-hover:scale-[1.02]" />
                                </Link>
                                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400 max-w-xs">
                                    {resolvedFooterAbout}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {normalizeHref(social?.linkedin) && (
                                    <a href={normalizeHref(social?.linkedin)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {normalizeHref(social?.x) && (
                                    <a href={normalizeHref(social?.x)} className="text-slate-400 hover:text-white transition-colors">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                                {normalizeHref(social?.github) && (
                                    <a href={normalizeHref(social?.github)} className="text-slate-400 hover:text-white transition-colors">
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
                        <FooterColumn title="Product" links={resolvedProductLinks} />
                        <FooterColumn title="Trust & Legal" links={resolvedTrustLinks} />
                        <FooterColumn title="Company" links={resolvedCompanyLinks} />
                    </div>
                </div>

                <div className="mt-24 border-t border-white/10 pt-12">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {displayCopyright}
                        </div>

                        <div className="flex items-center gap-8">
                            {securityEmail && (
                                <a
                                    href={`mailto:${securityEmail}`}
                                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    REPORT VULNERABILITY
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
    if (links.length === 0) return null;
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{title}</h3>
            <ul className="flex flex-col gap-3">
                {links.filter(link => link.href && link.label).map((link, idx) => (
                    <li key={`${link.href}-${idx}`}>
                        <a
                            href={normalizeHref(link.href)}
                            className="text-sm font-bold text-slate-300 hover:text-blue-600 transition-colors"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}