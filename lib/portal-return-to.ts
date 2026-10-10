/**
 * The `return_to` value the portal's free-report flow expects: the page the
 * visitor launched the report from, so the portal's progress page can link
 * back here and browser Back lands here too.
 *
 * Origin and path only, plus the anchor the CTA sits under (#free-report for the
 * free report, #free-scope for the free estate scope). The query string is dropped so nothing personal rides along. The
 * portal validates the value (https, datazag.com or a subdomain) and falls
 * back to https://datazag.com/ for anything else.
 *
 * Browser-only: call it from an event handler or effect, never during render.
 */
export function currentPageReturnTo(anchor = "#free-report"): string {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}${anchor}`;
}
