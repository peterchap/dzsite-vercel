export default {
  name: "section.iconList",
  title: "Section: Icon List",
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
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "description", title: "Description", type: "text", rows: 4 },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", title: "Text", type: "string", validation: (r: any) => r.required() },
            { name: "iconEmoji", title: "Icon (emoji)", type: "string", description: "e.g. ✅, 🚀" },
            {
              name: "iconImage",
              title: "Icon (image)",
              type: "image",
              options: { hotspot: true },
              description: "Optional uploaded icon image",
            },
          ],
        },
      ],
      validation: (r: any) => r.min(1),
    },
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }: any) => ({ title: title ?? "Icon List" }),
  },
};