import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'

import { MarqueeBlock } from '../../blocks/MarqueeBlock/config'
import { VisionBlock } from '../../blocks/VisionBlock/config'
import { FeatureCardBlock } from '../../blocks/FeatureCardBlock/config'
import { MediaTextBlock } from '../../blocks/MediaTextBlock/config'
import { WhoWeServeBlock } from '../../blocks/WhoWeServeBlock/config'
import { SignsListBlock } from '../../blocks/SignsListBlock/config'
import { BenefitsCarousel } from '../../blocks/BenefitsCarousel/config'

export const Programs: CollectionConfig<'programs'> = {
  slug: 'programs',
  labels: {
    singular: 'Program',
    plural: 'Programs',
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
              required: true,
              admin: {
                description: 'Used on the listing page card.',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Short description shown on the listing card.',
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
                description: 'Build the program detail page from blocks.',
              },
              blocks: [
                VisionBlock,
                MarqueeBlock,
                MediaTextBlock,
                WhoWeServeBlock,
                SignsListBlock,
                BenefitsCarousel,
                FeatureCardBlock,
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
