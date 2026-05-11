import React from 'react'

import type { MissionBlock as MissionBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { TextReveal } from '@/components/TextReveal'
import { Triangle } from '@/components/Decorations'

export const MissionBlockComponent: React.FC<MissionBlockProps> = ({
  heading,
  subheadingAccent,
  subheadingRest,
  body,
  showDecorations,
}) => {
  return (
    <div className="relative bg-[var(--brand-bg)] py-20 md:py-28 my-10 md:my-16 overflow-x-clip">
      {showDecorations && (
        <>
          <div
            aria-hidden="true"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full bg-[var(--brand-decor-1)] -z-0"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full bg-[var(--brand-decor-2)] -z-0"
          />
          <Triangle
            direction="down"
            color="var(--brand-primary)"
            className="absolute bottom-10 left-[15%] w-7 h-7 opacity-60"
          />
        </>
      )}
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {heading && (
            <TextReveal
              text={heading}
              as="h2"
              className="text-2xl md:text-3xl font-bold text-black text-center"
            />
          )}
          {(subheadingAccent || subheadingRest) && (
            <p className="mt-4 text-lg md:text-xl font-medium leading-snug">
              {subheadingAccent && (
                <span className="text-[var(--brand-primary)]">{subheadingAccent}</span>
              )}
              {subheadingAccent && subheadingRest && ' '}
              {subheadingRest && <span className="text-black">{subheadingRest}</span>}
            </p>
          )}
          {body && (
            <RichText
              className="mt-6 text-sm md:text-base text-black/80 leading-relaxed mx-auto"
              data={body}
              enableGutter={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
