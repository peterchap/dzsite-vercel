// The estate report's bands and the Portfolio Exposure Snapshot's prices, read from the
// portal's published price table (WS4, decided 2026-10-06; every band bought online,
// 2026-10-07). The table's source is datazag_intelligence scopeteaser/bands.py; the
// portal serves it at /api/public/price-bands. The site never writes a price itself
// (scripts/guards/claimRules.mjs). Server-side only, revalidated hourly; when the portal
// cannot be read, callers show the product without figures, never stale ones.

const PRICE_BANDS_URL =
  process.env.PRICE_BANDS_URL || "https://portal.datazag.com/api/public/price-bands";

export const SNAPSHOT_BUY_URL =
  process.env.NEXT_PUBLIC_SNAPSHOT_BUY_URL || "https://portal.datazag.com/reports/snapshot?src=pricing";

type EstateBand = { min_domains: number; max_domains: number | null; label: string; price_usd: number;
                    per_domain_over_usd: number | null };
type SnapshotBand = { min_orgs: number; max_orgs: number; label: string; price_usd: number };
export type PriceTable = { currency: string; estate: EstateBand[]; snapshot: SnapshotBand[] };

export async function getPriceTable(): Promise<PriceTable | null> {
  try {
    const res = await fetch(PRICE_BANDS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const t = (await res.json()) as Partial<PriceTable>;
    if (!Array.isArray(t.estate) || !Array.isArray(t.snapshot) || !t.estate.length) return null;
    return t as PriceTable;
  } catch {
    return null;
  }
}

function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/** "from $4,500" for the estate report; null when the table is unavailable. */
export function estateFromPrice(t: PriceTable | null): string | null {
  return t ? `from ${usd(Math.min(...t.estate.map((b) => b.price_usd)))}` : null;
}

/** One line per band: "1–15 domains: $4,500", Band D with its per-domain rate. */
export function estateBandLines(t: PriceTable | null): string[] {
  if (!t) return [];
  return t.estate.map((b) => {
    const size = b.max_domains == null ? `${b.min_domains}+ domains` : `${b.min_domains}–${b.max_domains} domains`;
    const price = b.per_domain_over_usd
      ? `${usd(b.price_usd)} + ${usd(b.per_domain_over_usd)} per domain over ${b.min_domains - 1}`
      : usd(b.price_usd);
    return `${size}: ${price}`;
  });
}

/** "from $995" for the snapshot, and its band lines. */
export function snapshotFromPrice(t: PriceTable | null): string | null {
  return t && t.snapshot.length ? `from ${usd(Math.min(...t.snapshot.map((b) => b.price_usd)))}` : null;
}

export function snapshotBandLines(t: PriceTable | null): string[] {
  return t ? t.snapshot.map((b) => `${b.label}: ${usd(b.price_usd)}`) : [];
}
