import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type {
  Treatment,
  TreatmentsListingBlock as TreatmentsListingBlockProps,
} from '@/payload-types'

import { TreatmentsListingClient } from './TreatmentsListingClient'
import { TreatmentsListingSkeleton } from './Skeleton'

type Props = TreatmentsListingBlockProps & {
  searchParams?: { page?: string }
}

const TreatmentsListingContent: React.FC<Props> = async ({
  heading,
  intro,
  perPage,
  searchParams,
}) => {
  const payload = await getPayload({ config: configPromise })
  const limit = perPage ?? 12
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10))

  const result = await payload.find({
    collection: 'treatments',
    limit,
    page,
    depth: 0,
    sort: 'title',
    select: { title: true, slug: true },
  })

  return (
    <TreatmentsListingClient
      heading={heading}
      intro={intro}
      treatments={result.docs as Treatment[]}
      page={result.page || 1}
      totalPages={result.totalPages || 1}
    />
  )
}

export const TreatmentsListingBlockComponent: React.FC<Props> = (props) => {
  return (
    <Suspense
      fallback={
        <TreatmentsListingSkeleton
          heading={props.heading}
          intro={props.intro}
          count={props.perPage ?? 12}
        />
      }
    >
      <TreatmentsListingContent {...props} />
    </Suspense>
  )
}
