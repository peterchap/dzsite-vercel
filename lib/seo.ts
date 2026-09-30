/**
 * SEARCH METADATA HELPERS.
 *
 * Search results show roughly 155-160 characters of a meta description and
 * cut the rest mid-word. Hand-written descriptions are kept under the limit
 * at source; this is for text that arrives from the CMS, where length is not
 * controlled.
 */
export const META_DESCRIPTION_MAX = 160;

/**
 * Trim to the last full sentence that fits, else the last whole word plus an
 * ellipsis. Text already short enough is returned unchanged.
 */
export function metaDescription(text: string | undefined | null, max = META_DESCRIPTION_MAX): string | undefined {
  if (typeof text !== "string") return undefined;
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max);
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  // A sentence ending at least halfway in reads as complete; shorter would say too little.
  if (sentenceEnd >= max / 2) return head.slice(0, sentenceEnd + 1);
  const wordEnd = head.slice(0, max - 1).lastIndexOf(" ");
  return `${head.slice(0, wordEnd > 0 ? wordEnd : max - 1).replace(/[\s,;:—-]+$/, "")}…`;
}
