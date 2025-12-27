import { sanityFetch } from "@/sanity/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const site = await sanityFetch<any>(siteSettingsQuery, {}, 300);

    return (
        <>
            <Header
                title={site?.title}
                logo={site?.logo}
                navLinks={site?.navLinks}
                primaryCta={site?.primaryCta}
                secondaryCta={site?.secondaryCta}
                portalCta={site?.portalCta}
            />
            <main>{children}</main>
            <Footer
                title={site?.title}
                footerLinks={site?.footerLinks ?? []}
                productLinks={site?.productLinks ?? []}
                trustLinks={site?.trustLinks ?? []}
                companyLinks={site?.companyLinks ?? []}
                footerAbout={site?.footerAbout}
                securityEmail={site?.securityEmail}
                copyright={site?.copyright}
                social={site?.social}
            />
        </>
    );
}
