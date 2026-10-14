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


// ── Founding offers ─────────────────────────────────────────────────────────────
// Limited offers for our first customers in each market (brief: founding offers, investor
// page and funnel, 14 Oct 2026). Values as Peter confirmed them. Fill or change them here
// and nowhere else: the pricing page, the partner pages and the investor page all render
// from this list. An offer shows while it is enabled and its deadline has not passed.
// When no places are left, the card says so and drops its price and button.

export type FoundingSegment = "mssp" | "esp" | "insurers" | "investors";

export type FoundingOffer = {
  id: "founding_mssp" | "founding_esp" | "founding_insurer" | "founding_investor";
  segment: FoundingSegment;
  enabled: boolean;
  name: string;
  /** Who the offer is for, as it reads after "For" on the card. */
  audience: string;
  price_usd: number;
  /** "month" or "year" for a recurring price; null for a one-off fee. */
  interval: "month" | "year" | null;
  /** The length of the term, or null for a one-off fee. */
  term: string | null;
  inclusions: string[];
  seatsTotal: number;
  /** UPDATE BY HAND when a founding place sells. The site shows seatsTotal − seatsSold. */
  seatsSold: number;
  /** The last minute the offer is open, as YYYY-MM-DDTHH:mm in UK time (Europe/London). */
  deadline: string;
};

const FOUNDING_DEADLINE = "2026-12-31T23:59";

export const FOUNDING_OFFERS: FoundingOffer[] = [
  {
    id: "founding_mssp",
    segment: "mssp",
    enabled: true,
    name: "Founding Partner Program",
    audience: "MSSPs",
    price_usd: 650,
    interval: "month",
    term: "12 months, then the price stays locked while you remain a partner",
    inclusions: [
      "25 white-label domain infrastructure reports a month under your brand.",
      "Estate monitoring for up to 10 client organizations.",
      "Partner discount on all other reports and alerts.",
      "Direct access to the founders.",
      "Price locked for as long as you remain a partner.",
    ],
    seatsTotal: 5,
    seatsSold: 0, // ← places sold so far
    deadline: FOUNDING_DEADLINE,
  },
  {
    id: "founding_esp",
    segment: "esp",
    enabled: true,
    name: "Signup Hygiene Audit",
    audience: "email platforms",
    price_usd: 2500,
    interval: null,
    term: null,
    inclusions: [
      "Up to 100,000 signup or sending domains classified: can it take mail, is it parked, who runs its mail, does it enforce DMARC.",
      "Evidence for every result.",
      "Delivered as a file within 5 working days.",
      "We keep nothing after delivery.",
      "Fee credited in full against an annual data share signed by March 31, 2027.",
    ],
    seatsTotal: 3,
    seatsSold: 0, // ← places sold so far
    deadline: FOUNDING_DEADLINE,
  },
  {
    id: "founding_insurer",
    segment: "insurers",
    enabled: true,
    name: "Book Accumulation Snapshot",
    audience: "insurers",
    price_usd: 7500,
    interval: null,
    term: null,
    inclusions: [
      "Up to 250 insureds.",
      "Provider concentration across mail, DNS, hosting and CDN.",
      "Reverse index: which insureds depend on a named provider.",
      "Undeclared estate and email posture per insured, each finding with its evidence.",
      "Review call included.",
      "Delivered within 5 working days.",
      "Fee credited in full against an annual data share signed by March 31, 2027.",
    ],
    seatsTotal: 3,
    seatsSold: 0, // ← places sold so far
    deadline: FOUNDING_DEADLINE,
  },
  {
    id: "founding_investor",
    segment: "investors",
    enabled: true,
    name: "Deal Pass",
    audience: "investors and M&A",
    price_usd: 4950,
    interval: "year",
    term: "12 months",
    inclusions: [
      "12 organization estate reports (up to 50 domains each) and one portfolio report (up to 25 companies) over 12 months.",
      "No retention of your company lists.",
      "Private querying on dedicated infrastructure for sensitive deals.",
    ],
    seatsTotal: 5,
    seatsSold: 0, // ← places sold so far
    deadline: FOUNDING_DEADLINE,
  },
];

/** The UTC instant of a UK wall-clock time ("2026-12-31T23:59", Europe/London). */
export function ukTimeToUtc(local: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return NaN;
  const asUtc = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  const offsetAt = (t: number) => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
        .formatToParts(new Date(t)).map((p) => [p.type, p.value]),
    );
    return Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute) - t;
  };
  // Two passes settle the offset either side of a clock change.
  const first = asUtc - offsetAt(asUtc);
  return asUtc - offsetAt(first);
}

/** Open until the end of the deadline minute, UK time. */
export function foundingClosesAt(o: FoundingOffer): number {
  return ukTimeToUtc(o.deadline) + 60_000;
}

export function isFoundingOfferActive(o: FoundingOffer, now: Date = new Date()): boolean {
  if (!o.enabled) return false;
  const closes = foundingClosesAt(o);
  return Number.isFinite(closes) && now.getTime() < closes;
}

export function activeFoundingOffers(now: Date = new Date(), offers: FoundingOffer[] = FOUNDING_OFFERS): FoundingOffer[] {
  return offers.filter((o) => isFoundingOfferActive(o, now));
}

export function foundingOffer(id: FoundingOffer["id"], now: Date = new Date()): FoundingOffer | null {
  return activeFoundingOffers(now).find((o) => o.id === id) ?? null;
}

export function foundingSeatsLeft(o: FoundingOffer): number {
  return Math.max(0, o.seatsTotal - o.seatsSold);
}

/** The price as a {{PRICE:cents}} marker for CurrencyText, and its "/mo" or "/yr" suffix. */
export function foundingPrice(o: FoundingOffer): { value: string; suffix: string } {
  return { value: priceMarker(o), suffix: o.interval ? perInterval(o.interval) : "" };
}

/** "3 of 5 places left", or "All founding places taken". */
export function foundingSeatsLine(o: FoundingOffer): string {
  const left = foundingSeatsLeft(o);
  return left > 0 ? `${left} of ${o.seatsTotal} places left` : "All founding places taken";
}

/** "December 31, 2026", the deadline's day in UK time. */
export function foundingDeadlineDay(o: FoundingOffer): string {
  return new Date(ukTimeToUtc(o.deadline)).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
}
