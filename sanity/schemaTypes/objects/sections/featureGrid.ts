export default {
  name: "section.featureGrid",
  title: "Section: Feature Grid",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
    {
      name: "columns",
      title: "Columns",
      type: "number",
      options: {
        list: [
          { title: "2 Columns", value: 2 },
          { title: "3 Columns", value: 3 },
          { title: "4 Columns", value: 4 },
        ],
      },
      initialValue: 3,
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            { name: "icon", title: "Icon (name)", type: "string" },
            { name: "text", title: "Text", type: "text", rows: 3 },
            { name: "cta", title: "CTA (optional)", type: "cta" },
          ],
        },
      ],
      validation: (r: any) => r.min(1),
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Feature Grid" };
    },
  },
};
