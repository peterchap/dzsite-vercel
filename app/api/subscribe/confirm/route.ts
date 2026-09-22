import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/sanity/writeClient";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return new Response("Invalid confirmation link", { status: 400 });
        }

        // Flipping status to "active" is a write, so this route needs the
        // write-scoped token too — with the read-only one it looked the
        // subscriber up fine and then 403'd on the patch, leaving them pending
        // forever with a link that appeared to do nothing.
        let sanity;
        try {
            sanity = getSanityWriteClient();
        } catch (err) {
            console.error("SUBSCRIPTION NOT CONFIRMED — Sanity writes are not configured.", {
                err,
                token,
            });
            return new Response(
                "We could not confirm your subscription just now. Please try that link again later.",
                { status: 500 }
            );
        }

        // Find subscriber with this token
        // Types, not decoration: a fetch<> type argument stops the client
        // inferring the query's $params type and the call fails to compile, and
        // the params object needs a declared type for the same reason. The
        // route previously reached for `as any` on the client to sidestep both.
        const params: Record<string, string> = { token };
        const subscriber: { _id: string } | null = await sanity.fetch(
            `*[_type == "subscriber" && confirmationToken == $token][0]`,
            params
        );

        if (!subscriber) {
            return new Response("Confirmation link expired or link is invalid", { status: 404 });
        }

        // Update status to active and clear token
        await sanity
            .patch(subscriber._id)
            .set({ status: "active" })
            .unset(["confirmationToken"])
            .commit();

        // Redirect to blog with success message
        return NextResponse.redirect(new URL("/blog?confirmed=true", request.url));
    } catch (error) {
        console.error("Confirmation error:", error);
        return new Response("An error occurred during confirmation", { status: 500 });
    }
}
