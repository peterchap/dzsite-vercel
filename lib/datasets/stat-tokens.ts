/**
 * LIVE-FIGURE TOKENS for CMS-authored dataset copy.
 *
 * Dataset documentation pages are the URL submitted with a cloud-marketplace
 * listing, so every figure on one has to agree with the listing, the provider
 * profile, and the rest of the site — permanently, without anybody
 * remembering to go and update it.
 *
 * The rule from lib/site-stats.ts is "no stat literal ever appears in page
 * copy". That rule has a hole once copy is editable in Sanity: an editor can
 * type "370M" into a text field and no guard under app/ or components/ will
 * ever see it. So editors write a TOKEN instead —
 *
 *     "{{DOMAINS}} live domains observed daily"
 *
 * — and this module substitutes the canonical value at render time. The
 * figure is read from DISPLAY_STATS, the same projection every other surface
 * uses, so a dataset page cannot drift on its own.
 *
 * `assertNoRawFigures` is the matching check: it flags a hand-typed
 * corpus-style literal in CMS text the same way checkCorpusDrift.mjs flags one
 * in source. It warns in production (an editor's typo must not take down a
 * URL that a live marketplace listing points at) and throws in development and
 * during the seed, where somebody is there to fix it.
 */
import { DISPLAY_STATS, STATS_AS_OF } from "@/lib/site-stats";

/** Token name -> canonical display string. The ONLY approved figure source. */
export const STAT_TOKENS: Record<string, string> = {
  DOMAINS: DISPLAY_STATS.domainsMonitored,
  IPV4: DISPLAY_STATS.ipv4Indexed,
  ASNS: DISPLAY_STATS.networksProfiled,
  IPS_HOSTING: DISPLAY_STATS.ipsHostingDomains,
};

/** Token name -> the as-of stamp for that figure, so a page can cite freshness. */
export const STAT_TOKEN_AS_OF: Record<string, string> = {
  DOMAINS: STATS_AS_OF.domainsMonitored,
  IPV4: STATS_AS_OF.ipv4Indexed,
  ASNS: STATS_AS_OF.networksProfiled,
  IPS_HOSTING: STATS_AS_OF.ipsHostingDomains,
};

const TOKEN_RE = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

/**
 * Same shape as checkCorpusDrift.mjs: three digits + M, not followed by another
 * letter (so "MB" / "Mbps" are not flagged).
 */
const CORPUS_LITERAL = /\d{3}M\+?(?![A-Za-z])/;

/** Replace {{TOKEN}} markers with canonical figures. Unknown tokens are left alone. */
export function resolveStatTokens(input: string): string;
export function resolveStatTokens(input: string | undefined | null): string | undefined;
export function resolveStatTokens(input: string | undefined | null): string | undefined {
  if (typeof input !== "string") return undefined;
  return input.replace(TOKEN_RE, (whole, name: string) =>
    name in STAT_TOKENS ? STAT_TOKENS[name] : whole,
  );
}

/** Array convenience — resolves every string, drops empties. */
export function resolveStatTokensAll(input?: (string | null | undefined)[] | null): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
    .map((s) => resolveStatTokens(s));
}

/**
 * Flag a hand-typed corpus figure in CMS copy. `where` identifies the field so
 * an editor can find it. Returns the offending literal, or null when clean.
 *
 * The token substitution runs BEFORE this check in the renderer, so a resolved
 * "{{DOMAINS}}" is never reported — only a figure somebody typed themselves.
 */
export function findRawFigure(text: string | undefined | null): string | null {
  if (typeof text !== "string") return null;
  const m = text.match(CORPUS_LITERAL);
  return m ? m[0] : null;
}

export function assertNoRawFigures(text: string | undefined | null, where: string): void {
  const found = findRawFigure(text);
  if (!found) return;
  const message =
    `dataset copy: hand-typed corpus figure "${found}" in ${where}. ` +
    `Use a token ({{DOMAINS}}, {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}) so the page ` +
    `reads the canonical value from lib/site-stats.ts and cannot drift away from ` +
    `the marketplace listing.`;
  if (process.env.NODE_ENV === "production") {
    // A live marketplace listing points at this URL. An editor's typo must not
    // 500 the page it points at — say it loudly in the build log instead.
    console.error(message);
    return;
  }
  throw new Error(message);
}
