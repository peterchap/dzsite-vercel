export default {
  name: "section.featureGrid",
  title: "Section: Feature Grid",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
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
