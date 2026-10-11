/**
 * Footer link sets for scripts/syncSiteSettingsLinks.ts, which mirrors them
 * into the CMS `siteSettings` arrays.
 *
 * Since PU3 (2026-10) the footer itself renders from @datazag/site-chrome's
 * nav.ts, shared with portal.datazag.com, and no longer reads these CMS
 * arrays. This file only re-exports the package's columns under the names the
 * sync script expects. Edit links in the package, not here.
 */
import { FOOTER_COLUMNS, LEGAL_LINKS, type NavLink } from "@datazag/site-chrome/nav";

export type FooterLink = NavLink;

function column(title: string): FooterLink[] {
    const found = FOOTER_COLUMNS.find((c) => c.title === title);
    if (!found) throw new Error(`site-nav: @datazag/site-chrome has no "${title}" footer column`);
    return found.links;
}

export const FOOTER_SOLUTION_LINKS: FooterLink[] = column("Solutions");
export const FOOTER_PRODUCT_LINKS: FooterLink[] = column("Data & Intelligence");
export const FOOTER_TRUST_LINKS: FooterLink[] = LEGAL_LINKS;
export const FOOTER_COMPANY_LINKS: FooterLink[] = column("Company");
