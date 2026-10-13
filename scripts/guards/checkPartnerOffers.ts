/**
 * Partner offer guard (brief: partner page closing sections, 13 Oct 2026).
 *
 * The MSSP, ESP and insurer pages name product ids, and the price renders from the shared
 * pricing config. This guard fails when:
 *   - an offer names a product id the pricing config does not have (the line would vanish);
 *   - an offer does not have exactly three "what happens next" steps;
 *   - the booking link or its fallback loses its ?src= tag;
 *   - a founding offer shows while disabled, without a price, or after its deadline.
 *
 * Typed prices in those pages are caught by checkPriceGuard.mjs.
 *
 * Run: tsx scripts/guards/checkPartnerOffers.ts   (part of `npm run guard`)
 */
import { bookingHref, withSrc } from "../../lib/booking";
import { ESP_OFFER, INSURER_OFFER, MSSP_OFFER, offerIds } from "../../lib/partner-offers";
import { FOUNDING_OFFERS, activeFoundingOffers, isFoundingOfferActive, offerFromPrices, offerPrice, type FoundingOffer } from "../../lib/pricing";

const failures: string[] = [];
const check = (ok: boolean, message: string) => { if (!ok) failures.push(message); };

for (const offer of [MSSP_OFFER, ESP_OFFER, INSURER_OFFER]) {
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

// Founding offers: off unless enabled with a price, and hidden the day after the deadline.
const sample: FoundingOffer = { id: "mssp", enabled: true, title: "Sample", summary: null, price_usd: 1, currency: "USD", term: null, seats_total: 10, seats_left: 3, deadline: "2026-11-30" };
const on = (o: Partial<FoundingOffer>, at: string) => isFoundingOfferActive({ ...sample, ...o }, new Date(at));
check(on({}, "2026-11-30T23:00:00Z"), "a founding offer must show on its last day");
check(!on({}, "2026-12-01T00:00:01Z"), "a founding offer must hide after its deadline");
check(!on({ enabled: false }, "2026-11-01T00:00:00Z"), "a disabled founding offer must not show");
check(!on({ price_usd: null }, "2026-11-01T00:00:00Z"), "a founding offer without a price must not show");
check(on({ deadline: null }, "2030-01-01T00:00:00Z"), "a founding offer without a deadline stays until disabled");
for (const o of FOUNDING_OFFERS) check(!o.enabled || o.price_usd !== null, `founding offer "${o.id}" is enabled without a price`);

if (failures.length) {
  console.error(`✗ Partner offer guard: ${failures.length} problem(s).\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ Partner offer guard passed — every product id resolves, links carry src, ${activeFoundingOffers().length} founding offer(s) showing.`);
