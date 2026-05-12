export default {
    name: "section.heroAttackTimeline",
    title: "Hero: Attack Timeline",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "eyebrow", title: "Eyebrow (optional)", type: "string" },
        { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
        { name: "subheadline", title: "Subheadline", type: "text", rows: 3 },
        { name: "primaryCta", title: "Primary CTA", type: "cta" },
        { name: "secondaryCta", title: "Secondary CTA", type: "cta" },
        { name: "heroImageDesktop", title: "Hero Image Desktop", type: "image", options: { hotspot: true } },
        { name: "heroImageMobile", title: "Hero Image Mobile", type: "image", options: { hotspot: true } },
        {
            name: "timelineStages",
            title: "Timeline Stages",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "time", title: "Time", type: "string" },
                    ],
                },
            ],
            validation: (r: any) => r.max(4),
        },
        {
            name: "detectionMarker",
            title: "Detection Marker",
            type: "object",
            fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 2 },
            ],
        },
    ],
    preview: {
        select: { title: "headline" },
        prepare({ title }: any) {
            return { title: title ?? "Hero", subtitle: "Hero: Attack Timeline" };
        },
    },
};
