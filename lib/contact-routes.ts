/**
 * CONTACT ROUTES (WU-C11) — the addresses and direct routes published on the
 * site, in one place.
 *
 * WHY THIS EXISTS. An enterprise buyer with one technical question will not
 * complete a broad enquiry form; they want an address or a calendar. But a
 * published mailbox that bounces is worse than no mailbox at all, on the one
 * page whose entire job is making contact possible.
 *
 * SAME RULE AS lib/legal-entity.ts AND lib/trust-posture.ts: a route that has
 * not been confirmed to reach a person is `null`, and the renderer omits it.
 *
 * CONFIRMED 13 Sep 2026:
 *   sales@   — commercial enquiries.
 *   support@ — already wired as the enquiry route's delivery fallback
 *              (app/api/enquiry/route.ts).
 *
 * NOT CONFIRMED, so not published:
 *   partners@ — the brief asks for it; it was not confirmed to route. Set it
 *               below and it appears on /contact. Nothing else to change.
 *   briefingUrl — there is no booking tool today. Rather than invent a
 *               Calendly link, the technical briefing is an enquiry type on
 *               the existing form (see TECHNICAL_BRIEFING_ENQUIRY_TYPE), which
 *               routes to a person without a new dependency. If a booking tool
 *               is adopted later, set this and the form option can give way to
 *               a direct link.
 */
export type ContactRoute = {
  /** What this route is for, as a buyer would describe it. */
  label: string;
  /** The address. Null until confirmed to reach someone. */
  email: string | null;
  /** One line on when to use it rather than the form. */
  note: string;
};

export const CONTACT_ROUTES: ContactRoute[] = [
  {
    label: "Sales and commercial",
    email: "sales@datazag.com",
    note: "Pricing, scope, procurement and contract questions.",
  },
  {
    label: "Partnerships",
    email: null,
    note: "MSSP, MDR, ESP and platform partnerships.",
  },
  {
    label: "Support and everything else",
    email: "support@datazag.com",
    note: "Existing customers, reports in flight, and anything that does not fit above.",
  },
];

/** Published routes only. */
export function publishedContactRoutes(): Array<{ label: string; email: string; note: string }> {
  return CONTACT_ROUTES.filter(
    (r): r is { label: string; email: string; note: string } => Boolean(r.email?.trim()),
  );
}

/**
 * External booking tool. Null today — the technical briefing runs through the
 * enquiry form instead.
 */
export const BRIEFING_URL: string | null = null;

/**
 * The enquiry type that carries a briefing request. It is FIRST in the contact
 * form's list so the shortest path (a 20-minute technical conversation) is the
 * first thing an enterprise buyer sees, not the last.
 */
export const TECHNICAL_BRIEFING_ENQUIRY_TYPE = "20-minute technical briefing";
