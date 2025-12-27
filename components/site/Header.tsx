import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { normalizeHref } from "@/lib/links";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type NavLink = { label: string; href: string };
type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

export function Header({
    title,
    logo,
    navLinks: passedNavLinks,
    primaryCta,
    secondaryCta,
    portalCta,
}: {
    title?: string;
    logo?: any;
    navLinks?: NavLink[];
    primaryCta?: Cta;
    secondaryCta?: Cta;
    portalCta?: Cta;
}) {
    const defaultNavLinks = [
        { label: "Home", href: "/" },
        { label: "Domain Intelligence", href: "/domain-intelligence" },
        { label: "Documentation", href: "/docs" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
    ];

    const navLinks = (passedNavLinks && passedNavLinks.length > 0) ? passedNavLinks : defaultNavLinks;
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-xl transition hover:bg-white/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="group flex items-center">
                    <span className="text-3xl font-bold leading-tight tracking-tight bg-gradient-to-r from-[#00509d] to-[#0088ed] bg-clip-text text-transparent transition-transform duration-200 group-hover:scale-[1.02] py-1">
                        Datazag
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link, i) => {
                        // Force transformation of About to Domain Intelligence if it comes from Sanity
                        const l = link.label === "About"
                            ? { label: "Domain Intelligence", href: "/domain-intelligence" }
                            : link;

                        const href = normalizeHref(l.href);
                        if (!href) return null;
                        return (
                            <Link
                                key={`${href}-${i}`}
                                href={href}
                                className="relative text-sm font-medium text-slate-600 transition hover:text-blue-600 group"
                            >
                                {l.label}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-3 md:flex">
                        {secondaryCta ? (
                            <ButtonLink href={secondaryCta.href} variant={secondaryCta.variant ?? "secondary"}>
                                {secondaryCta.label}
                            </ButtonLink>
                        ) : null}
                        {primaryCta ? (
                            <ButtonLink href={primaryCta.href} variant={primaryCta.variant ?? "primary"}>
                                {primaryCta.label}
                            </ButtonLink>
                        ) : null}
                        {portalCta ? (
                            <div className="ml-2 pl-4 border-l border-slate-200">
                                <ButtonLink href={portalCta.href} variant={portalCta.variant ?? "primary"}>
                                    {portalCta.label}
                                </ButtonLink>
                            </div>
                        ) : null}
                    </div>
                    {/* Mobile Menu Button (Subtle Placeholder) */}
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 md:hidden">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
