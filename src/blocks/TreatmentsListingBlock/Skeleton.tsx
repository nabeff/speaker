import React from 'react'

import { Skeleton } from '@/components/Skeleton'

type Props = { heading?: string | null; intro?: string | null; count?: number }

export const TreatmentsListingSkeleton: React.FC<Props> = ({ heading, intro, count = 9 }) => {
  return (
    <div className="container pt-6 md:pt-8 pb-12 md:pb-16">
      <div className="mb-10 md:mb-14 max-w-3xl">
        {heading ? (
          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">{heading}</h1>
        ) : (
          <Skeleton className="h-10 md:h-14 w-3/4" />
        )}
        {intro ? (
          <p className="mt-4 text-base md:text-lg text-black/70 leading-relaxed">{intro}</p>
        ) : (
          <div className="mt-4 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton
            key={i}
            className="aspect-[5/4] rounded-2xl"
            rounded={false}
            style={{ backgroundColor: 'var(--brand-decor-2)' }}
          />
        ))}
      </div>
    </div>
  )
}
