import React from 'react'

import type { MediaTextBlock as MediaTextBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'

export const MediaTextBlockComponent: React.FC<MediaTextBlockProps> = ({
  image,
  heading,
  body,
  imagePosition,
}) => {
  const imageRight = imagePosition === 'right'

  return (
    <div className="container py-12 md:py-16">
      <div
        className={`grid gap-8 md:gap-12 md:grid-cols-2 md:items-center ${
          imageRight ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        <ParallaxImage strength={500} className="w-full aspect-[4/3] rounded-2xl">
          {image && typeof image === 'object' && (
            <Media fill imgClassName="object-cover" resource={image} />
          )}
        </ParallaxImage>
        <div className="flex flex-col">
          {heading && (
            <TextReveal
              text={heading}
              as="h2"
              className="text-2xl md:text-3xl font-bold text-black leading-snug"
            />
          )}
          {body && (
            <RichText
              className="mt-4 text-sm md:text-base text-black/80 leading-relaxed"
              data={body}
              enableGutter={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
