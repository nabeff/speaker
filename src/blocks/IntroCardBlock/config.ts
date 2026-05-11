import type { Block } from 'payload'

export const IntroCardBlock: Block = {
  slug: 'introCardBlock',
  interfaceName: 'IntroCardBlock',
  labels: {
    singular: 'Intro Card',
    plural: 'Intro Cards',
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
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image Right', value: 'right' },
        { label: 'Image Left', value: 'left' },
      ],
    },
  ],
}
