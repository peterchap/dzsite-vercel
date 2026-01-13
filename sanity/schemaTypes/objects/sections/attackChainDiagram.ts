export default {
  name: "section.attackChainDiagram",
  title: "Section: Attack Chain Diagram",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "kicker", title: "Kicker (optional)", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
    {
      name: "steps",
      title: "Diagram Steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "subtitle", title: "Subtitle", type: "string" },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name (e.g., Globe, Network, Shield, AlertTriangle)",
            },
            {
              name: "features",
              title: "Detailed Bullets",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
    {
      name: "highlightTitle",
      title: "Highlight Title (optional)",
      type: "string",
    },
    {
      name: "highlightBody",
      title: "Highlight Body (optional)",
      type: "text",
      rows: 3,
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Attack Chain Diagram", subtitle: "Diagram section" };
    },
  },
};
