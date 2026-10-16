/**
 * Custom analytics events (homepage demand generation, 2026-10-07).
 *
 * GA4 and the LinkedIn Insight Tag are loaded by SiteAnalytics from @datazag/site-chrome,
 * and only after the visitor consents (dz_consent). Before consent, or with them blocked,
 * window.gtag does not exist and track() does nothing. No personal data goes in params:
 * never an email address or a typed domain.
 *
 * An event mapped to a LinkedIn conversion (NEXT_PUBLIC_LINKEDIN_CONVERSIONS, see
 * docs/utm.md) is also sent to LinkedIn: on this site, booking_click.
 *
 * Browser-only: call from event handlers.
 */
import { trackLinkedInConversion } from "@datazag/site-chrome/analytics";

export type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  trackLinkedInConversion(event);
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", event, params);
  } catch {
    // Analytics must never break a click.
  }
}
