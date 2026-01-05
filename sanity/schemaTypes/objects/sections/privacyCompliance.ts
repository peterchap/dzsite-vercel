export default {
  name: "section.privacyCompliance",
  title: "Section: Privacy & Compliance",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "body", title: "Body", type: "text", rows: 6, validation: (r: any) => r.required() },
    { name: "cta", title: "CTA (optional)", type: "cta" },

    // enterprise legal reassurance (without overclaiming certifications)
    { name: "enterpriseNote", title: "Enterprise Note (optional)", type: "string", description: "E.g. DPAs / docs on request." },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Privacy & Compliance", subtitle: "Trust posture" };
    },
  },
};
