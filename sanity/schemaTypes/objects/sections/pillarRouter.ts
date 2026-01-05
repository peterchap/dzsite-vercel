export default {
    name: "section.pillarRouter",
    title: "Section: Pillar Router",
    type: "object",
    fields: [
        {
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes")
        },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 2 },
        {
            name: "pillars",
            title: "Pillars",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
                        { name: "description", title: "Description", type: "text", rows: 3 },
                        { name: "icon", title: "Icon (Lucide name)", type: "string", description: "e.g. Shield, Database, Users" },
                        { name: "cta", title: "Link", type: "cta" },
                        { name: "image", title: "Image (optional)", type: "image", options: { hotspot: true } },
                    ],
                    preview: {
                        select: { title: "title", subtitle: "description" }
                    }
                }
            ],
            validation: (r: any) => r.min(2).max(4)
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Pillar Router" }),
    },
};
