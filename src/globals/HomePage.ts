import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page Settings',
  admin: {
    group: 'Home Page',
  },
  fields: [
    {
      name: 'heroOverlayOpacity',
      type: 'number',
      defaultValue: 0.4,
      min: 0,
      max: 1,
      admin: {
        description: 'Overlay opacity for hero slider (0 - 1)',
      },
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      defaultValue: 6000,
      admin: {
        description: 'Slider auto-play interval in milliseconds',
        position: 'sidebar',
      },
    },
    {
      name: 'showRecentPosts',
      type: 'checkbox',
      label: 'Show Recent Posts',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'recentPostsLimit',
      type: 'number',
      defaultValue: 3,
      admin: {
        position: 'sidebar',
        description: 'How many recent posts to display',
      },
    },
  ],
}

