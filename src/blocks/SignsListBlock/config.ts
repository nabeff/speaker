import type { Block } from 'payload'

export const SignsListBlock: Block = {
  slug: 'signsListBlock',
  interfaceName: 'SignsListBlock',
  labels: {
    singular: 'Signs List',
    plural: 'Signs Lists',
  },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro paragraph',
      admin: {
        description: 'Small text shown above the heading.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Sign', plural: 'Signs' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
