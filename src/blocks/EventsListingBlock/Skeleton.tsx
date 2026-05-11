import React from 'react'

import { Skeleton } from '@/components/Skeleton'

type Props = { heading?: string | null; count?: number }

export const EventsListingSkeleton: React.FC<Props> = ({ heading, count = 6 }) => {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-black">{heading || <span>&nbsp;</span>}</h1>

      <div className="mt-6 flex flex-wrap gap-6 border-b border-black/10 pb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-20" />
        ))}
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="w-full aspect-[16/10] rounded-2xl" rounded={false} />
            <Skeleton className="mt-4 h-4 w-32" />
            <Skeleton className="mt-2 h-5 md:h-6 w-3/4" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
