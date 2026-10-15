/**
 * IndexNow: tell Bing (and Yandex, Seznam, Naver, which share submissions) that pages changed.
 *
 *   npm run indexnow                       — every URL in the live sitemap
 *   npm run indexnow -- /insights/foo /x   — just these paths
 *
 * Run it after a deploy that adds or changes pages. Google does not take IndexNow; use
 * Search Console's URL Inspection for Google.
 *
 * The key is public by design: IndexNow proves ownership by fetching
 * https://www.datazag.com/<key>.txt, which lives in public/. Changing the key means
 * renaming that file too.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com").replace(/\/$/, "");
const KEY = "85b107306c644bb6d2a3e9aa0123f70a";

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => new URL(p, SITE_URL).toString());
} else {
  const xml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) {
  console.error("No URLs to submit.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  }),
});
// 200 = accepted, 202 = accepted while the key is being verified. Anything else is a failure.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
