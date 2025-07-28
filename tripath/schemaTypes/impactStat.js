import { defineField, defineType } from 'sanity';
export default defineType({
    name: 'impactStat',
    title: 'Impact Stat',
    type: 'document',
    fields: [
        defineField({
            name: 'statType',
            title: 'Stat Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Projects Completed', value: 'Projects Completed' },
                    { title: 'Lives Touched', value: 'Lives Touched' },
                    { title: 'Clients Satisfied', value: 'Clients Satisfied' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
            description: 'Choose one of the three allowed stat types.',
        }),
        defineField({
            name: 'value',
            title: 'Value',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
            description: 'Set the value for this stat.',
        }),
        defineField({
            name: 'suffix',
            title: 'Suffix',
            type: 'string',
            description: 'Suffix for the stat (e.g. "+", "%").',
        }),
    ],
    preview: {
        select: {
            title: 'statType',
            subtitle: 'value',
        },
        prepare({ title, subtitle }) {
            const labels = {
                'Projects Completed': 'Projects Completed',
                'Lives Touched': 'Lives Touched',
                'Clients Satisfied': 'Clients Satisfied',
            };
            return {
                title: labels[title] || title,
                subtitle: `Value: ${subtitle}`,
            };
        },
    },
});
