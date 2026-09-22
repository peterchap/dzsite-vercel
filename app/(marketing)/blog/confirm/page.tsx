import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { sanityFetch } from "@/sanity/fetch";

export const metadata: Metadata = {
    title: "Confirm your subscription — Datazag",
    description: "Confirm a Datazag blog subscription.",
    robots: { index: false, follow: false },
};

/**
 * CONFIRM YOUR SUBSCRIPTION (/blog/confirm)
 *
 * The link in the confirmation email lands here rather than on the API route,
 * and confirming takes a button press that POSTs. Mail security scanners
 * follow links — Defender Safe Links fetched the old GET link, spent the
 * one-time token, and confirmed the subscription on the subscriber's behalf
 * before their own click ever arrived. A scanner does not submit forms, so the
 * press is what makes the confirmation evidence of a person's consent, which
 * is the only thing double opt-in is for.
 *
 * Nothing here mutates. The POST target is /api/subscribe/confirm, which
 * redirects back with ?state=.
 */

export const dynamic = "force-dynamic";

type State = "confirmed" | "already" | "invalid" | "unavailable" | "error";

const MESSAGES: Record<State, { badge: string; tone: "good" | "warn"; title: string; body: string }> = {
    confirmed: {
        badge: "Subscribed",
        tone: "good",
        title: "You are subscribed.",
        body: "Thanks for confirming. New posts on domain and infrastructure intelligence will arrive in your inbox.",
    },
    already: {
        badge: "Already subscribed",
        tone: "good",
        title: "You are already subscribed.",
        body: "This link has been used once already, which usually means your mail provider checked it before you did. There is nothing more to do.",
    },
    invalid: {
        badge: "Link not valid",
        tone: "warn",
        title: "We could not match that link.",
        body: "It may have been mistyped, or truncated by an email client. Subscribing again from the blog will send a fresh link.",
    },
    unavailable: {
        badge: "Try again shortly",
        tone: "warn",
        title: "We could not confirm your subscription just now.",
        body: "Something on our side is not answering. Your subscription is still waiting, so opening this link again later will finish it.",
    },
    error: {
        badge: "Something went wrong",
        tone: "warn",
        title: "We could not confirm your subscription.",
        body: "Please try this link again in a few minutes. If it keeps failing, email support@datazag.com and we will sort it out.",
    },
};

function ConfirmForm({ token }: { token: string }) {
    return (
        <form method="post" action="/api/subscribe/confirm" className="mt-8">
            <input type="hidden" name="token" value={token} />
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-black uppercase text-white shadow-sm transition-all hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Confirm my subscription
            </button>
        </form>
    );
}

function Panel({
    badge,
    tone,
    title,
    body,
    children,
}: {
    badge: string;
    tone: "good" | "warn";
    title: string;
    body: string;
    children?: React.ReactNode;
}) {
    const badgeClass =
        tone === "good"
            ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
            : "border-amber-300/20 bg-amber-300/10 text-amber-100";

    return (
        <main className="relative overflow-hidden bg-[#030619] text-white">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(55,222,245,0.18),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(86,168,245,0.14),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(93,73,255,0.14),transparent_34%)]" />
            </div>

            <section className="relative py-24 md:py-32">
                <Container>
                    <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-cyan-950/20 md:p-12">
                        <p
                            className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${badgeClass}`}
                        >
                            {badge}
                        </p>
                        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                            {title}
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">{body}</p>

                        {children}

                        <div className="mt-10">
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                            >
                                Read the blog
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}

export default async function BlogConfirmPage({
    searchParams,
}: {
    searchParams?: Promise<{ token?: string; state?: string }>;
}) {
    const params = searchParams ? await searchParams : {};

    // Coming back from the POST: render the outcome it decided.
    const state = params.state as State | undefined;
    if (state && state in MESSAGES) {
        return <Panel {...MESSAGES[state]} />;
    }

    const token = typeof params.token === "string" ? params.token.trim() : "";
    if (!token) return <Panel {...MESSAGES.invalid} />;

    // A READ, with the read-only token, so the write credential stays out of
    // page rendering. Uncached: somebody who just confirmed must not be shown
    // a stale "press to confirm".
    let subscriber: { status?: string } | null = null;
    try {
        subscriber = await sanityFetch<{ status?: string } | null>(
            `*[_type == "subscriber" && (confirmationToken == $token || usedConfirmationToken == $token)][0]{ status }`,
            { token },
            0
        );
    } catch (err) {
        // A failed lookup is not a verdict on the link, so it must not be
        // shown as one. Offer the button anyway and let the POST decide.
        console.error("Confirm page: subscriber lookup failed.", err);
        return (
            <Panel
                badge="One more step"
                tone="good"
                title="Confirm your subscription"
                body="Press the button below to finish subscribing to the Datazag blog."
            >
                <ConfirmForm token={token} />
            </Panel>
        );
    }

    if (!subscriber) return <Panel {...MESSAGES.invalid} />;
    if (subscriber.status === "active") return <Panel {...MESSAGES.already} />;

    return (
        <Panel
            badge="One more step"
            tone="good"
            title="Confirm your subscription"
            body="Press the button below to finish subscribing to the Datazag blog. We ask for a press rather than confirming on the link itself, so that we know it was you and not your mail provider's link checker."
        >
            <ConfirmForm token={token} />
        </Panel>
    );
}
