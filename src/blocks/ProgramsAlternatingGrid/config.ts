import type { Block } from 'payload'

export const ProgramsAlternatingGrid: Block = {
  slug: 'programsAlternatingGrid',
  interfaceName: 'ProgramsAlternatingGridBlock',
  labels: {
    singular: 'Programs Alternating Grid',
    plural: 'Programs Alternating Grids',
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
      label: 'Intro paragraph (right side of header)',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 24,
    },
  ],
}
