import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { HeroBlock } from '../../blocks/HeroBlock/config'
import { IntroBlock } from '../../blocks/IntroBlock/config'
import { MarqueeBlock } from '../../blocks/MarqueeBlock/config'
import { FeatureAccordion } from '../../blocks/FeatureAccordion/config'
import { VisionBlock } from '../../blocks/VisionBlock/config'
import { MissionBlock } from '../../blocks/MissionBlock/config'
import { LogoGridBlock } from '../../blocks/LogoGridBlock/config'
import { EngagementBlock } from '../../blocks/EngagementBlock/config'
import { FAQBlock } from '../../blocks/FAQBlock/config'
import { FeatureCardBlock } from '../../blocks/FeatureCardBlock/config'
import { MediaTextBlock } from '../../blocks/MediaTextBlock/config'
import { WhoWeServeBlock } from '../../blocks/WhoWeServeBlock/config'
import { SignsListBlock } from '../../blocks/SignsListBlock/config'
import { BenefitsCarousel } from '../../blocks/BenefitsCarousel/config'
import { IntroCardBlock } from '../../blocks/IntroCardBlock/config'
import { TwoImageTextBlock } from '../../blocks/TwoImageTextBlock/config'
import { CoverflowCarousel } from '../../blocks/CoverflowCarousel/config'
import { EngagementTextBlock } from '../../blocks/EngagementTextBlock/config'
import { ProgramFormatsBlock } from '../../blocks/ProgramFormatsBlock/config'
import { BannerCTABlock } from '../../blocks/BannerCTABlock/config'
import { EventsListingBlock } from '../../blocks/EventsListingBlock/config'
import { PodcastsListingBlock } from '../../blocks/PodcastsListingBlock/config'
import { ContactBlock } from '../../blocks/ContactBlock/config'
import { ProgramsListingBlock } from '../../blocks/ProgramsListingBlock/config'
import { ProgramsAlternatingGrid } from '../../blocks/ProgramsAlternatingGrid/config'
import { TreatmentsCarousel } from '../../blocks/TreatmentsCarousel/config'
import { EventsCarousel } from '../../blocks/EventsCarousel/config'
import { TreatmentsListingBlock } from '../../blocks/TreatmentsListingBlock/config'
import { PodcastsCarousel } from '../../blocks/PodcastsCarousel/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
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
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HeroBlock, IntroBlock, MarqueeBlock, FeatureAccordion, VisionBlock, MissionBlock, LogoGridBlock, EngagementBlock, EngagementTextBlock, FAQBlock, FeatureCardBlock, MediaTextBlock, WhoWeServeBlock, SignsListBlock, BenefitsCarousel, IntroCardBlock, TwoImageTextBlock, CoverflowCarousel, ProgramFormatsBlock, BannerCTABlock, EventsListingBlock, PodcastsListingBlock, ContactBlock, ProgramsListingBlock, ProgramsAlternatingGrid, TreatmentsCarousel, EventsCarousel, TreatmentsListingBlock, PodcastsCarousel, CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
