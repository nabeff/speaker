'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { BenefitsCarouselBlock as BenefitsCarouselBlockProps } from '@/payload-types'

import { TextReveal } from '@/components/TextReveal'

const cardColors = ['var(--brand-decor-2)', 'var(--brand-decor-1)', '#CFEAF4', 'var(--brand-decor-2)']

export const BenefitsCarouselComponent: React.FC<BenefitsCarouselBlockProps> = ({
  heading,
  intro,
  items,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 4)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const firstCard = el.querySelector<HTMLElement>('[data-card]')
    const cardWidth = firstCard?.offsetWidth ?? el.clientWidth / 1.5
    const gap = 24
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' })
  }

  if (!items || items.length === 0) return null

  return (
    <div className="container py-16 md:py-20">
      <div className="grid gap-6 md:gap-12 md:grid-cols-2 mb-8 md:mb-12">
        {heading && (
          <TextReveal
            text={heading}
            as="h2"
            className="text-2xl md:text-4xl font-bold text-black leading-tight"
          />
        )}
        {intro && (
          <p className="text-sm md:text-base text-black/80 leading-relaxed md:pt-2">{intro}</p>
        )}
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <div
              key={i}
              data-card
              className="snap-start shrink-0 w-[80%] sm:w-[45%] md:w-[calc((100%-72px)/4)] rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: cardColors[i % cardColors.length] }}
            >
              <h3 className="text-base md:text-lg font-bold text-black mb-3">{item.title}</h3>
              <p className="text-sm md:text-base text-black/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white transition-opacity ${
            canScrollPrev ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          aria-label="Next"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white transition-opacity ${
            canScrollNext ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
