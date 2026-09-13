import type { Metadata } from "next";
import { urlForImage } from "./image";

type Seo = {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: any;
};

type SiteSettings = { title?: string; tagline?: string; seo?: Seo };
type Page = { title?: string; seo?: Seo };

const pick = (...vals: Array<string | undefined | null>) =>
    vals.find((v) => typeof v === "string" && v.trim().length > 0) || undefined;

/**
 * Fallback description. Standing acceptance criterion 4 is that every published
 * page carries a title AND a meta description; before this, a CMS page with no
 * seo.metaDescription and no site tagline shipped with none at all (/enterprise
 * and /cyber-risk-underwriting both did).
 */
const DEFAULT_DESCRIPTION =
    "Infrastructure Intelligence for external domain, DNS, certificate, hosting, provider and platform risk.";

export function buildMetadata({
    site,
    page,
    pathname,
    robots,
}: {
    site: SiteSettings;
    page: Page;
    pathname: string;
    robots?: Metadata["robots"];
}): Metadata {
    const siteTitle = site?.title ?? "Datazag";
    const defaultSeo = site?.seo ?? {};
    const pageSeo = page?.seo ?? {};

    // A bare page title ("Enterprise") is not a <title>. Suffix the site name the
    // way the hand-written routes already do ("Blog — Datazag"), unless the editor
    // has authored a full metaTitle.
    const authoredTitle = pick(pageSeo.metaTitle, pageSeo.ogTitle, defaultSeo.metaTitle);
    const title =
        authoredTitle ??
        (page.title ? `${page.title} — ${siteTitle}` : siteTitle);
    const description = pick(
        pageSeo.metaDescription,
        pageSeo.ogDescription,
        defaultSeo.metaDescription,
        site?.tagline,
        DEFAULT_DESCRIPTION,
    );

    const ogTitle = pick(pageSeo.ogTitle, pageSeo.metaTitle, page.title, defaultSeo.ogTitle, title);
    const ogDescription = pick(pageSeo.ogDescription, pageSeo.metaDescription, defaultSeo.ogDescription, description);

    const ogImageSource = pageSeo.ogImage ?? defaultSeo.ogImage;
    const ogImageUrl = ogImageSource
        ? urlForImage(ogImageSource).width(1200).height(630).fit("crop").url()
        : undefined;

    // NEVER fall back to a developer host: an unset NEXT_PUBLIC_SITE_URL in the
    // production build published a dev-origin canonical on every CMS-driven
    // page, telling search engines the canonical copy lived on a laptop.
    // www.datazag.com is the canonical apex (see app/layout.tsx).
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";
    const canonical = new URL(pathname, siteUrl).toString();

    return {
        title,
        description,
        ...(robots ? { robots } : {}),
        alternates: { canonical },
        openGraph: {
            type: "website",
            url: canonical,
            title: ogTitle,
            description: ogDescription,
            siteName: siteTitle,
            images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
        },
        twitter: {
            card: ogImageUrl ? "summary_large_image" : "summary",
            title: ogTitle,
            description: ogDescription,
            images: ogImageUrl ? [ogImageUrl] : undefined,
        },
    };
}
