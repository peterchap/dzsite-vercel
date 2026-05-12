export default {
  name: "section.personaSwitchboard",
  title: "Persona Switchboard",
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
      name: "personas",
      title: "Personas to Display",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "persona" }],
        },
      ],
      validation: (r: any) => r.min(1).max(4),
      description: "Select up to 4 personas to feature on this switchboard.",
    },
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }: any) {
      return { title: title ?? "Persona Switchboard", subtitle: "Persona Switchboard" };
    },
  },
};
