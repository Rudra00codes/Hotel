import {defineField, defineType} from 'sanity'

export const amenity = defineType({
  name: 'amenity',
  title: 'Hotel Amenities',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Amenity Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Dining', value: 'dining'},
          {title: 'Business', value: 'business'},
          {title: 'Recreation', value: 'recreation'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
      placeholder: '6:00 AM - 11:00 PM',
    }),

    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'string',
      placeholder: '01762-506147',
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category,
        media: selection.media,
      }
    },
  },
})
