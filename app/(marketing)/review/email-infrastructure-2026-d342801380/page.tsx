import { ReviewReport, reviewMetadata } from "../_report";

/**
 * Review link for Forbes Media: consent to the use of Forbes Global 2000 (2026)
 * data before formal publication. Hidden; see ../_report.tsx for how.
 */
export const metadata = reviewMetadata(
  "Review draft: Who Really Runs Business Email? — Datazag Insights",
  "Confidential pre-publication review draft. Not for distribution.",
);

export default function ForbesReviewPage() {
  return (
    <ReviewReport
      eyebrow="Datazag Insights · Review draft · October 2026"
      banner={
        <>
          <strong className="font-semibold">Confidential review draft.</strong> This page is not published or indexed. Please do
          not share the link.
        </>
      }
    >
      <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          How this report uses the Forbes Global 2000
        </p>
        <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
          <li>The Forbes Global 2000 list (2026) supplies the company sample: rank, name, country, industry and listed website.</li>
          <li>
            Each company&apos;s mail records were then read by Datazag from public DNS. All mail measurements are Datazag&apos;s
            own observations.
          </li>
          <li>
            Only aggregates are published, by rank band and by country of headquarters. No company-level result is named or
            published.
          </li>
          <li>
            Forbes is credited in the text and in a citation: &ldquo;Based on data analyzed from the Forbes Global 2000 list
            (2026)&rdquo; and &ldquo;Forbes Media LLC. (2026). &lsquo;The Global 2000.&rsquo; Forbes.com.&rdquo; See pages 3 and
            23.
          </li>
        </ul>
      </div>
    </ReviewReport>
  );
}
