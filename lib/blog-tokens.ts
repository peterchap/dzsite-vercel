/**
 * Live-figure tokens in blog posts.
 *
 * Blog bodies are Portable Text in Sanity, so a figure typed there is
 * invisible to every source guard. Posts carry tokens instead, resolved at
 * request time from the same sources every other surface reads:
 *
 *   {{DOMAINS}} {{IPV4}} {{ASNS}} {{IPS_HOSTING}}       site-stats (lib/datasets/stat-tokens.ts)
 *   {{CORP_MAIL_DOMAINS}} {{CORP_MAIL_MS_GOOGLE_PCT}}   Observatory corp_mail_* (lib/observatory-figures.ts)
 *   {{CORP_MAIL_GATEWAY_PCT}}
 *
 * DROP, NEVER HOLE. A block whose figure cannot be read is left out of the
 * rendered post. The dataset pages resolve a missing token to nothing, which
 * suits a label; in an argument it leaves a sentence claiming "for  corporate
 * domains". Tokens must sit inside one span — write them unformatted.
 */
import type { SiteStats } from "@/lib/site-stats-core";
import { tokensFor } from "@/lib/datasets/stat-tokens";
import { resolveCorporateMailTokens, type CorporateMailFigures } from "@/lib/observatory-figures";

const SITE_TOKEN_RE = /\{\{\s*(DOMAINS|IPV4|ASNS|IPS_HOSTING)\s*\}\}/g;

export interface BlogFigureSources {
  siteStats: SiteStats;
  corporateMail: CorporateMailFigures | null;
}

/** One string, or null when any figure it needs is unavailable. */
export function resolveBlogText(text: string, sources: BlogFigureSources): string | null {
  const corp = resolveCorporateMailTokens(text, sources.corporateMail);
  if (corp === null) return null;
  const tokens = tokensFor(sources.siteStats);
  let missing = false;
  const out = corp.replace(SITE_TOKEN_RE, (_, name: string) => {
    const value = tokens[name];
    if (!value) missing = true;
    return value ?? "";
  });
  return missing ? null : out;
}

type Span = { _type?: string; text?: string; [k: string]: unknown };
type Block = { _type?: string; children?: Span[]; [k: string]: unknown };

/** The body with every token resolved, and any block that cannot be resolved removed. */
export function resolveBlogBody<T extends Block>(body: T[] | null | undefined, sources: BlogFigureSources): T[] {
  if (!Array.isArray(body)) return [];
  const out: T[] = [];
  for (const block of body) {
    if (block?._type !== "block" || !Array.isArray(block.children)) {
      out.push(block);
      continue;
    }
    const children: Span[] = [];
    let drop = false;
    for (const span of block.children) {
      if (typeof span?.text !== "string") {
        children.push(span);
        continue;
      }
      const text = resolveBlogText(span.text, sources);
      if (text === null) {
        drop = true;
        break;
      }
      children.push({ ...span, text });
    }
    if (drop) {
      console.warn("blog-tokens: dropped a block whose figure is unavailable");
      continue;
    }
    out.push({ ...block, children });
  }
  return out;
}
