import { sanityFetch } from "@/sanity/fetch";
import { allBlogPostsQuery } from "@/sanity/queries";
import { BlogList } from "@/components/blog/BlogList";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { BlogConfirmationBanner } from "@/components/blog/BlogConfirmationBanner";
import { ResearchList } from "@/components/research/ResearchList";
import { latestResearch } from "@/lib/research";

export const metadata = {
    title: "Blog — Datazag",
    description:
        "Datazag research and articles: dated findings from the DNS corpus, plus notes on brand protection, alerting, DNS, certificates and cloud data products.",
};

const editorialTracks = [
    {
        title: "Infrastructure Intelligence",
        text: "How domains, DNS, certificates, hosting, providers, platforms and history connect into usable external-risk context.",
    },
    {
        title: "Brand protection and impersonation",
        text: "How suspicious infrastructure forms, matures, gains DNS and website evidence, and becomes an updateable alert incident.",
    },
    {
        title: "Cloud data products",
        text: "How cyber datasets can be packaged for warehouses, lakehouses, marketplaces and partner analytics workflows.",
    },
    {
        title: "Partner playbooks",
        text: "Practical ideas for MSSPs, ESPs, platforms and agencies building services on top of Datazag intelligence.",
    },
];

export default async function BlogIndexPage() {
    const posts = await sanityFetch<any[]>(allBlogPostsQuery, {}, 60);
    // Research pages live in code under /intelligence/<slug>, not in Sanity (lib/research.ts), so the
    // blog lists it from there. Without this, /blog said nothing was published.
    const research = latestResearch();
    const hasPosts = Array.isArray(posts) && posts.length > 0;

    return (
        <main className="relative overflow-hidden bg-[#030619] text-white">
            <BlogConfirmationBanner />
            {/* One listing for everything we publish: research pieces (code, lib/research.ts)
                and Sanity articles. /intelligence used to duplicate this and now 301s here.
                The header is kept short so the articles start above the fold. */}
            <section id="articles" className="relative pb-20 pt-12 md:pb-28 md:pt-16">
                <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.14),transparent_36%),radial-gradient(circle_at_82%_60%,rgba(139,92,246,0.11),transparent_38%)]" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Datazag Blog</p>
                        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Infrastructure Intelligence, explained.</h1>
                        <p className="mt-4 text-base leading-7 text-slate-300">
                            Research and articles on domains, DNS, certificates and hosting. Each research piece is dated and names what it measured. The
                            daily figures behind them are in the{" "}
                            <a href="https://observatory.datazag.com" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">
                                Datazag Observatory
                            </a>
                            .
                        </p>
                    </div>
                    {research.length > 0 ? (
                        <div className="mb-12">
                            <h2 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Research</h2>
                            <ResearchList pieces={research} />
                        </div>
                    ) : null}
                    {/* The empty state is for Sanity articles only; hide it once research exists. */}
                    {hasPosts ? (
                        <h2 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Articles</h2>
                    ) : null}
                    {hasPosts || research.length === 0 ? <BlogList posts={posts} /> : null}
                </div>
            </section>

            <section className="border-t border-white/10 py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">What we write about</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {editorialTracks.map((track) => (
                            <article key={track.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                                <h3 className="text-lg font-semibold text-white">{track.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-400">{track.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Subscribe</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Get Datazag updates.</h2>
                    <p className="mt-5 text-base leading-7 text-slate-300">New research and product notes on external infrastructure risk, sent when we publish.</p>
                    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-left">
                        <BlogSubscribe />
                    </div>
                </div>
            </section>
        </main>
    );
}