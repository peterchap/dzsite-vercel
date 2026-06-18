export default {
  name: "section.healthReportSelector",
  title: "Section: Health Report Selector",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    { name: "headline", title: "Headline", type: "string" },
    { name: "subheadline", title: "Subheadline", type: "text", rows: 3 },
    {
      name: "roles",
      title: "Personas (roles)",
      type: "array",
      of: [
        {
          type: "object",
          name: "persona",
          fields: [
            { name: "key", title: "Key (e.g. consultant)", type: "string" },
            { name: "label", title: "Label", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "sampleSummary", title: "Sample report summary (placeholder preview)", type: "text", rows: 4 },
          ],
          preview: { select: { title: "label", subtitle: "key" } },
        },
      ],
      validation: (r: any) => r.max(4),
    },
    {
      name: "languages",
      title: "Languages",
      type: "array",
      of: [
        {
          type: "object",
          name: "language",
          fields: [
            { name: "name", title: "Language", type: "string" },
            { name: "available", title: "Available now", type: "boolean", initialValue: false },
          ],
          preview: { select: { title: "name", subtitle: "available" } },
        },
      ],
    },
    { name: "formatNote", title: "Format note", type: "text", rows: 2 },
    { name: "primaryCta", title: "Primary CTA", type: "cta" },
    { name: "secondaryCta", title: "Secondary CTA", type: "cta" },
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }: any) => ({ title: title ?? "Health Report Selector", subtitle: "Persona / language selector" }),
  },
};
