import type { Block } from 'payload'

export const BenefitsCarousel: Block = {
  slug: 'benefitsCarousel',
  interfaceName: 'BenefitsCarouselBlock',
  labels: {
    singular: 'Benefits Carousel',
    plural: 'Benefits Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro paragraph (right side)',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      labels: { singular: 'Benefit', plural: 'Benefits' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
