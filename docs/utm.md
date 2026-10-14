# Campaign tags (UTM) and conversion events

How to tag links to datazag.com, and which events tie a lead or a sale back to its
campaign. Agreed in the funnel brief of 14 October 2026.

## Tagging convention

| Parameter | Values |
|---|---|
| `utm_source` | `linkedin`, `email`, `outbound`, `event`, `partner`, `referral` |
| `utm_medium` | `social`, `lifecycle`, `cold_email`, `paid_social`, `referral` |
| `utm_campaign` | `<yyyy>q<n>_<segment>_<offer>`, for example `2026q4_vc_snapshot`, `2026q4_mssp_founding`, `2026q4_report_launch` |
| `utm_content` | The touch or the variant, for example `t1`, `t3`, `post_a`, `e2` |

- Use lower case, with underscores. No spaces.
- Keep `src=` for the page or section a click came from, as now. `src` is set by the
  site; `utm_*` is set by whoever writes the outbound link.
- `?assess=portfolio` on a page with the Estate Scope form preselects "Our portfolio
  companies". Other values: `book` (insured companies), `clients` (MSSP clients), `deal`,
  `own`.

Example outbound link:

```
https://www.datazag.com/investors-and-ma?utm_source=outbound&utm_medium=cold_email&utm_campaign=2026q4_vc_snapshot&utm_content=t1
```

The follow-up emails tag their own links: `utm_source=email&utm_medium=lifecycle`,
`utm_campaign=free_report` or `estate_scope`, and `utm_content=e0` to `e3`.

## How the tags are kept

| Store | What | When |
|---|---|---|
| `dz_ft` cookie | First touch, 90 days, never replaced | After analytics consent |
| `dz_lt` cookie | Last touch for the browser session | After analytics consent |
| The form itself | The tags on the page the form is submitted from | Always, with or without consent |

Both cookies sit on `.datazag.com`, so the portal reads them too. Links from the site
to the portal carry the page's tags across (`components/attribution/FirstTouchCapture.tsx`).

The tags are then attached to:

- every free Domain Health Report request and Estate Scope request (portal);
- every contact form and benchmark submission (`/api/enquiry`);
- the Stripe Checkout Session metadata of every portal purchase (`utm_source`,
  `utm_medium`, `utm_campaign`, `utm_content`, `src`, plus `ft` for the first touch).

They appear in the lead alert for each request and purchase.

## GA4 events

| Event | Where it fires | Parameters |
|---|---|---|
| `report_signup` | Portal, after a free report request is accepted | `src`, `utm_campaign` |
| `estate_scope_signup` | Portal, after an Estate Scope request is accepted | `src`, `utm_campaign`, `persona` |
| `purchase` | Portal, on the order confirmation page | `value`, `currency`, `transaction_id`, `src`, `utm_campaign` |
| `booking_click` | Site, on every "Book a 20-minute call" button | `page`, `location`, `offer` (founding cards) |

GA4 loads only after consent, so these events count consenting visitors only. The lead
alerts and Stripe metadata count everyone.

## LinkedIn conversions

The LinkedIn Insight Tag loads only after consent, and only when
`NEXT_PUBLIC_LINKEDIN_PARTNER_ID` is set (both Vercel projects).

In Campaign Manager (Analyze → Conversion tracking), create one conversion per event,
with the method **"Insight Tag – event-specific"**:

| Conversion name (suggested) | Event name | Fires on |
|---|---|---|
| Free report request | `report_signup` | Portal |
| Estate Scope request | `estate_scope_signup` | Portal |
| Booked call click | `booking_click` | Site |
| Purchase | `purchase` | Portal |

Each conversion gets a numeric id. Put the ids in `NEXT_PUBLIC_LINKEDIN_CONVERSIONS`, in
both Vercel projects, as name:id pairs:

```
report_signup:123456,estate_scope_signup:234567,booking_click:345678,purchase:456789
```

An event without an id is not sent to LinkedIn.
