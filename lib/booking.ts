// The booking link and the ?src= tag for the partner pages (brief: partner page closing
// sections, 13 Oct 2026).
//
// BOOKING_URL is the booking tool's address. It is set in Vercel for production only, so
// it is read on the server and never hard-coded. Where it is empty (local, preview), the
// button goes to the contact form with the topic chosen, so it never breaks.

export type PartnerSrc = "mssp" | "esp" | "insurers";

export const BOOK_CALL_LABEL = "Book a 20-minute call";

// The analytics event sent when a booking button is clicked (lib/analytics.ts). The booking
// tool drops the ?src= tag, so this event is how a click is tied to its page.
export const BOOKING_CLICK_EVENT = "booking_click";

/** Tag a link with ?src=<page>. An on-page anchor is left alone. A link to the contact
 *  form also carries ?topic=<page>, which chooses the inquiry type. */
export function withSrc(href: string, src: PartnerSrc): string {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return href;
  const hashAt = href.indexOf("#");
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  const rest = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const queryAt = rest.indexOf("?");
  const path = queryAt >= 0 ? rest.slice(0, queryAt) : rest;
  const params = new URLSearchParams(queryAt >= 0 ? rest.slice(queryAt + 1) : "");
  if (path === "/contact" && !params.has("topic")) params.set("topic", src);
  params.set("src", src);
  return `${path}?${params.toString()}${hash}`;
}

/** Where "Book a 20-minute call" goes from a partner page. */
export function bookingHref(src: PartnerSrc): string {
  const raw = process.env.BOOKING_URL?.trim();
  if (raw) {
    try {
      const url = new URL(raw);
      url.searchParams.set("src", src);
      return url.toString();
    } catch {
      // Not a URL: fall through to the contact form.
    }
  }
  return withSrc("/contact", src);
}
