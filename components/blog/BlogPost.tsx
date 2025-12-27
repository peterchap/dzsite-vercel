import { PortableText } from "next-sanity";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BlogPost({ post }: { post: any }) {
    if (!post) return null;

    return (
        <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-12"
            >
                <ArrowLeft className="h-4 w-4" />
                BACK TO BLOG
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-x-4 text-xs mb-6">
                    <time dateTime={post.publishedAt} className="text-slate-500 font-bold uppercase tracking-wider">
                        {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Draft"}
                    </time>
                    {post.tags?.map((tag: string) => (
                        <span key={tag} className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-bold text-blue-600">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-8">
                    {post.title}
                </h1>
                <p className="text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-100 pl-6">
                    {post.excerpt}
                </p>
            </header>

            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-3xl">
                <PortableText
                    value={post.body}
                    components={{
                        types: {
                            image: ({ value }: any) => {
                                if (!value?.url) return null;
                                return (
                                    <img
                                        src={value.url}
                                        alt={value.alt || ""}
                                        className="rounded-3xl shadow-2xl my-12"
                                    />
                                );
                            },
                        }
                    }}
                />
            </div>
        </article>
    );
}
