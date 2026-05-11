import React from 'react'

import { Skeleton } from '@/components/Skeleton'

type Props = { count?: number }

export const TreatmentsCarouselSkeleton: React.FC<Props> = ({ count = 4 }) => {
  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-6 md:gap-12 md:grid-cols-[1.6fr_1fr] mb-8 md:mb-10 md:items-end">
        <div className="max-w-[40rem]">
          <Skeleton className="h-8 md:h-10 w-3/4" />
          <Skeleton className="mt-3 h-5 w-5/6" />
        </div>
      </div>

      <div className="flex gap-5 overflow-hidden pb-2">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton
            key={i}
            className="shrink-0 w-[70%] sm:w-[45%] md:w-[calc((100%-60px)/4)] aspect-[5/4] rounded-2xl"
            rounded={false}
            style={{ backgroundColor: 'var(--brand-decor-2)' }}
          />
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Skeleton className="w-10 h-10 rounded-full" rounded={false} />
        <Skeleton className="w-10 h-10 rounded-full" rounded={false} />
      </div>
    </div>
  )
}
