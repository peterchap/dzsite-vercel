import Link from "next/link";

import { TrackedLink } from "@/components/home/TrackedLink";
import { FoundingCard } from "@/components/pricing/FoundingCard";
import { CurrencyText } from "@/components/ui/CurrencyText";
import { BOOKING_CLICK_EVENT, BOOK_CALL_LABEL, bookingHref, withSrc, type PartnerSrc } from "@/lib/booking";
import { offerIds, type LinkedCopy, type PartnerOffer } from "@/lib/partner-offers";
import { foundingOffer, foundingPrice, foundingSeatsLeft, foundingSeatsLine, offerFromPrices, offerPrice, type FoundingOffer, type OfferPrice } from "@/lib/pricing";

// The priced ending of a partner page (brief: partner page closing sections, 13 Oct 2026):
// an offer card, a booking action, what happens next, and short answers. A compact form
// sits mid-page. Prices render from product ids through lib/pricing.ts, and follow the
// visitor's currency like the pricing page. No price is typed here or in a partner page.

const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200";
const secondaryButton = "inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-center text-sm font-semibold text-white transition hover:bg-white/[0.08]";

/** Copy with one linked phrase. Without a link, or if the phrase is missing, plain text. */
export function LinkedText({ copy }: { copy: LinkedCopy }) {
  const at = copy.link ? copy.text.indexOf(copy.link.text) : -1;
  if (!copy.link || at < 0) return <>{copy.text}</>;
  return (
    <>
      {copy.text.slice(0, at)}
      <Link href={copy.link.href} className="font-semibold text-cyan-200 underline-offset-4 hover:underline">{copy.link.text}</Link>
      {copy.text.slice(at + copy.link.text.length)}
    </>
  );
}

function Price({ price, showLabel }: { price: OfferPrice; showLabel: boolean }) {
  return (
    <span>
      {showLabel && price.label ? <span className="font-normal text-slate-400">{price.label} </span> : null}
      <CurrencyText value={price.value} />
      {price.suffix}
    </span>
  );
}

/** "Book a 20-minute call", or the page's own `label`. The click is logged with its page,
 *  because the booking tool does not keep the ?src= tag. */
export function BookCallLink({ src, location, className = primaryButton, label = BOOK_CALL_LABEL }: { src: PartnerSrc; location: string; className?: string; label?: string }) {
  return (
    <TrackedLink href={bookingHref(src)} event={BOOKING_CLICK_EVENT} params={{ page: src, location }} className={className}>
      {label}
    </TrackedLink>
  );
}

function Actions({ offer, location, className }: { offer: PartnerOffer; location: string; className: string }) {
  return (
    <div className={className}>
      <BookCallLink src={offer.src} location={location} />
      <a href={withSrc(offer.secondary.href, offer.src)} className={secondaryButton}>{offer.secondary.label}</a>
    </div>
  );
}

/** The founding offer, in a row of its own above the closing card. */
function FoundingRow({ founding, src }: { founding: FoundingOffer; src: PartnerSrc }) {
  return (
    <div className="mx-auto mb-5 max-w-7xl px-4 sm:px-6 lg:px-8">
      <FoundingCard offer={founding} src={src} page={src} className="lg:max-w-3xl" />
    </div>
  );
}

/** "Founding partners: $650/mo, 5 of 5 places left", for the compact offer. */
function FoundingLine({ founding }: { founding: FoundingOffer }) {
  const label = founding.segment === "mssp" ? "Founding partners" : "Founding offer";
  if (foundingSeatsLeft(founding) === 0) return <span>{label}: all places taken</span>;
  const price = foundingPrice(founding);
  return (
    <span>
      <span className="font-normal text-slate-400">{label}: </span>
      <CurrencyText value={price.value} />
      {price.suffix}, {foundingSeatsLine(founding)}
    </span>
  );
}

export function PartnerClosing({ offer }: { offer: PartnerOffer }) {
  const founding = offer.founding ? foundingOffer(offer.founding) : null;
  const lines = offer.included
    .map((line) => ({ text: line.text, prices: line.ids.flatMap((id) => offerPrice(id) ?? []) }))
    .filter((line) => line.prices.length > 0);

  return (
    <section id="next-step" className="border-t border-white/10 py-20 md:py-28">
      {founding ? <FoundingRow founding={founding} src={offer.src} /> : null}
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:px-8">
        <div className="rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Next step</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">{offer.title}</h2>
          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">{offer.summary}</p>
          <ul className="mt-8 border-b border-white/10">
            {lines.map((line) => (
              <li key={line.text} className="flex flex-col gap-1 border-t border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="text-sm leading-6 text-slate-200">{line.text}</span>
                <span className="grid shrink-0 gap-0.5 text-sm font-semibold text-white sm:justify-items-end sm:text-right">
                  {/* A lone subscription's label is its product name, which the line already says. */}
                  {line.prices.map((price) => <Price key={price.id} price={price} showLabel={line.prices.length > 1 || price.suffix === ""} />)}
                </span>
              </li>
            ))}
          </ul>
          {offer.priceLine ? <p className="mt-4 text-sm leading-6 text-slate-300">{offer.priceLine}</p> : null}
          <Actions offer={offer} location="closing" className="mt-8 flex flex-col gap-3 sm:flex-row" />
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white">What happens next</h3>
            <ol className="mt-5 grid gap-4">
              {offer.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-100">{index + 1}</span>
                  <span className="pt-1 text-sm leading-6 text-slate-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white">Questions</h3>
            <dl className="mt-5 grid gap-5">
              {offer.questions.map((item) => (
                <div key={item.question}>
                  <dt className="text-sm font-semibold text-white">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400"><LinkedText copy={item.answer} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The compact form, for mid-page: the offer title, a price line and the two actions. */
export function PartnerOfferCompact({ offer }: { offer: PartnerOffer }) {
  const prices = offerFromPrices(offerIds(offer));
  const founding = offer.founding ? foundingOffer(offer.founding) : null;
  return (
    <section className="border-t border-white/10 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-[1.5rem] border border-cyan-300/25 bg-cyan-300/[0.075] p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* Not an h2: globals.css sizes every section h2 as a section title. */}
            <h3 className="text-xl font-semibold text-white">{offer.title}</h3>
            <p className="mt-2 flex flex-col gap-x-5 gap-y-1 text-sm font-semibold text-white sm:flex-row sm:flex-wrap">
              {prices.map((price) => <Price key={price.id} price={price} showLabel />)}
              {founding ? <FoundingLine founding={founding} /> : null}
            </p>
          </div>
          <Actions offer={offer} location="compact" className="flex shrink-0 flex-col gap-3 sm:flex-row" />
        </div>
      </div>
    </section>
  );
}
