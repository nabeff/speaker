import React, { Suspense } from 'react'
import { getPayload, type Where } from 'payload'
import configPromise from '@payload-config'

import type {
  Podcast,
  PodcastCategory,
  PodcastsListingBlock as PodcastsListingBlockProps,
} from '@/payload-types'

import { PodcastsListingClient } from './PodcastsListingClient'
import { PodcastsListingSkeleton } from './Skeleton'

type Props = PodcastsListingBlockProps & {
  searchParams?: { page?: string; cat?: string }
}

const PodcastsListingContent: React.FC<Props> = async ({ heading, perPage, searchParams }) => {
  const payload = await getPayload({ config: configPromise })

  const limit = perPage ?? 6
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10))
  const catSlug = searchParams?.cat || 'all'

  const cats = await payload.find({
    collection: 'podcast-categories',
    limit: 100,
    sort: 'title',
  })
  const categories = (cats.docs as PodcastCategory[]) || []

  const where: Where = {}
  if (catSlug !== 'all') {
    const matched = categories.find((c) => c.slug === catSlug)
    if (matched) where.category = { equals: matched.id }
  }

  const podcasts = await payload.find({
    collection: 'podcasts',
    limit,
    page,
    depth: 1,
    where,
    sort: '-publishedAt',
  })

  return (
    <PodcastsListingClient
      heading={heading}
      categories={categories}
      activeCategorySlug={catSlug}
      podcasts={podcasts.docs as Podcast[]}
      page={podcasts.page || 1}
      totalPages={podcasts.totalPages || 1}
    />
  )
}

export const PodcastsListingBlockComponent: React.FC<Props> = (props) => {
  return (
    <Suspense
      fallback={<PodcastsListingSkeleton heading={props.heading} count={props.perPage ?? 6} />}
    >
      <PodcastsListingContent {...props} />
    </Suspense>
  )
}
