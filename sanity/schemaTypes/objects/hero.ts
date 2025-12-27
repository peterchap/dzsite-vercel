import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'primaryCta',
            title: 'Primary CTA',
            type: 'object',
            fields: [
                defineField({
                    name: 'label',
                    type: 'string',
                    title: 'Label'
                }),
                defineField({
                    name: 'link',
                    type: 'string',
                    title: 'Link'
                })
            ]
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
