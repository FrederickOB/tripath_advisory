import { defineField, defineType } from 'sanity';
export default defineType({
    name: 'client_service',
    title: 'Client Service Engagement',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Engagement Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Short title for the engagement (e.g. ESG Transformation)',
        }),
        defineField({
            name: 'service',
            title: 'Service',
            type: 'reference',
            to: [{ type: 'service' }],
            validation: (Rule) => Rule.required(),
            description: 'Link to the related service',
        }),
        defineField({
            name: 'client',
            title: 'Client',
            type: 'reference',
            to: [{ type: 'client' }],
            validation: (Rule) => Rule.required(),
            description: 'Link to the client organization',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required().max(500),
            description: 'Summary of the engagement and its impact',
        }),
        defineField({
            name: 'metrics',
            title: 'Impact Metrics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Metric Label',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'value',
                            title: 'Metric Value',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                },
            ],
            description: 'Key metrics demonstrating engagement impact',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'client.name',
        },
    },
});
