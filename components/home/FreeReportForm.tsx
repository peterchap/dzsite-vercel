"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { appendAttribution } from "@/lib/attribution";
import { currentPageReturnTo } from "@/lib/portal-return-to";

// The same hand-off as DomainHealthReportCta: the portal's /threat-report page holds
// consent, Turnstile and generation. This form only collects the work email and passes
// it across prefilled, with return_to. No new backend.
//
// The free report covers the domain of the work email and no other (PC, 2026-10-14);
// the portal enforces it. There is deliberately no domain field.
const portalReportUrl =
  process.env.NEXT_PUBLIC_PORTAL_REPORT_URL || "https://portal.datazag.com/threat-report";

const inputClass =
  "min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20";

function domainOf(email: string): string {
  return email.includes("@") ? email.split("@").pop()!.trim().toLowerCase() : "";
}

export function FreeReportForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const started = useRef(false);
  const reportDomain = domainOf(email);

  function start() {
    if (started.current) return;
    started.current = true;
    track("free_report_form_start", { location: "home" });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reportDomain.includes(".")) {
      setError("Enter a valid work email address.");
      return;
    }
    track("free_report_form_submit", { location: "home" });
    const params = new URLSearchParams({ email: email.trim(), return_to: currentPageReturnTo() });
    // The campaign tags travel with the hand-off, so the portal records them with or without consent.
    window.location.assign(`${portalReportUrl}?${appendAttribution(params).toString()}`);
  }

  return (
    <form onSubmit={submit} onFocus={start} className="rounded-2xl border border-white/10 bg-[#030619]/65 p-3 md:p-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
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
        {reportDomain.includes(".") ? (
          <>The report covers <strong className="font-semibold text-slate-200">{reportDomain}</strong>, the domain of your email. </>
        ) : (
          <>The report covers the domain of your work email. </>
        )}
        You confirm the details on the next page. We&apos;ll email your report and a short follow-up about it.
        Unsubscribe any time. <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-white">Privacy policy</Link>
      </p>
    </form>
  );
}
