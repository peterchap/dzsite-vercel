"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Lock, Loader2 } from "lucide-react";
import type { LookupResult } from "@/app/api/try-lookup/route";

const SESSION_KEY = "dz-try-lookups";

const FAQS = [
  { q: "Why are some fields hidden?", a: "The visible attributes are things any technical evaluator can verify against public sources — DNS, certificates, hosting, routing posture. The hidden attributes are Datazag-specific analysis: risk scoring, brand attribution, threat-feed correlation, infrastructure neighbourhoods. Those are available via the API, the Full Health Report, and our Alerts product." },
  { q: "Can I look up multiple domains?", a: "Anonymous lookups are limited to one per session. Provide an email and you get five lookups per day. Portal account holders get unlimited lookups." },
  { q: "How fresh is this data?", a: "Most attributes refresh continuously. DNS records are typically less than an hour old; certificates are within 10 seconds of issuance via CertStream; routing data refreshes from BGP within minutes." },
  { q: "Can I use this as my threat-intel feed?", a: "No — the demo is a one-domain-at-a-time evaluation tool. For programmatic access at scale, use the API or cloud marketplace data shares." },
  { q: "What if the domain doesn't exist or isn't resolving?", a: "The demo will show what's available — sometimes registration data exists for a domain that doesn't currently resolve, or historical data persists. If nothing is available, the lookup returns gracefully with a no-data message." },
  { q: "Can I share these results?", a: "Results are session-only by default. Provide an email to enable saved lookups and shareable links." },
];

function TierBadge({ tier }: { tier: number }) {
  if (tier === 2) return <span className="ml-2 rounded-full border border-cyan-400/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cyan-300">summary</span>;
  if (tier === 3) return <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400"><Lock className="h-3 w-3" /> locked</span>;
  return null;
}

export default function TryDemo() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [email, setEmail] = useState("");

  const lookupCount = (): number => {
    if (typeof window === "undefined") return 0;
    return Number(sessionStorage.getItem(SESSION_KEY) || "0");
  };
  const gated = !emailUnlocked && lookupCount() >= 1;

  async function runLookup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/try-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Lookup failed. Try again.");
      } else {
        setResult(data);
        if (typeof window !== "undefined") sessionStorage.setItem(SESSION_KEY, String(lookupCount() + 1));
      }
    } catch {
      setError("Lookup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-950 text-white">
      {/* Hero + input */}
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-mono uppercase tracking-widest text-cyan-400">Real-time lookup · 50+ attributes · One query at a time</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">See what Datazag knows about any domain</h1>
          <p className="mt-5 text-lg text-slate-300">
            Enter a domain to see 50+ infrastructure attributes — DNS, certificates, hosting, routing posture, email authentication, platform classification — straight from the Datazag Graph.
          </p>

          {!gated ? (
            <form onSubmit={runLookup} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="text"
                inputMode="url"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., microsoft.com"
                className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                aria-label="Domain to look up"
              />
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-3 font-semibold text-white disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />} Look up
              </button>
            </form>
          ) : (
            <div className="mx-auto mt-8 max-w-xl rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm text-slate-300">Want to look up another domain? Provide your email to unlock five more lookups today.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setEmailUnlocked(true); }} className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" aria-label="Work email" />
                <button type="submit" className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-white hover:bg-white/5">Continue with email</button>
              </form>
            </div>
          )}
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{result.domain}</h2>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{result.status}</span>
            </div>
            {result.stub && (
              <p className="mb-6 rounded-lg border border-dashed border-white/15 bg-black/30 px-4 py-2 text-xs italic text-slate-400">
                Preview data — live lookup wiring pending. Field names and visibility tiers shown are illustrative and subject to sign-off.
              </p>
            )}
            <div className="space-y-3">
              {result.sections.map((sec, i) => (
                <details key={sec.id} open={i === 0} className="group rounded-xl border border-white/10 bg-black/30">
                  <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-white">{sec.title}</summary>
                  <dl className="divide-y divide-white/5 border-t border-white/5 px-5 py-2">
                    {sec.attributes.map((a) => (
                      <div key={a.name} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                        <dt className="flex items-center text-sm text-slate-300">{a.name}<TierBadge tier={a.tier} /></dt>
                        <dd className="text-sm text-slate-400">
                          {a.tier === 3 ? (
                            <Link href="/health-report" className="text-cyan-400 hover:underline">Available via API or Full 360 Health Report</Link>
                          ) : (
                            <span className="font-mono text-xs">{a.value}</span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Downstream routing */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold">What next?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "See the full picture", d: "Get the Full 360 Health Report for this domain with all attributes, reasoning and remediation guidance.", l: "Get the Full Report", href: "/health-report" },
              { t: "Integrate at scale", d: "Consume Datazag intelligence via API, webhook or cloud marketplace data share.", l: "See data products", href: "/infrastructure-intelligence" },
              { t: "Build with us", d: "MSSP, ESP, insurer or IT services provider? See how Datazag intelligence powers your customer relationships.", l: "See partner programmes", href: "/mssp-partners" },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="text-lg font-bold text-white">{c.t}</h3>
                <p className="mt-2 text-sm text-slate-400">{c.d}</p>
                <Link href={c.href} className="mt-4 inline-block text-sm font-semibold text-cyan-400 hover:underline">{c.l} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold">What you&apos;re seeing — and what&apos;s deeper</h2>
          <p className="mt-4 text-slate-300">
            The lookup above shows the breadth of what Datazag captures for any domain: DNS records, certificate context, hosting and routing infrastructure, email authentication posture, and provenance signals — 50+ attributes drawn from the same 330M+ domain corpus that powers the rest of our products.
          </p>
          <p className="mt-4 text-slate-300">
            What&apos;s deliberately not shown: risk scoring with full reasoning, brand and platform impersonation attribution, threat-feed cross-references, related-infrastructure cluster analysis, and the full Datazag Graph edge data. These are available via API, in the Full 360 Health Report, and as input to our Alerts product.
          </p>
          <p className="mt-4 font-semibold text-white">The demo is breadth on demand. The products are depth at scale.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-white/10 bg-black/30 p-6">
                <h3 className="font-medium text-white">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
