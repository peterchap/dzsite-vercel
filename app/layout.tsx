import type { Metadata } from "next";
import { Inter, Manrope, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "800",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Absolute base for canonical + OG/Twitter image URLs so nothing ever resolves
// to localhost or a preview host in production (WU23 §2 regression guard).
// www.datazag.com is the canonical apex — keep the www.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  title: "Datazag — Infrastructure Intelligence",
  description:
    "Infrastructure Intelligence for external domain, DNS, certificate, hosting, provider and platform risk.",
};

import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { SiteStatsProvider } from "@/components/providers/SiteStatsProvider";
import { getSiteStats } from "@/lib/site-stats-live";
import { organizationJsonLd } from "@/lib/organization";
import { SiteAnalytics } from "@datazag/site-chrome";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Live coverage figures, cached hourly (lib/site-stats-live.ts). Client
  // components read them through useSiteStats().
  const stats = await getSiteStats();
  return (
    <html lang="en-US">
      <body className={`${inter.variable} ${outfit.variable} ${manrope.variable} antialiased`}>
        {/* Who Datazag is, for search engines (lib/organization.ts). */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <SiteStatsProvider stats={stats}>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </SiteStatsProvider>
        {/* GA4, shared with portal.datazag.com; loads only after cookie consent. */}
        <SiteAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
