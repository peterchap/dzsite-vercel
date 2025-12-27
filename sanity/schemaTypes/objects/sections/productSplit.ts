export default {
  name: "section.productSplit",
  title: "Section: Product Split",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    {
      name: "left",
      title: "Left Column",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string", validation: (r: any) => r.required() },
        { name: "body", title: "Body", type: "text", rows: 4, validation: (r: any) => r.required() },
        { name: "cta", title: "CTA", type: "cta" },
      ],
    },
    {
      name: "right",
      title: "Right Column",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string", validation: (r: any) => r.required() },
        { name: "body", title: "Body", type: "text", rows: 5, validation: (r: any) => r.required() },
        { name: "cta", title: "CTA", type: "cta" },

        // stress-test: MSSP/Enterprise integration reassurance
        {
          name: "integrationLine",
          title: "Integration Line (optional)",
          type: "string",
          description: "E.g. 'Integrates with SIEM/SOAR and fraud platforms via webhook/feed'.",
        },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Product Split", subtitle: "Developers vs Enterprise" };
    },
  },
};
