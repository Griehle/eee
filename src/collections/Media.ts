import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media File',
    plural: 'Media Library',
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'category', 'updatedAt'],
    group: 'Media',
    description: '📁 Upload and organize images, videos, and documents with advanced search and categorization',
    listSearchableFields: ['filename', 'alt', 'title', 'caption', 'tags'],
    pagination: {
      defaultLimit: 20,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title for the media file',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Optional caption or description',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'media-categories',
      admin: {
        description: 'Organize files by category for easier searching',
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'text',
      admin: {
        description: 'Comma-separated tags for better searchability (e.g., "hero, banner, blue, modern")',
        position: 'sidebar',
      },
    },
    {
      name: 'usage',
      type: 'select',
      options: [
        { label: 'General Use', value: 'general' },
        { label: 'Hero/Banner', value: 'hero' },
        { label: 'Content Section', value: 'content' },
        { label: 'Team/Profile', value: 'team' },
        { label: 'Product/Service', value: 'product' },
        { label: 'Icon/Logo', value: 'icon' },
        { label: 'Background', value: 'background' },
      ],
      defaultValue: 'general',
      admin: {
        description: 'Intended use for this media file',
        position: 'sidebar',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        crop: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        crop: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
