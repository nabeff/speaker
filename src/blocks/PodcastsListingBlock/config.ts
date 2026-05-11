import type { Block } from 'payload'

export const PodcastsListingBlock: Block = {
  slug: 'podcastsListingBlock',
  interfaceName: 'PodcastsListingBlock',
  labels: {
    singular: 'Podcasts Listing',
    plural: 'Podcasts Listings',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Podcast',
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
