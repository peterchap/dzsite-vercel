const card = {
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "text", title: "Text", type: "text", rows: 3, validation: (r: any) => r.required() },
  ],
  preview: { select: { title: "title", subtitle: "text" } },
};

const cta = {
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "href", title: "URL", type: "string" },
  ],
};

const exampleField = {
  type: "object",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "value", title: "Value", type: "string" },
  ],
  preview: { select: { title: "label", subtitle: "value" } },
};

const exampleAlert = {
  type: "object",
  fields: [
    { name: "kicker", title: "Section kicker", type: "string" },
    { name: "title", title: "Section title", type: "string" },
    { name: "intro", title: "Intro", type: "text", rows: 3 },
    { name: "severity", title: "Severity label", type: "string" },
    { name: "status", title: "Status/title", type: "string" },
    { name: "domain", title: "Domain/indicator", type: "string" },
    { name: "fields", title: "Fields", type: "array", of: [exampleField] },
    { name: "reasons", title: "Reason codes", type: "array", of: [{ type: "string" }] },
    { name: "latency", title: "Latency / note", type: "string" },
  ],
};

export default {
  name: "productConceptPage",
  title: "Product / Concept Page",
  type: "document",
  groups: [
    { name: "page", title: "Page", default: true },
    { name: "hero", title: "Hero" },
    { name: "content", title: "Content" },
    { name: "examples", title: "Examples" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    { name: "title", title: "Studio title", type: "string", group: "page", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", group: "page", options: { source: "title" }, validation: (r: any) => r.required() },
    { name: "seo", title: "SEO", type: "seo", group: "seo" },

    { name: "eyebrow", title: "Eyebrow", type: "string", group: "hero" },
    { name: "headline", title: "Headline", type: "string", group: "hero", validation: (r: any) => r.required() },
    { name: "intro", title: "Intro", type: "text", rows: 4, group: "hero", validation: (r: any) => r.required() },
    { name: "primaryCta", title: "Primary CTA", ...cta, group: "hero" },
    { name: "secondaryCta", title: "Secondary CTA", ...cta, group: "hero" },
    { name: "proof", title: "Proof cards", type: "array", of: [card], group: "hero" },

    {
      name: "narrative",
      title: "Narrative section",
      type: "object",
      group: "content",
      fields: [
        { name: "kicker", title: "Kicker", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "body", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] },
      ],
    },
    { name: "flowTitle", title: "Flow title", type: "string", group: "content" },
    { name: "flow", title: "Flow cards", type: "array", of: [card], group: "content" },
    { name: "wideFlowLayout", title: "Use wide flow layout", type: "boolean", group: "content", initialValue: false },

    { name: "audiencesTitle", title: "Audiences title", type: "string", group: "content" },
    { name: "audiences", title: "Audiences", type: "array", of: [card], group: "content" },

    {
      name: "alertTypeSection",
      title: "Comparison / type section",
      type: "object",
      group: "content",
      fields: [
        { name: "kicker", title: "Kicker", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "intro", title: "Intro", type: "text", rows: 3 },
        { name: "stats", title: "Stats", type: "array", of: [card] },
        {
          name: "types",
          title: "Types",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "subtitle", title: "Subtitle", type: "string" },
              { name: "coverage", title: "Coverage", type: "text", rows: 2 },
              { name: "action", title: "Primary action", type: "text", rows: 2 },
              { name: "text", title: "Text", type: "text", rows: 3 },
              { name: "evidence", title: "Evidence bullets", type: "array", of: [{ type: "string" }] },
            ],
            preview: { select: { title: "title", subtitle: "subtitle" } },
          }],
        },
        { name: "note", title: "Note", type: "text", rows: 3 },
      ],
    },

    {
      name: "datasetCatalogue",
      title: "Dataset catalog",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "string" },
          { name: "scale", title: "Scale", type: "string" },
          { name: "cadence", title: "Cadence", type: "string" },
          { name: "delivery", title: "Delivery", type: "string" },
          { name: "useCases", title: "Best fit / use cases", type: "text", rows: 2 },
          { name: "status", title: "Status", type: "string" },
        ],
        preview: { select: { title: "name", subtitle: "status" } },
      }],
    },

    { name: "flagshipFieldsTitle", title: "Flagship fields title", type: "string", group: "content" },
    { name: "flagshipFields", title: "Flagship fields", type: "array", of: [card], group: "content" },

    {
      name: "licenseClean",
      title: "License-clean section",
      type: "object",
      group: "content",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 3 },
        { name: "included", title: "Included", type: "array", of: [{ type: "string" }] },
        { name: "excluded", title: "Excluded", type: "array", of: [{ type: "string" }] },
      ],
    },

    { name: "freshnessTitle", title: "Freshness title", type: "string", group: "content" },
    { name: "freshness", title: "Freshness cards", type: "array", of: [card], group: "content" },

    {
      name: "exampleQueries",
      title: "Example queries",
      type: "array",
      group: "examples",
      of: [{
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "code", title: "Code", type: "text", rows: 8 },
        ],
        preview: { select: { title: "title" } },
      }],
    },
    { name: "exampleAlert", title: "Example alert", ...exampleAlert, group: "examples" },
    { name: "secondaryExampleAlert", title: "Secondary example alert", ...exampleAlert, group: "examples" },
    { name: "tertiaryExampleAlert", title: "Tertiary example alert", ...exampleAlert, group: "examples" },

    { name: "packagesTitle", title: "Packaging title", type: "string", group: "content" },
    { name: "packages", title: "Packages", type: "array", of: [card], group: "content" },
    { name: "finalTitle", title: "Final CTA title", type: "string", group: "content" },
    { name: "finalBody", title: "Final CTA body", type: "text", rows: 3, group: "content" },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }: any) {
      return { title, subtitle: slug ? `/${slug}` : "" };
    },
  },
};
