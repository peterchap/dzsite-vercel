import { NextRequest, NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function checked(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const honeypot = clean(formData.get("website"));
  if (honeypot) {
    return NextResponse.redirect(new URL("/contact/thanks", request.url), 303);
  }

  const payload = {
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

  // Forward by email (previously this route only logged, so submissions never
  // reached anyone). Best-effort: an email failure must not lose the redirect —
  // the payload above is still in the server log.
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = (isBenchmark && process.env.BENCHMARK_EMAIL_TO) || process.env.CONTACT_EMAIL_TO || "support@datazag.com";
      const subject = isBenchmark
        ? `Benchmark qualification — ${payload.company}`
        : `Website inquiry (${payload.enquiryType}) — ${payload.company}`;
      const lines = Object.entries(payload)
        .filter(([, v]) => v !== "" && v !== false)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to,
        replyTo: payload.email,
        subject,
        text: lines,
      });
      if (error) console.error("Inquiry email send failed", error);
    } catch (err) {
      console.error("Inquiry email send failed", err);
    }
  } else {
    console.warn("RESEND_API_KEY not set — inquiry logged only, not emailed.");
  }

  return NextResponse.redirect(new URL("/contact/thanks", request.url), 303);
}
