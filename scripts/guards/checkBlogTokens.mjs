/**
 * BLOG TOKEN GUARD — a blog post must never print its live-figure tokens raw.
 *
 * Blog bodies carry tokens ({{CORP_MAIL_DOMAINS}}, {{DOMAINS}}, …) that the post
 * route resolves at request time (lib/blog-tokens.ts). On 2026-10-11 the route
 * imported the resolver and never called it: the machine-clicks post went live
 * reading "for {{CORP_MAIL_DOMAINS}} corporate domains" and had to be pulled.
 * Type-checking cannot catch that — an unused import is legal.
 *
 * So this checks the wiring: the route must pass the RESOLVED post to BlogPost,
 * with its body from resolveBlogBody and its excerpt and description from
 * resolveBlogText.
 */
import { readFileSync } from "node:fs";

const ROUTE = "app/(marketing)/blog/[slug]/page.tsx";
const src = readFileSync(ROUTE, "utf8").replace(/\/\/.*$/gm, "");
const problems = [];

if (!/body:\s*resolveBlogBody\(\s*post\.body\s*,/.test(src)) problems.push("the post body is not passed through resolveBlogBody");
if (!/excerpt:[^\n]*resolveBlogText\(\s*post\.excerpt\s*,/.test(src)) problems.push("the excerpt is not passed through resolveBlogText");
if (!/description:[^\n]*resolveBlogText\(\s*post\.excerpt\s*,/.test(src)) problems.push("the meta description is not passed through resolveBlogText");
if (/<BlogPost\s+post=\{post\}/.test(src)) problems.push("<BlogPost> receives the unresolved post");

if (problems.length) {
  console.error(`✗ Blog token guard failed — ${ROUTE}:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("✓ Blog token guard passed — the post route resolves live-figure tokens before rendering.");
