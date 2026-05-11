import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { FeatureCardBlock as FeatureCardBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'

export const FeatureCardBlockComponent: React.FC<FeatureCardBlockProps> = ({
  heading,
  body,
  image,
  buttonLabel,
  buttonUrl,
  imagePosition,
}) => {
  const imageLeft = imagePosition === 'left'

  return (
    <div className="container py-10 md:py-12">
      <div className="relative bg-[var(--brand-decor-2)] rounded-2xl overflow-hidden p-6 md:p-10">
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
                className="text-2xl md:text-3xl font-bold text-black"
              />
            )}
            {body && (
              <RichText
                className="mt-4 text-sm md:text-base text-black/80 leading-relaxed"
                data={body}
                enableGutter={false}
              />
            )}
            {buttonLabel && buttonUrl && (
              <div className="mt-6">
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
