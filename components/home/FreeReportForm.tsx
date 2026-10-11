"use client";

import { useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { currentPageReturnTo } from "@/lib/portal-return-to";

// The same hand-off as DomainHealthReportCta: the portal's /threat-report page holds
// consent, Turnstile and generation. This form only collects the two fields and passes
// them across prefilled, with return_to. No new backend.
const portalReportUrl =
  process.env.NEXT_PUBLIC_PORTAL_REPORT_URL || "https://portal.datazag.com/threat-report";

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20";

function cleanDomain(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[/?#].*$/, "")
    .replace(/^www\./, "");
}

export function FreeReportForm() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const started = useRef(false);

  function start() {
    if (started.current) return;
    started.current = true;
    track("free_report_form_start", { location: "home" });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailDomain = email.split("@")[1]?.toLowerCase() || "";
    const target = cleanDomain(domain) || emailDomain;
    if (!emailDomain || !emailDomain.includes(".")) {
      setError("Enter a valid work email address.");
      return;
    }
    if (!target.includes(".")) {
      setError("Enter a domain, for example example.com.");
      return;
    }
    track("free_report_form_submit", { location: "home" });
    const params = new URLSearchParams({ email: email.trim(), domain: target, return_to: currentPageReturnTo() });
    window.location.href = `${portalReportUrl}?${params.toString()}`;
  }

  return (
    <form onSubmit={submit} onFocus={start} className="rounded-2xl border border-white/10 bg-[#030619]/65 p-3 md:p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-1.5">
          <span className="sr-only">Domain</span>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            value={domain}
            onChange={(e) => { setDomain(e.target.value); setError(""); }}
            placeholder="Your domain, e.g. example.com"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="sr-only">Work email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="Your work email"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Get my free report
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-300" role="alert">{error}</p> : null}
      <p className="mt-3 text-xs leading-5 text-slate-400">
        We send the report to your work email. You confirm the details on the next page.
      </p>
    </form>
  );
}
