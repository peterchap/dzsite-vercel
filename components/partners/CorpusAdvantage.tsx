import { PUBLISHED_STATS } from "@/lib/site-stats";
import { loadIntelligenceFigures, OBSERVATORY_URL } from "@/lib/observatory-figures";

/**
 * THE SCARCE ASSET — what an MSSP's service stands on (site-edits brief,
 * 2026-09-25, Edit 2).
 *
 * This REPLACES the condensed Detection Quality block on /mssp-partners. That
 * block sold a detection sequence ending in "AI analyst review": the abundant
 * thing (everyone has AI) and a detection claim the false-positive
 * measurement does not yet back. This sells the scarce thing instead: very
 * few organizations hold the domain corpus, DNS history, certificate
 * transparency, BGP and provider attribution together, with the
 * relationships between them.
 *
 * HELD: any "we detect threats" / "alerts are solid" claim. It returns only
 * when the FP measurement supports it. Do not add an alert-quality line here.
 *
 * Every figure is read from a store — the R2 coverage feed (lib/site-stats)
 * or the Observatory statistics (lib/observatory-figures) — the same sources
 * as the homepage, so the numbers match across pages. A layer whose figure is
 * unavailable renders without a number rather than with an invented one.
 */
type Props = {
  /** Section eyebrow. Defaults are the MSSP page's. */
  eyebrow?: string;
  title?: string;
  intro?: string;
};

/**
 * Also used on /alerts and /brand-protection (2026-09-28): an alert is only as
 * good as what it is checked against, so those pages lead with the same asset.
 */
export async function CorpusAdvantage({
  eyebrow = "What your service stands on",
  title = "Very few organizations hold all of this.",
  intro = "Your clients’ domains are checked against all of these layers, not a single feed. Each layer is useful. Held together, with the links between them, they are hard to rebuild.",
}: Props = {}) {
  const figures = await loadIntelligenceFigures();
  const ct = figures?.certificateOnly ?? null;
  const s = PUBLISHED_STATS;

  const layers: Array<{ title: string; figure: string | null; unit?: string; text: string }> = [
    {
      title: "Domains",
      figure: s.domainsMonitored.display,
      unit: "live domains",
      text: "Domains that resolve. Names that no longer exist are left out. Measured daily.",
    },
    {
      title: "DNS history",
      figure: null,
      text: "Snapshots of each domain's records over time, with first-seen and last-seen dates.",
    },
    {
      title: "Certificate transparency",
      figure: ct?.value ?? null,
      unit: "domains no zone file lists",
      text: "Certificates show us names that the usual domain lists miss.",
    },
    {
      title: "BGP routing",
      figure: s.ipv4Indexed.display,
      unit: "IPv4 addresses in announced space",
      text: "Who announces each address block, counted once however many routes cover it.",
    },
    {
      title: "Network and provider attribution",
      figure: s.networksProfiled.display,
      unit: "networks profiled",
      text: "Each IP placed in the network that announces it, and each domain tied to the provider that runs its mail.",
    },
    {
      title: "Relationships",
      figure: null,
      text: "Shared IPs, certificates, name servers and providers link one domain to the rest.",
    },
  ];

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{intro}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer) => (
            <article key={layer.title} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/85">{layer.title}</h3>
              {layer.figure ? (
                <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  {layer.figure}
                  {layer.unit ? <span className="ml-2 text-sm font-medium text-slate-400">{layer.unit}</span> : null}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-slate-300">{layer.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-slate-400">
          Each figure is measured and dated.{" "}
          <a href={OBSERVATORY_URL} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
            See how in the Observatory →
          </a>
        </p>
      </div>
    </section>
  );
}
