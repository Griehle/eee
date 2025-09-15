import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'company', 'rating', 'isActive', 'updatedAt'],
    group: 'Content Types',
    description: '⭐ Manage customer testimonials and reviews',
    listSearchableFields: ['customerName', 'company', 'testimonial'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The customer testimonial or review text',
        rows: 4,
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the customer',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Customer\'s company or organization (optional)',
      },
    },
    {
      name: 'position',
      type: 'text',
      admin: {
        description: 'Job title or position (optional)',
      },
    },
    {
      name: 'customerPhoto',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional photo of the customer',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Star rating (1-5)',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this testimonial prominently',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this testimonial on the website',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'dateGiven',
      type: 'date',
      admin: {
        description: 'When the testimonial was received',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.order === undefined || data.order === null) {
          data.order = 0
        }
        return data
      },
    ],
  },
}
