import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Top Questions Answered"' },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Shown in orange under the heading. e.g. "FAQs"' },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Question', plural: 'Questions' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
