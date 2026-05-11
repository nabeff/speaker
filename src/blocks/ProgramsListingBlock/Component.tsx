import React, { Suspense } from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type {
  Program,
  ProgramsListingBlock as ProgramsListingBlockProps,
} from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { WavyLine } from '@/components/Decorations'
import { wavyMaskStyle, WAVY_SIDES } from '@/utilities/wavyMask'

import { ProgramsListingSkeleton } from './Skeleton'

const ProgramsListingContent: React.FC<ProgramsListingBlockProps> = async ({
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'programs',
    limit: limit ?? 6,
    depth: 1,
    sort: '-publishedAt',
  })
  const programs = (result.docs as Program[]) || []

  if (programs.length === 0) return null

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
        {programs.map((program, i) => {
          const wavySide = WAVY_SIDES[i % WAVY_SIDES.length]
          return (
            <Link
              key={program.id}
              href={`/programs/${program.slug}`}
              className="flex flex-col group"
            >
              <div className="relative w-full aspect-[16/8]" style={wavyMaskStyle(wavySide)}>
                <ParallaxImage strength={220} className="absolute inset-0">
                  {program.featuredImage && typeof program.featuredImage === 'object' && (
                    <Media
                      fill
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                      resource={program.featuredImage}
                    />
                  )}
                </ParallaxImage>
              </div>
              <h3 className="mt-5 text-base md:text-lg font-bold text-black">{program.title}</h3>
              {program.excerpt && (
                <p className="mt-2 text-sm md:text-base text-black/70 leading-relaxed">
                  {program.excerpt}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const ProgramsListingBlockComponent: React.FC<ProgramsListingBlockProps> = (props) => {
  return (
    <Suspense fallback={<ProgramsListingSkeleton heading={props.heading} count={props.limit ?? 6} />}>
      <ProgramsListingContent {...props} />
    </Suspense>
  )
}
