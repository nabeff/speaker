import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { TextReveal } from '@/components/TextReveal'
import { ParallaxImage } from '@/components/ParallaxImage'

export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  title,
  description,
  links,
  media,
}) => {
  return (
    <div
      className="relative flex items-center justify-center text-white h-[calc(100vh+10.4rem)] -mt-[10.4rem]"
      data-theme="dark"
    >
      <div className="absolute inset-0">
        <ParallaxImage strength={500} className="w-full h-full">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover" priority resource={media} />
          )}
        </ParallaxImage>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

      <div className="container relative z-10 py-20">
        <div className="max-w-[40rem] mx-auto text-center">
          {title && (
            <TextReveal
              text={title}
              as="h1"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center"
            />
          )}
          {description && (
            <p className="text-white/80 text-sm md:text-base mt-4 leading-relaxed max-w-md mx-auto">
              {description}
            </p>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {links.map(({ link }, i) => {
                const isOutline = link?.appearance === 'outline'
                const className = isOutline
                  ? 'rounded-full bg-white text-black border-white hover:bg-white/90 hover:text-black'
                  : 'rounded-full bg-[var(--brand-primary)] text-white border-transparent hover:bg-[var(--brand-primary)]/90'
                return <CMSLink key={i} size="lg" className={className} {...link} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
