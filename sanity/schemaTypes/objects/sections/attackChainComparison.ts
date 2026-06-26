export default {
  name: "section.attackChainComparison",
  title: "Section: Attack Chain Comparison",
  type: "object",
  fields: [
    {
      name: "anchor",
      title: "Section Anchor",
      type: "string",
      description: "Lowercase letters, numbers, dashes; unique per page",
      validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
    },
    { name: "kicker", title: "Kicker (optional)", type: "string" },
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
    {
      name: "lanes",
      title: "Comparison Lanes",
      description: "Two stacked attack-chain diagrams — typically your approach (positive) above the competition (negative).",
      type: "array",
      validation: (r: any) => r.min(1).max(2).warning("Use two lanes for a side-by-side comparison"),
      of: [
        {
          type: "object",
          name: "lane",
          fields: [
            { name: "label", title: "Lane Label", type: "string", description: 'e.g. "Datazag" or "Typical competitor"' },
            {
              name: "variant",
              title: "Style Variant",
              type: "string",
              description: "Positive = green (your approach); Negative = red (the competition).",
              options: {
                list: [
                  { title: "Positive (green)", value: "positive" },
                  { title: "Negative (red)", value: "negative" },
                ],
                layout: "radio",
              },
              initialValue: "positive",
            },
            {
              name: "timing",
              title: "Detection Timing",
              type: "string",
              description: 'Short timing label shown in the badge, e.g. "Seconds" or "Hours to days".',
            },
            {
              name: "detectionNote",
              title: "Detection Note",
              type: "text",
              rows: 3,
              description: "One-line explanation shown beneath the diagram for this lane.",
            },
            {
              name: "steps",
              title: "Diagram Steps",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "step",
                  fields: [
                    { name: "title", title: "Title", type: "string" },
                    { name: "subtitle", title: "Subtitle", type: "string" },
                    {
                      name: "icon",
                      title: "Icon Name",
                      type: "string",
                      description: "Lucide icon name (e.g., Globe, Network, KeyRound, MailWarning)",
                    },
                    {
                      name: "isDetectionPoint",
                      title: "Detection point?",
                      type: "boolean",
                      description: "Highlight this step as where this lane detects the threat.",
                      initialValue: false,
                    },
                    {
                      name: "features",
                      title: "Detailed Bullets",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                  ],
                  preview: {
                    select: { title: "title", subtitle: "subtitle", detect: "isDetectionPoint" },
                    prepare({ title, subtitle, detect }: any) {
                      return { title: title ?? "Step", subtitle: detect ? "● Detection point" : subtitle };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: "label", variant: "variant", timing: "timing" },
            prepare({ title, variant, timing }: any) {
              return {
                title: title ?? "Lane",
                subtitle: [variant, timing && `· ${timing}`].filter(Boolean).join(" "),
              };
            },
          },
        },
      ],
    },
    { name: "highlightTitle", title: "Highlight Title (optional)", type: "string" },
    { name: "highlightBody", title: "Highlight Body (optional)", type: "text", rows: 3 },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Attack Chain Comparison", subtitle: "Comparison diagram section" };
    },
  },
};
