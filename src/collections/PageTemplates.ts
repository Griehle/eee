import type { CollectionConfig } from 'payload'

export const PageTemplates: CollectionConfig = {
  slug: 'page-templates',
  labels: {
    singular: 'Page Template',
    plural: 'Page Templates',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'isActive', 'updatedAt'],
    group: 'Page Builder',
    description: '📋 Create reusable page templates similar to WPBakery template library',
    listSearchableFields: ['name', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of this template',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of what this template is used for',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: '🏠 Homepage', value: 'homepage' },
        { label: '📄 About', value: 'about' },
        { label: '📞 Contact', value: 'contact' },
        { label: '🛍️ Services', value: 'services' },
        { label: '👥 Team', value: 'team' },
        { label: '📁 Portfolio', value: 'portfolio' },
        { label: '💰 Pricing', value: 'pricing' },
        { label: '❓ FAQ', value: 'faq' },
        { label: '🎯 Landing Page', value: 'landing' },
        { label: '🔧 Other', value: 'other' },
      ],
      defaultValue: 'other',
      admin: {
        description: 'Template category',
      },
    },
    {
      name: 'thumbnail',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Preview image for this template',
      },
    },
    {
      name: 'pageBuilder',
      type: 'blocks',
      label: '🏗️ Template Structure',
      blocks: [
        {
          slug: 'contentBlock',
          labels: {
            singular: 'Content Block',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'block',
              type: 'relationship',
              relationTo: 'content-blocks',
              required: true,
            },
          ],
        },
        {
          slug: 'richText',
          labels: {
            singular: 'Rich Text',
            plural: 'Rich Text',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'customHTML',
          labels: {
            singular: 'Custom HTML',
            plural: 'Custom HTML',
          },
          fields: [
            {
              name: 'html',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Custom HTML code',
              },
            },
            {
              name: 'css',
              type: 'textarea',
              admin: {
                description: 'Optional CSS styles',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'Build the template structure using blocks',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Tags to help users find this template (e.g., "responsive", "modern", "business")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Make this template available for use',
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Featured templates appear first in the template picker',
        position: 'sidebar',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Template Metadata',
      fields: [
        {
          name: 'author',
          type: 'text',
          admin: {
            description: 'Template author/creator',
          },
        },
        {
          name: 'version',
          type: 'text',
          defaultValue: '1.0.0',
          admin: {
            description: 'Template version',
          },
        },
        {
          name: 'compatibility',
          type: 'select',
          options: [
            { label: 'All Devices', value: 'responsive' },
            { label: 'Desktop Only', value: 'desktop' },
            { label: 'Mobile First', value: 'mobile' },
          ],
          defaultValue: 'responsive',
        },
        {
          name: 'requiredPlugins',
          type: 'array',
          fields: [
            {
              name: 'plugin',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'Any plugins or dependencies required for this template',
          },
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'usage',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: {
            path: '@/components/admin/TemplateUsageInstructions',
          },
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug from name
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
      },
    ],
  },
}