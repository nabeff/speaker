import type { Block } from 'payload'

export const TreatmentsListingBlock: Block = {
  slug: 'treatmentsListingBlock',
  interfaceName: 'TreatmentsListingBlock',
  labels: {
    singular: 'Treatments Listing',
    plural: 'Treatments Listings',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Treatments',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro paragraph (optional)',
    },
    {
      name: 'perPage',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 48,
    },
  ],
}
