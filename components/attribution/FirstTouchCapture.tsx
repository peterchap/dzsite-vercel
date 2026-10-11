"use client";

import { useEffect } from "react";
import { readConsent } from "@datazag/site-chrome";

// First-touch attribution (pricing ladder brief, section 7; Phase 6). On a visit that
// carries a source (UTM, an external referrer, an outbound token, a partner code, src),
// and only once the visitor grants analytics consent, write dz_ft on .datazag.com. The
// customer portal reads it at intake and checkout, and stores it on the account and the
// order. An existing first touch is never replaced. The portal runs the same capture
// (portal components/attribution/first-touch-capture.tsx); keep the two in step.

const COOKIE = "dz_ft";
const DAYS = 90;

function clean(v: string | null, max = 60): string | undefined {
  const s = (v ?? "").trim();
  return s ? s.slice(0, max) : undefined;
}

export function firstTouch(href: string, referrer: string, now = new Date()): Record<string, string> | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const q = url.searchParams;
  let ref: string | undefined;
  try {
    const r = referrer ? new URL(referrer) : null;
    if (r && !/(^|\.)datazag\.com$/.test(r.hostname)) ref = r.hostname.slice(0, 120);
  } catch { /* not a URL */ }
  const ft: Record<string, string | undefined> = {
    source: clean(q.get("utm_source")), medium: clean(q.get("utm_medium")), campaign: clean(q.get("utm_campaign")),
    term: clean(q.get("utm_term")), content: clean(q.get("utm_content")), token: clean(q.get("t") ?? q.get("ot")),
    partner: clean(q.get("partner") ?? q.get("ref")), src: clean(q.get("src")), referrer: ref,
  };
  const kept = Object.fromEntries(Object.entries(ft).filter(([, v]) => v)) as Record<string, string>;
  if (!Object.keys(kept).length) return null;
  return { ...kept, landing: `${url.hostname}${url.pathname}`.slice(0, 120), at: now.toISOString() };
}

function capture() {
  if (readConsent() !== "granted") return;
  if (new RegExp(`(?:^|;\\s*)${COOKIE}=`).test(document.cookie)) return;
  const ft = firstTouch(window.location.href, document.referrer);
  if (!ft) return;
  const domain = /(^|\.)datazag\.com$/.test(window.location.hostname) ? "; Domain=.datazag.com" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(ft))}; Max-Age=${DAYS * 86400}; Path=/; SameSite=Lax; Secure${domain}`;
}

export function FirstTouchCapture() {
  useEffect(() => {
    capture();
    window.addEventListener("dz-consent-change", capture);
    return () => window.removeEventListener("dz-consent-change", capture);
  }, []);
  return null;
}
