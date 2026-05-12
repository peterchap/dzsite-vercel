export default {
    name: "section.infrastructureAuditStack",
    title: "Infrastructure Audit Stack",
    type: "object",
    fields: [
        {
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
        },
        {
            name: "headline",
            title: "Headline",
            type: "string",
            validation: (r: any) => r.required(),
        },
        {
            name: "subheadline",
            title: "Subheadline",
            type: "text",
            rows: 3,
        },
        {
            name: "primaryCta",
            title: "Primary CTA",
            type: "cta",
        },
        {
            name: "layers",
            title: "Data Layers",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Layer Title", type: "string", validation: (r: any) => r.required() },
                        { name: "outcome", title: "Outcome", type: "string" },
                        {
                            name: "signals",
                            title: "Signals",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                    ],
                },
            ],
            validation: (r: any) => r.max(3),
        },
    ],
    preview: {
        select: { title: "headline" },
        prepare({ title }: any) {
            return { title: title ?? "Infrastructure Audit Stack", subtitle: "Infrastructure Audit Stack" };
        },
    },
};
