import { NextResponse } from "next/server";

/**
 * WU26 — daily stats redeploy trigger.
 *
 * Vercel cron (vercel.json → "30 5 * * *") calls this route once a day. It
 * POSTs the project's deploy hook, which rebuilds the site; the `prebuild`
 * step (scripts/refreshSiteStats.mjs) pulls fresh CertaLake figures during
 * that build. Build-time, not runtime, by design: the site stays static and
 * a feed hiccup can never render a broken number (the certificate-counter
 * lesson).
 *
 * Required env (set in Vercel project settings):
 *   CRON_SECRET             — Vercel sends it as `Authorization: Bearer …`
 *   VERCEL_DEPLOY_HOOK_URL  — a Deploy Hook URL for the production branch
 *                             (Project → Settings → Git → Deploy Hooks)
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) {
    return NextResponse.json(
      { error: "VERCEL_DEPLOY_HOOK_URL is not configured — create a deploy hook and set the env var" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(hook, { method: "POST" });
    if (!res.ok) {
      return NextResponse.json({ error: `deploy hook responded ${res.status}` }, { status: 502 });
    }
    return NextResponse.json({ triggered: true, at: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { error: `deploy hook unreachable: ${err instanceof Error ? err.message : String(err)}` },
      { status: 502 },
    );
  }
}
