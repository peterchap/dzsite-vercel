import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { normalizeHref } from "@/lib/links";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { BrandingLogo } from "@/components/site/BrandingLogo";

type NavLink = { label: string; href: string; children?: NavLink[] };
type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

const coreNavLinks: NavLink[] = [
    {
        label: "Products",
        href: "#",
        children: [
            { label: "How It Works", href: "/how-it-works" },
            { label: "Reports", href: "/reports" },
            { label: "Threat Alerts", href: "/alerts" },
            { label: "Brand Protection", href: "/brand-protection" },
            { label: "Infrastructure Intelligence", href: "/infrastructure-intelligence" },
        ],
    },
    {
        label: "Partners",
        href: "#",
        children: [
            { label: "MSSP Partners", href: "/mssp-partners" },
            { label: "ESP Partners", href: "/esp-partners" },
        ],
    },
    {
        label: "Resources",
        href: "#",
        children: [
            { label: "Sample Reports", href: "/reports/sample" },
            { label: "Blog", href: "/blog" },
            { label: "Documentation", href: "/docs" },
        ],
    },
    { label: "Pricing", href: "/pricing" },
    {
        label: "Company",
        href: "#",
        children: [
            { label: "About", href: "/about" },
            { label: "Trust", href: "/trust" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

function flattenLabels(navLinks?: NavLink[]): string {
    if (!navLinks?.length) return "";
    return navLinks.flatMap((link) => [link.label, ...(link.children?.map((child) => child.label) ?? [])]).join("|").toLowerCase();
}

function isOldDefaultNav(navLinks?: NavLink[]) {
    if (!navLinks?.length) return true;

    const labels = flattenLabels(navLinks);
    return (
        labels.includes("domain intelligence") ||
        labels.includes("documentation") && labels.includes("blog") && !labels.includes("brand protection") ||
        !labels.includes("infrastructure intelligence") ||
        !labels.includes("how it works")
    );
}

export function Header({
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
    const navLinks: NavLink[] = isOldDefaultNav(passedNavLinks) ? coreNavLinks : passedNavLinks ?? coreNavLinks;

    return (
        <header className="relative z-50 w-full border-b border-white/10 bg-[#030619]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="group flex items-center">
                    <BrandingLogo className="text-3xl group-hover:scale-[1.02]" />
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link, i) => {
                        const hasChildren = link.children && link.children.length > 0;
                        const href = normalizeHref(link.href);

                        if (!href && !hasChildren) return null;

                        if (hasChildren) {
                            return (
                                <DropdownMenu.Root key={`${href || link.label}-${i}`}>
                                    <DropdownMenu.Trigger className="group flex items-center gap-1 text-sm font-medium text-slate-300 outline-none transition hover:text-white">
                                        {link.label}
                                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                    </DropdownMenu.Trigger>

                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                            className="z-[60] min-w-[220px] rounded-xl border border-white/10 bg-[#030619] p-2 shadow-xl animate-in fade-in zoom-in duration-200"
                                            align="start"
                                            sideOffset={8}
                                        >
                                            {link.children?.map((child, ci) => (
                                                <DropdownMenu.Item key={ci} asChild>
                                                    <Link
                                                        href={normalizeHref(child.href) || "#"}
                                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 outline-none transition hover:bg-white/5 hover:text-white"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </DropdownMenu.Item>
                                            ))}
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                            );
                        }

                        return (
                            <Link
                                key={`${href}-${i}`}
                                href={href || "#"}
                                className="group relative text-sm font-medium text-slate-300 transition hover:text-white"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-3 md:flex">
                        <CurrencySelector className="h-9 w-[110px] text-xs" />
                        <div className="mx-1 h-4 w-px bg-white/20" />
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
                            <div className="ml-2 border-l border-white/20 pl-4">
                                <ButtonLink href={portalCta.href} variant={portalCta.variant ?? "primary"}>
                                    {portalCta.label}
                                </ButtonLink>
                            </div>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 md:hidden">
                        <CurrencySelector className="h-9 w-[100px] text-xs" />
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/10">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="z-[60] mr-4 min-w-[240px] rounded-xl border border-white/10 bg-[#030619] p-2 shadow-xl animate-in fade-in zoom-in duration-200"
                                    align="end"
                                    sideOffset={8}
                                >
                                    {navLinks.map((link) => {
                                        const href = normalizeHref(link.href);
                                        if (link.children?.length) {
                                            return (
                                                <div key={link.label} className="py-1">
                                                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">{link.label}</p>
                                                    {link.children.map((child) => (
                                                        <DropdownMenu.Item key={child.href} asChild>
                                                            <Link
                                                                href={normalizeHref(child.href) || "#"}
                                                                className="block rounded-lg px-3 py-2 text-sm text-slate-300 outline-none transition hover:bg-white/5 hover:text-white"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </DropdownMenu.Item>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        return (
                                            <DropdownMenu.Item key={link.href} asChild>
                                                <Link
                                                    href={href || "#"}
                                                    className="block rounded-lg px-3 py-2 text-sm text-slate-300 outline-none transition hover:bg-white/5 hover:text-white"
                                                >
                                                    {link.label}
                                                </Link>
                                            </DropdownMenu.Item>
                                        );
                                    })}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                </div>
            </div>
        </header>
    );
}