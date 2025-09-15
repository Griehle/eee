import type { CollectionConfig } from 'payload'

export const HomeSlider: CollectionConfig = {
  slug: 'home-slider',
  labels: {
    singular: 'Slider Image',
    plural: 'Slider Images',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'order', 'updatedAt'],
    group: 'Home Page',
    description: '📸 Manage up to 10 slider images for the home page hero section. Recommended image size: 1920x800px or larger.',
    listSearchableFields: ['title', 'subtitle'],
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
        description: 'The main title displayed on the slide',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Optional subtitle text displayed below the title',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Background image for this slide',
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
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to hide this slide',
      },
    },
    {
      name: 'order',
      type: 'number',
      min: 0,
      max: 99,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (0-99, lower numbers appear first). Tip: Use 10, 20, 30... to easily reorder later.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Ensure order is set if not provided
        if (data.order === undefined || data.order === null) {
          data.order = 0
        }

        // Check if we're creating a new active slide and we already have 10
        if (operation === 'create' && data.isActive) {
          const activeSlides = await req.payload.find({
            collection: 'home-slider',
            where: {
              isActive: {
                equals: true,
              },
            },
          })

          if (activeSlides.docs.length >= 10) {
            throw new Error('Maximum of 10 active slider images allowed. Please deactivate another slide first.')
          }
        }

        return data
      },
    ],
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        // Auto-generate order based on existing slides if not provided
        if (data.order === undefined || data.order === null) {
          data.order = Date.now() // Use timestamp as default order
        }
        return data
      },
    ],
  },
}
