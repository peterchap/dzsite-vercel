import { NextResponse } from "next/server";

import { escapeHtml, resolveSender } from "@/lib/email";

/**
 * Coerce one JSON field to safe HTML. This body is built from whatever the
 * browser posted, so every value is escaped before it lands in the markup —
 * without it a name of `<a href=...>` injects a working link into mail our own
 * staff open and trust. The length cap matches /api/enquiry's `clean`.
 */
function field(value: unknown, fallback = "N/A"): string {
    const text = plain(value);
    return text ? escapeHtml(text) : fallback;
}

/** The same coercion without escaping, for headers that are not HTML. */
function plain(value: unknown): string {
    return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

export async function POST(req: Request) {
    try {
        const { name, email, company, phone, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error("CONTACT MESSAGE NOT EMAILED — RESEND_API_KEY is not set.", {
                name,
                email,
                company,
                phone,
                subject,
                message,
            });
            return NextResponse.json(
                { error: "Failed to send message. Please try again later." },
                { status: 500 }
            );
        }

        // Constructed per request, not at module scope: the Resend constructor
        // throws on a missing key, which at module scope takes the whole route
        // down with an import error instead of a handled 500.
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: resolveSender(),
            // Same routing as /api/enquiry: every submission goes to sales for
            // now, because the form cannot tell a prospect from a customer.
            to: process.env.SALES_EMAIL_TO || "sales@datazag.com",
            // Reply goes to the person who wrote in, not to the site mailbox.
            replyTo: typeof email === "string" ? email : undefined,
            subject: `New Contact Form Submission: ${plain(subject) || "No Subject"}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${field(name)}</p>
        <p><strong>Email:</strong> ${field(email)}</p>
        <p><strong>Company:</strong> ${field(company)}</p>
        <p><strong>Phone:</strong> ${field(phone)}</p>
        <p><strong>Subject:</strong> ${field(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${field(message).replace(/\n/g, "<br/>")}</p>
      `,
        });

        if (error) {
            // Logged in full, reported in general: the provider's message can
            // name our sender and domain, which the browser has no business
            // seeing.
            console.error("CONTACT MESSAGE NOT EMAILED — Resend rejected the message.", error);
            return NextResponse.json(
                { error: "Failed to send message. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        // resolveSender() throws on a missing or test EMAIL_FROM, and lands here.
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
