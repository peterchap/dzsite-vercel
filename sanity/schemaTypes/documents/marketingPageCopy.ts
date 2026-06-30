export default {
    name: "marketingPageCopy",
    title: "Marketing Page Copy",
    type: "document",
    fields: [
        { name: "title", title: "Internal title", type: "string", validation: (r: any) => r.required() },
        {
            name: "slug",
            title: "Page slug",
            type: "slug",
            description: "Use the route slug without a leading slash, for example brand-protection, reports or how-it-works.",
            validation: (r: any) => r.required(),
        },
        {
            name: "notes",
            title: "Editor notes",
            type: "text",
            rows: 3,
            description: "Internal notes for editors. Not rendered on the public site.",
        },
        { name: "seo", title: "SEO", type: "seo" },
        {
            name: "sections",
            title: "Editable sections",
            type: "array",
            of: [{ type: "marketingCopySection" }],
        },
    ],
    preview: {
        select: { title: "title", slug: "slug.current" },
        prepare({ title, slug }: any) {
            return { title: title || slug || "Marketing Page Copy", subtitle: slug ? `/${slug}` : undefined };
        },
    },
};
