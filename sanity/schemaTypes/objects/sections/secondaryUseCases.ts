export default {
  name: "section.secondaryUseCases",
  title: "Section: Secondary Use Cases",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "subheadline", title: "Subheadline", type: "string" },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "useCaseItem",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
            { name: "description", title: "Description (optional)", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (r: any) => r.required().min(2).max(6),
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Secondary Use Cases", subtitle: "Supporting use cases" };
    },
  },
};
