import { CollectionConfig } from 'payload'

export const PDFDocuments: CollectionConfig = {
  slug: 'pdf-documents',
  labels: {
    singular: 'PDF Document',
    plural: 'PDF Documents',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Document Title',
      required: true,
      admin: {
        description: 'The title of the PDF document'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description of the PDF document'
      }
    },
    {
      name: 'pdfFile',
      type: 'upload',
      label: 'PDF File',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'pdf' }
      },
      admin: {
        description: 'Upload the PDF file'
      }
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Brochure', value: 'brochure' },
        { label: 'Manual', value: 'manual' },
        { label: 'Catalog', value: 'catalog' },
        { label: 'Report', value: 'report' },
        { label: 'Book', value: 'book' },
        { label: 'Magazine', value: 'magazine' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other'
    },
    {
      name: 'thumbnail',
      type: 'upload',
      label: 'Thumbnail Image',
      relationTo: 'media',
      admin: {
        description: 'Optional thumbnail image for the document'
      }
    },
    {
      name: 'settings',
      type: 'group',
      label: 'FlipBook Settings',
      fields: [
        {
          name: 'showCover',
          type: 'checkbox',
          label: 'Show Cover Page',
          defaultValue: true,
          admin: {
            description: 'Display a custom cover page before the PDF'
          }
        },
        {
          name: 'width',
          type: 'number',
          label: 'Width (pixels)',
          defaultValue: 600,
          admin: {
            description: 'Width of the flipbook in pixels'
          }
        },
        {
          name: 'height',
          type: 'number',
          label: 'Height (pixels)',
          defaultValue: 800,
          admin: {
            description: 'Height of the flipbook in pixels'
          }
        },
        {
          name: 'enableDownload',
          type: 'checkbox',
          label: 'Enable Download',
          defaultValue: true,
          admin: {
            description: 'Allow users to download the PDF'
          }
        },
        {
          name: 'enableFullscreen',
          type: 'checkbox',
          label: 'Enable Fullscreen',
          defaultValue: true,
          admin: {
            description: 'Allow fullscreen viewing'
          }
        }
      ]
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Published',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check to make this document publicly visible'
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'tags',
      type: 'text',
      label: 'Tags',
      hasMany: true,
      admin: {
        description: 'Add tags to help categorize and search documents'
      }
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
      admin: {
        description: 'Author or creator of the document'
      }
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the title'
      },
      hooks: {
        beforeValidate: [
          ({ value, originalDoc, data }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      label: 'View Count',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Number of times this document has been viewed'
      }
    },
    {
      name: 'downloadCount',
      type: 'number',
      label: 'Download Count',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Number of times this document has been downloaded'
      }
    }
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (data.isPublished && !data.publishedAt) {
            data.publishedAt = new Date();
          }
        }
        return data;
      },
    ],
  },
}