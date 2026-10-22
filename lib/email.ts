/**
 * OUTBOUND EMAIL — the two things every Resend call on this site needs.
 *
 * WHY THIS EXISTS. Both mail routes carried the same two holes, written twice:
 * a sender that falls back to Resend's test address, and untrusted form input
 * dropped straight into HTML. Neither belongs in a route handler, and a copy in
 * each route is a copy that drifts.
 *
 * SAME RULE AS lib/contact-routes.ts: a route that cannot be confirmed to reach
 * a person should fail where someone can see it, not quietly succeed.
 */

/**
 * The one sender for every email Datazag sends (decided by PC, 2026-10-14).
 *
 * A constant on purpose. EMAIL_FROM used to be read per deployment, and the
 * report workers sent as `health_report@notifications.datazag.com` with no
 * display name while the portal sent as `Datazag <noreply@…>`, so customers saw
 * two senders. It also removes the old failure mode this file guarded against:
 * a deploy left on Resend's test sender, which only delivers to the account owner.
 *
 * The address must stay on notifications.datazag.com, the Resend-verified sending
 * domain. The portal (Customer_Portal lib/email-sender.ts) and the report workers
 * (datazag_intelligence email_sender.py) hold the same value: change all three together.
 */
export const EMAIL_SENDER = "Datazag <noreply@notifications.datazag.com>";

/** The From address for every Resend call on this site. */
export function resolveSender(): string {
  return EMAIL_SENDER;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escape form input before it goes into an HTML email body. Without this, a
 * name or message can close a tag and inject markup or a link into mail our
 * own staff read and trust.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}
