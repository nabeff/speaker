import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type {
  Treatment,
  TreatmentsCarouselBlock as TreatmentsCarouselBlockProps,
} from '@/payload-types'

import { TreatmentsCarouselClient } from './TreatmentsCarouselClient'
import { TreatmentsCarouselSkeleton } from './Skeleton'

const TreatmentsCarouselContent: React.FC<TreatmentsCarouselBlockProps> = async (props) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'treatments',
    limit: props.limit ?? 12,
    depth: 0,
    sort: '-publishedAt',
    select: { title: true, slug: true },
  })
  const treatments = (result.docs as Treatment[]) || []

  return <TreatmentsCarouselClient {...props} treatments={treatments} />
}

export const TreatmentsCarouselComponent: React.FC<TreatmentsCarouselBlockProps> = (props) => {
  return (
    <Suspense fallback={<TreatmentsCarouselSkeleton count={4} />}>
      <TreatmentsCarouselContent {...props} />
    </Suspense>
  )
}
