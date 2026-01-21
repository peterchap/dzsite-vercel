export default {
  name: "section.anchorLinks",
  title: "Section: Anchor Buttons",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "text", rows: 2 },
    {
      name: "behavior",
      title: "Button Behavior",
      type: "string",
      options: {
        list: [
          { title: "Jump to section", value: "jump" },
          { title: "Switch pricing section (hide others)", value: "switch" }
        ], layout: "radio"
      },
      initialValue: "jump",
      description: "Choose whether clicking jumps to the section or hides other pricing sections and focuses the selected one.",
    },
    {
      name: "selectedAnchors",
      title: "Features & Buttons",
      type: "array",
      of: [{
        type: "object",
        name: "anchorItem",
        title: "Feature Item",
        fields: [
          { name: "featureTitle", title: "Feature Title", type: "string" },
          { name: "featureDescription", title: "Feature Description", type: "array", of: [{ type: "block" }] },
          { name: "label", title: "Button Label", type: "string", validation: (r: any) => r.required() },
          { name: "anchor", title: "Target Anchor ID", type: "string", description: "The ID of the section to jump to (e.g. 'pricing')", validation: (r: any) => r.required() },
        ],
        preview: {
          select: { title: "featureTitle", subtitle: "label" },
          prepare({ title, subtitle }: any) {
            return {
              title: title || subtitle || "Untitled",
              subtitle: title ? subtitle : "",
            };
          },
        },
      }],
      validation: (r: any) => r.min(1).max(5).warning("Select between 1 and 5 items"),
    },
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }: any) => ({ title: title ?? "Anchor Buttons" }),
  },
};
