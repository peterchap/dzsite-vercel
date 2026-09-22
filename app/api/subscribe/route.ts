import { NextResponse } from "next/server";
import {
    CREDENTIAL_FAILURE_HINT,
    getSanityWriteClient,
    isSanityCredentialFailure,
} from "@/sanity/writeClient";
import { escapeHtml, resolveSender } from "@/lib/email";

/**
 * The origin the confirmation link points at.
 *
 * NOT the request's own origin in production. Host is a caller-supplied
 * header, and this link now goes out in mail signed with our domain, so a
 * spoofed Host would have us mail a subscriber a link to somebody else's
 * server. The canonical www host is the same default the rest of the site
 * builds absolute links from.
 */
function confirmationOrigin(request: Request): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (configured) return configured;

    // Local dev has no NEXT_PUBLIC_SITE_URL, and a link to www.datazag.com
    // would confirm nothing against a dev dataset, so there — and only there —
    // the request host is the useful answer.
    if (process.env.NODE_ENV !== "production") return new URL(request.url).origin;

    return "https://www.datazag.com";
}

/**
 * Send the double opt-in confirmation to the subscriber.
 *
 * Returns false when it did not get out. The caller needs that answer: this
 * route used to log the link to the server console and tell the visitor an
 * email was on its way, so nobody could ever reach "active" and nobody could
 * see that. Every failure path below logs at error level, with the link, so a
 * subscription can still be completed by hand from the server log.
 */
async function sendConfirmationEmail(email: string, confirmUrl: string): Promise<boolean> {
    if (!process.env.RESEND_API_KEY) {
        console.error("CONFIRMATION NOT EMAILED — RESEND_API_KEY is not set.", { email, confirmUrl });
        return false;
    }

    try {
        // Constructed per request, not at module scope: the Resend constructor
        // throws on a missing key, which at module scope takes the whole route
        // down with an import error instead of a handled 500.
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Belt and braces around the href: the token is a UUID we minted and
        // the origin is ours in production, but neither is worth trusting raw
        // inside an HTML attribute.
        const safeUrl = escapeHtml(confirmUrl);

        const { error } = await resend.emails.send({
            from: resolveSender(),
            to: email,
            // EMAIL_FROM is a noreply@ on the notifications subdomain, which
            // nobody reads. A subscriber who answers this mail — "I did not
            // sign up", "take me off" — is owed a person, so replies go to a
            // published route (lib/contact-routes.ts), not into a black hole.
            replyTo: process.env.SUPPORT_EMAIL_TO || "support@datazag.com",
            subject: "Confirm your Datazag subscription",
            text: [
                "Please confirm your subscription to the Datazag blog.",
                "",
                "Open this link and press Confirm:",
                confirmUrl,
                "",
                "If you did not ask to subscribe, ignore this email. Nothing will be sent to you.",
            ].join("\n"),
            html: `
        <h2>Confirm your subscription</h2>
        <p>Please confirm your subscription to the Datazag blog.</p>
        <p><a href="${safeUrl}">Confirm my subscription</a></p>
        <p>Or open this link: <br/>${safeUrl}</p>
        <p>If you did not ask to subscribe, ignore this email. Nothing will be sent to you.</p>
      `,
        });

        if (error) {
            console.error("CONFIRMATION NOT EMAILED — Resend rejected the message.", {
                error,
                email,
                confirmUrl,
            });
            return false;
        }

        return true;
    } catch (err) {
        // resolveSender() throws on a missing or test EMAIL_FROM, and lands here.
        console.error("CONFIRMATION NOT EMAILED — the send failed.", { err, email, confirmUrl });
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
        }

        // Writes need the write-scoped token. Acquired here, before anything
        // is attempted, so a deploy missing SANITY_WRITE_TOKEN says so plainly
        // instead of surfacing as a 403 from the middle of the flow.
        let sanity;
        try {
            sanity = getSanityWriteClient();
        } catch (err) {
            console.error("SUBSCRIPTION NOT SAVED — Sanity writes are not configured.", {
                err,
                email,
            });
            return NextResponse.json(
                {
                    error: "We could not record your subscription. Please try again in a few minutes.",
                    code: "storage_unavailable",
                },
                { status: 503 }
            );
        }

        // Check if already exists
        // Declared types rather than a fetch<> generic — see the confirm route.
        const params: Record<string, string> = { email };
        const existing: { _id: string; status?: string } | null = await sanity.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            params
        );

        if (existing) {
            if (existing.status === "active") {
                return NextResponse.json({ message: "You are already subscribed!" });
            }
            // If they are pending, we can re-send the confirmation (or just update the token)
        }

        const token = crypto.randomUUID();

        // Create or update subscriber with pending status. This has to happen
        // before the send: /api/subscribe/confirm looks the subscriber up by
        // token, so a link mailed ahead of the document would not resolve.
        if (existing) {
            await sanity
                .patch(existing._id)
                .set({ confirmationToken: token, status: "pending" })
                .commit();
        } else {
            await sanity.create({
                _type: "subscriber",
                email,
                subscribedAt: new Date().toISOString(),
                status: "pending",
                confirmationToken: token,
            });
        }

        // Points at the PAGE, not the API route. The page asks for a button
        // press, which a mail security scanner following the link will not
        // give — see app/(marketing)/blog/confirm/page.tsx.
        const confirmUrl = new URL(
            `/blog/confirm?token=${encodeURIComponent(token)}`,
            confirmationOrigin(request)
        ).toString();

        const delivered = await sendConfirmationEmail(email, confirmUrl);

        if (!delivered) {
            // Nothing claiming an email was sent. The subscriber row stays
            // pending with a live token, so a later attempt from the same
            // address just re-issues the link once sending works again.
            return NextResponse.json(
                {
                    error:
                        "We could not send the confirmation email, so you are not subscribed yet. Please try again in a few minutes.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "We've sent a confirmation link to your email. Please click it to activate your subscription."
        });
    } catch (error) {
        // A rejected token is a misconfigured deploy, not a bug, and used to
        // land here indistinguishable from one. 503 rather than 500 says so
        // from outside, without putting anything about the credential in a
        // response the browser can read.
        if (isSanityCredentialFailure(error)) {
            console.error(
                "SUBSCRIPTION NOT SAVED — Sanity rejected SANITY_WRITE_TOKEN. " +
                    CREDENTIAL_FAILURE_HINT,
                error
            );
            return NextResponse.json(
                {
                    error: "We could not record your subscription. Please try again in a few minutes.",
                    code: "storage_rejected",
                },
                { status: 503 }
            );
        }

        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again later." },
            { status: 500 }
        );
    }
}
