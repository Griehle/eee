import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This will be the URL path for this page (e.g., "about" for /about)',
      },
    },
    {
      name: 'templateSelector',
      type: 'group',
      label: '📄 Template Options',
      fields: [
        {
          name: 'useTemplate',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Load content from a template',
          },
        },
        {
          name: 'template',
          type: 'relationship',
          relationTo: 'page-templates',
          admin: {
            description: 'Choose a template to load',
            condition: (data, siblingData) => siblingData?.useTemplate,
          },
        },
        {
          name: 'loadTemplate',
          type: 'ui',
          admin: {
            condition: (data, siblingData) => siblingData?.useTemplate && siblingData?.template,
            components: {
              Field: {
                path: '@/components/admin/LoadTemplateButton',
              },
            },
          },
        },
        {
          name: 'templateGallery',
          type: 'ui',
          admin: {
            components: {
              Field: {
                path: '@/components/admin/TemplateGallery',
              },
            },
          },
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pageBuilder',
      type: 'blocks',
      label: '🏗️ Page Builder',
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
        description: 'Build your page using blocks - drag, drop, and customize each element',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Legacy content field - use Page Builder above for modern layouts',
        condition: () => false, // Hide by default
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation: _operation }) => {
        // Handle template loading
        if (data.templateSelector?.useTemplate && data.templateSelector?.template) {
          try {
            const templateId = typeof data.templateSelector.template === 'string' 
              ? data.templateSelector.template 
              : data.templateSelector.template.id

            // Fetch the template
            const template = await req.payload.findByID({
              collection: 'page-templates',
              id: templateId,
            })

            if (template && template.pageBuilder) {
              // Only load template if pageBuilder is empty or user explicitly wants to replace
              if (!data.pageBuilder || data.pageBuilder.length === 0) {
                data.pageBuilder = template.pageBuilder
              }
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            req.payload.logger.error(`Error loading template: ${errorMessage}`)
          }
        }
        
        return data
      },
    ],
    beforeValidate: [
      async ({ data, req }) => {
        // When publishing, ensure status is set to published
        if (req.body && req.body._status === 'published') {
          data.status = 'published'
        } else if (req.body && req.body._status === 'draft') {
          data.status = 'draft'
        }
        return data
      },
    ],
  },
}
