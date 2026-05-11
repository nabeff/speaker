import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { EngagementTextBlock as EngagementTextBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { TextReveal } from '@/components/TextReveal'
import { Blob } from '@/components/Decorations'
import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'

const resolveHref = (link: EngagementTextBlockProps['link']) => {
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

export const EngagementTextBlockComponent: React.FC<EngagementTextBlockProps> = ({
  heading,
  body,
  link,
  linkVariant,
  sideImage,
}) => {
  const href = resolveHref(link)
  const isPill = linkVariant === 'pill'
  const newTabProps = link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const hasSideImage = !!(sideImage && typeof sideImage === 'object')

  const content = (
    <>
      {heading && (
        <TextReveal
          text={heading}
          as="h2"
          className="text-3xl md:text-4xl font-bold text-black leading-tight"
        />
      )}
      {body && (
        <RichText
          className="mt-6 text-sm md:text-base text-black/80 leading-relaxed [&_a]:underline [&_a]:text-black"
          data={body}
          enableGutter={false}
        />
      )}
      {href && link?.label && (
        <div className="mt-8">
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
    </>
  )

  return (
    <div className="relative bg-[var(--brand-bg)] py-16 md:py-24 my-10 md:my-16 overflow-x-clip">
      <div className="container">
        {hasSideImage ? (
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <Blob
              seed={2}
              className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-[20%] md:w-[560px] md:h-[560px] -z-0"
              color="var(--brand-decor-2)"
            />
            <div className="relative z-10">{content}</div>
            <ParallaxImage
              strength={80}
              className="relative w-full aspect-square rounded-3xl order-first md:order-last"
            >
              <Media fill imgClassName="object-cover" resource={sideImage} />
            </ParallaxImage>
          </div>
        ) : (
          <div className="relative max-w-3xl">
            <Blob
              seed={2}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px]"
              color="var(--brand-decor-2)"
            />
            <div className="relative z-10">{content}</div>
          </div>
        )}
      </div>
    </div>
  )
}
