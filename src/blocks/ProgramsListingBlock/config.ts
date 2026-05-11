import type { Block } from 'payload'

export const ProgramsListingBlock: Block = {
  slug: 'programsListingBlock',
  interfaceName: 'ProgramsListingBlock',
  labels: {
    singular: 'Programs Listing',
    plural: 'Programs Listings',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Formats du programme',
      required: true,
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 24,
      admin: { description: 'How many programs to show.' },
    },
  ],
}
