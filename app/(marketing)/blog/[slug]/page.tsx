import { sanityFetch } from "@/sanity/fetch";
import { blogPostBySlugQuery } from "@/sanity/queries";
import { BlogPost } from "@/components/blog/BlogPost";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSiteStats } from "@/lib/site-stats-live";
import { loadCorporateMailFigures } from "@/lib/observatory-figures";
import { resolveBlogBody, resolveBlogText, type BlogFigureSources } from "@/lib/blog-tokens";

async function figureSources(): Promise<BlogFigureSources> {
    const [siteStats, corporateMail] = await Promise.all([getSiteStats(), loadCorporateMailFigures()]);
    return { siteStats, corporateMail };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await sanityFetch<any>(blogPostBySlugQuery, { slug });

    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Datazag Blog`,
        description: post.excerpt ? resolveBlogText(post.excerpt, await figureSources()) ?? undefined : undefined,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await sanityFetch<any>(blogPostBySlugQuery, { slug });

    if (!post) {
        notFound();
    }

    // Live-figure tokens resolve here; a block whose figure is unavailable is
    // dropped (lib/blog-tokens.ts). Without this call a post prints its tokens raw.
    const sources = await figureSources();
    const resolved = {
        ...post,
        excerpt: post.excerpt ? resolveBlogText(post.excerpt, sources) : post.excerpt,
        body: resolveBlogBody(post.body, sources),
    };

    return (
        <>
            <BlogPost post={resolved} />
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <BlogSubscribe />
            </div>
        </>
    );
}
