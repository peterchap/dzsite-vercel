export default {
  name: "section.finalCta",
  title: "Section: Final CTA",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 2 },
    { name: "primaryCta", title: "Primary CTA", type: "cta", validation: (r: any) => r.required() },
    { name: "secondaryCta", title: "Secondary CTA (optional)", type: "cta" },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Final CTA", subtitle: "Conversion" };
    },
  },
};

