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
/** The diligence edition is quoted: its request opens a deal on the portal (Phase 7). */
export function diligenceRequestUrl(src: string): string {
  return `${PORTAL}/diligence?src=${encodeURIComponent(src)}`;
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

/** "From $299" for a family of tiers ("org_estate_" or "portfolio_"); null if none launched.
 *  With `marker`, the figure is a {{PRICE:cents}} marker for CurrencyText, so it follows
 *  the visitor's currency. Without it the text is US dollars and never converts. */
export function familyFrom(prefix: "org_estate_" | "portfolio_", opts?: { marker?: boolean }): string | null {
  const tiers = launchedSkus().filter((s) => s.sku.startsWith(prefix));
  if (!tiers.length) return null;
  const low = tiers.reduce((a, b) => (a.price_usd <= b.price_usd ? a : b));
  return `From ${opts?.marker ? priceMarker({ price_usd: low.price_usd }) : formatPrice({ price_usd: low.price_usd })}`;
}

/** The domain report's price as text ("$99"), or null if it is not launched. With `marker`,
 *  a {{PRICE:cents}} marker for CurrencyText. */
export function domainReportPrice(opts?: { marker?: boolean }): string | null {
  const s = skuFor("domain_report");
  if (!s) return null;
  return opts?.marker ? priceMarker(s) : formatPrice(s);
}

/** "/mo" or "/yr", the suffix after a subscription price. */
export function perInterval(interval: "month" | "year"): string {
  return interval === "month" ? "/mo" : "/yr";
}

/** Annual monitoring's price, in the pricing page's words. */
export function monitoringPriceText(): string {
  return `${PRICING.monitoring.multiplier} × the report price, per year`;
}

// Where each SKU is bought. Every report is bought online, directly: the estate and
// portfolio reports on their own buy pages (the free scope stays the way to see discovery
// first). The tier follows the domains the buyer lists. `src` says which page sent the buyer.
const checkoutLive = process.env.NEXT_PUBLIC_REPORTS_CHECKOUT_LIVE === "true";
export function startLink(sku: string, src: string): { label: string; href: string } | null {
  if (sku === "free_snapshot") return { label: "Get a free report", href: "/#free-report" };
  if (sku === "domain_report") {
    return checkoutLive ? { label: "Buy the report", href: PAID_REPORT_BUY_URL } : { label: "Contact us", href: "/contact" };
  }
  if (sku.startsWith("org_estate_")) return { label: "Buy the report", href: estateBuyUrl(src) };
  if (sku.startsWith("portfolio_")) return { label: "Buy the report", href: portfolioBuyUrl(src) };
  if (sku === "diligence") return { label: "Request a diligence edition", href: diligenceRequestUrl(src) };
  return null;
}

// ── Prices by product id, for offer cards outside the pricing page ──────────────
// An id is a SKU, a subscription SKU, or "monitoring". A page names ids and never types a
// price (scripts/guards/checkPriceGuard.mjs).

export type OfferPrice = {
  id: string;
  /** The tier or product this price is for, shown when a line lists several. */
  label: string | null;
  /** "Free", "Quoted", a {{PRICE:cents}} marker for CurrencyText, or the monitoring text. */
  value: string;
  /** "/mo" or "/yr" for a subscription, otherwise "". */
  suffix: string;
};

function tierLabel(s: Sku): string | null {
  if (s.limits?.organizations) return `Up to ${s.limits.organizations} organizations`;
  const domains = s.limits?.registered_domains ?? 0;
  return domains > 1 ? `Up to ${domains} domains` : null;
}

const launchedSubscription = (id: string) => PRICING.subscriptions.find((s) => s.sku === id && s.launch);

/** The price for one product id, or null when the product is not launched. */
export function offerPrice(id: string): OfferPrice | null {
  if (id === "monitoring") return { id, label: null, value: monitoringPriceText(), suffix: "" };
  const sku = skuFor(id);
  if (sku) return { id, label: tierLabel(sku), value: priceMarker(sku), suffix: "" };
  const sub = launchedSubscription(id);
  if (sub) return { id, label: sub.product, value: priceMarker(sub), suffix: sub.quoted ? "" : perInterval(sub.interval) };
  return null;
}

/** A short price line for a set of product ids: the lowest one-off report price, and the
 *  lowest subscription price. Used by the compact offer. */
export function offerFromPrices(ids: string[]): OfferPrice[] {
  const lines: OfferPrice[] = [];
  const reports = ids.flatMap((id) => skuFor(id) ?? []).filter((s) => s.price_usd > 0);
  if (reports.length) {
    const low = reports.reduce((a, b) => (a.price_usd <= b.price_usd ? a : b));
    lines.push({ id: low.sku, label: "Reports", value: `from ${priceMarker({ price_usd: low.price_usd })}`, suffix: "" });
  }
  const subs = ids.flatMap((id) => launchedSubscription(id) ?? []).filter((s) => s.price_usd !== null);
  if (subs.length) {
    const low = subs.reduce((a, b) => ((a.price_usd as number) <= (b.price_usd as number) ? a : b));
    const alerts = subs.some((s) => s.sku.startsWith("alerts_"));
    const shares = subs.some((s) => s.sku.startsWith("data_share_"));
    const label = alerts && shares ? "Alerts and data shares" : shares ? "Data shares" : "Alerts";
    lines.push({ id: low.sku, label, value: `from ${priceMarker({ price_usd: low.price_usd })}`, suffix: perInterval(low.interval) });
  }
  return lines;
}

// ── Founding offers (gated) ─────────────────────────────────────────────────────
// A limited offer for the first partners. Built now, shipped off: `enabled` is false and
// the values are empty until the offer is decided. Fill the values here and nowhere else.
// An offer shows only when it is enabled, has a price, and its deadline has not passed.
// It shows first on the pricing page, then on its partner page's offer card.

export type FoundingOffer = {
  id: "mssp" | "esp";
  enabled: boolean;
  title: string;
  /** One line on what the offer covers. */
  summary: string | null;
  price_usd: number | null;
  currency: "USD";
  /** The length of the offer's term, for example "12 months". */
  term: string | null;
  seats_total: number | null;
  seats_left: number | null;
  /** The last day the offer is open, as YYYY-MM-DD (UTC). The offer hides the day after. */
  deadline: string | null;
};

export const FOUNDING_OFFERS: FoundingOffer[] = [
  { id: "mssp", enabled: false, title: "Founding Partner program", summary: null, price_usd: null, currency: "USD", term: null, seats_total: null, seats_left: null, deadline: null },
  { id: "esp", enabled: false, title: "ESP first-purchase package", summary: null, price_usd: null, currency: "USD", term: null, seats_total: null, seats_left: null, deadline: null },
];

export function isFoundingOfferActive(o: FoundingOffer, now: Date = new Date()): boolean {
  if (!o.enabled || o.price_usd === null) return false;
  if (!o.deadline) return true;
  const closes = Date.parse(`${o.deadline}T23:59:59.999Z`);
  return Number.isFinite(closes) && now.getTime() <= closes;
}

export function activeFoundingOffers(now: Date = new Date(), offers: FoundingOffer[] = FOUNDING_OFFERS): FoundingOffer[] {
  return offers.filter((o) => isFoundingOfferActive(o, now));
}

export function foundingOffer(id: FoundingOffer["id"], now: Date = new Date()): FoundingOffer | null {
  return activeFoundingOffers(now).find((o) => o.id === id) ?? null;
}

/** "3 of 10 places left. Offer closes November 30, 2026." Each part shows only when set. */
export function foundingAvailability(o: FoundingOffer): string | null {
  const parts: string[] = [];
  if (o.seats_left !== null && o.seats_total !== null) parts.push(`${o.seats_left} of ${o.seats_total} places left.`);
  else if (o.seats_total !== null) parts.push(`${o.seats_total} places.`);
  if (o.deadline) {
    const day = new Date(`${o.deadline}T00:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    parts.push(`Offer closes ${day}.`);
  }
  return parts.length ? parts.join(" ") : null;
}
