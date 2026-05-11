import React, { Suspense } from 'react'
import { getPayload, type Where } from 'payload'
import configPromise from '@payload-config'

import type {
  Event as EventDoc,
  EventCategory,
  EventsListingBlock as EventsListingBlockProps,
} from '@/payload-types'

import { EventsListingClient } from './EventsListingClient'
import { EventsListingSkeleton } from './Skeleton'

type Props = EventsListingBlockProps & {
  searchParams?: { page?: string; cat?: string }
}

const EventsListingContent: React.FC<Props> = async ({ heading, perPage, searchParams }) => {
  const payload = await getPayload({ config: configPromise })

  const limit = perPage ?? 6
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10))
  const catSlug = searchParams?.cat || 'all'

  const cats = await payload.find({
    collection: 'event-categories',
    limit: 100,
    sort: 'title',
  })
  const categories = (cats.docs as EventCategory[]) || []

  const where: Where = {}
  if (catSlug !== 'all') {
    const matched = categories.find((c) => c.slug === catSlug)
    if (matched) {
      where.category = { equals: matched.id }
    }
  }

  const events = await payload.find({
    collection: 'events',
    limit,
    page,
    depth: 1,
    where,
    sort: '-dateStart',
  })

  return (
    <EventsListingClient
      heading={heading}
      categories={categories}
      activeCategorySlug={catSlug}
      events={events.docs as EventDoc[]}
      page={events.page || 1}
      totalPages={events.totalPages || 1}
    />
  )
}

export const EventsListingBlockComponent: React.FC<Props> = (props) => {
  return (
    <Suspense
      fallback={<EventsListingSkeleton heading={props.heading} count={props.perPage ?? 6} />}
    >
      <EventsListingContent {...props} />
    </Suspense>
  )
}
