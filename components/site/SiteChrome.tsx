import { Header, Footer } from "@datazag/site-chrome";
import { ButtonLink } from "@/components/ui/ButtonLink";

// The website's use of the shared header and footer (@datazag/site-chrome).
// Links, footer columns and the company line come from the package's nav.ts,
// shared with portal.datazag.com. Only the header's right-hand actions are
// the site's own: the CMS-managed CTAs. The currency selector is not here: it sits
// beside the prices on /pricing and /reports (components/ui/PriceCurrencyControl),
// and the header has no room for it at 1280px.

type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };

export type SiteSettingsCtas = {
    primaryCta?: Cta;
    secondaryCta?: Cta;
    portalCta?: Cta;
};

export function SiteHeader({ primaryCta, secondaryCta, portalCta }: SiteSettingsCtas) {
    return (
        <Header
            homeHref="/"
            actions={
                <>
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
                </>
            }
        />
    );
}

export function SiteFooter() {
    return <Footer homeHref="/" />;
}
