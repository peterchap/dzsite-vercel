import Link from "next/link";
import { format } from "date-fns";

export function BlogList({ posts }: { posts: any[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="py-24 text-center">
                <h2 className="text-2xl font-bold text-slate-900">No posts found</h2>
                <p className="mt-2 text-slate-500">Check back later for news and updates.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <article key={post._id} className="group flex flex-col items-start">
                    <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-2xl bg-slate-100">
                        {post.imageUrl ? (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                <span className="text-4xl font-bold">DZ</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={post.publishedAt} className="text-slate-500 font-bold uppercase tracking-wider">
                            {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Draft"}
                        </time>
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-bold text-blue-600">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="group relative">
                        <h3 className="mt-4 text-2xl font-black leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </Link>
                        </h3>
                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-500 font-medium">
                            {post.excerpt}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
}
