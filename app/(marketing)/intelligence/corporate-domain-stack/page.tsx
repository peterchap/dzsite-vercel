import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { ORGANIZATION_ID } from "@/lib/organization";
import { STUDY, studyUrl, fmt, longDate } from "./data";

export const dynamic = "force-static";

const TITLE = "One company runs the nameservers, website and mail for one corporate domain in five";
/** e.g. "N.N million": built from the study data, never typed (checkCorpusDrift guards literals). */
const millions = (n: number) => `${(Math.floor(n / 100_000) / 10).toFixed(1)} million`;

const DESCRIPTION =
  `For ${STUDY.headline.oneCompanyThreeLayers.share} of corporate domains, one company runs the nameservers, the website and the mail. ` +
  `Measured across ${millions(STUDY.corpus.operating)} operating domains to 10 Sept 2026.`;

export function generateMetadata(): Metadata {
  return {
    title: "1 in 5 corporate domains rely on one company — Datazag",
    description: DESCRIPTION,
    alternates: { canonical: studyUrl() },
    robots: { index: true, follow: true },
    openGraph: { type: "article", url: studyUrl(), title: TITLE, description: DESCRIPTION, siteName: "Datazag" },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}


function Label({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold text-amber-300">{num}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">{children}</h2>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="relative border-b border-white/10 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function P({ children, lede }: { children: ReactNode; lede?: boolean }) {
  return <p className={`mb-5 max-w-3xl ${lede ? "text-lg leading-8 text-slate-200" : "text-base leading-7 text-slate-300"}`}>{children}</p>;
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <div className="text-base leading-7 text-slate-300">{children}</div>
    </div>
  );
}

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <figure className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-white/[0.04] font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-200">
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j} className="px-4 py-3 tabular-nums">{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-400">{caption}</figcaption>
    </figure>
  );
}

function Bar({ label, pct, tone }: { label: string; pct: number; tone: "amber" | "cyan" }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[200px_1fr_70px]">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <span className="col-span-2 block h-5 bg-white/[0.07] sm:col-span-1">
        <span className={`block h-full ${tone === "amber" ? "bg-amber-300/80" : "bg-cyan-300/80"}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="row-start-1 text-right font-mono text-sm tabular-nums text-slate-300 sm:col-start-3 sm:row-start-auto">{pct.toFixed(1)}%</span>
    </div>
  );
}

export default function CorporateDomainStackPage() {
  const s = STUDY;
  const observed = longDate(s.observedTo);

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
    about: ["DNS concentration", "Content delivery networks", "Email infrastructure", "Cyber accumulation risk"],
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
            Every domain depends on whoever answers its nameservers, whoever serves its website and whoever takes its mail.
            We measured all three across {millions(s.corpus.operating)} operating domains. The correlated exposure is not with the
            edge network everyone names first. It is with the registrar-and-hosting bundle, and it is national.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-white/10 pt-5 font-mono text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-slate-500">Population</dt><dd className="text-slate-200">{fmt(s.corpus.operating)} operating domains</dd></div>
            <div><dt className="text-slate-500">Corporate cut</dt><dd className="text-slate-200">{fmt(s.corpus.corporate)} domains</dd></div>
            <div><dt className="text-slate-500">Observed</dt><dd className="text-slate-200">to {observed}</dd></div>
            <div><dt className="text-slate-500">Grain</dt><dd className="text-slate-200">domain, not organization</dd></div>
          </dl>
        </div>
      </section>

      {/* ---------- Key figures ---------- */}
      <section className="border-b border-white/10 py-14">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { n: s.headline.oneCompanyThreeLayers.share, k: "Corporate domains where one company runs DNS, website and mail.", tone: "text-amber-300 border-amber-300" },
            { n: s.bundleByMarket[1].share, k: "The same, in Germany. One provider event reaches all three layers at once.", tone: "text-amber-300 border-amber-300" },
            { n: s.dns.singleOperator, k: "Operating domains with a single nameserver operator.", tone: "text-cyan-300 border-cyan-300" },
            { n: `${s.edge.operators[0].pct.toFixed(1)}%`, k: "CDN-fronted websites behind Cloudflare.", tone: "text-cyan-300 border-cyan-300" },
          ].map((f) => (
            <div key={f.k} className={`border-t-2 pt-4 ${f.tone.split(" ")[1]}`}>
              <span className={`block font-mono text-4xl font-medium tabular-nums ${f.tone.split(" ")[0]}`}>{f.n}</span>
              <span className="mt-3 block text-sm leading-6 text-slate-300">{f.k}</span>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <Label num="01">Three layers, and how often they collapse into one</Label>
        <P lede>
          A domain that is reachable at all relies on three commercial layers. <strong className="text-white">Nameservers</strong> answer
          for the name; if they stop, nothing on the domain resolves. The <strong className="text-white">website</strong> sits behind a
          content-delivery edge or directly on a hosting network. The <strong className="text-white">mail path</strong> takes the
          domain&rsquo;s email. Each is a dependency the owner cannot swap quickly. The question that matters is how often they belong to the
          same company.
        </P>
        <figure className="my-8 max-w-4xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
            Share of {millions(s.corpus.corporate)} corporate domains where one company spans the layers
          </p>
          <Bar label="Nameservers and mail" pct={36.6} tone="cyan" />
          <Bar label="Nameservers, website and mail" pct={20.4} tone="amber" />
          <Bar label="Nameservers, CDN edge and mail" pct={1.2} tone="amber" />
          <figcaption className="pt-2 text-xs leading-5 text-slate-400">
            &ldquo;Website&rdquo; is the edge operator where a CDN fronts the domain, and the hosting network otherwise. A domain counts once if
            any one company appears in every layer named.
          </figcaption>
        </figure>
        <P>
          The obvious candidate for one operator in all three layers is Cloudflare, which sells nameservers, the edge and mail routing.
          <strong className="text-white"> That triple exists and is tightly correlated:</strong> of corporate domains that route mail through
          Cloudflare, {s.headline.cloudflareMailAlsoNsEdge} also use it for nameservers and edge. But it covers{" "}
          {s.headline.cloudflareTriple.share} of corporate domains ({fmt(s.headline.cloudflareTriple.domains)}).
        </P>
        <P>
          The larger pattern is older and less discussed. <strong className="text-white">For one corporate domain in five
          ({fmt(s.headline.oneCompanyThreeLayers.domains)}), the same registrar or host answers the nameservers, serves the website and takes
          the mail.</strong> Three named dependencies, one company, one control plane.
        </P>
        <blockquote className="my-8 max-w-3xl border-l-2 border-amber-300 pl-6 text-xl leading-8 text-white">
          A portfolio that models Cloudflare as the correlated dependency, and the domain&rsquo;s host as an administrative detail, has the
          scale of the two exposures the wrong way round.
        </blockquote>
      </Section>

      <Section>
        <Label num="02">The bundle is national</Label>
        <P lede>
          The one-company stack is not spread evenly. It is a European, hosting-led pattern, and in the largest markets it is a dominant way a
          corporate domain is run.
        </P>
        <Table
          caption="Share of each market's corporate domains where one company runs nameservers, website and mail. Every national market with more than 900,000 corporate domains, down to the next largest share: Canada, at 10.6%."
          head={["Market", "Corporate domains", "One company, three layers", "Leading company"]}
          rows={s.bundleByMarket.map((r) => [r.market, fmt(r.domains), r.share, r.leader])}
        />
        <P>
          <strong className="text-white">For a German book, this is the largest correlated exposure in the dependency picture.</strong> Two in
          five corporate domains get nameservers, website and mailbox from one company. A control-plane event there is not three separate risks
          that happen to coincide; it is one event with three consequences.
        </P>
        <P>
          The worldwide mailbox platforms barely appear in this pattern. They run a great deal of corporate mail, but almost none of the
          nameservers or websites behind it. The domains most exposed to a single company are held by the hosts that sell the domain, the site
          and the mailbox as one product.
        </P>
      </Section>

      <Section>
        <Label num="03">The edge is one vendor, and much of it was inherited</Label>
        <P lede>
          {s.edge.frontedShare} of web domains sit behind a content-delivery edge ({fmt(s.edge.fronted)} of {fmt(s.corpus.webDomains)}). Among
          them the market is not concentrated in the ordinary sense. It is, for practical purposes, one vendor.
        </P>
        <figure className="my-8 max-w-4xl space-y-3">
          {s.edge.operators.map((o, i) => <Bar key={o.name} label={o.name} pct={o.pct} tone={i === 0 ? "amber" : "cyan"} />)}
          <figcaption className="pt-2 text-xs leading-5 text-slate-400">
            Share of CDN-fronted web domains by edge operator, identified from the website&rsquo;s own address. Shares for the smaller
            enterprise vendors are floors: this method sees part of their fronting.
          </figcaption>
        </figure>
        <P>
          Cloudflare holds more than 85% of the fronted segment in every market over 50,000 websites except Japan and Korea, where it still leads.
          What changes by territory is how much of a market is fronted at all: {s.edge.indonesiaFronted} of Indonesian websites against{" "}
          {s.edge.germanyFronted} of German ones.
        </P>
        <Note title="A fifth of the edge was never chosen by the domain owner">
          <p className="mb-3">
            About one domain in five behind Cloudflare ({fmt(s.edge.notChosen)}) sits on addresses Cloudflare announces for platforms and
            customers, outside its own published ranges. The largest single block is the address Shopify storefronts resolve to, which alone
            carries <strong className="text-white">{fmt(s.edge.shopifyBlock)} domains</strong>.
          </p>
          <p>A Shopify merchant depends on Cloudflare without having contracted with it, and no vendor questionnaire would surface that.</p>
        </Note>
        <P>
          Where a domain owner does choose Cloudflare directly, the layers fuse: {s.edge.cloudflareNsAlsoEdge} of websites whose nameservers
          Cloudflare runs are also served through its edge.
        </P>
      </Section>

      <Section>
        <Label num="04">Almost nothing has a second nameserver operator</Label>
        <P lede>
          The DNS protocol was built for redundancy, and organizations can buy it from two providers. The population almost never does.
        </P>
        <P>
          <strong className="text-white">{s.dns.singleOperator} of operating domains rely on a single nameserver operator.</strong> Of the{" "}
          {s.dns.twoOperators} that list two, two-thirds come from one website platform that runs its own nameservers across two providers: the
          owner inherits that redundancy rather than choosing it. Every enterprise that deliberately pairs providers is, at most,{" "}
          {s.dns.deliberatePairsAtMost} of the population.
        </P>
        <P>
          That shapes how a nameserver event belongs in a model. For nearly every domain, the operator answers or the name does not resolve, and
          with it the website, the mail and every other service on the domain. This is not hypothetical: in October 2016, an attack on the DNS
          provider Dyn made many major websites unreachable at the same time, across many unrelated companies.
        </P>
        <Note title="A third of the population runs on DNS nobody chose">
          <p>
            {s.dns.registrarDefault} of operating domains use their registrar&rsquo;s default nameservers: the configuration a domain gets when
            no one changes it. It is still a live operator dependency. Among domains whose owners did choose a DNS provider, Cloudflare answers
            for {s.dns.cloudflareAmongChosen}.
          </p>
        </Note>
      </Section>

      <Section>
        <Label num="05">DNS concentration is national, and sometimes sovereign</Label>
        <P lede>
          In several national markets, one operator answers for between a third and a half of all operating domains.
        </P>
        <Table
          caption={`Leading nameserver operator by national market, share of that market's operating domains. Country-code domains only; .com (${s.dns.comLeaderShare} on its largest operator) carries no territory signal.`}
          head={["Market", "Operating domains", "Leading operator", "Kind", "Share"]}
          rows={s.dnsByMarket.map((r) => [r.market, fmt(r.domains), r.leader, r.kind, r.share])}
        />
        <P>
          A Canadian or Indian portfolio carries around half of a single registrar&rsquo;s nameserver event, through default settings rather
          than purchasing decisions. And in Brazil, the leading nameserver operator is <strong className="text-white">the national registry
          itself</strong>, whose DNS answers for a quarter of the market: a sovereign dependency no vendor list would show.
        </P>
      </Section>

      <Section>
        <Label num="06">How this was measured, and what it does not show</Label>
        <P lede>
          Every figure comes from records the domains themselves publish. Nothing is surveyed, self-reported or inferred from a vendor&rsquo;s
          customer list.
        </P>
        <P>
          A domain&rsquo;s nameserver records name who answers for it. Its address record shows which network its website sits in, and for the
          major edge networks that address falls inside ranges the vendors publish themselves. Its mail records name who accepts its mail.
          Nameserver hosts are attributed to operators through a crosswalk curated in-house, which merges one operator&rsquo;s nameservers
          when they span several domain names. Parked domains and domains held for sale are removed first. The corporate cut is the
          domains that also publish a working mail server and an SPF record: the ones a business runs.
        </P>
        <P>
          Datazag tracks {fmt(s.corpus.tracked)} domains. {fmt(s.corpus.resolved)} resolved at their latest observation; the other{" "}
          {fmt(s.corpus.notResolved)} returned NXDOMAIN, SERVFAIL or a timeout. DNS and edge were observed from {longDate(s.observedFrom)} to{" "}
          {observed}, one observation per domain (the latest).
        </P>
        <ul className="my-6 max-w-3xl list-disc space-y-3 pl-5 text-base leading-7 text-slate-300 marker:text-cyan-300">
          <li><strong className="text-white">Domains, not organizations.</strong> One organization may hold hundreds of defensive registrations behind one operator: one claim, not hundreds.</li>
          <li><strong className="text-white">The edge is read from the website&rsquo;s own address.</strong> That sees the largest networks almost completely, but misses some enterprise deployments that front only a <code className="font-mono text-[0.9em]">www</code> alias. Shares for the smaller edge vendors are floors.</li>
          <li><strong className="text-white">Registrar-default nameservers count as a dependency,</strong> because they are one.</li>
          <li><strong className="text-white">A small share of nameservers is not yet named.</strong> {s.dns.unnamedOperatorShare} of operating domains touch an operator identified only by its domain name. The largest is {s.dns.largestUnnamed} of the population, so nothing of accumulation size is hiding.</li>
          <li><strong className="text-white">Country-code domains stand in for territory; .com does not.</strong> Confirm territorial figures against a book&rsquo;s own domicile data.</li>
          <li><strong className="text-white">No change over time.</strong> This is one observation per domain. Movement between operators is not claimed, because the history that would support it is not yet captured at the grain it needs.</li>
        </ul>
      </Section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight text-white md:text-4xl">Run your own book against it</h2>
          <P lede>
            The dataset is one row per domain, joinable on the domain itself, with the operator in each layer. We can run a book against the
            population and return its operator concentration across nameservers, edge and mail, by territory, with the correlated stacks
            identified. A domain list is all that is required.
          </P>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/cyber-risk-underwriting" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              Concentration for insurers
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
              Send us a domain list
            </Link>
          </div>
          <p className="mt-12 max-w-3xl border-t border-white/10 pt-6 text-xs leading-6 text-slate-500">
            Figures observed to {observed} across {fmt(s.corpus.tracked)} tracked domains, of which {fmt(s.corpus.resolved)} resolved at their
            latest observation and {fmt(s.corpus.operating)} are operating domains. The corporate cut is the {fmt(s.corpus.corporate)} domains that
            resolve, are not parked, and publish a working mail server and an SPF record. Operator identity is derived from observed DNS records and vendors&rsquo; own published address ranges, against a
            crosswalk maintained by Datazag. Operator shares describe the number of domains that depend on each operator; they are not
            statements about revenue, customer count or service quality.
          </p>
        </div>
      </section>
    </main>
  );
}
