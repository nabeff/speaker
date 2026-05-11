import type { Block } from 'payload'

export const MarqueeBlock: Block = {
  slug: 'marqueeBlock',
  interfaceName: 'MarqueeBlock',
  labels: {
    singular: 'Marquee',
    plural: 'Marquees',
  },
  fields: [
    {
      name: 'phrases',
      type: 'array',
      required: true,
      minRows: 2,
      labels: {
        singular: 'Phrase',
        plural: 'Phrases',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Phrase',
        },
      ],
      admin: {
        initCollapsed: false,
        description:
          'Phrases scroll horizontally, separated by an accent star. Add as many as you like.',
      },
    },
    {
      name: 'speed',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Slow', value: 'slow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Fast', value: 'fast' },
      ],
    },
  ],
}
