import type { Block } from 'payload'

export const TreatmentsCarousel: Block = {
  slug: 'treatmentsCarousel',
  interfaceName: 'TreatmentsCarouselBlock',
  labels: {
    singular: 'Treatments Carousel',
    plural: 'Treatments Carousels',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Heading (split into 4 parts to highlight in orange)',
      fields: [
        { name: 'headingStart', type: 'text', label: 'Heading – start (black)' },
        { name: 'headingAccent1', type: 'text', label: 'Heading – first orange word' },
        { name: 'headingMiddle', type: 'text', label: 'Heading – middle (black)' },
        { name: 'headingAccent2', type: 'text', label: 'Heading – second orange word' },
      ],
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro paragraph',
    },
    {
      type: 'collapsible',
      label: 'Right-side link',
      fields: [
        { name: 'linkLeadText', type: 'text', label: 'Link – black part (e.g. "View All")' },
        { name: 'linkAccentText', type: 'text', label: 'Link – orange part (e.g. "Treatment")' },
        { name: 'linkUrl', type: 'text', label: 'URL (e.g. "/treatments")' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 50,
      admin: { description: 'How many treatments to load.' },
    },
  ],
}
