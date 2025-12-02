import {defineField, defineType} from 'sanity'

export const diningOption = defineType({
  name: 'diningOption',
  title: 'Dining Options',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant/Service Name',
      type: 'string',
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
      title: 'Contact Phone',
      type: 'string',
    }),

    defineField({
      name: 'cuisineType',
      title: 'Cuisine Types',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          'North Indian',
          'South Indian',
          'Chinese',
          'Continental',
          'Beverages',
          'Snacks',
          'Desserts',
        ],
      },
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'menuHighlights',
      title: 'Menu Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Dish Name'},
            {name: 'description', type: 'string', title: 'Description'},
            {name: 'isVegetarian', type: 'boolean', title: 'Vegetarian?'},
            {name: 'isSpicy', type: 'boolean', title: 'Spicy?'},
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
