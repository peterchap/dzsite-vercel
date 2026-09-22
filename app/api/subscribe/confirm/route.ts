import { NextResponse } from "next/server";

import {
    CREDENTIAL_FAILURE_HINT,
    getSanityWriteClient,
    isSanityCredentialFailure,
} from "@/sanity/writeClient";

/**
 * SUBSCRIPTION CONFIRMATION.
 *
 * WHY THIS IS A POST. Confirming used to happen on GET, straight from the link
 * in the email. Two things went wrong with that, and both are worth keeping
 * written down because each looks like a bug somewhere else.
 *
 * 1. Mail security scanners follow links. Datazag mail is Microsoft 365, and
 *    Defender Safe Links fetches a link's target before handing the browser
 *    on, so the scanner spent the one-time token and the subscriber's own
 *    click arrived to find it gone — "expired or invalid", reported for a
 *    confirmation that had in fact just succeeded.
 *
 * 2. Worse, the scanner had performed the double opt-in. The point of
 *    confirming is evidence that a PERSON consented; a robot following a link
 *    is not that evidence. Scanners follow links, they do not submit forms, so
 *    the mail now points at /blog/confirm and a button there posts here.
 *
 * GET therefore mutates nothing. It redirects to that page, so any link
 * already sent still works and no prefetch can confirm anybody.
 */

/** Where the subscriber ends up, carrying the outcome for the page to render. */
function outcome(request: Request, state: string) {
    const url = new URL("/blog/confirm", request.url);
    url.searchParams.set("state", state);
    return url;
}

export async function GET(request: Request) {
    const token = new URL(request.url).searchParams.get("token");

    const url = new URL("/blog/confirm", request.url);
    if (token) url.searchParams.set("token", token);

    // 303: whatever this link was, the browser should GET the page.
    return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const raw = formData.get("token");
        const token = typeof raw === "string" ? raw.trim() : "";

        if (!token) {
            return NextResponse.redirect(outcome(request, "invalid"), 303);
        }

        let sanity;
        try {
            sanity = getSanityWriteClient();
        } catch (err) {
            console.error("SUBSCRIPTION NOT CONFIRMED — Sanity writes are not configured.", err);
            return NextResponse.redirect(outcome(request, "unavailable"), 303);
        }

        // Matched on EITHER token field: the live one, or the one kept after a
        // successful confirmation. Without the second, somebody who opens the
        // link again — or whose scanner opened it first — is told the link is
        // invalid when their subscription is perfectly active.
        const params: Record<string, string> = { token };
        const subscriber: { _id: string; status?: string } | null = await sanity.fetch(
            `*[_type == "subscriber" && (confirmationToken == $token || usedConfirmationToken == $token)][0]{ _id, status }`,
            params
        );

        if (!subscriber) {
            return NextResponse.redirect(outcome(request, "invalid"), 303);
        }

        if (subscriber.status === "active") {
            return NextResponse.redirect(outcome(request, "already"), 303);
        }

        await sanity
            .patch(subscriber._id)
            .set({
                status: "active",
                confirmedAt: new Date().toISOString(),
                // Kept, not discarded, so opening the link again is idempotent.
                usedConfirmationToken: token,
            })
            .unset(["confirmationToken"])
            .commit();

        return NextResponse.redirect(outcome(request, "confirmed"), 303);
    } catch (error) {
        if (isSanityCredentialFailure(error)) {
            console.error(
                "SUBSCRIPTION NOT CONFIRMED — Sanity rejected SANITY_WRITE_TOKEN. " +
                    CREDENTIAL_FAILURE_HINT,
                error
            );
            return NextResponse.redirect(outcome(request, "unavailable"), 303);
        }

        console.error("Confirmation error:", error);
        return NextResponse.redirect(outcome(request, "error"), 303);
    }
}
