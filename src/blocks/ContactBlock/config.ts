import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Get in Touch with Experts',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Unlocking Efficiency, Quality, and Savings.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image (optional, shown on the cream side)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: { width: '40%' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '30%' },
        },
        {
          name: 'address',
          type: 'text',
          admin: { width: '30%' },
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description:
          'Pick a Form to render in this block. Configure fields, submit label, confirmation message, and email notifications in the Forms collection.',
      },
    },
    {
      name: 'privacyText',
      type: 'richText',
      label: 'Privacy text (small text below the form)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          LinkFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
}
