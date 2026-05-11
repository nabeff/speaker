import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

export const EngagementBlock: Block = {
  slug: 'engagementBlock',
  interfaceName: 'EngagementBlock',
  labels: {
    singular: 'Engagement',
    plural: 'Engagements',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'linkVariant',
      type: 'select',
      defaultValue: 'arrow',
      label: 'Link style',
      options: [
        { label: 'Pill button (orange)', value: 'pill' },
        { label: 'Text with arrow', value: 'arrow' },
      ],
    },
    link({ appearances: false }),
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image Left', value: 'left' },
        { label: 'Image Right', value: 'right' },
      ],
    },
    {
      name: 'showDecorations',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show decorative circles',
    },
  ],
}
