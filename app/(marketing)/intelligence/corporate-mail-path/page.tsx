import type { Metadata } from "next";
import Link from "next/link";

import { Bar, Label, Note, P, Section, Table } from "@/components/research/parts";
import { OBSERVATORY_URL } from "@/lib/observatory-figures";
import { ORGANIZATION_ID } from "@/lib/organization";
import { STUDY, studyUrl, fmt, longDate } from "./data";

export const dynamic = "force-static";

const L = STUDY.layers;
const TITLE = `Email security gateways cover ${L.gateway.share}% of corporate domains. Microsoft and Google run the mailboxes for ${L.mailbox.share.toFixed(0)}%.`;
const DESCRIPTION =
  `The gateway market is concentrated but small. The mailbox layer behind it is eleven times larger and held by two companies. ` +
  `Observed 8 September 2026.`;

/** Observatory anchors this piece cites (confirmed on observatory.datazag.com/email, 2026-10-01). */
const OBS = {
  mailCapable: `${OBSERVATORY_URL}/email#mx_deliverable_unparked`,
  ownDomain: `${OBSERVATORY_URL}/email#mail_uncataloged_own_domain`,
  largestMx: `${OBSERVATORY_URL}/email#mail_uncataloged_largest_mx`,
  dmarcEnforced: `${OBSERVATORY_URL}/email#dmarc_enforced`,
};

export function generateMetadata(): Metadata {
  return {
    title: "2 companies run mail for 24% of corporate domains — Datazag",
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

export default function CorporateMailPathPage() {
  const s = STUDY;
  const observed = longDate(s.observedOn);

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
    about: ["Email security gateways", "Email hosting concentration", "Cyber accumulation risk"],
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
          <h1 className="mt-6 max-w-[24ch] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">{TITLE}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Every corporate domain sends its inbound mail through operators it does not control. We measured who they are across{" "}
            {millions(s.corporate.n)} corporate domains. The layer with a recognizable vendor list is small. The layer that is large has no
            vendor list at all.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-white/10 pt-5 font-mono text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-slate-500">Population</dt><dd className="text-slate-200">{fmt(s.corporate.n)} corporate domains</dd></div>
            <div><dt className="text-slate-500">Observed</dt><dd className="text-slate-200">{observed}</dd></div>
            <div><dt className="text-slate-500">Method</dt><dd className="text-slate-200">direct DNS observation</dd></div>
            <div><dt className="text-slate-500">Grain</dt><dd className="text-slate-200">domain, not organization</dd></div>
          </dl>
        </div>
      </section>

      {/* ---------- Key figures ---------- */}
      <section className="border-b border-white/10 py-14">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { n: L.singleOperator, k: "Corporate domains with a single mail operator. No second path.", c: "text-amber-300 border-amber-300" },
            { n: s.mailboxByMarket[0].combined, k: "Australian corporate domains whose mail runs through Microsoft or Google.", c: "text-amber-300 border-amber-300" },
            { n: `${s.pairing[0].pct.toFixed(1)}%`, k: "Barracuda-fronted domains that also run Microsoft 365 behind it.", c: "text-cyan-300 border-cyan-300" },
            { n: s.gatewayByMarket[1].share, k: "Share held by one domestic gateway vendor in Sweden.", c: "text-cyan-300 border-cyan-300" },
          ].map((f) => (
            <div key={f.k} className={`border-t-2 pt-4 ${f.c.split(" ")[1]}`}>
              <span className={`block font-mono text-4xl font-medium tabular-nums ${f.c.split(" ")[0]}`}>{f.n}</span>
              <span className="mt-3 block text-sm leading-6 text-slate-300">{f.k}</span>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <Label num="01">Two layers, one path, and both concentrate</Label>
        <P lede>
          Inbound mail passes through at most two commercial layers before it reaches a mailbox. A <strong className="text-white">security
          gateway</strong> may sit in front, filtering. Behind it sits the <strong className="text-white">mailbox platform</strong> that holds
          the mail. Each is a dependency the domain owner cannot swap quickly, and each concentrates differently.
        </P>
        <figure className="my-8 max-w-4xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">Share of {millions(s.corporate.n)} corporate domains</p>
          <Bar label="Behind a dedicated gateway" pct={L.gateway.share} tone="amber" display={`${L.gateway.share.toFixed(1)}%`} />
          <Bar label="On Microsoft or Google" pct={L.mailbox.share} tone="cyan" />
        </figure>
        <P>
          The gateway market behaves the way a specialist market is expected to: <strong className="text-white">{L.gateway.vendors} vendors,
          the top three holding {L.gateway.top3}</strong>, and a Herfindahl–Hirschman index of {L.gateway.hhi}. On that index, near zero means
          fragmented and 10,000 means one company holds everything. It is a textbook accumulation, and worth modeling.
        </P>
        <P>
          But it covers {L.gateway.share}% of corporate domains ({fmt(L.gateway.domains)}). The mailbox layer covers{" "}
          <strong className="text-white">{L.mailbox.share.toFixed(0)}%</strong>, split between Microsoft ({L.mailbox.microsoft}) and Google (
          {L.mailbox.google}). It is the layer almost nobody carries as a named dependency, because it is bought as productivity software, not
          as security infrastructure.
        </P>
        <blockquote className="my-8 max-w-3xl border-l-2 border-amber-300 pl-6 text-xl leading-8 text-white">
          A portfolio that models a gateway vendor as an accumulation and Microsoft as an IT expense has the exposure inverted by an order of
          magnitude.
        </blockquote>
      </Section>

      <Section>
        <Label num="02">The global share is a .com effect</Label>
        <P lede>
          One vendor holds {L.globalGatewayLeader} of the gateway market worldwide. That is real, and close to useless for a book written in one
          country, because {L.gatewayInCom} of the segment sits in .com: a namespace with no territory. Inside national markets, the picture
          changes completely.
        </P>
        <Table
          caption="Leading email security gateway by national market, share of that market's gateway-fronted domains. Country-code domains only; .com is left out because it carries no territory."
          head={["Market", "Gateway domains", "Leading vendor", "Share", "Runner-up", "Share"]}
          rows={s.gatewayByMarket.map((r) => [r.market, fmt(r.domains), r.leader, r.share, r.runnerUp, r.runnerShare])}
        />
        <P>
          Three of these are effectively single-vendor markets. A Swedish book is not exposed to the global leader at {L.globalGatewayLeader}. It
          is exposed to a domestic hosting company at {s.gatewayByMarket[1].share}. A Slovak book is exposed to one vendor at{" "}
          {s.gatewayByMarket[0].share}. Neither vendor appears near the top of a worldwide table.
        </P>
        <P>
          The United Kingdom is the opposite shape: a genuine two-vendor market at {s.gatewayByMarket[9].share} and{" "}
          {s.gatewayByMarket[9].runnerShare}, with a long tail beneath. Territory changes not just the numbers but the kind of risk, from a
          diversified market to a single point of failure.
        </P>
      </Section>

      <Section>
        <Label num="03">The mailbox layer, by market</Label>
        <P lede>The mailbox layer splits by country too, in the other direction.</P>
        <Table
          caption="Share of each market's corporate domains whose inbound mail runs through Microsoft or Google."
          head={["Market", "Corporate domains", "Microsoft", "Google", "Combined"]}
          rows={s.mailboxByMarket.map((r) => [r.market, fmt(r.domains), r.microsoft, r.google, r.combined])}
        />
        <P>
          For an Australian or Canadian book, this is the largest single correlated exposure, and it is not an email-security vendor at all.
          Germany is the reverse: {s.mailboxByMarket[8].combined}, with mail mostly on domestic hosting. A global average of{" "}
          {L.mailbox.share.toFixed(0)}% describes neither market.
        </P>
      </Section>

      <Section>
        <Label num="04">Two vendors, one delivery path</Label>
        <P lede>
          Where a gateway sits in front, the mailbox platform behind it can be read from the same DNS records. On a vendor list that looks like
          defense in depth: two suppliers, two contracts. It is one path, and if either end stops, mail stops.
        </P>
        <figure className="my-8 max-w-4xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
            Share of each gateway&rsquo;s customer domains that also run Microsoft 365 behind it
          </p>
          {s.pairing.map((p, i) => (
            <Bar key={p.vendor} label={p.vendor} pct={p.pct} tone={i === 0 ? "amber" : "cyan"} />
          ))}
        </figure>
        <P>
          <strong className="text-white">{s.pairedDomains.barracudaM365} domains depend on Barracuda and Microsoft 365 at once, and{" "}
          {s.pairedDomains.mimecastM365} on Mimecast and Microsoft 365.</strong> A book holding both concentrations is less diversified than a
          vendor-by-vendor view shows. Proofpoint is the counter-example at {s.pairing[3].pct}%: most of its estate sits on self-hosted and
          third-party mail.
        </P>
      </Section>

      <Section>
        <Label num="05">Almost nothing has a second path</Label>
        <P lede>Mail was designed to fail over. In practice it no longer does.</P>
        <P>
          <strong className="text-white">{L.singleOperator} of corporate domains list mail hosts that belong to exactly one operator.</strong>{" "}
          Where a domain lists several mail records, they are nearly always several machines of the same provider: resilient to a server
          failure, not to a provider-level outage. For nearly every domain, the operator delivers mail or the domain receives none.
        </P>
      </Section>

      <Section>
        <Label num="06">The same size of exposure can carry a different severity</Label>
        <P lede>
          Two operators of similar size do not front similar estates. What differs is how those domains were bought and run, and one measure of
          that is observable: whether the domain enforces DMARC, so that receivers refuse mail spoofing it.
        </P>
        <Table
          caption={`These columns describe each operator's customer estate, not its product. DMARC is configured by the domain owner, not the operator. Corporate population baselines on ${observed}: ${s.baseline.publishes} publish DMARC, ${s.baseline.enforces} enforce it.`}
          head={["Operator", "Domains", "Single operator", "Publishes DMARC", "Enforces DMARC"]}
          rows={s.estates.map((r) => [r.operator, fmt(r.domains), r.single, r.publishes, r.enforces])}
        />
        <P>
          The gateway segment as a whole enforces at {s.baseline.gatewaySegmentEnforces}, against {s.baseline.enforces} across all corporate
          domains. But the range inside the segment is wider than that gap: from {s.estates[1].enforces} down to {s.estates[11].enforces}.
          Operators sold as security to an organization that went looking for it front estates enforcing at 35–43%. Those whose filtering
          comes bundled with hosting or a managed-service channel front estates in the low single digits.
        </P>
        <Note title="Read enforcement, never presence">
          <p>
            {s.estates[11].publishes} of MX Hub&rsquo;s domains publish a DMARC policy, and {s.estates[11].enforces} enforce one. A policy that
            is published but not enforced is the default a provider can set for a customer; enforcement is a decision the owner has to make. A
            score built on DMARC presence would rank that estate among the best protected here. It is among the least.
          </p>
        </Note>
      </Section>

      <Section>
        <Label num="07">How this was measured, and what it does not show</Label>
        <P lede>
          Every figure comes from records the domains publish themselves. A domain&rsquo;s mail records name the hosts that accept its mail,
          and its sender policy names the platforms allowed to send as it. Reading both reconstructs the delivery path without touching a
          mailbox or asking anyone.
        </P>
        <ul className="my-6 max-w-3xl list-disc space-y-3 pl-5 text-base leading-7 text-slate-300 marker:text-cyan-300">
          <li><strong className="text-white">The population:</strong> {fmt(s.corporate.n)} corporate domains on {observed}. Each accepts mail through a usable mail server, is not parked, has a website address and publishes SPF: a domain deliberately operating email. The filter is not neutral across markets, because SPF is often set by the hosting provider rather than the organization.</li>
          <li><strong className="text-white">Domains, not organizations.</strong> One organization may hold hundreds of domains behind one gateway: one claim, not hundreds.</li>
          <li><strong className="text-white">Only what the mail records reveal.</strong> Email security delivered through the mailbox&rsquo;s own API, not by taking over mail routing, is invisible to this method. The gateway figures are a floor on email-security vendor exposure, not a market measurement.</li>
          <li><strong className="text-white">Country-code domains stand in for territory; .com does not.</strong> Confirm territorial figures against a book&rsquo;s own domicile data.</li>
          <li><strong className="text-white">{L.namedOperatorShare} of domains resolve to a named operator.</strong> Most of the rest run their own mail on a host serving only their domain. The largest unattributed operator is {L.largestUnattributed} of the population, so nothing of accumulation size is hiding in the tail.</li>
          <li><strong className="text-white">One observation, no trend.</strong> The figures describe {observed}. Movement between operators is not claimed here.</li>
          <li><strong className="text-white">A different date from our DMARC census.</strong> That census (1 October 2026) measured the same population definition later, so its corporate baselines differ slightly from the ones above.</li>
        </ul>
        <P>
          The Datazag Observatory tracks the mail layer daily: <ObsLink href={OBS.mailCapable}>domains that can take mail</ObsLink>, the share
          that <ObsLink href={OBS.ownDomain}>run mail on their own domain</ObsLink>, the{" "}
          <ObsLink href={OBS.largestMx}>largest uncataloged mail host</ObsLink>, and <ObsLink href={OBS.dmarcEnforced}>DMARC enforcement</ObsLink>.
          Its figures use their own measurement window.
        </P>
      </Section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight text-white md:text-4xl">See the mail path behind your own book</h2>
          <P lede>
            The dataset is one row per domain, joinable on the domain itself: the gateway, the mailbox platform, the pairing between them and
            DMARC enforcement. Send a domain list and we will return the concentration by vendor and by territory.
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
            Figures observed {observed} across {fmt(s.corporate.n)} corporate domains. Mail operator identity is derived from observed DNS
            records against an operator catalog maintained by Datazag. Vendor shares count the domains routing through each operator; they are
            not statements about revenue, customer count or product capability.
          </p>
        </div>
      </section>
    </main>
  );
}
