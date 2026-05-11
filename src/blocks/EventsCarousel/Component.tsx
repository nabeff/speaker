import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Event, EventsCarouselBlock as EventsCarouselBlockProps } from '@/payload-types'

import { EventsCarouselClient } from './EventsCarouselClient'
import { EventsCarouselSkeleton } from './Skeleton'

const EventsCarouselContent: React.FC<EventsCarouselBlockProps> = async (props) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    limit: props.limit ?? 9,
    depth: 1,
    sort: '-dateStart',
  })
  const events = (result.docs as Event[]) || []
  return <EventsCarouselClient {...props} events={events} />
}

export const EventsCarouselComponent: React.FC<EventsCarouselBlockProps> = (props) => {
  return (
    <Suspense fallback={<EventsCarouselSkeleton heading={props.heading} count={3} />}>
      <EventsCarouselContent {...props} />
    </Suspense>
  )
}
