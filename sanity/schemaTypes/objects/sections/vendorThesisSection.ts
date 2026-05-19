export default {
  name: "section.vendorThesisSection",
  title: "Vendor Thesis Section",
  type: "object",
  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "string",
    },
    {
      name: "subheadline",
      title: "Subheadline",
      type: "text",
    },
    {
      name: "metric",
      title: "Metric (e.g. 85%+)",
      type: "string",
    },
    {
      name: "metricDescription",
      title: "Metric Description",
      type: "text",
    },
    {
      name: "platforms",
      title: "Platforms Data",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Platform Name", type: "string" },
            { name: "value", title: "Percentage Value", type: "number" },
            { name: "isOthers", title: "Is 'Others' category?", type: "boolean", initialValue: false }
          ],
          preview: {
            select: { title: "name", subtitle: "value" },
          }
        }
      ]
    },
    {
      name: "sourceText",
      title: "Source Text (Bottom)",
      type: "string",
    }
  ],
  preview: {
    select: {
      title: "headline",
    },
    prepare({ title }: any) {
      return {
        title: title || "Vendor Thesis Section",
        subtitle: "Vendor Thesis Section"
      };
    }
  }
};
