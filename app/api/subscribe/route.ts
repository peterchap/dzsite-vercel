import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
        }

        // Check if already exists
        const existing = await (sanityClient as any).fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email }
        );

        if (existing) {
            if (existing.status === "active") {
                return NextResponse.json({ message: "You are already subscribed!" });
            }
            // If they are pending, we can re-send the confirmation (or just update the token)
        }

        const token = crypto.randomUUID();

        // Create or update subscriber with pending status
        if (existing) {
            await sanityClient
                .patch(existing._id)
                .set({ confirmationToken: token, status: "pending" })
                .commit();
        } else {
            await sanityClient.create({
                _type: "subscriber",
                email,
                subscribedAt: new Date().toISOString(),
                status: "pending",
                confirmationToken: token,
            });
        }

        // --- EMAIL SENDING LOGIC ---
        // In a real app, use Resend, SendGrid, etc.
        const confirmUrl = `${new URL(request.url).origin}/api/subscribe/confirm?token=${token}`;
        console.log(`[SIMULATED EMAIL] To: ${email} | Link: ${confirmUrl}`);
        // ---------------------------

        return NextResponse.json({
            message: "We've sent a confirmation link to your email. Please click it to activate your subscription."
        });
    } catch (error: any) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again later." },
            { status: 500 }
        );
    }
}
