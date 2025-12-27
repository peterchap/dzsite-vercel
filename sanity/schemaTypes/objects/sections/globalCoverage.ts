export default {
  name: 'section.globalCoverage',
  title: 'Global Coverage Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    },
    {
      name: 'worldImage',
      title: 'World Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coveragePoints',
      title: 'Coverage Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Top', value: 'top' },
                  { title: 'Top Right', value: 'top-right' },
                  { title: 'Right', value: 'right' },
                  { title: 'Bottom Right', value: 'bottom-right' },
                  { title: 'Bottom', value: 'bottom' },
                  { title: 'Bottom Left', value: 'bottom-left' },
                  { title: 'Left', value: 'left' },
                  { title: 'Top Left', value: 'top-left' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
              position: 'position',
            },
            prepare({ title, subtitle, position }: { title?: string; subtitle?: string; position?: string }) {
              return {
                title: title,
                subtitle: `${subtitle} - ${position}`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'footerLine',
      title: 'Footer Line',
      type: 'string',
      description: 'Optional footer line shown below the globe',
    },
    {
      name: 'opsNote',
      title: 'Ops Note',
      type: 'text',
      rows: 2,
      description: 'Optional small operations note under the footer line',
    },
  ],
};