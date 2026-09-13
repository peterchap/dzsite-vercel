/**
 * CONTRACTING ENTITY (WU-C6) — the single source of truth for who Datazag is
 * on a contract, shared by Terms, Privacy and the DPA.
 *
 * DESIGN RULE: a field whose value is not yet known is `null`, and the renderer
 * OMITS it. It is never a placeholder.
 *
 * That rule is the whole point. A bracketed "jurisdiction to be specified"
 * note sat in the published Terms of Service — a contract — until a CI guard
 * went looking for it. A placeholder in a legal document is worse than an
 * absent line:
 * a procurement lawyer reads it as drafting that was never finished, and the
 * pre-production guard (scripts/guards/checkPreProdGuard.mjs) now fails the
 * build on the shape. So the missing facts below are missing, not sketched.
 *
 * WHAT IS SETTLED (decision 2, 13 Sep 2026):
 *   - Datazag Ltd, registered in England and Wales.
 *   - Governing law is the laws of England and Wales, with the courts of
 *     England and Wales having exclusive jurisdiction. NOT "the UK" — England
 *     and Wales, Scotland and Northern Ireland are separate legal systems, and
 *     "UK" reads as unsettled drafting.
 *
 * WHAT IS STILL NEEDED FROM PETER — fill these in and every legal page picks
 * them up. No other file needs touching:
 *   - companyNumber        Companies House registered number
 *   - registeredOffice     registered office address
 *   - icoRegistration      ICO registration number (Privacy)
 *   - dataHostingRegions   where customer data is hosted (Privacy)
 *   - transferBasis        international transfer mechanism (Privacy)
 *   - effectiveDate        §13 promises "a revised effective date" and none is
 *                          shown. Setting one is a business and solicitor
 *                          decision, not a code change, so it stays null and
 *                          unrendered until someone with the authority sets it.
 *                          `lastUpdated` below is the factual alternative and
 *                          claims nothing about legal effect.
 *
 * Solicitor review is required before these pages are considered final.
 */
export type LegalEntity = {
  /** Registered company name, exactly as filed. */
  legalName: string;
  /** The legal system, named precisely. */
  jurisdiction: string;
  /** Governing-law clause wording. */
  governingLaw: string;
  /** Court with exclusive jurisdiction. */
  courts: string;
  companyNumber: string | null;
  registeredOffice: string | null;
  icoRegistration: string | null;
  dataHostingRegions: string | null;
  transferBasis: string | null;
  /** Formal effective date. Null until set by someone able to set it. */
  effectiveDate: string | null;
  /** ISO date the legal pages were last substantively revised. Factual. */
  lastUpdated: string;
};

export const LEGAL_ENTITY: LegalEntity = {
  legalName: "Datazag Ltd",
  jurisdiction: "England and Wales",
  governingLaw: "the laws of England and Wales",
  courts: "the courts of England and Wales",
  companyNumber: null,
  registeredOffice: null,
  icoRegistration: null,
  dataHostingRegions: null,
  transferBasis: null,
  effectiveDate: null,
  lastUpdated: "2026-09-13",
};

/** "13 September 2026" — en-GB reads correctly for a UK-registered entity. */
export function formatLegalDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The entity's identifying facts, as label/value rows, with unknown fields
 * dropped. Renderers map over this and never test for null themselves — one
 * place decides what is publishable.
 */
export function entityRows(): Array<{ label: string; value: string }> {
  const rows: Array<{ label: string; value: string | null }> = [
    { label: "Registered name", value: LEGAL_ENTITY.legalName },
    { label: "Registered in", value: LEGAL_ENTITY.jurisdiction },
    { label: "Company number", value: LEGAL_ENTITY.companyNumber },
    { label: "Registered office", value: LEGAL_ENTITY.registeredOffice },
  ];
  return rows.filter((r): r is { label: string; value: string } => Boolean(r.value?.trim()));
}
