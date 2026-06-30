import { sanityFetch } from "@/sanity/fetch";
import { allBlogPostsQuery } from "@/sanity/queries";
import { BlogList } from "@/components/blog/BlogList";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { BlogConfirmationBanner } from "@/components/blog/BlogConfirmationBanner";

export const metadata = {
    title: "Blog — Datazag",
    description:
        "Datazag articles on Infrastructure Intelligence, brand protection, alerting, cloud data products, DNS, certificates and external infrastructure risk.",
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

const starterTopics = [
    "Why domain intelligence is only one part of Infrastructure Intelligence",
    "What happens between certificate issuance, DNS activation and a live phishing page",
    "How brand protection alerts should handle legitimate partner sites",
    "What a cloud marketplace buyer expects from a cyber intelligence dataset",
    "How MSSPs can package external infrastructure monitoring as a managed service",
    "What DNS and email-authentication findings belong in a free domain report",
];

export default async function BlogIndexPage() {
    const posts = await sanityFetch<any[]>(allBlogPostsQuery, {}, 60);

    return (
        <main className="relative overflow-hidden bg-[#030619] text-white">
            <BlogConfirmationBanner />
            <section className="relative py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(55,222,245,0.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(139,92,246,0.13),transparent_34%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Datazag Blog</p>
                        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">Infrastructure Intelligence, explained.</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                            Articles, product notes and field guides on external infrastructure risk: domains, DNS, certificates, hosting, platform impersonation, brand protection, alerts and cloud data products.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a href="#articles" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Read articles</a>
                            <a href="#topics" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]">View topic ideas</a>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {editorialTracks.map((track) => (
                            <article key={track.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                                <h2 className="text-lg font-semibold text-white">{track.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-slate-400">{track.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="articles" className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Articles</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Latest Datazag writing.</h2>
                        <p className="mt-5 text-base leading-7 text-slate-300">Use this area for launch content, research notes, product explainers and practical buyer education.</p>
                    </div>
                    <BlogList posts={posts} />
                </div>
            </section>

            <section id="topics" className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Content backlog</p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Good first posts to add.</h2>
                            <p className="mt-5 text-base leading-7 text-slate-300">These topics map directly to the current site and can support sales, partner conversations and marketplace education.</p>
                        </div>
                        <div className="grid gap-3">
                            {starterTopics.map((topic) => (
                                <div key={topic} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">{topic}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Subscribe</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">Get Datazag updates.</h2>
                    <p className="mt-5 text-base leading-7 text-slate-300">Use the blog list for articles and the subscription form for future newsletter capture.</p>
                    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-left">
                        <BlogSubscribe />
                    </div>
                </div>
            </section>
        </main>
    );
}