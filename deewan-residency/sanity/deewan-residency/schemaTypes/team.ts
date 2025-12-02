import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'position',
      title: 'Job Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'specialization',
      title: 'Specialization',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})
