import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
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
    image: true,
    excerpt: true,
    category: true,
    dateStart: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'dateStart', 'updatedAt'],
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
          label: 'Content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Short description (shown on listing card)',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Detail page subtitle (e.g. the question line)',
            },
            {
              name: 'body',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  LinkFeature(),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              label: 'Body',
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'event-categories',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'dateStart',
                  type: 'date',
                  required: true,
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'MM/dd/yyyy' },
                  },
                },
                {
                  name: 'dateEnd',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'MM/dd/yyyy' },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'timeStart',
                  type: 'text',
                  label: 'Start time (e.g. "9:00 AM EST")',
                  admin: { width: '50%' },
                },
                {
                  name: 'timeEnd',
                  type: 'text',
                  label: 'End time (e.g. "10:00 AM EST")',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'eventType',
              type: 'text',
              label: 'Event type (e.g. "Virtual")',
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
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
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
