import type { Metadata } from "next";
import Link from "next/link";

import { Bar, Label, Note, P, Section, Table } from "@/components/research/parts";
import { OBSERVATORY_URL } from "@/lib/observatory-figures";
import { ORGANIZATION_ID } from "@/lib/organization";
import { STUDY, studyUrl, fmt, longDate } from "./data";

export const dynamic = "force-static";

const h = STUDY.headline;
const TITLE = `${h.primaryPublish.toFixed(1)}% of domains publish DMARC. Only ${h.primaryEnforce.toFixed(1)}% enforce it.`;
const DESCRIPTION =
  `A census of resolving, unparked domains: a quarter publish DMARC, but about half of those only report spoofing and do not ` +
  `block it. Measured 1 October 2026.`;

/** Observatory anchors this piece cites (confirmed on observatory.datazag.com/email, 2026-10-01). */
const OBS = {
  dmarcUnparked: `${OBSERVATORY_URL}/email#dmarc_present_unparked`,
  spfUnparked: `${OBSERVATORY_URL}/email#spf_present_unparked`,
  dmarcEnforced: `${OBSERVATORY_URL}/email#dmarc_enforced`,
  dmarcNone: `${OBSERVATORY_URL}/email#dmarc_none`,
};

export function generateMetadata(): Metadata {
  return {
    title: "25% of domains publish DMARC; 13% enforce it — Datazag",
    description: DESCRIPTION,
    alternates: { canonical: studyUrl() },
    robots: { index: true, follow: true },
    openGraph: { type: "article", url: studyUrl(), title: TITLE, description: DESCRIPTION, siteName: "Datazag" },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

/** e.g. "N.N million": built from the study data, never typed (checkCorpusDrift guards literals). */
const millions = (n: number) => `${(Math.floor(n / 100_000) / 10).toFixed(1)} million`;

function ObsLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
      {children}
    </a>
  );
}

export default function DmarcAdoptionPage() {
  const s = STUDY;
  const census = longDate(s.censusOn);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    url: studyUrl(),
    datePublished: s.publishedOn,
    dateModified: s.publishedOn,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: studyUrl(),
    about: ["DMARC", "SPF", "Email authentication", "Email spoofing"],
  };

  return (
    <main className="relative overflow-hidden bg-[#030619] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* ---------- Hero ---------- */}
      <section className="relative border-b border-white/10 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(251,191,36,0.10),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(45,212,191,0.10),transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            Datazag research · Published {longDate(s.publishedOn)}
          </p>
          <h1 className="mt-6 max-w-[22ch] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">{TITLE}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            DMARC is how a domain tells the world&rsquo;s mail servers what to do with mail that pretends to come from it. Publishing a
            DMARC record is easy. Telling receivers to block the fakes is the step that protects anyone. We checked every resolving,
            unparked domain: about half of the domains that publish DMARC stop at the first step.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-white/10 pt-5 font-mono text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-slate-500">Population</dt><dd className="text-slate-200">{fmt(s.primary.n)} resolving, unparked domains</dd></div>
            <div><dt className="text-slate-500">Method</dt><dd className="text-slate-200">census, not a sample</dd></div>
            <div><dt className="text-slate-500">Census taken</dt><dd className="text-slate-200">{census}</dd></div>
            <div><dt className="text-slate-500">Grain</dt><dd className="text-slate-200">domain, not organization</dd></div>
          </dl>
        </div>
      </section>

      {/* ---------- Key figures ---------- */}
      <section className="border-b border-white/10 py-14">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { n: `${h.primaryPublish.toFixed(1)}%`, k: "of resolving, unparked domains publish a DMARC record.", c: "text-cyan-300 border-cyan-300" },
            { n: `${h.primaryEnforce.toFixed(1)}%`, k: "tell receivers to quarantine or reject mail that fails.", c: "text-amber-300 border-amber-300" },
            { n: `${h.primaryNone.toFixed(1)}%`, k: "publish p=none: they ask for reports, and block nothing.", c: "text-amber-300 border-amber-300" },
            { n: `${h.spfPrimary.toFixed(1)}%`, k: "publish SPF, the list of servers allowed to send as the domain.", c: "text-cyan-300 border-cyan-300" },
          ].map((f) => (
            <div key={f.k} className={`border-t-2 pt-4 ${f.c.split(" ")[1]}`}>
              <span className={`block font-mono text-4xl font-medium tabular-nums ${f.c.split(" ")[0]}`}>{f.n}</span>
              <span className="mt-3 block text-sm leading-6 text-slate-300">{f.k}</span>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <Label num="01">Adoption is not protection</Label>
        <P lede>
          A DMARC record carries a policy. <strong className="text-white">p=none</strong> asks receivers to send reports about mail that
          fails the checks, and to deliver it anyway. <strong className="text-white">p=quarantine</strong> and{" "}
          <strong className="text-white">p=reject</strong> ask them to put that mail in spam or refuse it. Only the last two stop someone
          sending mail as your domain.
        </P>
        <figure className="my-8 max-w-4xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
            {millions(s.primary.n)} resolving, unparked domains
          </p>
          <Bar label="Publish DMARC" pct={h.primaryPublish} tone="cyan" />
          <Bar label="Enforce it" pct={h.primaryEnforce} tone="amber" />
          <Bar label="Report only (p=none)" pct={h.primaryNone} tone="amber" />
        </figure>
        <P>
          Across this population, {h.primaryEnforceOfPublishers} of the domains that publish DMARC enforce it. The rest are watching, not
          blocking. p=none is a sensible first step while an organization finds all the services that send its mail. It is not meant to be
          where a domain stays.
        </P>
      </Section>

      <Section>
        <Label num="02">For domains that run mail, the gap is wider</Label>
        <P lede>
          The population above includes many domains that send no mail at all. A domain like that often publishes p=reject on purpose, so no
          one can send as it, or because its registrar set it by default. That lifts the enforcement figure without protecting anyone&rsquo;s
          real mail.
        </P>
        <P>
          So we also measured the {fmt(s.corporate.n)} domains that actually run mail: they resolve, are not parked, have an address record (A),
          a working mail server and an SPF record. Among them, <strong className="text-white">{h.corporatePublish.toFixed(1)}% publish DMARC,
          but only {h.corporateEnforce.toFixed(1)}% enforce it</strong>. That is {h.corporateEnforceOfPublishers} of publishers. Report-only
          policies outnumber enforcing ones by about two to one ({h.corporateNone.toFixed(1)}% against {h.corporateEnforce.toFixed(1)}%).
        </P>
        <Note title="Why the two populations disagree">
          <p>
            In Germany, {s.deReject.primary} of resolving, unparked domains publish p=reject, but only {s.deReject.corporate} of the domains
            that run mail do. Much of the high figure is defensive: domains that send nothing, closed to spoofing. Each figure on this page
            names its population, and the two are never mixed in one claim.
          </p>
        </Note>
        <Table
          caption={`Email authentication, census taken ${census}. Resolving, unparked: n = ${fmt(s.primary.n)}. Domains that run mail: n = ${fmt(s.corporate.n)}, a subset of the first.`}
          head={["Record", "Resolving, unparked", "Domains that run mail"]}
          rows={s.global.map((g) => [g.label.trim(), g.primary, g.corporate])}
        />
      </Section>

      <Section>
        <Label num="03">Where enforcement is high, and where it is not</Label>
        <P lede>
          The share of domains that enforce DMARC varies more than tenfold between countries. Market is the last part of the domain name, so
          .co.uk counts as the United Kingdom. Rankings include markets of at least 200,000 domains.
        </P>
        <div className="grid gap-6 lg:grid-cols-2">
          <Table caption="Highest DMARC enforcement, resolving and unparked domains." head={["Market", "Enforcing"]} rows={s.primaryTop.map((r) => [r.market, r.share])} />
          <Table caption="Lowest DMARC enforcement, resolving and unparked domains." head={["Market", "Enforcing"]} rows={s.primaryBottom.map((r) => [r.market, r.share])} />
        </div>
        <Table
          caption={`Published against enforcing, resolving and unparked domains. Generic domains: .com ${s.gtlds.com}, .net ${s.gtlds.net}, .org ${s.gtlds.org}, other generic ${s.gtlds.other} enforcing.`}
          head={["Market", "Publish DMARC", "Enforce it"]}
          rows={s.primarySelected.map((r) => [r.market, r.published, r.enforcing])}
        />
        <P>
          <strong className="text-white">Italy shows the gap most clearly.</strong> Nearly half of Italian domains publish DMARC, and fewer
          than one in seventeen enforce it. Among Italian domains that run mail, {s.corporateBottom[0].note}, and{" "}
          {s.corporateBottom[0].share} enforce.
        </P>
        <div className="grid gap-6 lg:grid-cols-2">
          <Table caption="Highest DMARC enforcement, domains that run mail." head={["Market", "Enforcing"]} rows={s.corporateTop.map((r) => [r.market, r.share])} />
          <Table
            caption="Lowest DMARC enforcement, domains that run mail."
            head={["Market", "Enforcing", "Note"]}
            rows={s.corporateBottom.map((r) => [r.market, r.share, "note" in r ? r.note : ""])}
          />
        </div>
        <P>
          For domains that run mail in the largest markets: the United Kingdom publishes at {s.corporateSelected[0].published} and enforces
          at {s.corporateSelected[0].enforcing}; Germany at {s.corporateSelected[1].published} and {s.corporateSelected[1].enforcing}; .com
          at {s.corporateSelected[2].published} and {s.corporateSelected[2].enforcing}.
        </P>
      </Section>

      <Section>
        <Label num="04">The rest of the stack is thinner still</Label>
        <P lede>
          DMARC rests on SPF and DKIM, and newer standards build on top of it. Their adoption falls away quickly.
        </P>
        <figure className="my-8 max-w-4xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">Resolving, unparked domains</p>
          <Bar label="SPF published" pct={42.69} tone="cyan" />
          <Bar label="SPF ends in -all" pct={14.32} tone="cyan" />
          <Bar label="DNSSEC signed" pct={8.83} tone="cyan" />
          <Bar label="BIMI published" pct={0.053} tone="amber" display="0.053%" />
          <Bar label="MTA-STS enforcing" pct={0.044} tone="amber" display="0.044%" />
        </figure>
        <P>
          SPF ending in <strong className="text-white">-all</strong> tells receivers to reject mail from any server not on the list. A third
          of the domains that publish SPF go that far. MTA-STS, which forces encrypted delivery to the domain, and BIMI, which puts a brand
          logo beside authenticated mail, are each below one domain in a thousand.
        </P>
        <Note title="DNSSEC follows the registry">
          <p className="mb-3">
            DNSSEC is high where the registry makes it cheap or automatic: Denmark {s.dnssecTop[0].share}, Czechia {s.dnssecTop[1].share},
            Sweden {s.dnssecTop[2].share}, the Netherlands {s.dnssecTop[3].share}. It is low in the United Kingdom ({s.dnssecLow[0].share}),
            Germany ({s.dnssecLow[1].share}) and Australia ({s.dnssecLow[2].share}).
          </p>
          <p>These figures describe each territory&rsquo;s estate and its registry&rsquo;s policy and pricing, more than any organization&rsquo;s choice.</p>
        </Note>
      </Section>

      <Section>
        <Label num="05">How this was measured, and what it does not show</Label>
        <P lede>
          Every figure comes from records the domains themselves publish in DNS. Nothing is surveyed or self-reported.
        </P>
        <P>
          This is a census, not a sample: every domain in the Datazag corpus that meets the population definition, read on {census}. Each
          value is that domain&rsquo;s latest observation. The corpus is re-resolved on a rolling cycle of roughly 30 to 45 days, so the
          census was taken on one day, but not every domain was checked that day.
        </P>
        <ul className="my-6 max-w-3xl list-disc space-y-3 pl-5 text-base leading-7 text-slate-300 marker:text-cyan-300">
          <li><strong className="text-white">Resolving, unparked domains:</strong> registrable domains that resolved at their latest observation and are not detected as parked. Some parked domains held for sale are missed by that detection and remain in; the effect on these rates is not measured.</li>
          <li><strong className="text-white">Domains that run mail:</strong> the same, plus an address record (A), a working mail server (a null MX does not count) and an SPF record.</li>
          <li><strong className="text-white">Enforcing</strong> means p=quarantine or p=reject, read from the DMARC record&rsquo;s policy tag.</li>
          <li><strong className="text-white">Domains, not organizations.</strong> One organization may hold many domains, each with its own records.</li>
          <li><strong className="text-white">Markets</strong> use the last label of the registrable domain. Country-code domains sold for generic use (.co, .io, .ai, .me, .tv, .cc, .sh) are left out of rankings, and so is .cn, where most resolving domains send no mail.</li>
          <li><strong className="text-white">No trend.</strong> This is one census. Movement over time is not claimed here.</li>
        </ul>
        <P>
          The Datazag Observatory tracks the main rates daily:{" "}
          <ObsLink href={OBS.dmarcUnparked}>DMARC published</ObsLink>,{" "}
          <ObsLink href={OBS.dmarcEnforced}>DMARC enforced</ObsLink>,{" "}
          <ObsLink href={OBS.dmarcNone}>p=none</ObsLink> and{" "}
          <ObsLink href={OBS.spfUnparked}>SPF published</ObsLink>. Its daily figures use their own measurement window and can differ
          slightly from this census.
        </P>
      </Section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight text-white md:text-4xl">Check the domains you care about</h2>
          <P lede>
            The same records, per domain: which of your domains, your customers&rsquo; or your clients&rsquo; publish DMARC, which enforce it,
            and which only report. Each finding shows the record it was read from.
          </P>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#free-report" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              Check one domain free
            </Link>
            <Link href="/esp-partners" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              For email platforms
            </Link>
            <Link href="/mssp-partners" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              For MSSPs
            </Link>
          </div>
          <p className="mt-12 max-w-3xl border-t border-white/10 pt-6 text-xs leading-6 text-slate-500">
            Census taken {census} from the Datazag DNS corpus. Resolving, unparked domains: {fmt(s.primary.n)}. Domains that run mail:{" "}
            {fmt(s.corporate.n)}. Each value is the domain&rsquo;s latest observation. Shares describe numbers of domains; they are not
            statements about how much mail any domain sends or receives.
          </p>
        </div>
      </section>
    </main>
  );
}
