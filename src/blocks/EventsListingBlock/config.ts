import type { Block } from 'payload'

export const EventsListingBlock: Block = {
  slug: 'eventsListingBlock',
  interfaceName: 'EventsListingBlock',
  labels: {
    singular: 'Events Listing',
    plural: 'Events Listings',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Events',
      required: true,
    },
    {
      name: 'perPage',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 50,
    },
  ],
}
