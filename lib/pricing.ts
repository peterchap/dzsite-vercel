// Prices on datazag.com: the shared pricing config (@datazag/site-chrome/pricing), the one
// source of truth for the site, the portal, checkout and the report generator (brief:
// report pricing ladder, 8 Oct 2026). Read here, never written in a page:
// scripts/guards/checkPriceGuard.mjs fails the build on a typed price or a typed
// {{PRICE:cents}} marker. Read at build time from the package, so there is no fetch and
// no fallback: a price change ships with a package bump.

import { PRICING, formatPrice, launchedSkus, skuFor, type Sku, type Subscription } from "@datazag/site-chrome/pricing";

export { PRICING, formatPrice, launchedSkus, skuFor };
export type { Sku, Subscription };

export const PAID_REPORT_BUY_URL =
  process.env.NEXT_PUBLIC_DRR_BUY_URL || "https://portal.datazag.com/reports/buy?src=reports";
// The estate and portfolio reports are bought directly on the portal, without a scope or
// a login (portal drizzle/0024). ?src= says which page sent the buyer.
const PORTAL = (process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.datazag.com").replace(/\/$/, "");
export function estateBuyUrl(src: string): string {
  return `${PORTAL}/reports/estate?src=${encodeURIComponent(src)}`;
}
export function portfolioBuyUrl(src: string, edition?: "investor" | "insurer_portfolio" | "mssp"): string {
  return `${PORTAL}/reports/portfolio?src=${encodeURIComponent(src)}${edition ? `&edition=${edition}` : ""}`;
}

/** A price for the currency widget: "Free", "Quoted", "{{PRICE:cents}}" or
 *  "From {{PRICE:cents}}" (CurrencyText converts the marker to the visitor's currency). */
export function priceMarker(s: { price_usd: number | null; price_is_from?: boolean; quoted?: boolean }): string {
  if (s.price_usd === null || s.quoted) return "Quoted";
  if (s.price_usd === 0) return "Free";
  const marker = `{{PRICE:${Math.round(s.price_usd * 100)}}}`;
  return s.price_is_from ? `From ${marker}` : marker;
}

/** "From $299" for a family of tiers ("org_estate_" or "portfolio_"); null if none launched. */
export function familyFrom(prefix: "org_estate_" | "portfolio_"): string | null {
  const tiers = launchedSkus().filter((s) => s.sku.startsWith(prefix));
  if (!tiers.length) return null;
  const low = tiers.reduce((a, b) => (a.price_usd <= b.price_usd ? a : b));
  return `From ${formatPrice({ price_usd: low.price_usd })}`;
}

/** The domain report's price as text ("$99"), or null if it is not launched. */
export function domainReportPrice(): string | null {
  const s = skuFor("domain_report");
  return s ? formatPrice(s) : null;
}
