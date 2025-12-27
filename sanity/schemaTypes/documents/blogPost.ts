export default {
    name: "blogPost",
    title: "Blog Post",
    type: "document",
    fields: [
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            validation: (r: any) => r.required(),
        },
        { name: "publishedAt", title: "Published at", type: "datetime" },
        { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
        {
            name: "body",
            title: "Body",
            type: "array",
            of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
        },
        { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
        { name: "seo", title: "SEO", type: "seo" },
    ],
    preview: {
        select: { title: "title", date: "publishedAt" },
        prepare({ title, date }: any) {
            return { title, subtitle: date ? new Date(date).toDateString() : "Draft" };
        },
    },
};
