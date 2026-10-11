/**
 * Custom analytics events (homepage demand generation, 2026-10-07).
 *
 * GA4 is loaded by SiteAnalytics from @datazag/site-chrome, and only after the
 * visitor consents (dz_consent). Before consent, or with GA blocked, window.gtag
 * does not exist and track() does nothing. No personal data goes in params:
 * never an email address or a typed domain.
 *
 * Browser-only: call from event handlers.
 */
export type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", event, params);
  } catch {
    // Analytics must never break a click.
  }
}
