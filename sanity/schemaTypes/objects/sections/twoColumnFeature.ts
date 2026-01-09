export default {
  name: "section.twoColumnFeature",
  title: "Section: Two Column Feature",
  type: "object",
  fields: [
    {
      name: "anchor",
      title: "Section Anchor",
      type: "string",
      description: "Lowercase letters, numbers, dashes; unique per page",
      validation: (r: any) =>
        r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
    },
    {
      name: "left",
      title: "Left Column",
      type: "object",
      fields: [
        { name: "kicker", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        {
          name: "features",
          title: "Feature Bullets",
          type: "array",
          of: [{ type: "string" }],
          validation: (r: any) => r.min(1),
        },
      ],
    },
    {
      name: "right",
      title: "Right Column",
      type: "object",
      fields: [
        { name: "kicker", title: "Eyebrow", type: "string" },
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
      ],
    },
  ],
  preview: {
    select: { title: "left.title" },
    prepare: ({ title }: any) => ({ title: title ?? "Two Column Feature" }),
  },
};