/**
 * SHARED PRE-PRODUCTION RULES (WU-C2).
 *
 * One list, two scanners. checkPreProdGuard.mjs applies these to SOURCE under
 * app/, components/, sanity/ and lib/; checkCmsContentGuard.ts applies the same
 * list to every published Sanity document.
 *
 * They live here rather than in either scanner because the whole point of this
 * brief is that a rule kept in two places becomes two rules. A pattern added
 * for the source guard must catch the same defect typed into the CMS, and the
 * CMS is where most of this copy is actually written.
 *
 * Every pattern below matches something that actually reached www.datazag.com.
 */
export const PRE_PROD_RULES = [
  {
    re: /http:\/\/localhost|https?:\/\/127\.0\.0\.1|localhost:\d+/,
    why: "a developer host in shipped source — it reached production as a canonical URL",
    fix: 'default to "https://www.datazag.com", never to a local origin',
  },
  {
    re: /\b(?:TODO|FIXME|XXX)\b[:\s-]/,
    why: "an unfinished marker",
    fix: "finish it or track it outside the page source",
  },
  {
    re: /\[[^\]]*\b(?:to be specified|to be confirmed|to be added|to be determined|TBD|TBC)\b[^\]]*\]/i,
    why: "a bracketed placeholder in body copy",
    fix: "supply the real value, or do not publish the sentence",
  },
  {
    // A stub STRING VALUE, e.g. `companyNumber: "TBD"`. The bracket rule above
    // catches prose placeholders; this catches the other shape, which is how a
    // half-filled legal fact would most likely arrive once someone starts
    // filling in lib/legal-entity.ts. Anchored to an assignment so ordinary
    // prose containing these letters is untouched.
    // NOT "N/A": `value ? fmt(value) : "N/A"` is a correct UI fallback for a
    // metric that genuinely has no value, not an unfinished field.
    re: /[:=]\s*["'`](?:TBD|TBC|xxx+|\?\?+|FILL ?ME|CHANGE ?ME)["'`]/i,
    why: "a stub value standing in for a real one",
    fix: "supply the real value, or leave the field null so the renderer omits it",
  },
  {
    // Narrow on purpose: "Use this page for report requests" on /contact is
    // addressed to the visitor and is fine. Only the author-facing phrasings
    // that actually shipped are caught.
    re: /\bUse this (?:area|space) (?:for|to)\b|\bshould explain the model\b|\bGood first posts\b|\bContent backlog\b|\bView topic ideas\b|\bfor future newsletter capture\b/i,
    why: "instructional copy addressed to the author, not the reader",
    fix: "write for the visitor, or delete the block",
  },
];
