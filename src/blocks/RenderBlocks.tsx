import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'
import { IntroBlockComponent } from '@/blocks/IntroBlock/Component'
import { MarqueeBlockComponent } from '@/blocks/MarqueeBlock/Component'
import { FeatureAccordionComponent } from '@/blocks/FeatureAccordion/Component'
import { VisionBlockComponent } from '@/blocks/VisionBlock/Component'
import { MissionBlockComponent } from '@/blocks/MissionBlock/Component'
import { LogoGridBlockComponent } from '@/blocks/LogoGridBlock/Component'
import { EngagementBlockComponent } from '@/blocks/EngagementBlock/Component'
import { FAQBlockComponent } from '@/blocks/FAQBlock/Component'
import { FeatureCardBlockComponent } from '@/blocks/FeatureCardBlock/Component'
import { MediaTextBlockComponent } from '@/blocks/MediaTextBlock/Component'
import { WhoWeServeBlockComponent } from '@/blocks/WhoWeServeBlock/Component'
import { SignsListBlockComponent } from '@/blocks/SignsListBlock/Component'
import { BenefitsCarouselComponent } from '@/blocks/BenefitsCarousel/Component'
import { IntroCardBlockComponent } from '@/blocks/IntroCardBlock/Component'
import { TwoImageTextBlockComponent } from '@/blocks/TwoImageTextBlock/Component'
import { CoverflowCarouselComponent } from '@/blocks/CoverflowCarousel/Component'
import { EngagementTextBlockComponent } from '@/blocks/EngagementTextBlock/Component'
import { ProgramFormatsBlockComponent } from '@/blocks/ProgramFormatsBlock/Component'
import { BannerCTABlockComponent } from '@/blocks/BannerCTABlock/Component'
import { EventsListingBlockComponent } from '@/blocks/EventsListingBlock/Component'
import { PodcastsListingBlockComponent } from '@/blocks/PodcastsListingBlock/Component'
import { ContactBlockComponent } from '@/blocks/ContactBlock/Component'
import { ProgramsListingBlockComponent } from '@/blocks/ProgramsListingBlock/Component'
import { ProgramsAlternatingGridComponent } from '@/blocks/ProgramsAlternatingGrid/Component'
import { TreatmentsCarouselComponent } from '@/blocks/TreatmentsCarousel/Component'
import { EventsCarouselComponent } from '@/blocks/EventsCarousel/Component'
import { TreatmentsListingBlockComponent } from '@/blocks/TreatmentsListingBlock/Component'
import { PodcastsCarouselComponent } from '@/blocks/PodcastsCarousel/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroBlock: HeroBlockComponent,
  introBlock: IntroBlockComponent,
  marqueeBlock: MarqueeBlockComponent,
  featureAccordion: FeatureAccordionComponent,
  visionBlock: VisionBlockComponent,
  missionBlock: MissionBlockComponent,
  logoGridBlock: LogoGridBlockComponent,
  engagementBlock: EngagementBlockComponent,
  faqBlock: FAQBlockComponent,
  featureCardBlock: FeatureCardBlockComponent,
  mediaTextBlock: MediaTextBlockComponent,
  whoWeServeBlock: WhoWeServeBlockComponent,
  signsListBlock: SignsListBlockComponent,
  benefitsCarousel: BenefitsCarouselComponent,
  introCardBlock: IntroCardBlockComponent,
  twoImageTextBlock: TwoImageTextBlockComponent,
  coverflowCarousel: CoverflowCarouselComponent,
  engagementTextBlock: EngagementTextBlockComponent,
  programFormatsBlock: ProgramFormatsBlockComponent,
  bannerCTABlock: BannerCTABlockComponent,
  eventsListingBlock: EventsListingBlockComponent,
  podcastsListingBlock: PodcastsListingBlockComponent,
  contactBlock: ContactBlockComponent,
  programsListingBlock: ProgramsListingBlockComponent,
  programsAlternatingGrid: ProgramsAlternatingGridComponent,
  treatmentsCarousel: TreatmentsCarouselComponent,
  eventsCarousel: EventsCarouselComponent,
  treatmentsListingBlock: TreatmentsListingBlockComponent,
  podcastsCarousel: PodcastsCarouselComponent,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  searchParams?: { [k: string]: string | undefined }
}> = (props) => {
  const { blocks, searchParams } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div
                  className={
                    blockType === 'heroBlock' ||
                    blockType === 'introBlock' ||
                    blockType === 'marqueeBlock' ||
                    blockType === 'visionBlock' ||
                    blockType === 'missionBlock' ||
                    blockType === 'engagementBlock' ||
                    blockType === 'engagementTextBlock' ||
                    blockType === 'bannerCTABlock'
                      ? ''
                      : ''
                  }
                  key={index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer searchParams={searchParams} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
