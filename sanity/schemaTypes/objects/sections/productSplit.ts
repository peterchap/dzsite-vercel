export default {
  name: "section.productSplit",
  title: "Section: Product Split",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "subtitle", title: "Subtitle", type: "string" },
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
      name: "center",
      title: "Center Column (optional)",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 4 },
        { name: "cta", title: "CTA", type: "cta" },
        {
          name: "integrationLine",
          title: "Integration Line (optional)",
          type: "string",
          description: "Optional note shown in card, e.g. connector/integration blurb.",
        },
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
    select: { title: "title", subtitle: "subtitle" },
    prepare({ title, subtitle }: any) {
      return {
        title: title ?? "Product Split",
        subtitle: subtitle ?? "Developers vs Enterprise (Two/Three Column)"
      };
    },
  },
};
