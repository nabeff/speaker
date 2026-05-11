import React from 'react'

import type { IntroCardBlock as IntroCardBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'

export const IntroCardBlockComponent: React.FC<IntroCardBlockProps> = ({
  heading,
  intro,
  image,
  imagePosition,
}) => {
  const imageLeft = imagePosition === 'left'

  return (
    <div className="container py-10 md:py-12 mt-20 md:mt-16">
      <div className="bg-[var(--brand-soft)] rounded-2xl p-6 md:p-10">
        <div
          className={`grid gap-8 md:grid-cols-2 md:items-center ${
            imageLeft ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="flex flex-col">
            {heading && (
              <TextReveal
                text={heading}
                as="h2"
                className="text-2xl md:text-3xl font-bold text-black leading-snug"
              />
            )}
            {intro && (
              <p className="mt-4 text-sm md:text-base text-black/80 leading-relaxed">{intro}</p>
            )}
          </div>
          <ParallaxImage strength={280} className="w-full aspect-[4/3] rounded-xl">
            {image && typeof image === 'object' && (
              <Media fill imgClassName="object-cover" resource={image} />
            )}
          </ParallaxImage>
        </div>
      </div>
    </div>
  )
}
