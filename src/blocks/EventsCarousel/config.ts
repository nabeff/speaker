import type { Block } from 'payload'

export const EventsCarousel: Block = {
  slug: 'eventsCarousel',
  interfaceName: 'EventsCarouselBlock',
  labels: {
    singular: 'Events Carousel',
    plural: 'Events Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Upcoming events',
    },
    {
      type: 'collapsible',
      label: 'Right-side link',
      fields: [
        { name: 'linkLeadText', type: 'text', label: 'Link – black part (e.g. "View All")' },
        { name: 'linkAccentText', type: 'text', label: 'Link – orange part (e.g. "Events")' },
        { name: 'linkUrl', type: 'text', label: 'URL (e.g. "/events")' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 9,
      min: 3,
      max: 30,
      admin: { description: 'How many events to load.' },
    },
  ],
}
