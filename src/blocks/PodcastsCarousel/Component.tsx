import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Podcast, PodcastsCarouselBlock as PodcastsCarouselBlockProps } from '@/payload-types'

import { PodcastsCarouselClient } from './PodcastsCarouselClient'
import { PodcastsCarouselSkeleton } from './Skeleton'

const PodcastsCarouselContent: React.FC<PodcastsCarouselBlockProps> = async (props) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'podcasts',
    limit: props.limit ?? 9,
    depth: 1,
    sort: '-publishedAt',
  })
  const podcasts = (result.docs as Podcast[]) || []
  return <PodcastsCarouselClient {...props} podcasts={podcasts} />
}

export const PodcastsCarouselComponent: React.FC<PodcastsCarouselBlockProps> = (props) => {
  return (
    <Suspense fallback={<PodcastsCarouselSkeleton heading={props.heading} count={3} />}>
      <PodcastsCarouselContent {...props} />
    </Suspense>
  )
}
