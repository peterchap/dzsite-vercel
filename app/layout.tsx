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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://datazag.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Datazag — Infrastructure Intelligence",
  description:
    "Infrastructure Intelligence for external domain, DNS, certificate, hosting, provider and platform risk.",
};

import { CurrencyProvider } from "@/components/providers/CurrencyProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${manrope.variable} antialiased`}>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
