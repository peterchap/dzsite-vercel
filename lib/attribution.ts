// Campaign attribution for forms (brief: founding offers, investor page and funnel, 14 Oct
// 2026, C3). See docs/utm.md for the tagging convention.
//
// Two stores, both written only after analytics consent (components/attribution/
// FirstTouchCapture.tsx): dz_ft, the first touch (90 days), and dz_lt, the last touch for
// this browser session. Without consent nothing is stored, but a form still reads the tags
// from the address of the page it is submitted on. The portal reads the same cookies.
//
// Browser-only.

import { readConsent } from "@datazag/site-chrome";

export const ATTRIBUTION_KEYS = ["src", "utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

export const LAST_TOUCH_COOKIE = "dz_lt";

function clean(v: string | null | undefined): string | undefined {
  const s = (v ?? "").trim();
  return s ? s.slice(0, 80) : undefined;
}

/** The tags on a URL, or an empty object. */
export function attributionFromUrl(href: string): Attribution {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return {};
  }
  const out: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const v = clean(url.searchParams.get(key));
    if (v) out[key] = v;
  }
  return out;
}

function readLastTouch(): Attribution {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${LAST_TOUCH_COOKIE}=([^;]*)`));
  if (!m) return {};
  try {
    const parsed = JSON.parse(decodeURIComponent(m[1])) as Record<string, unknown>;
    const out: Attribution = {};
    for (const key of ATTRIBUTION_KEYS) {
      const v = typeof parsed[key] === "string" ? clean(parsed[key] as string) : undefined;
      if (v) out[key] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/** Write the session's last touch when this page carries tags. Consent is checked by the caller. */
export function writeLastTouch(href: string): void {
  const tags = attributionFromUrl(href);
  if (!Object.keys(tags).length) return;
  const domain = /(^|\.)datazag\.com$/.test(window.location.hostname) ? "; Domain=.datazag.com" : "";
  const value = encodeURIComponent(JSON.stringify({ ...tags, landing: `${window.location.hostname}${window.location.pathname}`.slice(0, 120) }));
  // No Max-Age: a session cookie, gone when the browser closes.
  document.cookie = `${LAST_TOUCH_COOKIE}=${value}; Path=/; SameSite=Lax; Secure${domain}`;
}

/** The tags to send with a form: the current page's own tags first, then (with consent)
 *  the session's last touch. */
export function currentAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const fromPage = attributionFromUrl(window.location.href);
  const stored = readConsent() === "granted" ? readLastTouch() : {};
  return { ...stored, ...fromPage };
}

/** Add the tags to a URLSearchParams, without replacing a value already set. */
export function appendAttribution(params: URLSearchParams, attribution: Attribution = currentAttribution()): URLSearchParams {
  for (const [key, value] of Object.entries(attribution)) {
    if (value && !params.has(key)) params.set(key, value);
  }
  return params;
}
