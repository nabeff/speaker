import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const IntroBlock: Block = {
  slug: 'introBlock',
  interfaceName: 'IntroBlock',
  labels: {
    singular: 'Intro',
    plural: 'Intros',
  },
  fields: [
    {
      name: 'showIcon',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show microphone icon',
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      required: true,
    },
  ],
}
