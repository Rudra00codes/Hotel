import {defineField, defineType} from 'sanity'

export const room = defineType({
  name: 'room',
  title: 'Rooms',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Information'},
    {name: 'details', title: 'Room Details'},
    {name: 'pricing', title: 'Pricing'},
    {name: 'media', title: 'Images & Gallery'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Room Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),

    defineField({
      name: 'roomId',
      title: 'Room ID (URL Slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),

    defineField({
      name: 'category',
      title: 'Room Category',
      type: 'string',
      options: {
        list: [
          {title: 'Deluxe', value: 'deluxe'},
          {title: 'Super Deluxe', value: 'super deluxe'},
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(500),
      group: 'basic',
    }),

    defineField({
      name: 'maxOccupancy',
      title: 'Maximum Occupancy',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
      group: 'details',
    }),

    defineField({
      name: 'size',
      title: 'Room Size',
      type: 'string',
      placeholder: '300 sq ft',
      group: 'details',
    }),

    defineField({
      name: 'features',
      title: 'Room Features',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
    }),

    defineField({
      name: 'amenities',
      title: 'Room Amenities',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          'Air Conditioning',
          'Free WiFi',
          'LED TV',
          'Minibar',
          'Coffee Maker',
          'Safe',
          'Hair Dryer',
          'Iron & Board',
          'Work Desk',
          'Sitting Area',
          'Balcony',
          'City View',
          'Room Service',
          'Daily Housekeeping',
        ],
      },
      group: 'details',
    }),

    defineField({
      name: 'priceRange',
      title: 'Price Range (Display)',
      type: 'string',
      placeholder: '₹3,000 - ₹4,000',
      description: 'Price range shown to customers',
      validation: (Rule) => Rule.required(),
      group: 'pricing',
    }),

    defineField({
      name: 'basePrice',
      title: 'Base Price (for sorting)',
      type: 'number',
      description: 'Numeric base price for sorting rooms',
      validation: (Rule) => Rule.required().min(100),
      group: 'pricing',
    }),

    defineField({ 
      name: 'images',
      title: 'Room Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      group: 'media',
    }),

    defineField({
      name: 'gallery',
      title: 'Additional Gallery Images',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'galleryImage'}]}],
      group: 'media',
    }),

    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide room on website',
      initialValue: true,
      group: 'basic',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0.asset',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? subtitle.toUpperCase() : '',
        media,
      }
    },
  },
})
