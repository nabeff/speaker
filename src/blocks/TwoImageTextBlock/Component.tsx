import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { TwoImageTextBlock as TwoImageTextBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'
import { QuarterCircle, Squiggle } from '@/components/Decorations'
import RichText from '@/components/RichText'

export const TwoImageTextBlockComponent: React.FC<TwoImageTextBlockProps> = ({
  image1,
  image2,
  heading,
  body,
  buttonLabel,
  buttonUrl,
  imagesPosition,
}) => {
  const imagesRight = imagesPosition === 'right'

  return (
    <div className="container py-10 md:py-12 relative">
      <QuarterCircle
        corner="tr"
        color="var(--brand-decor-2)"
        className="absolute -top-4 right-0 w-32 h-32 md:w-40 md:h-40 -z-10 opacity-60"
      />
      <div
        className={`grid gap-6 md:gap-10 md:grid-cols-2 md:items-center relative ${
          imagesRight ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <ParallaxImage strength={500} className="aspect-[3/4] rounded-2xl">
            {image1 && typeof image1 === 'object' && (
              <Media fill imgClassName="object-cover" resource={image1} />
            )}
          </ParallaxImage>
          <ParallaxImage strength={500} className="aspect-[3/4] rounded-2xl">
            {image2 && typeof image2 === 'object' && (
              <Media fill imgClassName="object-cover" resource={image2} />
            )}
          </ParallaxImage>
        </div>
        <div className="flex flex-col">
          <Squiggle
            color="var(--brand-primary)"
            strokeWidth={4}
            className="w-20 h-2 mb-3 opacity-80"
          />
          {heading && (
            <TextReveal
              text={heading}
              as="h2"
              className="text-2xl md:text-3xl font-bold text-black leading-snug"
            />
          )}
          {body && (
            <RichText
              className="mt-6 text-sm md:text-base text-black/80 leading-relaxed [&_a]:underline [&_a]:text-black [&>p:last-child]:mb-0 [&>*:last-child]:mb-0"
              data={body}
              enableGutter={false}
            />
          )}
          {buttonLabel && buttonUrl && (
            <div className="mt-0">
              <Link
                href={buttonUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] text-white px-6 py-2.5 text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                {buttonLabel}
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
