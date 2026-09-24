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
    "Datazag does not hold SOC 2, ISO 27001 or an equivalent third-party assurance report today, and no assurance program is currently in progress. We would rather say so than imply otherwise.",
  /**
   * What would be committed to under an enterprise agreement — the spec asks
   * for this to be stated rather than left to a negotiation. Null until
   * someone can commit to it: it is a contractual promise, not a code change.
   */
  enterpriseCommitment: null as string | null,
  /** What a buyer can inspect instead — all of it published on this page. */
  insteadPoints: [
    "Every finding carries its reason codes and the observation it was read from, so outputs can be checked rather than trusted.",
    "Collection is limited to publicly observable internet infrastructure; the boundaries are published on this page.",
    "Product scope, permitted use and redistribution limits are contractual and stated, not implied.",
    "Security issues have a published route and a monitored mailbox — see Responsible Disclosure.",
  ],
} as const;

/**
 * DELIVERY-MODE PRIVACY POSTURE (spec §7, 23 Sep 2026).
 *
 * The strongest thing this page can say to a DPO is architectural, not
 * evidential: under the share and marketplace model the customer queries the
 * data inside their own cloud account and sends nothing here. That outranks a
 * certificate, so it leads — and the certifications block below is read in its
 * light rather than as an apology.
 *
 * TWO OVERCLAIMS THIS SHAPE EXISTS TO PREVENT, both easy to make:
 *
 *  1. The claim is SPECIFIC — customer data does not enter Datazag's
 *     environment — and never the broad "no GDPR concerns". A DPO catches the
 *     broad version, and having caught one overclaim they go looking for the
 *     rest of them.
 *  2. The claim covers the SHARE PATH ONLY. On the API path the customer sends
 *     domains to be scored, so Datazag is squarely in that data flow. Two
 *     delivery modes, two postures. Letting the first one's claim spill across
 *     both is the version that costs the most when a buyer finds it, which is
 *     why each mode carries its own consequence line rather than sharing one.
 */
export type DeliveryPosture = {
  key: string;
  /** The delivery mode, named as a buyer buys it. */
  mode: string;
  /** What actually happens to customer data under this mode. */
  dataFlow: string;
  /** What follows from that — stated no wider than it holds. */
  consequence: string;
};

export const DELIVERY_POSTURES: DeliveryPosture[] = [
  {
    key: "share",
    mode: "Cloud share and marketplace",
    dataFlow:
      "The dataset is delivered into your own cloud account and queried there. Your tables, your queries and your results stay in your environment. Nothing you join against our data is sent to us, and we cannot see it.",
    consequence:
      "On this path Datazag is not a processor of your data: there is no processing agreement to negotiate for it, no international-transfer assessment, no sub-processor list to review, and no breach of ours that could expose it.",
  },
  {
    key: "api",
    mode: "API",
    dataFlow:
      "You send us domains to be assessed, so Datazag receives and processes what you send.",
    consequence:
      "This path is a processing relationship and is governed by the data-processing agreement. The architectural argument above applies to the share path and does not extend to this one.",
  },
];

/**
 * ANSWERING VENDOR ASSESSMENTS.
 *
 * Procurement sends a spreadsheet whatever the page says. Naming who handles
 * it is the difference between a small company reading as organized and
 * reading as absent.
 *
 * `turnaround` is null on purpose: a published turnaround is a commitment, and
 * committing to one is not a code change. Set it and the line appears.
 */
export const VENDOR_ASSESSMENTS = {
  /** Confirmed to reach a person — see lib/contact-routes.ts. */
  contactEmail: "sales@datazag.com",
  turnaround: null as string | null,
  note: "Send the questionnaire, security schedule or data-processing agreement and it reaches a person rather than a queue. Tell us the delivery mode you are assessing — share or API — because the answers differ, and the section above says how.",
};

/**
 * PERSONAL DATA IN THE CORPUS.
 *
 * The corpus is built from public DNS and certificate records, and some of
 * those records carry personal data: SOA contact addresses, and registrar and
 * registry records adjacent to WHOIS. An insurer's DPO asks this question, and
 * answering it here beats answering it in a questionnaire under time pressure.
 *
 * Null until the statement is confirmed by someone who can make it. The fields
 * are evidenced, but what is HELD, on what lawful basis, and for how long is a
 * legal statement about the company rather than a fact this repository knows —
 * and this file's whole rule is that those are not guessed at.
 */
export const PERSONAL_DATA_IN_CORPUS: string | null = null;
