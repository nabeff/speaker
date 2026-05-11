import type { Block } from 'payload'

export const CoverflowCarousel: Block = {
  slug: 'coverflowCarousel',
  interfaceName: 'CoverflowCarouselBlock',
  labels: {
    singular: 'Coverflow Carousel',
    plural: 'Coverflow Carousels',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 3,
      labels: { singular: 'Slide', plural: 'Slides' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'autoplaySeconds',
      type: 'number',
      defaultValue: 4,
      admin: { description: 'Seconds between slides.' },
    },
  ],
}
