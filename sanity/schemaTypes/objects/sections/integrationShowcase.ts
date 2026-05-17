export default {
  name: "section.integrationShowcase",
  title: "Integration Showcase",
  type: "object",
  fields: [
    {
      name: "anchor",
      title: "Section Anchor",
      type: "string",
      description: "Lowercase letters, numbers, dashes; unique per page",
      validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r: any) => r.required(),
    },
    {
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
    },
    {
      name: "integrations",
      title: "Integrations to Display",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "integration" }],
        },
      ],
      validation: (r: any) => r.min(1).max(4),
      description: "Select up to 4 integrations to feature.",
    },
    {
      name: "docsCta",
      title: "Documentation CTA",
      type: "cta",
      description: "Footer link to the full API documentation."
    }
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }: any) {
      return { title: title ?? "Integration Showcase", subtitle: "Integration Showcase" };
    },
  },
};
