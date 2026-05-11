import type { Block } from 'payload'

export const LogoGridBlock: Block = {
  slug: 'logoGridBlock',
  interfaceName: 'LogoGridBlock',
  labels: {
    singular: 'Logo Grid',
    plural: 'Logo Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'headingAlign',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '5',
      options: [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    },
    {
      name: 'logos',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Logo', plural: 'Logos' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Customer name (alt text)',
        },
      ],
    },
  ],
}
