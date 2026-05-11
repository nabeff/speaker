import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        admin: {
          description: 'Add up to two call-to-action buttons. Each button has a variant (Default or Outline) selectable in the admin.',
        },
      },
    }),
  ],
}
