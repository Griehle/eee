import type { CollectionConfig } from 'payload'

export const ContentBlocks: CollectionConfig = {
  slug: 'content-blocks',
  labels: {
    singular: 'Content Block',
    plural: 'Content Blocks',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'blockType', 'isActive', 'updatedAt'],
    group: 'Page Builder',
    description: '🏗️ Create powerful page builder blocks similar to WPBakery',
    listSearchableFields: ['title', 'content', 'blockType'],
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
        description: 'Internal name for this content block',
      },
    },
    {
      name: 'blockType',
      type: 'select',
      required: true,
      options: [
        // Layout Elements
        { label: '📐 Row', value: 'row' },
        { label: '📏 Column', value: 'column' },
        { label: '📄 Section', value: 'section' },
        
        // Content Elements
        { label: '📝 Text Block', value: 'text' },
        { label: '📰 Heading', value: 'heading' },
        { label: '🖼️ Image', value: 'image' },
        { label: '🖼️ Image Gallery', value: 'gallery' },
        { label: '📹 Video', value: 'video' },
        { label: '💬 Quote/Testimonial', value: 'quote' },
        { label: '🔘 Button', value: 'button' },
        { label: '🔗 Icon Box', value: 'icon_box' },
        
        // Interactive Elements
        { label: '📋 Accordion', value: 'accordion' },
        { label: '🗂️ Tabs', value: 'tabs' },
        { label: '🎠 Carousel/Slider', value: 'carousel' },
        { label: '📞 Contact Form', value: 'contact_form' },
        { label: '🗺️ Google Maps', value: 'google_maps' },
        
        // Data Display
        { label: '✅ Features List', value: 'features' },
        { label: '📊 Statistics', value: 'stats' },
        { label: '👥 Team Members', value: 'team_grid' },
        { label: '📝 Posts Grid', value: 'posts_grid' },
        
        // Media & Visual
        { label: '🌟 Call to Action', value: 'cta' },
        { label: '📊 Progress Bar', value: 'progress_bar' },
        { label: '➗ Separator', value: 'separator' },
      ],
      admin: {
        description: 'What type of content block this is',
      },
    },
    // Layout Structure Fields
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'width',
          type: 'select',
          options: [
            { label: '1/12', value: '1' },
            { label: '2/12 (1/6)', value: '2' },
            { label: '3/12 (1/4)', value: '3' },
            { label: '4/12 (1/3)', value: '4' },
            { label: '5/12', value: '5' },
            { label: '6/12 (1/2)', value: '6' },
            { label: '7/12', value: '7' },
            { label: '8/12 (2/3)', value: '8' },
            { label: '9/12 (3/4)', value: '9' },
            { label: '10/12 (5/6)', value: '10' },
            { label: '11/12', value: '11' },
            { label: '12/12 (Full)', value: '12' },
          ],
          defaultValue: '12',
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
      admin: {
        description: 'Define columns for this row',
        condition: (data) => ['row'].includes(data.blockType),
      },
    },
    
    // Content Fields
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Main content for this block',
        condition: (data) => ['text', 'quote', 'column', 'section'].includes(data.blockType),
      },
    },
    {
      name: 'heading',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'tag',
          type: 'select',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
            { label: 'H4', value: 'h4' },
            { label: 'H5', value: 'h5' },
            { label: 'H6', value: 'h6' },
          ],
          defaultValue: 'h2',
        },
        {
          name: 'color',
          type: 'text',
          admin: {
            description: 'CSS color value (e.g., #333333)',
          },
        },
      ],
      admin: {
        description: 'Heading configuration',
        condition: (data) => ['heading'].includes(data.blockType),
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Image for this block',
        condition: (data) => ['image', 'icon_box', 'cta'].includes(data.blockType),
      },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      admin: {
        description: 'Images for gallery',
        condition: (data) => ['gallery', 'carousel'].includes(data.blockType),
      },
    },
    {
      name: 'video',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'YouTube, Vimeo, or direct video URL',
          },
        },
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'controls',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'loop',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        description: 'Video configuration',
        condition: (data) => ['video', 'video_bg'].includes(data.blockType),
      },
    },
    {
      name: 'quote',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
        },
        {
          name: 'authorTitle',
          type: 'text',
        },
        {
          name: 'authorImage',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
      admin: {
        description: 'Quote/testimonial content',
        condition: (data) => ['quote'].includes(data.blockType),
      },
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
          defaultValue: 'primary',
        },
        {
          name: 'size',
          type: 'select',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
          defaultValue: 'md',
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        description: 'Button configuration',
        condition: (data) => ['button', 'cta'].includes(data.blockType),
      },
    },
    {
      name: 'iconBox',
      type: 'group',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon class or SVG code',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
      admin: {
        description: 'Icon box content',
        condition: (data) => ['icon_box'].includes(data.blockType),
      },
    },
    {
      name: 'accordion',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'isOpen',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        description: 'Accordion items',
        condition: (data) => ['accordion'].includes(data.blockType),
      },
    },
    {
      name: 'tabs',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
      admin: {
        description: 'Tab items',
        condition: (data) => ['tabs'].includes(data.blockType),
      },
    },
    {
      name: 'contactForm',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'emailTo',
          type: 'email',
          required: true,
        },
        {
          name: 'fields',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'tel' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Select', value: 'select' },
              ],
              defaultValue: 'text',
            },
            {
              name: 'required',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
      admin: {
        description: 'Contact form configuration',
        condition: (data) => ['contact_form'].includes(data.blockType),
      },
    },
    {
      name: 'googleMaps',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'zoom',
          type: 'number',
          defaultValue: 15,
        },
        {
          name: 'height',
          type: 'text',
          defaultValue: '400px',
        },
      ],
      admin: {
        description: 'Google Maps configuration',
        condition: (data) => ['google_maps'].includes(data.blockType),
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
      admin: {
        description: 'List of features',
        condition: (data) => ['features'].includes(data.blockType),
      },
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'The statistic number (e.g., "100+", "50%")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'What this statistic represents',
          },
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
      admin: {
        description: 'Statistics to display',
        condition: (data) => ['stats'].includes(data.blockType),
      },
    },
    {
      name: 'teamGrid',
      type: 'group',
      fields: [
        {
          name: 'members',
          type: 'relationship',
          relationTo: 'team-members',
          hasMany: true,
        },
        {
          name: 'columns',
          type: 'select',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          defaultValue: '3',
        },
      ],
      admin: {
        description: 'Team members grid',
        condition: (data) => ['team_grid'].includes(data.blockType),
      },
    },
    {
      name: 'postsGrid',
      type: 'group',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
        },
        {
          name: 'count',
          type: 'number',
          defaultValue: 6,
        },
        {
          name: 'columns',
          type: 'select',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          defaultValue: '3',
        },
      ],
      admin: {
        description: 'Posts grid configuration',
        condition: (data) => ['posts_grid'].includes(data.blockType),
      },
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'primaryButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
      admin: {
        description: 'Call to action content',
        condition: (data) => ['cta'].includes(data.blockType),
      },
    },
    {
      name: 'progressBar',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'percentage',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
        },
        {
          name: 'color',
          type: 'text',
        },
      ],
      admin: {
        description: 'Progress bars',
        condition: (data) => ['progress_bar'].includes(data.blockType),
      },
    },
    {
      name: 'separator',
      type: 'group',
      fields: [
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Line', value: 'line' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Dotted', value: 'dotted' },
            { label: 'Double', value: 'double' },
            { label: 'Shadow', value: 'shadow' },
          ],
          defaultValue: 'line',
        },
        {
          name: 'width',
          type: 'select',
          options: [
            { label: '25%', value: '25' },
            { label: '50%', value: '50' },
            { label: '75%', value: '75' },
            { label: '100%', value: '100' },
          ],
          defaultValue: '100',
        },
        {
          name: 'color',
          type: 'text',
        },
      ],
      admin: {
        description: 'Separator styling',
        condition: (data) => ['separator'].includes(data.blockType),
      },
    },
    // Advanced Styling Options (WPBakery-style)
    {
      name: 'styling',
      type: 'group',
      label: '🎨 Design Options',
      fields: [
        // Layout & Spacing
        {
          name: 'marginTop',
          type: 'text',
          admin: {
            description: 'Top margin (e.g., 20px, 2rem)',
          },
        },
        {
          name: 'marginBottom',
          type: 'text',
          admin: {
            description: 'Bottom margin (e.g., 20px, 2rem)',
          },
        },
        {
          name: 'paddingTop',
          type: 'text',
          admin: {
            description: 'Top padding (e.g., 20px, 2rem)',
          },
        },
        {
          name: 'paddingBottom',
          type: 'text',
          admin: {
            description: 'Bottom padding (e.g., 20px, 2rem)',
          },
        },
        {
          name: 'paddingLeft',
          type: 'text',
          admin: {
            description: 'Left padding (e.g., 20px, 2rem)',
          },
        },
        {
          name: 'paddingRight',
          type: 'text',
          admin: {
            description: 'Right padding (e.g., 20px, 2rem)',
          },
        },
        
        // Background Options
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description: 'Background color (e.g., #ffffff, rgba(255,255,255,0.8))',
          },
        },
        {
          name: 'backgroundImage',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'Background image',
          },
        },
        {
          name: 'backgroundPosition',
          type: 'select',
          options: [
            { label: 'Top Left', value: 'top left' },
            { label: 'Top Center', value: 'top center' },
            { label: 'Top Right', value: 'top right' },
            { label: 'Center Left', value: 'center left' },
            { label: 'Center Center', value: 'center center' },
            { label: 'Center Right', value: 'center right' },
            { label: 'Bottom Left', value: 'bottom left' },
            { label: 'Bottom Center', value: 'bottom center' },
            { label: 'Bottom Right', value: 'bottom right' },
          ],
          defaultValue: 'center center',
          admin: {
            condition: (data) => data.styling?.backgroundImage,
          },
        },
        {
          name: 'backgroundSize',
          type: 'select',
          options: [
            { label: 'Cover', value: 'cover' },
            { label: 'Contain', value: 'contain' },
            { label: 'Auto', value: 'auto' },
          ],
          defaultValue: 'cover',
          admin: {
            condition: (data) => data.styling?.backgroundImage,
          },
        },
        {
          name: 'backgroundRepeat',
          type: 'select',
          options: [
            { label: 'No Repeat', value: 'no-repeat' },
            { label: 'Repeat', value: 'repeat' },
            { label: 'Repeat X', value: 'repeat-x' },
            { label: 'Repeat Y', value: 'repeat-y' },
          ],
          defaultValue: 'no-repeat',
          admin: {
            condition: (data) => data.styling?.backgroundImage,
          },
        },
        {
          name: 'backgroundGradient',
          type: 'text',
          admin: {
            description: 'CSS gradient (e.g., linear-gradient(45deg, #ff0000, #00ff00))',
          },
        },
        
        // Border Options
        {
          name: 'borderWidth',
          type: 'text',
          admin: {
            description: 'Border width (e.g., 1px, 2px)',
          },
        },
        {
          name: 'borderStyle',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Solid', value: 'solid' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Dotted', value: 'dotted' },
            { label: 'Double', value: 'double' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'borderColor',
          type: 'text',
          admin: {
            description: 'Border color (e.g., #cccccc)',
            condition: (data) => data.styling?.borderStyle && data.styling?.borderStyle !== 'none',
          },
        },
        {
          name: 'borderRadius',
          type: 'text',
          admin: {
            description: 'Border radius (e.g., 5px, 10px)',
          },
        },
        
        // Text & Typography
        {
          name: 'textAlign',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
            { label: 'Justify', value: 'justify' },
          ],
          defaultValue: 'left',
        },
        {
          name: 'textColor',
          type: 'text',
          admin: {
            description: 'Text color (e.g., #333333)',
          },
        },
        {
          name: 'fontSize',
          type: 'text',
          admin: {
            description: 'Font size (e.g., 16px, 1.2rem)',
          },
        },
        {
          name: 'fontWeight',
          type: 'select',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Bold', value: 'bold' },
            { label: '100', value: '100' },
            { label: '200', value: '200' },
            { label: '300', value: '300' },
            { label: '400', value: '400' },
            { label: '500', value: '500' },
            { label: '600', value: '600' },
            { label: '700', value: '700' },
            { label: '800', value: '800' },
            { label: '900', value: '900' },
          ],
        },
        
        // Effects & Animation
        {
          name: 'boxShadow',
          type: 'text',
          admin: {
            description: 'Box shadow (e.g., 0 4px 6px rgba(0,0,0,0.1))',
          },
        },
        {
          name: 'animation',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Fade In', value: 'fadeIn' },
            { label: 'Fade In Up', value: 'fadeInUp' },
            { label: 'Fade In Down', value: 'fadeInDown' },
            { label: 'Fade In Left', value: 'fadeInLeft' },
            { label: 'Fade In Right', value: 'fadeInRight' },
            { label: 'Slide In Up', value: 'slideInUp' },
            { label: 'Slide In Down', value: 'slideInDown' },
            { label: 'Zoom In', value: 'zoomIn' },
            { label: 'Bounce In', value: 'bounceIn' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'animationDelay',
          type: 'text',
          admin: {
            description: 'Animation delay (e.g., 0.2s, 200ms)',
            condition: (data) => data.styling?.animation && data.styling?.animation !== 'none',
          },
        },
        {
          name: 'animationDuration',
          type: 'text',
          admin: {
            description: 'Animation duration (e.g., 1s, 500ms)',
            condition: (data) => data.styling?.animation && data.styling?.animation !== 'none',
          },
        },
        
        // Responsive Options
        {
          name: 'hideOnMobile',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Hide this block on mobile devices',
          },
        },
        {
          name: 'hideOnTablet',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Hide this block on tablet devices',
          },
        },
        {
          name: 'hideOnDesktop',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Hide this block on desktop devices',
          },
        },
        
        // Custom CSS
        {
          name: 'customCSS',
          type: 'textarea',
          admin: {
            description: 'Custom CSS styles for advanced customization',
          },
        },
        {
          name: 'customClassName',
          type: 'text',
          admin: {
            description: 'Custom CSS class name',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Make this block available for use',
        position: 'sidebar',
      },
    },
  ],
}
