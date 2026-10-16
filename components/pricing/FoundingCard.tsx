import { TrackedLink } from "@/components/home/TrackedLink";
import { CurrencyText } from "@/components/ui/CurrencyText";
import { BOOKING_CLICK_EVENT, BOOK_CALL_LABEL, bookingHref } from "@/lib/booking";
import { foundingDeadlineDay, foundingPrice, foundingSeatsLeft, foundingSeatsLine, type FoundingOffer } from "@/lib/pricing";

// One founding offer (brief: founding offers, investor page and funnel, 14 Oct 2026). The
// pricing page, the partner pages and the investor page all render this card from the same
// offer in lib/pricing.ts, so a price or seat count changes in one place. When no places
// are left, the card keeps its name and inclusions but drops the price and the button.

export function FoundingCard({ offer, src, page, className = "" }: { offer: FoundingOffer; src: string; page: string; className?: string }) {
  const open = foundingSeatsLeft(offer) > 0;
  const price = foundingPrice(offer);
  return (
    <article className={`flex flex-col rounded-[1.5rem] border border-cyan-300/30 bg-cyan-300/[0.075] p-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">Founding offer · For {offer.audience}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{offer.name}</h3>
      {open ? (
        <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
          <CurrencyText value={price.value} />
          {price.suffix ? <span className="text-base font-normal text-slate-300">{price.suffix}</span> : null}
          {offer.term ? <span className="block mt-1 text-sm font-normal text-slate-400">For {offer.term}.</span> : <span className="block mt-1 text-sm font-normal text-slate-400">One-off fee.</span>}
        </p>
      ) : null}
      <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-200">
        {offer.inclusions.map((line) => (
          <li key={line} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" /><span>{line}</span></li>
        ))}
      </ul>
      <p className="mt-5 text-sm font-semibold text-cyan-100">{foundingSeatsLine(offer)}</p>
      <p className="mt-1 text-sm text-slate-400">Offer ends {foundingDeadlineDay(offer)}.</p>
      {open ? (
        <div className="mt-6">
          <TrackedLink
            href={bookingHref(src, offer.segment)}
            event={BOOKING_CLICK_EVENT}
            params={{ page, location: "founding", offer: offer.id }}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            {BOOK_CALL_LABEL}
          </TrackedLink>
        </div>
      ) : null}
    </article>
  );
}
