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

export function buildMetadata({
    site,
    page,
    pathname,
}: {
    site: SiteSettings;
    page: Page;
    pathname: string;
}): Metadata {
    const siteTitle = site?.title ?? "Datazag";
    const defaultSeo = site?.seo ?? {};
    const pageSeo = page?.seo ?? {};

    const title = pick(pageSeo.metaTitle, pageSeo.ogTitle, page.title, defaultSeo.metaTitle, siteTitle);
    const description = pick(pageSeo.metaDescription, pageSeo.ogDescription, defaultSeo.metaDescription, site?.tagline);

    const ogTitle = pick(pageSeo.ogTitle, pageSeo.metaTitle, page.title, defaultSeo.ogTitle, title);
    const ogDescription = pick(pageSeo.ogDescription, pageSeo.metaDescription, defaultSeo.ogDescription, description);

    const ogImageSource = pageSeo.ogImage ?? defaultSeo.ogImage;
    const ogImageUrl = ogImageSource
        ? urlForImage(ogImageSource).width(1200).height(630).fit("crop").url()
        : undefined;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
    const canonical = new URL(pathname, siteUrl).toString();

    return {
        title,
        description,
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
