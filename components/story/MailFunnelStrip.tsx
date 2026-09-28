import { loadIntelligenceFigures } from "@/lib/observatory-figures";

const STAGES = [
  "publish a mail (MX) record",
  "can actually receive mail",
  "can receive mail and are not parked",
] as const;

/**
 * The mail funnel as a single strip, for pages that sell email intelligence
 * (/esp-partners). Same figures and source as the homepage IntelligenceSection:
 * Observatory statistics, read at build, never typed. Renders nothing when the
 * funnel is not complete — a funnel with a missing stage is a different claim.
 */
export async function MailFunnelStrip() {
  const figures = await loadIntelligenceFigures();
  const funnel = figures?.mailFunnel;
  if (!funnel) return null;

  return (
    <section className="border-t border-white/10 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Email intelligence</p>
        <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
          A domain with an MX record is not a mailbox.
        </h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {funnel.map((figure, i) => (
            <div key={figure.id} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
              <dd className={`font-semibold tabular-nums tracking-tight text-white ${i === 2 ? "text-4xl" : "text-3xl"}`}>
                {figure.value}
              </dd>
              <dt className="mt-2 text-sm leading-6 text-slate-300">domains {STAGES[i]}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-6 text-slate-400">
          We classify every domain this way, so you know which ones can really take mail.
          {figures?.asOf ? <> Figures as of {figures.asOf}. </> : " "}
          <a href={funnel[2].href} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
            Method and caveats →
          </a>
        </p>
      </div>
    </section>
  );
}
