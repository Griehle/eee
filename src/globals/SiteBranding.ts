import type { GlobalConfig } from 'payload'

export const SiteBranding: GlobalConfig = {
  slug: 'site-branding',
  label: 'Site Branding',
  admin: {
    group: 'Site Settings',
    description: 'Manage your site branding, logo, and header configuration',
  },
  fields: [
    // Logo and Branding
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Upload your site logo (recommended: PNG with transparent background)',
      },
    },
    {
      name: 'logoAlt',
      type: 'text',
      admin: {
        description: 'Alt text for your logo (for accessibility)',
        condition: (data) => data.logo,
      },
    },
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'My Website',
      admin: {
        description: 'Your site name (displayed if no logo or as fallback)',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Optional tagline or slogan',
      },
    },
    
    // Header Configuration
    {
      name: 'headerStyle',
      type: 'select',
      options: [
        { label: 'Standard Header', value: 'standard' },
        { label: 'Centered Logo', value: 'centered' },
        { label: 'Logo Left, Nav Right', value: 'split' },
        { label: 'Logo Above Nav', value: 'stacked' },
      ],
      defaultValue: 'standard',
      admin: {
        description: 'Choose your header layout style',
      },
    },
    {
      name: 'showTaglineInHeader',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show tagline below logo in header',
        condition: (data) => data.tagline,
      },
    },
    
    // Navigation
    {
      name: 'navigationLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Use relative URLs like "/about" or full URLs',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Uncheck to temporarily hide this link',
          },
        },
      ],
      defaultValue: [
        { label: 'Home', url: '/', openInNewTab: false, isActive: true },
        { label: 'About', url: '/about', openInNewTab: false, isActive: true },
        { label: 'Services', url: '/services', openInNewTab: false, isActive: true },
        { label: 'Portfolio', url: '/portfolio', openInNewTab: false, isActive: true },
        { label: 'Contact', url: '/contact', openInNewTab: false, isActive: true },
      ],
      admin: {
        description: 'Manage your main navigation links',
      },
    },
    
    // Header Styling
    {
      name: 'headerStyling',
      type: 'group',
      label: 'Header Styling',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description: 'Header background color (e.g., #ffffff, rgba(255,255,255,0.9))',
          },
        },
        {
          name: 'textColor',
          type: 'text',
          admin: {
            description: 'Header text color (e.g., #333333)',
          },
        },
        {
          name: 'logoMaxHeight',
          type: 'text',
          defaultValue: '50px',
          admin: {
            description: 'Maximum height for logo (e.g., 50px, 3rem)',
          },
        },
        {
          name: 'isSticky',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make header stick to top when scrolling',
          },
        },
        {
          name: 'showShadow',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show shadow below header',
          },
        },
        {
          name: 'customCSS',
          type: 'textarea',
          admin: {
            description: 'Custom CSS for advanced header styling',
            rows: 4,
          },
        },
      ],
    },
    
    // Social Media
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'showInHeader',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show social media icons in header',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook page URL',
            condition: (data, siblingData) => siblingData?.showInHeader,
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profile URL',
            condition: (data, siblingData) => siblingData?.showInHeader,
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram profile URL',
            condition: (data, siblingData) => siblingData?.showInHeader,
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
            condition: (data, siblingData) => siblingData?.showInHeader,
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            description: 'YouTube channel URL',
            condition: (data, siblingData) => siblingData?.showInHeader,
          },
        },
      ],
    },
    
    // Contact Info in Header
    {
      name: 'headerContact',
      type: 'group',
      label: 'Header Contact Info',
      fields: [
        {
          name: 'showContactInfo',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show contact info in header',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Phone number',
            condition: (data, siblingData) => siblingData?.showContactInfo,
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Email address',
            condition: (data, siblingData) => siblingData?.showContactInfo,
          },
        },
        {
          name: 'address',
          type: 'text',
          admin: {
            description: 'Short address (e.g., "New York, NY")',
            condition: (data, siblingData) => siblingData?.showContactInfo,
          },
        },
      ],
    },
  ],
}