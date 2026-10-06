// The paid single-domain report's price, read from the portal (WS4, decided
// 2026-10-06: one SKU, one price, stored once in the portal's products row). The site
// never writes the price itself: scripts/guards/claimRules.mjs fails the build if the
// figure appears in source or CMS content.
//
// Server-side only (no CORS involved), revalidated hourly. When the portal cannot be
// read the caller shows the product without a figure, never a stale one.

export const PAID_REPORT_NAME = "Attack Surface & SaaS Discovery Report";
export const FREE_REPORT_NAME = "Domain Exposure & DNS Hygiene Report";

const PRICE_URL =
  process.env.PAID_REPORT_PRICE_URL || "https://portal.datazag.com/api/public/products/health_report";

export const PAID_REPORT_BUY_URL =
  process.env.NEXT_PUBLIC_DRR_BUY_URL || "https://portal.datazag.com/reports/buy?src=reports";

export type PaidReportPrice = { name: string; display: string; unitAmountCents: number; currency: string };

export async function getPaidReportPrice(): Promise<PaidReportPrice | null> {
  try {
    const res = await fetch(PRICE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const p = (await res.json()) as Partial<PaidReportPrice>;
    if (!p.display || typeof p.unitAmountCents !== "number") return null;
    return { name: p.name || PAID_REPORT_NAME, display: p.display, unitAmountCents: p.unitAmountCents, currency: p.currency || "usd" };
  } catch {
    return null;
  }
}
