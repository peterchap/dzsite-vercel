export default {
  name: "section.primaryUseCase",
  title: "Section: Primary Use Case",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "body", title: "Body", type: "text", rows: 5, validation: (r: any) => r.required() },
    {
      name: "example",
      title: "Example Callout (optional)",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }], validation: (r: any) => r.max(6) },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
    prepare({ title, subtitle }: any) {
      return { title: title ?? "Primary Use Case", subtitle: subtitle ? String(subtitle).slice(0, 60) + "…" : "" };
    },
  },
};
