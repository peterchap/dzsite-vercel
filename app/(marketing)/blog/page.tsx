import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { sanityFetch } from "@/sanity/fetch";
import { allBlogPostsQuery } from "@/sanity/queries";
import { BlogList } from "@/components/blog/BlogList";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { BlogConfirmationBanner } from "@/components/blog/BlogConfirmationBanner";

/**
 * ENGINEERING BLOG (/blog) — how Datazag is built. One of the four parts of the
 * brand (2026-10-11): Datazag, the Observatory, Insights and the Engineering blog.
 *
 * ONE HOME PER PIECE. Posts here are Sanity `blogPost` documents about how the
 * system is built. Findings from the data go to Insights (/insights, lib/research.ts)
 * and are never listed here.
 *
 * NO POSTS YET, SO IT REDIRECTS. An empty blog reads as an abandoned one, which is
 * the fault the 1 October audit raised. While no post is published, /blog sends
 * visitors to /insights with a TEMPORARY redirect, and it stays out of the menu
 * and the sitemap. The first published post turns this page on with no code change.
 * /blog/confirm (newsletter confirmation) and /blog/<slug> are separate routes and
 * are not affected.
 */
export const metadata: Metadata = {
    title: "Engineering blog — Datazag",
    description: "How Datazag is built: notes from the team on measuring domains, DNS, certificates and routing at internet scale.",
};

export default async function EngineeringBlogPage() {
    // allBlogPostsQuery returns only posts with a publish date in the past.
    const posts = await sanityFetch<any[]>(allBlogPostsQuery, {}, 60);
    if (!Array.isArray(posts) || posts.length === 0) redirect("/insights");

    return (
        <main className="relative overflow-hidden bg-[#030619] text-white">
            <BlogConfirmationBanner />
            <section id="articles" className="relative pb-20 pt-12 md:pb-28 md:pt-16">
                <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.14),transparent_36%),radial-gradient(circle_at_82%_60%,rgba(139,92,246,0.11),transparent_38%)]" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Engineering blog</p>
                        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">How Datazag is built.</h1>
                        <p className="mt-4 text-base leading-7 text-slate-300">
                            Notes from the team on measuring domains, DNS, certificates and routing. Findings from the data are in{" "}
                            <a href="/insights" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                                Datazag Insights
                            </a>
                            .
                        </p>
                    </div>
                    <BlogList posts={posts} />
                </div>
            </section>

            <section className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Subscribe</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Get Datazag updates.</h2>
                    <p className="mt-5 text-base leading-7 text-slate-300">New findings and product notes, sent when we publish.</p>
                    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-left">
                        <BlogSubscribe />
                    </div>
                </div>
            </section>
        </main>
    );
}
