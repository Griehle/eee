import type { CollectionConfig } from 'payload'

export const MediaCategories: CollectionConfig = {
  slug: 'media-categories',
  labels: {
    singular: 'Media Category',
    plural: 'Media Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'updatedAt'],
    group: 'Media',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Category name (e.g., "Hero Images", "Team Photos", "Icons")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version (auto-generated from name)',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.name && !data.slug) {
                data.slug = data.name
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
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of what this category contains',
      },
    },
    {
      name: 'color',
      type: 'select',
      options: [
        { label: '🔵 Blue', value: 'blue' },
        { label: '🟢 Green', value: 'green' },
        { label: '🟡 Yellow', value: 'yellow' },
        { label: '🟠 Orange', value: 'orange' },
        { label: '🔴 Red', value: 'red' },
        { label: '🟣 Purple', value: 'purple' },
        { label: '⚫ Gray', value: 'gray' },
      ],
      defaultValue: 'blue',
      admin: {
        description: 'Color coding for easy identification',
      },
    },
  ],
}
