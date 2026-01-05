export default {
    name: "section.domainLookup",
    title: "Section: Domain Lookup Tool",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "content", title: "Content", type: "text", rows: 3 },
        { name: "placeholder", title: "Input Placeholder", type: "string" },
        { name: "buttonText", title: "Button Text", type: "string" },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Domain Lookup Tool" }),
    },
};
