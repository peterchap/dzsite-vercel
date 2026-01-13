type NavLink = { label: string; href: string };
import { normalizeHref } from "@/lib/links";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { BrandingLogo } from "@/components/site/BrandingLogo";
import Link from "next/link";

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

    return (
        <footer className="border-t border-slate-100 bg-white pt-24 pb-12">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Link href="/" className="group inline-flex items-center">
                                    <BrandingLogo className="text-2xl group-hover:scale-[1.02]" />
                                </Link>
                                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500 max-w-xs">
                                    {footerAbout ?? "Predictive domain intelligence and security-focused data products for the modern enterprise."}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {normalizeHref(social?.linkedin) && (
                                    <a href={normalizeHref(social?.linkedin)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {normalizeHref(social?.x) && (
                                    <a href={normalizeHref(social?.x)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                                {normalizeHref(social?.github) && (
                                    <a href={normalizeHref(social?.github)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
                        <FooterColumn title="Product" links={productLinks} />
                        <FooterColumn title="Trust & Legal" links={trustLinks} />
                        {/* Fallback to legacy footerLinks if companyLinks is empty */}
                        <FooterColumn
                            title="Company"
                            links={companyLinks.length > 0 ? companyLinks : footerLinks}
                        />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-24 border-t border-slate-100 pt-12">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {displayCopyright}
                        </div>

                        <div className="flex items-center gap-8">
                            {securityEmail && (
                                <a
                                    href={`mailto:${securityEmail}`}
                                    className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    REPORT VULNERABILITY
                                </a>
                            )}

                            {/* Global fallback: show legacy links if the new link groups are completely empty */}
                            {footerLinks.length > 0 && productLinks.length === 0 && trustLinks.length === 0 && companyLinks.length === 0 && (
                                <div className="flex items-center gap-4">
                                    {footerLinks.filter(l => l.href && l.label).map((l, idx) => (
                                        <a key={`${l.href}-${idx}`} href={normalizeHref(l.href)} className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-tight">
                                            {l.label}
                                        </a>
                                    ))}
                                </div>
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
                            className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
