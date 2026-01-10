import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { normalizeHref } from "@/lib/links";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

type NavLink = { label: string; href: string; children?: NavLink[] };
type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

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
    const defaultNavLinks: NavLink[] = [
        { label: "Home", href: "/" },
        { label: "Domain Intelligence", href: "/domain-intelligence" },
        { label: "Documentation", href: "/docs" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
    ];

    const navLinks: NavLink[] = (passedNavLinks && passedNavLinks.length > 0) ? passedNavLinks : defaultNavLinks;

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
                        const hasChildren = link.children && link.children.length > 0;
                        const l = link.label === "About"
                            ? { ...link, label: "Domain Intelligence", href: "/domain-intelligence" }
                            : link;

                        const href = normalizeHref(l.href);
                        if (!href && !hasChildren) return null;

                        if (hasChildren) {
                            return (
                                <DropdownMenu.Root key={`${href || l.label}-${i}`}>
                                    <DropdownMenu.Trigger className="group flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-blue-600 outline-none">
                                        {l.label}
                                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                    </DropdownMenu.Trigger>

                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                            className="z-[60] min-w-[160px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in duration-200"
                                            align="start"
                                            sideOffset={8}
                                        >
                                            {l.children?.map((child, ci) => (
                                                <DropdownMenu.Item key={ci} asChild>
                                                    <Link
                                                        href={normalizeHref(child.href) || "#"}
                                                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 outline-none transition hover:bg-slate-50 hover:text-blue-600"
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
                        <CurrencySelector className="h-9 w-[110px] text-xs" />
                        <div className="h-4 w-px bg-slate-200 mx-1" />
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
                    <div className="flex items-center gap-2 md:hidden">
                        <CurrencySelector className="h-9 w-[100px] text-xs" />
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
