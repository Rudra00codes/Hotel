import {defineField, defineType} from 'sanity'

export const pricing = defineType({
  name: 'pricing',
  title: 'Room Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'roomType',
      title: 'Room Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'minPrice',
      title: 'Minimum Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(100),
    }),

    defineField({
      name: 'maxPrice',
      title: 'Maximum Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(100),
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'INR',
      options: {
        list: ['INR', 'USD', 'EUR'],
      },
    }),

    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'notes',
      title: 'Pricing Notes',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'roomType',
      minPrice: 'minPrice',
      maxPrice: 'maxPrice',
      currency: 'currency',
    },
    prepare(selection) {
      const {title, minPrice, maxPrice, currency} = selection
      return {
        title,
        subtitle: `₹${minPrice} - ₹${maxPrice}`,
      }
    },
  },
})
