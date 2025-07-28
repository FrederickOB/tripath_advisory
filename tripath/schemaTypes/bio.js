import { defineField, defineType } from 'sanity';
export default defineType({
    name: 'bio',
    title: 'Bio',
    type: 'document',
    fields: [
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],
    preview: {
    // select: {
    //   title: 'name',
    //   media: 'image',
    // },
    },
});
