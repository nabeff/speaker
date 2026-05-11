import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { VisionBlock as VisionBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { TextReveal } from '@/components/TextReveal'
import { ParallaxImage } from '@/components/ParallaxImage'
import { Blob } from '@/components/Decorations'

const resolveHref = (link: VisionBlockProps['link']) => {
  if (!link) return undefined
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value?.slug
  ) {
    return `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
  }
  return link.url || undefined
}

export const VisionBlockComponent: React.FC<VisionBlockProps> = ({
  image,
  heading,
  body,
  link,
  imagePosition,
  showDecoration,
}) => {
  const href = resolveHref(link)
  const imageRight = imagePosition === 'right'

  return (
    <div className="relative bg-[var(--brand-bg)] py-16 md:py-24 my-10 md:my-16 overflow-x-clip">
      {showDecoration && (
        <Blob
          seed={1}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[760px] max-h-[760px] -z-0"
          color="var(--brand-decor-1)"
        />
      )}
      <div className="container relative z-10">
        <div
          className={`grid gap-10 md:grid-cols-2 md:items-center ${
            imageRight ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <ParallaxImage
            strength={80}
            className="relative w-full aspect-square rounded-2xl"
          >
            {image && typeof image === 'object' && (
              <Media fill imgClassName="object-cover" priority resource={image} />
            )}
          </ParallaxImage>
          <div className="flex flex-col">
            {heading && (
              <TextReveal
                text={heading}
                as="h2"
                className="text-2xl md:text-3xl font-bold text-black max-w-[20rem] md:max-w-[26rem]"
              />
            )}
            {body && (
              <RichText
                className="mt-4 text-sm md:text-base text-black/80 leading-relaxed"
                data={body}
                enableGutter={false}
              />
            )}
            {href && link?.label && (
              <div className="mt-6">
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] text-white px-6 py-2.5 text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
                  {...(link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
