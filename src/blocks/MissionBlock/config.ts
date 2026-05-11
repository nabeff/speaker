import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const MissionBlock: Block = {
  slug: 'missionBlock',
  interfaceName: 'MissionBlock',
  labels: {
    singular: 'Mission',
    plural: 'Missions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      admin: { description: 'e.g. "Our Mission"' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subheadingAccent',
          type: 'text',
          label: 'Subheading – orange part',
          admin: {
            width: '50%',
            description: 'Shown in orange. e.g. "Expert to Speaker"',
          },
        },
        {
          name: 'subheadingRest',
          type: 'text',
          label: 'Subheading – black part',
          admin: {
            width: '50%',
            description:
              'Shown in black, follows the orange text. e.g. "is on a mission to reimagine family mental health care"',
          },
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'showDecorations',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show light-yellow side circles',
    },
  ],
}
