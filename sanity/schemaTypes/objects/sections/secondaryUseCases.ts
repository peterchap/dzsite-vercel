export default {
  name: "section.secondaryUseCases",
  title: "Section: Secondary Use Cases",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
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
            {
              name: "description",
              title: "Description (optional)",
              type: "array",
              of: [{ type: "block" }]
            },
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
