import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Hotel Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'hotelName',
      title: 'Hotel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Hotel Description',
      type: 'text',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),

    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
    }),

    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),

    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
    }),

    defineField({
      name: 'phone1',
      title: 'Primary Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'phone2',
      title: 'Secondary Phone',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),

    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'twitter', type: 'url', title: 'Twitter'},
      ],
    }),

    defineField({
      name: 'checkInTime',
      title: 'Check-in Time',
      type: 'string',
      initialValue: '14:00',
    }),

    defineField({
      name: 'checkOutTime',
      title: 'Check-out Time',
      type: 'string',
      initialValue: '12:00',
    }),

    defineField({
      name: 'totalRooms',
      title: 'Total Number of Rooms',
      type: 'number',
    }),

    defineField({
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        {name: 'monday', type: 'string', title: 'Monday'},
        {name: 'tuesday', type: 'string', title: 'Tuesday'},
        {name: 'wednesday', type: 'string', title: 'Wednesday'},
        {name: 'thursday', type: 'string', title: 'Thursday'},
        {name: 'friday', type: 'string', title: 'Friday'},
        {name: 'saturday', type: 'string', title: 'Saturday'},
        {name: 'sunday', type: 'string', title: 'Sunday'},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'hotelName',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Hotel Settings',
      }
    },
  },
})
