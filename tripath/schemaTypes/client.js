import { defineField, defineType } from 'sanity';
export default defineType({
    name: 'client',
    title: 'Client',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Short description or tagline for the client',
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
            description: 'Client website (optional)',
            validation: (Rule) => Rule.uri({ scheme: ['https', 'http'] }),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo',
            subtitle: 'description',
        },
    },
});
