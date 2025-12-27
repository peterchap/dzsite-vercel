export default {
    name: "section.ctaBanner",
    title: "Section: CTA Banner",
    type: "object",
    fields: [
        { name: "headline", title: "Headline", type: "string" },
        { name: "subheadline", title: "Subheadline", type: "text", rows: 3 },
        { name: "primaryCta", title: "Primary CTA", type: "cta" },
        { name: "secondaryCta", title: "Secondary CTA", type: "cta" },
        { name: "supportingText", title: "Supporting Text", type: "string" },
    ],
    preview: {
        select: { title: "headline" },
        prepare: ({ title }: any) => ({ title: title ?? "CTA Banner" }),
    },
};
