import type { Block } from 'payload'

export const PodcastsCarousel: Block = {
  slug: 'podcastsCarousel',
  interfaceName: 'PodcastsCarouselBlock',
  labels: {
    singular: 'Podcasts Carousel',
    plural: 'Podcasts Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Latest podcasts',
    },
    {
      type: 'collapsible',
      label: 'Right-side link',
      fields: [
        { name: 'linkLeadText', type: 'text', label: 'Link – black part (e.g. "View All")' },
        { name: 'linkAccentText', type: 'text', label: 'Link – orange part (e.g. "Podcasts")' },
        { name: 'linkUrl', type: 'text', label: 'URL (e.g. "/podcasts")' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 9,
      min: 3,
      max: 30,
    },
  ],
}
