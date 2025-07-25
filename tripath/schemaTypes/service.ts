import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description:
        'Name of the icon from lucide-react (e.g. BarChart4, FileText, LineChart, Globe, Users, Target)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key benefits of this service',
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Our approach for delivering this service',
    }),
    defineField({
      name: 'frameworks',
      title: 'Frameworks & Standards',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Relevant frameworks, standards, or methodologies',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'description',
    },
  },
})
