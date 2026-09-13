import { LEGAL_ENTITY, entityRows, formatLegalDate } from "@/lib/legal-entity";

/**
 * The contracting entity, rendered on Terms, Privacy and the DPA (WU-C6).
 *
 * Rows come from lib/legal-entity, which omits any fact that is not yet known.
 * An absent company number renders as nothing at all — never as a bracketed
 * placeholder, which is what sat in the published Terms until a CI guard found
 * it, and which a procurement lawyer reads as unfinished drafting.
 */
export function EntityBlock() {
  const rows = entityRows();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {row.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Document date line. Renders the formal effective date once one is set, and
 * the factual last-revised date meanwhile — "last updated" claims nothing about
 * legal effect, which is not ours to assert.
 */
export function LegalDateline() {
  const { effectiveDate, lastUpdated } = LEGAL_ENTITY;

  return (
    <p className="mt-6 text-sm font-medium text-slate-400">
      {effectiveDate ? (
        <>
          Effective <time dateTime={effectiveDate}>{formatLegalDate(effectiveDate)}</time>
        </>
      ) : (
        <>
          Last updated <time dateTime={lastUpdated}>{formatLegalDate(lastUpdated)}</time>
        </>
      )}
    </p>
  );
}
