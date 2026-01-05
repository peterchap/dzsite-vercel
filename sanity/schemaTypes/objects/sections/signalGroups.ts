export default {
  name: "section.signalGroups",
  title: "Section: Signal Groups (Explainable Scoring)",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "intro", title: "Intro (optional)", type: "text", rows: 3 },
    {
      name: "groups",
      title: "Groups",
      type: "array",
      of: [
        {
          type: "object",
          name: "signalGroup",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 3, validation: (r: any) => r.required() },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (r: any) => r.required().min(3).max(7),
    },
    { name: "footerLine", title: "Footer Line (optional)", type: "string" },

    // stress-test additions (MSSP + Enterprise)
    {
      name: "opsNote",
      title: "Ops Note (optional)",
      type: "string",
      description: "One-liner for noise reduction/tuning and operational use (MSSP-friendly).",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "footerLine" },
    prepare({ title, subtitle }: any) {
      return { title: title ?? "Signal Groups", subtitle: subtitle ?? "Explainable scoring" };
    },
  },
};
