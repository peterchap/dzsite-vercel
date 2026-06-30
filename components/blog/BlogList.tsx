import Link from "next/link";
import { format } from "date-fns";

export function BlogList({ posts }: { posts: any[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center md:p-12">
                <h2 className="text-2xl font-semibold text-white">No articles published yet</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                    This section is ready for launch content covering Infrastructure Intelligence, brand protection, cloud data products, alerting workflows and partner use cases.
                </p>
                <a href="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
                    Suggest a topic
                </a>
            </div>
        );
    }

    return (
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <article key={post._id} className="group flex flex-col items-start rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                    <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#050b22]">
                        {post.imageUrl ? (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                                <span className="text-4xl font-bold">DZ</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <time dateTime={post.publishedAt} className="text-slate-500 font-bold uppercase tracking-wider">
                            {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Draft"}
                        </time>
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="relative z-10 rounded-full border border-cyan-300/15 bg-cyan-300/[0.08] px-3 py-1.5 font-bold text-cyan-100">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="group relative">
                        <h3 className="mt-4 text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-cyan-100">
                            <Link href={`/blog/${post.slug}`}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </Link>
                        </h3>
                        <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-400">
                            {post.excerpt}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
}