import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FeatureCardBlock: Block = {
  slug: 'featureCardBlock',
  interfaceName: 'FeatureCardBlock',
  labels: {
    singular: 'Feature Card',
    plural: 'Feature Cards',
  },
  fields: [
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button label',
          admin: { width: '50%' },
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Button URL',
          admin: { width: '50%' },
        },
      ],
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
