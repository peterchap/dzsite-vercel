import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Enquiry Received — Datazag",
  description: "Confirmation that a Datazag enquiry has been received.",
};

export default function ContactThanksPage() {
  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(55,222,245,0.18),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(93,73,255,0.14),transparent_34%)]" />
      </div>

      <section className="relative py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-cyan-950/20 md:p-12">
            <p className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
              Enquiry received
            </p>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white md:text-6xl">Thanks — we have received your enquiry.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Datazag will route it by the enquiry type you selected: report, alerts, infrastructure intelligence, API, data share, partner route or marketplace offer.
            </p>

            <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
              {[
                { title: "Route", text: "We match the enquiry to the right product path." },
                { title: "Review", text: "We use the scope and context you supplied to avoid a generic follow-up." },
                { title: "Respond", text: "The next step may be a report, pilot, schema review, partner discussion or private offer." },
              ].map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-[#030619]/60 p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-200">0{index + 1}</div>
                  <h2 className="text-base font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/reports/sample" className="inline-flex items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                View sample report
              </a>
              <a href="/" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Back to home
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
