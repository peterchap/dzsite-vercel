import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return new Response("Invalid confirmation link", { status: 400 });
        }

        // Find subscriber with this token
        const subscriber = await (sanityClient as any).fetch(
            `*[_type == "subscriber" && confirmationToken == $token][0]`,
            { token }
        );

        if (!subscriber) {
            return new Response("Confirmation link expired or link is invalid", { status: 404 });
        }

        // Update status to active and clear token
        await sanityClient
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
