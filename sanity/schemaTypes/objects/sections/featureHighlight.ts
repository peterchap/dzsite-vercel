export default {
    name: "section.featureHighlight",
    title: "Section: Feature Highlight",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "content", title: "Content", type: "text", rows: 5 },
        {
            name: "approaches",
            title: "Our Approach",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "text", title: "Description", type: "string" },
                    ],
                },
            ],
        },
        { name: "visual", title: "Visual / Image", type: "image" },
        { name: "cta", title: "Call to Action", type: "cta" },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Feature Highlight" }),
    },
};
