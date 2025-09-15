import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'department', 'isActive', 'updatedAt'],
    group: 'Content Types',
    description: '👥 Manage team member profiles and information',
    listSearchableFields: ['name', 'position', 'department', 'bio'],
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
        description: 'Full name of the team member',
      },
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or position',
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Design', value: 'design' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
        { label: 'Operations', value: 'operations' },
        { label: 'HR', value: 'hr' },
        { label: 'Finance', value: 'finance' },
        { label: 'Support', value: 'support' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Department or team',
      },
    },
    {
      name: 'photo',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Professional headshot or profile photo',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Biography or description of the team member',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Work email address (optional)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Work phone number (optional)',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub profile URL',
          },
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'Date when they joined the company',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this team member prominently',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this team member on the website',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order within department',
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
