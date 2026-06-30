export default {
    name: "marketingCopySection",
    title: "Copy section",
    type: "object",
    fields: [
        {
            name: "sectionKey",
            title: "Section key",
            type: "string",
            description: "Stable key used by the React page, for example hero, alertLifecycle, deliverables or finalCta.",
            validation: (r: any) => r.required(),
        },
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 4 },
        { name: "secondaryBody", title: "Secondary body", type: "text", rows: 4 },
        { name: "primaryCta", title: "Primary CTA", type: "marketingCopyCta" },
        { name: "secondaryCta", title: "Secondary CTA", type: "marketingCopyCta" },
        { name: "items", title: "Items", type: "array", of: [{ type: "marketingCopyItem" }] },
    ],
    preview: {
        select: { title: "title", subtitle: "sectionKey" },
        prepare({ title, subtitle }: any) {
            return { title: title || subtitle || "Copy section", subtitle };
        },
    },
};
