/**
 * Partner offer guard (brief: partner page closing sections, 13 Oct 2026).
 *
 * The MSSP and insurer pages name product ids, and the price renders from the shared
 * pricing config. This guard fails when:
 *   - an offer names a product id the pricing config does not have (the line would vanish);
 *   - an offer does not have exactly three "what happens next" steps;
 *   - the booking link or its fallback loses its ?src= tag;
 *   - a founding offer shows while disabled or after its deadline (UK time), or its seats are wrong.
 *
 * Typed prices in those pages are caught by checkPriceGuard.mjs.
 *
 * Run: tsx scripts/guards/checkPartnerOffers.ts   (part of `npm run guard`)
 */
import { bookingHref, withSrc } from "../../lib/booking";
import { INSURER_OFFER, MSSP_OFFER, offerIds } from "../../lib/partner-offers";
import { FOUNDING_OFFERS, activeFoundingOffers, foundingClosesAt, foundingSeatsLine, isFoundingOfferActive, offerFromPrices, offerPrice, type FoundingOffer } from "../../lib/pricing";

const failures: string[] = [];
const check = (ok: boolean, message: string) => { if (!ok) failures.push(message); };

for (const offer of [MSSP_OFFER, INSURER_OFFER]) {
  for (const id of offerIds(offer)) check(offerPrice(id) !== null, `${offer.src}: product id "${id}" is not a launched product in the pricing config`);
  check(offer.steps.length === 3, `${offer.src}: "what happens next" needs exactly three steps`);
  check(offer.questions.length >= 2 && offer.questions.length <= 3, `${offer.src}: two or three questions`);
  check(offerFromPrices(offerIds(offer)).length > 0, `${offer.src}: the compact offer has no price line`);
  check(withSrc(offer.secondary.href, offer.src).includes(`src=${offer.src}`), `${offer.src}: the secondary action has no src tag`);
}

// The booking link: the variable with ?src= added, or the contact form with the topic chosen.
const saved = process.env.BOOKING_URL;
process.env.BOOKING_URL = "https://booking.example/datazag?event=intro";
check(bookingHref("mssp") === "https://booking.example/datazag?event=intro&src=mssp", `booking link with the variable set: ${bookingHref("mssp")}`);
process.env.BOOKING_URL = "";
check(bookingHref("esp") === "/contact?topic=esp&src=esp", `booking fallback: ${bookingHref("esp")}`);
process.env.BOOKING_URL = "not a url";
check(bookingHref("insurers") === "/contact?topic=insurers&src=insurers", `booking fallback for a bad value: ${bookingHref("insurers")}`);
if (saved === undefined) delete process.env.BOOKING_URL; else process.env.BOOKING_URL = saved;
check(withSrc("#services", "mssp") === "#services", "an on-page anchor must stay untagged");
check(withSrc("/#free-report", "mssp") === "/?src=mssp#free-report", `tagging a link with an anchor: ${withSrc("/#free-report", "mssp")}`);

// Founding offers: off unless enabled, hidden after the deadline minute in UK time, and the
// price and button drop when no places are left.
const sample: FoundingOffer = { ...FOUNDING_OFFERS[0], enabled: true, seatsTotal: 5, seatsSold: 0, deadline: "2026-12-31T23:59" };
const on = (o: Partial<FoundingOffer>, at: string) => isFoundingOfferActive({ ...sample, ...o }, new Date(at));
check(on({}, "2026-12-31T23:59:30Z"), "a founding offer must show in its last minute (UK time)");
check(!on({}, "2027-01-01T00:00:00Z"), "a founding offer must hide after its deadline");
check(!on({ enabled: false }, "2026-11-01T00:00:00Z"), "a disabled founding offer must not show");
// British Summer Time: 23:59 UK on 30 June is 22:59 UTC.
check(on({ deadline: "2026-06-30T23:59" }, "2026-06-30T22:59:30Z") && !on({ deadline: "2026-06-30T23:59" }, "2026-06-30T23:00:00Z"), "a deadline in summer must use UK summer time");
check(foundingSeatsLine({ ...sample, seatsSold: 2 }) === "3 of 5 places left", `seats line: ${foundingSeatsLine({ ...sample, seatsSold: 2 })}`);
check(foundingSeatsLine({ ...sample, seatsSold: 5 }) === "All founding places taken", "a sold-out offer must say all places are taken");
for (const o of FOUNDING_OFFERS) {
  check(o.price_usd > 0, `founding offer "${o.id}" has no price`);
  check(o.seatsSold >= 0 && o.seatsSold <= o.seatsTotal, `founding offer "${o.id}": seatsSold must be between 0 and seatsTotal`);
  check(Number.isFinite(foundingClosesAt(o)), `founding offer "${o.id}": deadline must be YYYY-MM-DDTHH:mm`);
}
for (const offer of [MSSP_OFFER, INSURER_OFFER]) check(!offer.founding || FOUNDING_OFFERS.some((o) => o.id === offer.founding), `${offer.src}: unknown founding offer ${offer.founding}`);

if (failures.length) {
  console.error(`✗ Partner offer guard: ${failures.length} problem(s).\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ Partner offer guard passed — every product id resolves, links carry src, ${activeFoundingOffers().length} founding offer(s) showing.`);
