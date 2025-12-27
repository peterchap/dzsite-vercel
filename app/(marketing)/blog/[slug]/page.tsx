import { sanityFetch } from "@/sanity/fetch";
import { blogPostBySlugQuery } from "@/sanity/queries";
import { BlogPost } from "@/components/blog/BlogPost";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await sanityFetch<any>(blogPostBySlugQuery, { slug });

    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Datazag Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await sanityFetch<any>(blogPostBySlugQuery, { slug });

    if (!post) {
        notFound();
    }

    return (
        <>
            <BlogPost post={post} />
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <BlogSubscribe />
            </div>
        </>
    );
}
