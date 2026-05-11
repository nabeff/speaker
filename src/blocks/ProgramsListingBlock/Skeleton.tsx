import React from 'react'

import { Skeleton } from '@/components/Skeleton'
import { WavyLine } from '@/components/Decorations'
import { wavyMaskStyle, WAVY_SIDES } from '@/utilities/wavyMask'

type Props = { heading?: string | null; count?: number }

export const ProgramsListingSkeleton: React.FC<Props> = ({ heading, count = 6 }) => {
  return (
    <div className="container py-16 md:py-20">
      {heading && (
        <div className="mb-10 md:mb-14 text-center">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
            <WavyLine className="flex-1 min-w-0 max-w-[120px]" color="var(--brand-primary)" strokeWidth={4} />
            <WavyLine className="flex-1 min-w-0 max-w-[120px]" color="var(--brand-primary)" strokeWidth={4} flip />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">{heading}</h2>
        </div>
      )}

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {Array.from({ length: count }).map((_, i) => {
          const side = WAVY_SIDES[i % WAVY_SIDES.length]
          return (
            <div key={i} className="flex flex-col">
              <div className="relative w-full aspect-[16/8]" style={wavyMaskStyle(side)}>
                <Skeleton className="absolute inset-0" rounded={false} />
              </div>
              <Skeleton className="mt-5 h-5 md:h-6 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
