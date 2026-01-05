import AnchorMultiSelect from "../../../components/AnchorMultiSelect";
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
      title: "Anchors to Link",
      type: "array",
      of: [{
        type: "object",
        name: "anchorItem",
        fields: [
          { name: "anchor", title: "Anchor", type: "string" },
          { name: "label", title: "Label", type: "string" },
        ],
      }],
      validation: (r: any) => r.min(1).warning("Select at least one anchor"),
      components: {
        input: AnchorMultiSelect,
      },
    },
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }: any) => ({ title: title ?? "Anchor Buttons" }),
  },
};
