import { GONE_ROUTES } from "@/lib/legacy-redirects";

/**
 * /kyc — 410 Gone (spec §8, 23 Sep 2026).
 *
 * This path used to 301 to /contact. A redirect is the wrong answer here: it
 * says "this moved, and here is where", so it carries the KYC claim to
 * whatever page it lands on. The claim is what is being retired — the ESP
 * brief forbids KYC as a claim, and Datazag sells to the vendors who perform
 * KYC, so implying we do it competes with the customers being pitched.
 *
 * 410 says the page is gone and is not coming back. That is what we mean, and
 * search engines drop an indexed URL on it faster than on a 404.
 *
 * A route handler rather than a page: a page would be a rendered surface with
 * a 200, and the status IS the message. The body is one line for the human who
 * followed an old link, and noindex for anything that reads it anyway.
 */

const gone = GONE_ROUTES.find((r) => r.path === "/kyc");

const body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Page gone — Datazag</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center;
             background: #030619; color: #e2e8f0;
             font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
      main { max-width: 34rem; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 1rem; color: #fff; }
      p { margin: 0 0 1rem; color: #94a3b8; }
      a { color: #67e8f9; }
    </style>
  </head>
  <body>
    <main>
      <h1>This page is gone.</h1>
      <p>${gone?.pointer ?? "This page has been retired."}</p>
      <p>
        <a href="/esp-partners">Datazag for email service providers</a> &middot;
        <a href="/">Home</a>
      </p>
    </main>
  </body>
</html>
`;

export function GET(): Response {
  return new Response(body, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
      // The answer never changes, so let it be cached like any static asset.
      "cache-control": "public, max-age=3600",
    },
  });
}
