import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'features',
    title: 'Features',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: 'Feature Items',
            type: 'array',
            of: [
                defineField({
                    name: 'item',
                    title: 'Item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string'
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon Name (Lucide)',
                            type: 'string',
                            description: 'e.g. Shield, Database, Zap'
                        }),
                    ]
                })
            ]
        }),
    ],
})
