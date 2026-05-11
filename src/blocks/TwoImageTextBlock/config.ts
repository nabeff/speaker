import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TwoImageTextBlock: Block = {
  slug: 'twoImageTextBlock',
  interfaceName: 'TwoImageTextBlock',
  labels: {
    singular: 'Two Images + Text',
    plural: 'Two Images + Text',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'image1',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'image2',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { width: '50%' },
        },
      ],
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
          LinkFeature(),
        ],
      }),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'buttonUrl',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'imagesPosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Images Left', value: 'left' },
        { label: 'Images Right', value: 'right' },
      ],
    },
  ],
}
