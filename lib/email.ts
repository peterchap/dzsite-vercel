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
 * Resend's shared test sender. It only delivers to the address that owns the
 * Resend account, so a live form sending from it drops every submission on the
 * floor while returning a perfectly healthy 200. That is why EMAIL_FROM has no
 * fallback below: an unset sender is a misconfigured deploy, and the send
 * should fail loudly at the first submission rather than on the day somebody
 * asks why the inbox is empty.
 */
const RESEND_TEST_SENDER = "onboarding@resend.dev";

/**
 * The verified From address. Throws when it is missing or still pointed at
 * Resend's test sender — callers treat the throw as a failed delivery.
 */
export function resolveSender(): string {
  const from = process.env.EMAIL_FROM?.trim();

  if (!from) {
    throw new Error(
      "EMAIL_FROM is not set. Refusing to send from Resend's test address, " +
        "which only delivers to the Resend account owner.",
    );
  }

  if (from.includes(RESEND_TEST_SENDER)) {
    throw new Error(
      `EMAIL_FROM is still ${RESEND_TEST_SENDER}. That sender only delivers to ` +
        "the Resend account owner, so site mail would never arrive.",
    );
  }

  return from;
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
