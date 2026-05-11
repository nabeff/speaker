import React from 'react'

import type { SignsListBlock as SignsListBlockProps } from '@/payload-types'

import { TextReveal } from '@/components/TextReveal'
import { HalfPill, Triangle } from '@/components/Decorations'

export const SignsListBlockComponent: React.FC<SignsListBlockProps> = ({
  intro,
  heading,
  items,
}) => {
  if (!items || items.length === 0) return null

  return (
    <div className="container py-10 md:py-12 relative">
      <HalfPill
        side="left"
        color="var(--brand-decor-2)"
        className="absolute -left-px top-1/2 -translate-y-1/2 w-12 h-40 md:w-16 md:h-56 z-0 opacity-70"
      />
      <Triangle
        direction="up"
        color="var(--brand-primary)"
        className="absolute -top-2 right-12 w-8 h-8 opacity-60"
      />
      <div className="bg-[var(--brand-decor-2)] rounded-2xl p-8 md:p-12 relative">
        {intro && (
          <p className="text-xs md:text-sm text-black/70 leading-relaxed mb-4 max-w-3xl">
            {intro}
          </p>
        )}
        {heading && (
          <TextReveal
            text={heading}
            as="h2"
            className="text-xl md:text-2xl font-bold text-black mb-8"
          />
        )}
        <div className="divide-y divide-black/10">
          {items.map((item, i) => (
            <div
              key={i}
              className="grid gap-4 md:gap-8 md:grid-cols-3 py-4 md:py-5"
            >
              <h3 className="text-sm md:text-base font-semibold text-black md:col-span-1">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-black/70 leading-relaxed md:col-span-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
