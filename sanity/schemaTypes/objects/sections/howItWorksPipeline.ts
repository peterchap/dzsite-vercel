import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'howItWorksPipeline',
  title: 'Section: How It Works Pipeline Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeadline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'From Raw Telemetry to Defensive Action'
    }),
    defineField({
      name: 'sectionSubhead',
      title: 'Section Subhead',
      type: 'text',
      rows: 2,
      initialValue: 'How our data pipeline ingests, correlates, and pushes threat infrastructure updates globally in under 10 seconds.'
    }),
    defineField({
      name: 'pipelineStages',
      title: 'Pipeline Grid Stages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stageNumber', title: 'Stage Number (e.g., [01])', type: 'string' },
            { name: 'stageTitle', title: 'Stage Title', type: 'string' },
            { name: 'bodyText', title: 'Body Explanation', type: 'text', rows: 3 }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    })
  ]
})
