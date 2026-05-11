import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'

import { IntroCardBlock } from '../../blocks/IntroCardBlock/config'
import { TwoImageTextBlock } from '../../blocks/TwoImageTextBlock/config'
import { CoverflowCarousel } from '../../blocks/CoverflowCarousel/config'
import { EngagementTextBlock } from '../../blocks/EngagementTextBlock/config'

export const Treatments: CollectionConfig<'treatments'> = {
  slug: 'treatments',
  labels: {
    singular: 'Treatment',
    plural: 'Treatments',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    featuredImage: true,
    excerpt: true,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Listing card',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional — used in listing layouts that show an image.',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description: 'Optional short description for listing cards.',
              },
            },
          ],
        },
        {
          label: 'Page layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              admin: {
                initCollapsed: true,
                description: 'Build the treatment detail page from blocks.',
              },
              blocks: [
                IntroCardBlock,
                TwoImageTextBlock,
                CoverflowCarousel,
                EngagementTextBlock,
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    slugField(),
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
