import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const PodcastCategories: CollectionConfig = {
  slug: 'podcast-categories',
  labels: {
    singular: 'Podcast Category',
    plural: 'Podcast Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({ position: undefined }),
  ],
}
