import { NextRequest, NextResponse } from "next/server";

import { TECHNICAL_BRIEFING_ENQUIRY_TYPE } from "@/lib/contact-routes";
import { resolveSender } from "@/lib/email";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function checked(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

type InquiryPayload = {
  source: string;
  name: string;
  email: string;
  company: string;
  scope: string;
  enquiryType: string;
  benchmarkMode: string;
  message: string;
  processingAuthorisation: boolean;
  marketingOptIn: boolean;
  page: string;
  submittedAt: string;
};

/**
 * Forward the inquiry to the mailbox that owns it.
 *
 * Returns false when it did not get out. The caller needs that answer: this
 * route used to swallow every failure and show the thank you page anyway, so a
 * missing key, an unverified domain or a rejected sender all looked exactly
 * like success to the visitor and to us. Every failure path below logs the
 * whole payload at error level, so an inquiry that missed the inbox can still
 * be recovered from the server log.
 */
async function deliverByEmail(
  payload: InquiryPayload,
  { isBenchmark, isBriefing }: { isBenchmark: boolean; isBriefing: boolean },
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("INQUIRY NOT EMAILED — RESEND_API_KEY is not set.", payload);
    return false;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    // NOTE: CONTACT_EMAIL_TO is deliberately no longer consulted. It used to
    // sit ahead of the default and would quietly send everything to whatever
    // it pointed at, which is the split this change removes. Set
    // SALES_EMAIL_TO to override.
    const to =
      (isBenchmark && process.env.BENCHMARK_EMAIL_TO) ||
      process.env.SALES_EMAIL_TO ||
      "sales@datazag.com";
    const subject = isBenchmark
      ? `Benchmark qualification — ${payload.company}`
      : isBriefing
        ? `Technical briefing request — ${payload.company}`
        : `Website inquiry (${payload.enquiryType}) — ${payload.company}`;
    const lines = Object.entries(payload)
      .filter(([, v]) => v !== "" && v !== false)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const { error } = await resend.emails.send({
      from: resolveSender(),
      to,
      replyTo: payload.email,
      subject,
      text: lines,
    });

    if (error) {
      console.error("INQUIRY NOT EMAILED — Resend rejected the message.", { error, payload });
      return false;
    }

    return true;
  } catch (err) {
    // resolveSender() throws on a missing or test EMAIL_FROM, and lands here.
    console.error("INQUIRY NOT EMAILED — the send failed.", { err, payload });
    return false;
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const honeypot = clean(formData.get("website"));
  if (honeypot) {
    return NextResponse.redirect(new URL("/contact/thanks", request.url), 303);
  }

  const payload: InquiryPayload = {
    source: clean(formData.get("source")) || "contact_form",
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    company: clean(formData.get("company")),
    scope: clean(formData.get("scope")),
    enquiryType: clean(formData.get("enquiry_type")),
    benchmarkMode: clean(formData.get("benchmark_mode")),
    message: clean(formData.get("message")),
    processingAuthorisation: checked(formData.get("processing_authorisation")),
    marketingOptIn: checked(formData.get("marketing_opt_in")),
    page: clean(formData.get("page")) || request.headers.get("referer") || "unknown",
    submittedAt: new Date().toISOString(),
  };

  // Benchmark qualifications route back to /benchmark on validation errors and
  // carry a tagged subject so they reach the right person, not a generic inbox
  // (WU28-B §3). Re-point BENCHMARK_EMAIL_TO at the COO when the address exists.
  const isBenchmark = payload.source === "benchmark_qualification";

  // The enquiry type tells us which PRODUCT someone is asking about, not
  // whether they are a prospect or an existing customer — "Platform Alerts"
  // could be either. Rather than guess a split the form cannot express, every
  // submission goes to sales for now and a human forwards what belongs to
  // support. A misrouted lead is recoverable; a lead dropped into a shared
  // inbox nobody owns is not.
  const isBriefing = payload.enquiryType === TECHNICAL_BRIEFING_ENQUIRY_TYPE;

  const errors: string[] = [];
  if (!payload.name) errors.push("name_required");
  if (!emailPattern.test(payload.email)) errors.push("valid_email_required");
  if (!payload.company) errors.push("company_required");
  if (!payload.enquiryType) errors.push("enquiry_type_required");
  if (!payload.processingAuthorisation) errors.push("processing_authorisation_required");

  if (errors.length > 0) {
    const redirectUrl = new URL(isBenchmark ? "/benchmark" : "/contact", request.url);
    redirectUrl.searchParams.set("error", errors[0]);
    return NextResponse.redirect(redirectUrl, 303);
  }

  console.info("Datazag inquiry received", payload);

  const delivered = await deliverByEmail(payload, { isBenchmark, isBriefing });

  // A delivery that failed must not look like one that worked. The thank you
  // page reads this flag and tells the visitor to use a direct address, which
  // is the only thing that still gets their inquiry to a person.
  const thanksUrl = new URL("/contact/thanks", request.url);
  if (!delivered) thanksUrl.searchParams.set("delivery", "failed");

  return NextResponse.redirect(thanksUrl, 303);
}
