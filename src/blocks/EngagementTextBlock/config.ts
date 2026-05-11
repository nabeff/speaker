import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

export const EngagementTextBlock: Block = {
  slug: 'engagementTextBlock',
  interfaceName: 'EngagementTextBlock',
  labels: {
    singular: 'Engagement (Text Only)',
    plural: 'Engagements (Text Only)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Side image (optional)',
      admin: {
        description: 'Shown on the right side of the section. Leave empty to show only the decorative blob.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          LinkFeature(),
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
  ],
}
