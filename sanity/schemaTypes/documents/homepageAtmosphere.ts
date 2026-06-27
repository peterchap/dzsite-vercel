const card = {
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "text", title: "Text", type: "text", rows: 3 },
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

const section = {
  type: "object",
  fields: [
    { name: "kicker", title: "Kicker", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "body", title: "Body paragraphs", type: "array", of: [{ type: "text", rows: 3 }] },
  ],
};

export default {
  name: "homepageAtmosphere",
  title: "Homepage Atmosphere",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "cards", title: "Cards" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    { name: "title", title: "Studio title", type: "string", initialValue: "Homepage" },
    { name: "seo", title: "SEO", type: "seo", group: "seo" },

    { name: "heroEyebrow", title: "Hero eyebrow", type: "string", group: "hero" },
    { name: "heroTitle", title: "Hero title", type: "string", group: "hero" },
    { name: "heroIntro", title: "Hero intro", type: "text", rows: 4, group: "hero" },
    { name: "heroStatement", title: "Hero statement", type: "text", rows: 3, group: "hero" },
    { name: "primaryCta", title: "Primary CTA", ...cta, group: "hero" },
    { name: "secondaryCta", title: "Secondary CTA", ...cta, group: "hero" },
    { name: "heroPills", title: "Hero pills", type: "array", of: [{ type: "string" }], group: "hero" },

    { name: "insight", title: "Insight section", ...section, group: "sections" },
    { name: "signals", title: "Observable signals section", ...section, group: "sections" },
    { name: "platform", title: "Platform section", ...section, group: "sections" },
    { name: "graph", title: "Living graph section", ...section, group: "sections" },
    { name: "delivery", title: "Delivery section", ...section, group: "sections" },
    { name: "partners", title: "Partner ecosystem section", ...section, group: "sections" },
    { name: "applicationsSection", title: "Applications section", ...section, group: "sections" },
    { name: "finalCta", title: "Final CTA section", ...section, group: "sections" },
    { name: "finalButton", title: "Final button", ...cta, group: "sections" },

    { name: "internetSignals", title: "Observable signal cards", type: "array", of: [card], group: "cards" },
    { name: "timelineSteps", title: "Timeline cards", type: "array", of: [{ type: "object", fields: [{ name: "marker", title: "Marker", type: "string" }, { name: "title", title: "Title", type: "string" }, { name: "text", title: "Text", type: "text", rows: 3 }] }], group: "cards" },
    { name: "proofPoints", title: "Proof points", type: "array", of: [card], group: "cards" },
    { name: "graphEvidence", title: "Graph evidence cards", type: "array", of: [card], group: "cards" },
    { name: "deliveryCards", title: "Delivery cards", type: "array", of: [card], group: "cards" },
    { name: "partnerAudiences", title: "Partner audience cards", type: "array", of: [card], group: "cards" },
    { name: "applications", title: "Application cards", type: "array", of: [card], group: "cards" },
  ],
  preview: {
    select: { title: "title" },
  },
};
