import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'isActive', 'updatedAt'],
    group: 'Content Types',
    description: '🛠️ Manage services and business offerings',
    listSearchableFields: ['title', 'description', 'category', 'features'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name or title',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version for service pages',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.title && !data.slug) {
                data.slug = data.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '')
              }
            }
            return data
          },
        ],
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description for service cards and listings',
        rows: 3,
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full detailed description of the service',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image representing the service',
      },
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional icon for the service (SVG or small image)',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Web Development', value: 'web-development' },
        { label: 'Mobile Apps', value: 'mobile-apps' },
        { label: 'Design', value: 'design' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Support', value: 'support' },
        { label: 'Training', value: 'training' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Service category for grouping',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'List of key features or benefits',
      },
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing Information',
      fields: [
        {
          name: 'startingPrice',
          type: 'number',
          admin: {
            description: 'Starting price (optional)',
          },
        },
        {
          name: 'priceType',
          type: 'select',
          options: [
            { label: 'Per Hour', value: 'per-hour' },
            { label: 'Per Project', value: 'per-project' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Custom Quote', value: 'custom' },
          ],
          admin: {
            description: 'How the service is priced',
          },
        },
        {
          name: 'priceNote',
          type: 'text',
          admin: {
            description: 'Additional pricing information (e.g., \"Starting from\" or \"Contact for quote\")',
          },
        },
      ],
    },
    {
      name: 'callToAction',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Get Started',
          admin: {
            description: 'Text for the CTA button',
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          defaultValue: '/contact',
          admin: {
            description: 'Where the CTA button should link to',
          },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this service prominently',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this service on the website',
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
