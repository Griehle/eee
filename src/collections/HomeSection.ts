import type { CollectionConfig } from 'payload'

export const HomeSection: CollectionConfig = {
  slug: 'home-section',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'imagePosition', 'isActive', 'order', 'updatedAt'],
    group: 'Home Page',
    description: '📝 Create content sections with rich text and images positioned left or right',
    listSearchableFields: ['title'],
    pagination: {
      defaultLimit: 20,
    },
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
        description: 'Section title/heading',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main content for this section - use the rich text editor to format your content with headings, lists, links, and more',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image to display alongside the content',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: [
        {
          label: '← Image on Left, Text on Right',
          value: 'left',
        },
        {
          label: 'Text on Left, Image on Right →',
          value: 'right',
        },
      ],
      defaultValue: 'left',
      admin: {
        description: 'Choose how to arrange the image and text content',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      admin: {
        description: 'Text for the call-to-action button (optional)',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      admin: {
        description: 'URL for the button link (can be internal like /about or external)',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        {
          label: 'Transparent',
          value: 'transparent',
        },
        {
          label: 'Card Background',
          value: 'var(--card-background)',
        },
        {
          label: 'Primary Background',
          value: 'var(--background-color)',
        },
      ],
      defaultValue: 'transparent',
      admin: {
        description: 'Background color for this section',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide this section',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Order of appearance (lower numbers appear first)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Ensure order is set if not provided
        if (data.order === undefined || data.order === null) {
          data.order = 0
        }
        return data
      },
    ],
  },
}
