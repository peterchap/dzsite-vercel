"use client";

import { useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { currentPageReturnTo } from "@/lib/portal-return-to";

// The free Estate Scope's hand-off, the same as FreeReportForm's: the portal's /scope
// page holds consent, Turnstile and the run. This form collects what the visitor is
// assessing, the estate and a work email, and passes them across prefilled, with
// return_to. No new backend. Persona keys match the portal (lib/scope-intake.ts).
const portalScopeUrl = process.env.NEXT_PUBLIC_SCOPE_URL?.split("?")[0] || "https://portal.datazag.com/scope";

const PERSONAS = [
  { key: "own", label: "My own organization", shape: "single" },
  { key: "insurer", label: "A company we insure or are quoting", shape: "single" },
  { key: "ma", label: "A company we are acquiring or investing in", shape: "single" },
  { key: "insurer_portfolio", label: "A book of insured companies", shape: "portfolio" },
  { key: "pe_vc", label: "Our portfolio companies", shape: "portfolio" },
  { key: "mssp", label: "Our clients", shape: "portfolio" },
] as const;

// Longer lists are pasted on the portal's page rather than carried in the link.
const MAX_LIST_IN_URL = 3000;

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20";

function cleanDomain(value: string): string {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/[/?#].*$/, "").replace(/^www\./, "");
}

export function FreeScopeForm({ location = "home", src }: { location?: string; src?: string }) {
  const [persona, setPersona] = useState<string>("own");
  const [domain, setDomain] = useState("");
  const [list, setList] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const started = useRef(false);
  const shape = PERSONAS.find((p) => p.key === persona)?.shape ?? "single";

  function start() {
    if (started.current) return;
    started.current = true;
    track("free_scope_form_start", { location });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailDomain = email.split("@")[1]?.toLowerCase() || "";
    if (!emailDomain || !emailDomain.includes(".")) {
      setError("Enter a valid work email address.");
      return;
    }
    const params = new URLSearchParams({ persona, email: email.trim(), return_to: currentPageReturnTo("#free-scope"), src: src || location });
    if (shape === "single") {
      const target = cleanDomain(domain) || emailDomain;
      if (!target.includes(".")) {
        setError("Enter a domain, for example example.com.");
        return;
      }
      params.set("domain", target);
    } else if (list.trim() && list.length <= MAX_LIST_IN_URL) {
      params.set("list", list.trim());
    }
    track("free_scope_form_submit", { location, persona });
    window.location.href = `${portalScopeUrl}?${params.toString()}`;
  }

  return (
    <form onSubmit={submit} onFocus={start} className="grid gap-3 rounded-2xl border border-white/10 bg-[#030619]/65 p-3 md:p-4">
      <label className="grid gap-1.5">
        <span className="sr-only">What are you assessing?</span>
        <select value={persona} onChange={(e) => { setPersona(e.target.value); setError(""); }} className={inputClass} aria-label="What are you assessing?">
          {PERSONAS.map((p) => <option key={p.key} value={p.key} className="bg-slate-900">{p.label}</option>)}
        </select>
      </label>
      {shape === "single" ? (
        <label className="grid gap-1.5">
          <span className="sr-only">Primary domain</span>
          <input type="text" inputMode="url" value={domain} onChange={(e) => { setDomain(e.target.value); setError(""); }}
            placeholder="Primary domain, e.g. example.com (add more on the next page)" className={inputClass} />
        </label>
      ) : (
        <label className="grid gap-1.5">
          <span className="sr-only">Organizations, one per line</span>
          <textarea value={list} onChange={(e) => { setList(e.target.value); setError(""); }} rows={4}
            placeholder={"One per line: Name, domain\nAcme Ltd, acme.com\nGlobex, globex.io"}
            className={`${inputClass} py-3 font-mono`} />
        </label>
      )}
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="grid gap-1.5">
          <span className="sr-only">Work email</span>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="Your work email" className={inputClass} />
        </label>
        <button type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          Get my free estate scope
        </button>
      </div>
      {error ? <p className="text-sm text-red-300" role="alert">{error}</p> : null}
      <p className="text-xs leading-5 text-slate-400">
        We send the scope to your work email. You confirm the details on the next page{shape === "portfolio" ? ", where you can also upload a CSV" : ""}.
      </p>
    </form>
  );
}
