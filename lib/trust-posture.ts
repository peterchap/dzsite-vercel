/**
 * COMPANY TRUST POSTURE (WU-C12) — the layer procurement asks for, separate
 * from the intelligence-trust content that already exists on /trust.
 *
 * SAME DESIGN RULE AS lib/legal-entity.ts: a control area whose position is not
 * yet documented is `null`, and the renderer omits it.
 *
 * That rule matters more here than anywhere else on the site. Security-control
 * claims are the ones procurement relies on and the ones a contract is written
 * against. Writing "data is encrypted at rest and in transit" because it is
 * probably true would be inventing a representation, and this whole brief
 * exists because unsourced claims went out. An absent row costs a follow-up
 * question; a wrong row is a misrepresentation.
 *
 * CERTIFICATIONS ARE DIFFERENT, and deliberately so. Decision 4 (13 Sep 2026):
 * no assurance programme is in flight today; it is a later intention. So the
 * absence is STATED, not omitted — silence reads as "probably certified", and
 * a buyer who later discovers otherwise has been misled by the omission. The
 * docs line claiming "SOC2 compliance" was deleted in the same pass.
 *
 * STILL NEEDED before the omitted rows can be published. Each is a statement of
 * fact about how Datazag actually operates, and none of it can be inferred from
 * this repository:
 *   - dataHosting        which provider(s) and which regions customer data sits in
 *   - subProcessors      the disclosable sub-processor list
 *   - encryption         at rest and in transit, stated precisely
 *   - accessControl      who can reach customer data and under what controls
 *   - incidentResponse   the process and the notification commitment
 *   - vulnerabilityMgmt  scanning, patching cadence, disclosure handling
 *   - backupRetention    what is retained, for how long, and how it is restored
 *   - availability       any uptime commitment actually offered
 *
 * Fill a value in and the row appears on /trust. No other file changes.
 */
export type TrustArea = {
  /** Row heading, as procurement would name it. */
  label: string;
  /** What Datazag does. Null until someone can state it as fact. */
  status: string | null;
};

// Deliberately NOT `as const`: these values are meant to be filled in, and a
// const assertion would narrow every status to `null` and fight the edit.
export const TRUST_POSTURE: Record<string, TrustArea> = {
  dataHosting: { label: "Data hosting and regions", status: null },
  subProcessors: { label: "Sub-processors", status: null },
  encryption: { label: "Encryption", status: null },
  accessControl: { label: "Access control", status: null },
  incidentResponse: { label: "Incident response", status: null },
  vulnerabilityMgmt: { label: "Vulnerability management", status: null },
  backupRetention: { label: "Backup and retention", status: null },
  availability: { label: "Availability", status: null },
};

/** Documented areas only, in the order procurement reads them. */
export function documentedTrustAreas(): Array<{ label: string; status: string }> {
  return Object.values(TRUST_POSTURE)
    .filter((a) => Boolean(a.status && a.status.trim()))
    .map((a) => ({ label: a.label, status: a.status as string }));
}

/**
 * Certifications. Stated plainly rather than omitted — see the note above.
 *
 * `heldToday` is the list of assurance programmes actually held. An empty list
 * is a real answer and renders as one.
 */
export const CERTIFICATIONS = {
  heldToday: [] as string[],
  /** The honest statement, shown when nothing is held. */
  absenceStatement:
    "Datazag does not hold SOC 2, ISO 27001 or an equivalent third-party assurance report today, and no assurance programme is currently in progress. We would rather say so than imply otherwise.",
  /** What a buyer can inspect instead — all of it published on this page. */
  insteadPoints: [
    "Every finding carries its reason codes and the observation it was read from, so outputs can be checked rather than trusted.",
    "Collection is limited to publicly observable internet infrastructure; the boundaries are published on this page.",
    "Product scope, permitted use and redistribution limits are contractual and stated, not implied.",
    "Security issues have a published route and a monitored mailbox — see Responsible Disclosure.",
  ],
} as const;
