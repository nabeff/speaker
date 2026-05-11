import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type {
  Program,
  ProgramsAlternatingGridBlock as ProgramsAlternatingGridBlockProps,
} from '@/payload-types'

import { Media } from '@/components/Media'
import { TextReveal } from '@/components/TextReveal'
import { ParallaxImage } from '@/components/ParallaxImage'

export const ProgramsAlternatingGridComponent: React.FC<
  ProgramsAlternatingGridBlockProps
> = async ({ heading, intro, limit }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'programs',
    limit: limit ?? 6,
    depth: 1,
    sort: '-publishedAt',
  })
  const programs = (result.docs as Program[]) || []

  if (programs.length === 0) return null

  // Pair programs into rows of 2 with alternating 70/30 direction.
  const rows: { items: Program[]; reversed: boolean }[] = []
  for (let i = 0; i < programs.length; i += 2) {
    rows.push({
      items: programs.slice(i, i + 2),
      reversed: (i / 2) % 2 === 1,
    })
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-6 md:gap-12 md:grid-cols-2 mb-8 md:mb-10">
        {heading && (
          <TextReveal
            text={heading}
            as="h2"
            className="text-2xl md:text-3xl font-bold text-black leading-tight max-w-[34rem]"
          />
        )}
        {intro && (
          <p className="text-sm md:text-base text-black/70 leading-relaxed md:pt-2 max-w-[32rem] md:ml-auto">
            {intro}
          </p>
        )}
      </div>

      {/* SVG defs for the concave-corner clip paths used by ProgramCard */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="notch-left" clipPathUnits="objectBoundingBox">
            {/* Left card: small notch at bottom-right */}
            <path
              d="M 0.04 0
                 L 0.96 0
                 Q 1 0 1 0.07
                 L 1 0.88
                 Q 1 0.93 0.97 0.93
                 Q 0.93 0.93 0.93 0.96
                 Q 0.93 1 0.89 1
                 L 0.04 1
                 Q 0 1 0 0.93
                 L 0 0.07
                 Q 0 0 0.04 0 Z"
            />
          </clipPath>
          <clipPath id="notch-right" clipPathUnits="objectBoundingBox">
            {/* Right card: small notch at bottom-left */}
            <path
              d="M 0.04 0
                 L 0.96 0
                 Q 1 0 1 0.07
                 L 1 0.93
                 Q 1 1 0.96 1
                 L 0.11 1
                 Q 0.07 1 0.07 0.96
                 Q 0.07 0.93 0.03 0.93
                 Q 0 0.93 0 0.88
                 L 0 0.07
                 Q 0 0 0.04 0 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="flex flex-col gap-4 md:gap-5">
        {rows.map((row, rowIndex) => {
          const cols = row.reversed
            ? 'md:grid-cols-[3fr_7fr]'
            : 'md:grid-cols-[7fr_3fr]'
          return (
            <div
              key={rowIndex}
              className={`grid gap-4 md:gap-5 ${cols} md:h-[260px] lg:h-[310px]`}
            >
              {row.items.map((program, idx) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  position={idx === 0 ? 'left' : 'right'}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ProgramCard: React.FC<{ program: Program; position: 'left' | 'right' }> = ({
  program,
  position,
}) => {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="relative block w-full h-full aspect-[16/9] md:aspect-auto overflow-hidden group"
      style={{
        clipPath: position === 'left' ? 'url(#notch-left)' : 'url(#notch-right)',
      }}
    >
    <ParallaxImage strength={280} className="absolute inset-0">
      {program.featuredImage && typeof program.featuredImage === 'object' && (
        <Media
          fill
          imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
          resource={program.featuredImage}
        />
      )}
    </ParallaxImage>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/75 via-black/40 to-transparent z-[1]"
    />
    <h3 className="absolute left-5 top-5 right-5 text-white text-base md:text-lg font-bold leading-snug z-[2]">
      {program.title}
    </h3>
  </Link>
  )
}
