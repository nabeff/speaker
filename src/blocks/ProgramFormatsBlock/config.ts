import type { Block } from 'payload'

export const ProgramFormatsBlock: Block = {
  slug: 'programFormatsBlock',
  interfaceName: 'ProgramFormatsBlock',
  labels: {
    singular: 'Program Formats',
    plural: 'Program Formats',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Formats du programme"' },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Format', plural: 'Formats' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
