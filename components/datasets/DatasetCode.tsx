"use client";

import React from "react";
import { Check, Copy } from "lucide-react";

/**
 * A copyable code block for dataset documentation.
 *
 * The join guide is the section a buyer actually uses, so the snippet is the
 * primary object here: full width, monospaced, and copyable in one click. The
 * copy target is the RAW code string, never the highlighted markup — a buyer
 * pasting coloured span tags into a worksheet is the classic way a docs page
 * ships a snippet that does not run.
 */

const SQL_KEYWORDS =
  "SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|UNION|ALL|AS|DISTINCT|AND|OR|NOT|IN|LIKE|IS|NULL|BETWEEN|CASE|WHEN|THEN|ELSE|END|WITH|CREATE|TABLE|INSERT|INTO|VALUES|UPDATE|SET|DELETE";

const PY_KEYWORDS =
  "def|class|if|else|elif|for|while|try|except|finally|import|from|as|return|yield|with|lambda|in|is|not|and|or|True|False|None";

function escapeHtml(code: string): string {
  return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * ONE pass, never chained .replace() calls.
 *
 * Chaining is how the naive version of this broke: the keyword pass injects
 * `class="text-sky-300"`, and a later numeric pass then matched the `300`
 * INSIDE that attribute and wrapped it in another span — rendering `300">SELECT`
 * as visible text in the buyer's snippet. Every token type is therefore matched
 * in a single alternation over the escaped source, and each match is consumed
 * exactly once, so no pass can ever see markup a previous pass emitted.
 */
function tokenize(
  escaped: string,
  pattern: RegExp,
  classify: (m: RegExpExecArray) => string | null,
): string {
  let out = "";
  let last = 0;
  pattern.lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(escaped)) !== null) {
    const cls = classify(m);
    if (cls) {
      out += escaped.slice(last, m.index);
      out += `<span class="${cls}">${m[0]}</span>`;
      last = m.index + m[0].length;
    }
    // Zero-length matches would loop forever.
    if (m[0].length === 0) pattern.lastIndex++;
  }
  return out + escaped.slice(last);
}

/**
 * Deliberately minimal highlighting, matching the color convention already used
 * by components/sections/blocks/CodeExample.tsx. Runs on escaped text only.
 */
function highlight(code: string, language: string): string {
  const escaped = escapeHtml(code);

  if (language === "sql") {
    // Order matters within the alternation: comments and strings first, so a
    // keyword inside them is not lifted out of its literal.
    const re = new RegExp(
      `(--[^\\n]*)|('(?:[^'\\\\]|\\\\.)*')|\\b(?:${SQL_KEYWORDS})\\b|\\b\\d+\\b`,
      "gi",
    );
    return tokenize(escaped, re, (m) => {
      if (m[1]) return "text-slate-500"; // comment
      if (m[2]) return "text-emerald-300"; // string
      if (/^\d+$/.test(m[0])) return "text-amber-200"; // number
      return "text-sky-300"; // keyword
    });
  }

  if (language === "python") {
    const re = new RegExp(
      `(#[^\\n]*)|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')|\\b(?:${PY_KEYWORDS})\\b|\\b\\d+\\b`,
      "g",
    );
    return tokenize(escaped, re, (m) => {
      if (m[1]) return "text-slate-500";
      if (m[2]) return "text-emerald-300";
      if (/^\d+$/.test(m[0])) return "text-amber-200";
      return "text-purple-300";
    });
  }

  if (language === "json") {
    const re =
      /("(?:\\.|[^"\\])*"\s*:)|("(?:\\.|[^"\\])*")|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?/g;
    return tokenize(escaped, re, (m) => {
      if (m[1]) return "text-purple-300"; // key
      if (m[2]) return "text-emerald-300"; // string
      if (/^(true|false|null)$/.test(m[0])) return "text-amber-300";
      return "text-sky-300"; // number
    });
  }

  return escaped;
}

export function DatasetCode({
  code,
  language = "sql",
  label,
}: {
  code: string;
  language?: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function flash(setter: (v: boolean) => void) {
    setter(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2500);
  }

  async function copy() {
    try {
      // The raw string — not the rendered, highlighted DOM.
      await navigator.clipboard.writeText(code);
      flash(setCopied);
    } catch (err) {
      // writeText is refused in plenty of ordinary situations: an insecure
      // origin, a denied permission, an unfocused document. This page exists so
      // a buyer can take the SQL away with them, so a refusal must not end in a
      // console message they will never see. Select the snippet instead and
      // tell them to press copy themselves — one keystroke, still no retyping.
      console.error("Failed to copy snippet:", err);
      const el = codeRef.current;
      if (el && typeof window !== "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      flash(setFailed);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#05081c]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          {label ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-300 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Copied
            </>
          ) : failed ? (
            <>
              <Copy className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
              Press Ctrl+C
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
      {/* Announced to screen readers without moving focus off the button. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "Snippet copied to clipboard." : ""}
        {failed ? "Could not reach the clipboard. The snippet is selected — press Ctrl+C." : ""}
      </span>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code
          ref={codeRef}
          className="font-mono text-slate-200"
          dangerouslySetInnerHTML={{ __html: highlight(code, language) }}
        />
      </pre>
    </div>
  );
}

export default DatasetCode;
