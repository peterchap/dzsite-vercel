import { sanityFetch } from "@/sanity/fetch";
import { allBlogPostsQuery } from "@/sanity/queries";
import { BlogList } from "@/components/blog/BlogList";
import { BlogSubscribe } from "@/components/blog/BlogSubscribe";
import { BlogConfirmationBanner } from "@/components/blog/BlogConfirmationBanner";

export const metadata = {
    title: "Blog | Datazag",
    description: "Latest news, product updates, and insights from the Datazag team.",
};

export default async function BlogIndexPage() {
    const posts = await sanityFetch<any[]>(allBlogPostsQuery, {}, 60);

    return (
        <div className="bg-white">
            <BlogConfirmationBanner />
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-20">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl uppercase">
                            Our <span className="text-blue-600">Blog</span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-600 font-medium">
                            Deep dives into domain intelligence, security research, and product updates from the Datazag engineering team.
                        </p>
                    </div>
                    <BlogList posts={posts} />

                    <div className="mt-24">
                        <BlogSubscribe />
                    </div>
                </div>
            </div>
        </div>
    );
}
