import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

export default async function ReportsLayout({ children }: { children: React.ReactNode }) {
    const site = await sanityFetch<any>(siteSettingsQuery, {}, 300);

    return (
        <>
            <SiteHeader primaryCta={site?.primaryCta} secondaryCta={site?.secondaryCta} portalCta={site?.portalCta} />
            {children}
            <SiteFooter />
        </>
    );
}
