export default {
  name: "section.threatReportCTA",
  title: "Threat Report CTA",
  type: "object",
  fields: [
    {
      name: "eyebrow",
      title: "Eyebrow text",
      type: "string",
      initialValue: "PRIMARY CONVERSION PATH"
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Start free — the External Platform Threat Report"
    },
    {
      name: "subheadline",
      title: "Subheadline",
      type: "text",
    },
    {
      name: "body",
      title: "Body (rich text, below subheadline)",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "placeholderText",
      title: "Input Placeholder text",
      type: "string",
      initialValue: "Enter your work email"
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Get my free report"
    },
    {
      name: "successMessage",
      title: "Success Message",
      type: "text",
    },
    {
      name: "footerPrimaryText",
      title: "Footer Primary Text",
      type: "text",
    },
    {
      name: "footerSecondaryText",
      title: "Footer Secondary Text",
      type: "text",
    },
    {
      name: "contactLinkText",
      title: "Contact Link Text",
      type: "string",
      initialValue: "Talk to us."
    },
    {
      name: "contactLinkAnchor",
      title: "Contact Link Anchor",
      type: "string",
      initialValue: "#contact"
    },
    {
      name: "consentRequiredText",
      title: "Required consent checkbox text",
      description:
        "Mandatory opt-in shown as a ticked-by-default checkbox; the user must keep it ticked to submit. Add a link to your Privacy Policy inline.",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "consentOptionalText",
      title: "Optional marketing consent checkbox text",
      description:
        "Optional opt-in shown as an unticked checkbox (e.g. marketing/newsletter). Not required to submit.",
      type: "array",
      of: [{ type: "block" }],
    }
  ],
  preview: {
    select: {
      title: "headline",
    },
    prepare({ title }: any) {
      return {
        title: title || "Threat Report CTA",
        subtitle: "Threat Report CTA Section"
      };
    }
  }
};
