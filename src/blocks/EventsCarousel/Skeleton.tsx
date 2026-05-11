import React from 'react'

import { Skeleton } from '@/components/Skeleton'

type Props = { heading?: string | null; count?: number }

export const EventsCarouselSkeleton: React.FC<Props> = ({ heading, count = 3 }) => {
  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
        <div className="flex-1 min-w-0">
          {heading ? (
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">{heading}</h2>
          ) : (
            <Skeleton className="h-8 md:h-10 w-2/3" />
          )}
        </div>
      </div>

      <div className="flex gap-6 overflow-hidden pb-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-[80%] sm:w-[48%] md:w-[calc((100%-48px)/3)] flex flex-col"
          >
            <Skeleton className="w-full aspect-[16/10] rounded-2xl" rounded={false} />
            <Skeleton className="mt-4 h-4 w-32" />
            <Skeleton className="mt-2 h-5 md:h-6 w-3/4" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Skeleton className="w-10 h-10 rounded-full" rounded={false} />
        <Skeleton className="w-10 h-10 rounded-full" rounded={false} />
      </div>
    </div>
  )
}
