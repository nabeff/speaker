import React from 'react'

import type { ProgramFormatsBlock as ProgramFormatsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'
import { WavyLine } from '@/components/Decorations'

export const ProgramFormatsBlockComponent: React.FC<ProgramFormatsBlockProps> = ({
  heading,
  items,
}) => {
  if (!items || items.length === 0) return null

  return (
    <div className="container pt-8 md:pt-10 pb-16 md:pb-20">
      {heading && (
        <div className="flex items-center justify-center gap-6 mb-10 md:mb-14">
          <WavyLine className="flex-1" color="var(--brand-primary)" strokeWidth={4} />
          <div className="shrink-0">
            <TextReveal
              text={heading}
              as="h2"
              className="text-2xl md:text-3xl font-bold text-black text-center whitespace-nowrap"
            />
          </div>
          <WavyLine className="flex-1" color="var(--brand-primary)" strokeWidth={4} flip />
        </div>
      )}

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <ParallaxImage strength={500} className="w-full aspect-[16/10] rounded-2xl">
              {item.image && typeof item.image === 'object' && (
                <Media fill imgClassName="object-cover" resource={item.image} />
              )}
            </ParallaxImage>
            <h3 className="mt-5 text-base md:text-lg font-bold text-black">{item.title}</h3>
            {item.description && (
              <p className="mt-2 text-sm md:text-base text-black/70 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
