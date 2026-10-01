import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { normalizeHref } from "@/lib/links";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { BrandingLogo } from "@/components/site/BrandingLogo";
import { DATASET_CATALOG, isAvailable } from "@/lib/datasets/catalog";

type NavLink = { label: string; href: string; children?: NavLink[] };
type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

/*
 * NAV (2026-09-28, nav brief). Two axes: who you are (Solutions) and what we
 * offer (Data & Intelligence), plus the standing items.
 *
 * RULES — keep them when editing:
 *  - List only what is ready. Datasets appear here only when a route is live
 *    (isAvailable in lib/datasets/catalog.ts), so a dataset joins the nav the
 *    moment it ships and never before. No items for unready work (provider
 *    concentration, the .ph case study, held detection claims).
 *  - One home per concept. Products and datasets are ONE dropdown — they are
 *    the same intelligence, packaged. /datasets is the one overview
 *    (/infrastructure-intelligence 301s there). M&A diligence lives inside the
 *    Insurers page (/cyber-risk-underwriting#diligence), not as a nav item.
 *  - Labels match the pages: "Insurers" is /cyber-risk-underwriting — it IS
 *    the insurer page, so it is linked, not duplicated.
 */
const readyDatasets: NavLink[] = [...DATASET_CATALOG]
    .filter(isAvailable)
    .sort((a, b) => a.order - b.order)
    .map((e) => ({ label: e.name, href: `/datasets/${e.slug}` }));

const coreNavLinks: NavLink[] = [
    {
        label: "Solutions",
        href: "#",
        children: [
            { label: "Email & Martech", href: "/esp-partners" },
            { label: "Insurers", href: "/cyber-risk-underwriting" },
            { label: "MSSPs", href: "/mssp-partners" },
        ],
    },
    {
        label: "Data & Intelligence",
        href: "#",
        children: [
            { label: "All datasets", href: "/datasets" },
            ...readyDatasets,
            { label: "Reports", href: "/reports" },
            { label: "Threat Alerts", href: "/alerts" },
            { label: "Brand Protection", href: "/brand-protection" },
        ],
    },
    { label: "Observatory", href: "/observatory" },
    { label: "Pricing", href: "/pricing" },
    {
        label: "Resources",
        href: "#",
        children: [
            { label: "How It Works", href: "/how-it-works" },
            { label: "Research", href: "/intelligence" },
            { label: "Guide: Classify machine clicks", href: "/resources/machine-clicks" },
            { label: "Sample Reports", href: "/reports/sample" },
            { label: "Blog", href: "/blog" },
            { label: "Documentation", href: "/docs" },
        ],
    },
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

/**
 * A CMS nav is used only once it follows the current structure (it carries a
 * "Data & Intelligence" group and a "Solutions" group, and none of the retired
 * labels). Every CMS nav in Sanity today predates it, so the code nav renders.
 */
function isOldDefaultNav(navLinks?: NavLink[]) {
    if (!navLinks?.length) return true;

    const labels = flattenLabels(navLinks);
    return (
        labels.includes("domain intelligence") ||
        labels.includes("infrastructure intelligence") ||
        !labels.includes("data & intelligence") ||
        !labels.includes("solutions")
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

    // WU21 navbar: no plate — background IS the page background; the hairline
    // is the only separation. Heights 66px desktop / 56px mobile.
    // The inline nav shows from xl (1280px): six groups plus the currency
    // selector and portal button overflow anything narrower. Below that, the
    // menu button carries the same links (2026-09-28).
    return (
        <header className="relative z-50 w-full border-b border-[color:var(--dz-nav-hairline)] bg-[#030619]">
            <div className="mx-auto flex h-[56px] max-w-7xl items-center justify-between px-6 md:h-[66px]">
                <Link href="/" className="group flex items-center">
                    <BrandingLogo className="text-4xl md:text-[2.625rem] group-hover:scale-[1.02]" />
                </Link>

                <nav className="hidden items-center gap-8 xl:flex">
                    {navLinks.map((link, i) => {
                        const hasChildren = link.children && link.children.length > 0;
                        const href = normalizeHref(link.href);

                        if (!href && !hasChildren) return null;

                        if (hasChildren) {
                            return (
                                <DropdownMenu.Root key={`${href || link.label}-${i}`}>
                                    <DropdownMenu.Trigger className="group flex items-center gap-1 whitespace-nowrap text-sm font-medium text-[color:var(--ink-4)] outline-none transition hover:text-white">
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
                                                        className="block rounded-lg px-3 py-2 text-sm text-slate-300 outline-none transition hover:bg-white/[0.04] hover:text-white"
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
                                className="group relative whitespace-nowrap text-sm font-medium text-[color:var(--ink-4)] transition hover:text-white"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[color:var(--cyan)] transition-all group-hover:w-full" />
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-3 xl:flex">
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
                    <div className="flex items-center gap-2 xl:hidden">
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
                                                        <DropdownMenu.Item key={`${link.label}:${child.label}`} asChild>
                                                            <Link
                                                                href={normalizeHref(child.href) || "#"}
                                                                className="block rounded-lg px-3 py-2 text-sm text-slate-300 outline-none transition hover:bg-white/[0.04] hover:text-white"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </DropdownMenu.Item>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        return (
                                            <DropdownMenu.Item key={`${link.label}:${link.href}`} asChild>
                                                <Link
                                                    href={href || "#"}
                                                    className="block rounded-lg px-3 py-2 text-sm text-slate-300 outline-none transition hover:bg-white/[0.04] hover:text-white"
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