import React from 'react'

import type { WhoWeServeBlock as WhoWeServeBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { TextReveal } from '@/components/TextReveal'
import { Blob, WavyLine } from '@/components/Decorations'

export const WhoWeServeBlockComponent: React.FC<WhoWeServeBlockProps> = ({ heading, items }) => {
  if (!items || items.length === 0) return null

  return (
    <div className="container py-16 md:py-20">
      <div className="relative bg-[var(--brand-soft)] rounded-3xl p-8 md:p-12 overflow-hidden">
        <Blob
          seed={2}
          color="var(--brand-decor-2)"
          opacity={0.55}
          className="absolute -top-24 -right-24 w-72 h-72 md:w-96 md:h-96"
        />

        <div className="relative grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          {/* Left: heading + decorative wavy underline */}
          <div className="md:sticky md:top-8 md:self-start">
            {heading && (
              <TextReveal
                text={heading}
                as="h2"
                className="text-3xl md:text-4xl font-bold text-black leading-tight"
              />
            )}
            <WavyLine
              color="var(--brand-primary)"
              strokeWidth={4}
              className="w-28 h-3 mt-4"
            />
          </div>

          {/* Right: 2-column list — no cards, just hairline-separated rows */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 pb-5 border-b border-black/10 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white">
                  {item.image && typeof item.image === 'object' && (
                    <Media fill imgClassName="object-cover" resource={item.image} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-black leading-snug">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-black/65 leading-snug">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
