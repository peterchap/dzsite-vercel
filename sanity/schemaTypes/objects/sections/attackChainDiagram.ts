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
