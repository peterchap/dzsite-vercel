/**
 * Footer link sets: the single source for the footer AND the CMS `siteSettings`
 * link arrays (scripts/syncSiteSettingsLinks.ts writes these into Sanity).
 *
 * Until 2026-10-05 these lived only in Footer.tsx. The CMS still held older lists
 * (pageRef links to never-published page docs, a /domain-intelligence link), which
 * the footer silently ignored and the CMS publishing gate flagged. Edit here, then
 * run the sync script, so the two cannot drift again.
 *
 * Mirrors the header (2026-09-28 nav brief): Solutions and Data & Intelligence are
 * the two axes; Company carries the rest. See components/site/Header.tsx.
 */
export type FooterLink = { label: string; href: string };

export const FOOTER_SOLUTION_LINKS: FooterLink[] = [
    { label: "Email & Martech", href: "/esp-partners" },
    { label: "Insurers", href: "/cyber-risk-underwriting" },
    { label: "MSSPs", href: "/mssp-partners" },
];

export const FOOTER_PRODUCT_LINKS: FooterLink[] = [
    { label: "All datasets", href: "/datasets" },
    { label: "Reports", href: "/reports" },
    { label: "Threat Alerts", href: "/alerts" },
    { label: "Brand Protection", href: "/brand-protection" },
    { label: "Observatory", href: "/observatory" },
    { label: "Pricing", href: "/pricing" },
];

export const FOOTER_TRUST_LINKS: FooterLink[] = [
    { label: "Trust", href: "/trust" },
    { label: "Responsible Disclosure", href: "/trust/responsible-disclosure" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "DPA", href: "/legal/dpa" },
];

export const FOOTER_COMPANY_LINKS: FooterLink[] = [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Contact", href: "/contact" },
];
