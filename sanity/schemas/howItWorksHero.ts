// schemas/howItWorksHero.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'howItWorksHero',
  title: 'Page: How It Works Hero',
  type: 'document',
  fields: [
    /* --- Main Page Typography --- */
    defineField({
      name: 'pageH1',
      title: 'Main Page H1',
      type: 'string',
      initialValue: 'The Datazag Engine — Designed for Actions'
    }),
    defineField({
      name: 'pageSubhead',
      title: 'Page Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'See how our triple-layer product architecture transforms raw internet registry noise into instant, downstream defensive blocklines.'
    }),

    /* --- Left Panel Setup (The Product Stack) --- */
    defineField({
      name: 'leftPanelHeader',
      title: 'Left Panel Header Text',
      type: 'string',
      initialValue: 'THE DATAZAG PRODUCT MATRIX'
    }),
    defineField({
      name: 'productLayers',
      title: 'Left Product Layers (Assess, Monitor, Build)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'phase', title: 'Phase (e.g., ASSESS)', type: 'string' },
            { name: 'focus', title: 'Focus (e.g., Health Reports)', type: 'string' },
            { name: 'bullets', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    }),

    /* --- Right Panel Setup (Your Security Stack) --- */
    defineField({
      name: 'rightPanelHeader',
      title: 'Right Panel Header Text',
      type: 'string',
      initialValue: 'YOUR SECURITY STACK'
    }),
    defineField({
      name: 'securityLayers',
      title: 'Right Stack Layers (Email, DNS, Response)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Layer Title', type: 'string' },
            { name: 'bullets', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    }),

    /* --- Far-Right Target Outcome --- */
    defineField({
      name: 'outcomeLabel',
      title: 'Far-Right Block Outcome Label',
      type: 'string',
      initialValue: 'PRE-COMPROMISE THREATS BLOCKED BEFORE THEY LAND'
    }),
    defineField({
      name: 'schematicFootnote',
      title: 'Bottom Code Footnote',
      type: 'string',
      initialValue: 'SCHEMATIC 1.5: Datazag engine primitives delivering raw intelligence.'
    }),

    /* --- Pipeline Grid Section --- */
    defineField({
      name: 'pipelineGrid',
      title: 'Pipeline Grid Section',
      type: 'howItWorksPipeline'
    })
  ]
})