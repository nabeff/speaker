import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { EngagementBlock as EngagementBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'
import { Blob, Triangle } from '@/components/Decorations'

const resolveHref = (link: EngagementBlockProps['link']) => {
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

export const EngagementBlockComponent: React.FC<EngagementBlockProps> = ({
  image,
  heading,
  body,
  link,
  linkVariant,
  imagePosition,
  showDecorations,
}) => {
  const imageRight = imagePosition === 'right'
  const href = resolveHref(link)
  const isPill = linkVariant === 'pill'
  const newTabProps = link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className="relative bg-[var(--brand-bg)] py-16 md:py-24 my-10 md:my-16 overflow-x-clip">
      {showDecorations && (
        <>
          <Blob
            seed={3}
            className="absolute -bottom-10 left-0 -translate-x-1/3 w-[180px] h-[180px] md:w-[240px] md:h-[240px] -z-0"
            color="var(--brand-decor-1)"
          />
          <Blob
            seed={0}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[320px] h-[320px] md:w-[440px] md:h-[440px] -z-0"
            color="var(--brand-decor-2)"
          />
          <Triangle
            direction="up"
            color="var(--brand-primary)"
            className="absolute top-12 left-[10%] w-6 h-6 opacity-60"
          />
        </>
      )}
      <div className="container relative z-10">
        <div
          className={`grid gap-10 md:grid-cols-2 md:items-center ${
            imageRight ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <ParallaxImage strength={500} className="w-full aspect-square rounded-2xl">
            {image && typeof image === 'object' && (
              <Media fill imgClassName="object-cover" priority resource={image} />
            )}
          </ParallaxImage>
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
            {href && link?.label && (
              <div className="mt-6">
                {isPill ? (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] text-white px-6 py-2.5 text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
                    {...newTabProps}
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </Link>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-base font-medium text-black hover:underline"
                    {...newTabProps}
                  >
                    <ArrowRight className="w-5 h-5 text-[var(--brand-primary)]" strokeWidth={2.5} />
                    <span>{link.label}</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
