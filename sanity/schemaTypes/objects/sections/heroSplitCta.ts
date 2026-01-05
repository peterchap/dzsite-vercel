export default {
    name: "section.heroSplitCta",
    title: "Hero: Split CTA",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "eyebrow", title: "Eyebrow (optional)", type: "string" },
        { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
        { name: "subheadline", title: "Subheadline", type: "text", rows: 3 },
        { name: "badge", title: "Badge text (optional)", type: "string" },
        { name: "primaryCta", title: "Primary CTA", type: "cta" },
        { name: "secondaryCta", title: "Secondary CTA", type: "cta" },
        {
            name: "dataDictionary",
            title: "Data Dictionary Modal",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Data Dictionary Button",
                    type: "boolean",
                    initialValue: false,
                },
                {
                    name: "buttonText",
                    title: "Button Text",
                    type: "string",
                    initialValue: "View Data Dictionary",
                    hidden: ({ parent }: any) => !parent?.enabled,
                },
                {
                    name: "title",
                    title: "Modal Title",
                    type: "string",
                    initialValue: "Data Dictionary",
                    hidden: ({ parent }: any) => !parent?.enabled,
                },
                {
                    name: "description",
                    title: "Modal Description",
                    type: "text",
                    rows: 2,
                    hidden: ({ parent }: any) => !parent?.enabled,
                },
                {
                    name: "csvFile",
                    title: "CSV File",
                    type: "file",
                    options: { accept: ".csv" },
                    hidden: ({ parent }: any) => !parent?.enabled,
                },
            ],
            options: { collapsible: true, collapsed: true },
        },
    ],
    preview: {
        select: { title: "headline", subtitle: "badge" },
        prepare({ title, subtitle }: any) {
            return { title: title ?? "Hero", subtitle: subtitle ?? "Hero: Split CTA" };
        },
    },
};
