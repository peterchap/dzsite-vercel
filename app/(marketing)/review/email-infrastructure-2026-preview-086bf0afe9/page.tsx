import { ReviewReport, reviewMetadata } from "../_report";

/**
 * General pre-publication link: embargoed press, analysts and partners.
 * Hidden; see ../_report.tsx for how. Its own token, so it can be withdrawn
 * without touching any other review link.
 */
export const metadata = reviewMetadata(
  "Embargoed preview: Who Really Runs Business Email? — Datazag Insights",
  "Pre-publication copy under embargo. Not for distribution.",
);

export default function PreviewPage() {
  return (
    <ReviewReport
      eyebrow="Datazag Insights · Embargoed preview · October 2026"
      banner={
        <>
          <strong className="font-semibold">Embargoed pre-publication copy.</strong> Please do not publish, quote or share this
          report or link until Datazag publishes it.
        </>
      }
    >
      <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Before you write</p>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
          <li>Every share in the report names its population. Please quote a figure with its population.</li>
          <li>
            Company figures cover the 2,000 largest listed companies by number of employees (ranking: CompaniesMarketCap.com,
            used with permission). Please credit them as &ldquo;Datazag analysis&rdquo;.
          </li>
          <li>
            Charts may be reused with Datazag attribution. The live figures are in the{" "}
            <a href="https://observatory.datazag.com" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Datazag Observatory
            </a>
            .
          </li>
        </ul>
      </div>
    </ReviewReport>
  );
}
