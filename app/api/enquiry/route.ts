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
    return NextResponse.redirect(new URL("/contact?submitted=1", request.url), 303);
  }

  const payload = {
    source: clean(formData.get("source")) || "contact_form",
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    company: clean(formData.get("company")),
    scope: clean(formData.get("scope")),
    enquiryType: clean(formData.get("enquiry_type")),
    message: clean(formData.get("message")),
    processingAuthorisation: checked(formData.get("processing_authorisation")),
    marketingOptIn: checked(formData.get("marketing_opt_in")),
    page: clean(formData.get("page")) || request.headers.get("referer") || "unknown",
    submittedAt: new Date().toISOString(),
  };

  const errors: string[] = [];
  if (!payload.name) errors.push("name_required");
  if (!emailPattern.test(payload.email)) errors.push("valid_email_required");
  if (!payload.company) errors.push("company_required");
  if (!payload.enquiryType) errors.push("enquiry_type_required");
  if (!payload.processingAuthorisation) errors.push("processing_authorisation_required");

  if (errors.length > 0) {
    const redirectUrl = new URL("/contact", request.url);
    redirectUrl.searchParams.set("error", errors[0]);
    return NextResponse.redirect(redirectUrl, 303);
  }

  console.info("Datazag enquiry received", payload);

  const redirectUrl = new URL("/contact", request.url);
  redirectUrl.searchParams.set("submitted", "1");
  return NextResponse.redirect(redirectUrl, 303);
}
