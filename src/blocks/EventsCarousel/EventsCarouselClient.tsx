'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { Event, EventsCarouselBlock as Props } from '@/payload-types'

import { Media } from '@/components/Media'
import { TextReveal } from '@/components/TextReveal'
import { ParallaxImage } from '@/components/ParallaxImage'
import { NotchedBadge } from '@/components/NotchedBadge'

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

type ClientProps = Props & { events: Event[] }

export const EventsCarouselClient: React.FC<ClientProps> = ({
  heading,
  linkLeadText,
  linkAccentText,
  linkUrl,
  events,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const w = card?.offsetWidth ?? el.clientWidth / 1.5
    const gap = 24
    el.scrollBy({ left: dir * (w + gap), behavior: 'smooth' })
  }

  const hasLink = (linkLeadText || linkAccentText) && linkUrl

  if (events.length === 0) return null

  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
        {heading && (
          <div className="flex-1 min-w-0">
            <TextReveal
              text={heading}
              as="h2"
              className="text-2xl md:text-3xl font-bold text-black leading-tight"
            />
          </div>
        )}
        {hasLink && (
          <Link
            href={linkUrl as string}
            className="inline-flex items-center gap-2 text-base font-medium text-black hover:underline shrink-0"
          >
            <ArrowRight className="w-5 h-5 text-[var(--brand-primary)]" strokeWidth={2.5} />
            {linkLeadText && <span>{linkLeadText}</span>}
            {linkAccentText && <span className="text-[var(--brand-primary)]">{linkAccentText}</span>}
          </Link>
        )}
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {events.map((event) => {
            const cat =
              typeof event.category === 'object' && event.category !== null
                ? event.category
                : null
            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                data-card
                className="snap-start shrink-0 w-[80%] sm:w-[48%] md:w-[calc((100%-48px)/3)] flex flex-col group"
              >
                <div
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
                  style={cat?.title ? { borderTopRightRadius: 0 } : undefined}
                >
                  <ParallaxImage strength={220} className="absolute inset-0">
                    {event.image && typeof event.image === 'object' && (
                      <Media
                        fill
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                        resource={event.image}
                      />
                    )}
                  </ParallaxImage>
                  {cat?.title && <NotchedBadge>{cat.title}</NotchedBadge>}
                </div>
                <p className="mt-4 text-sm text-[var(--brand-primary)] font-medium">
                  {formatDate(event.dateStart)}
                </p>
                <h3 className="mt-2 text-base md:text-lg font-bold text-black leading-snug">
                  {event.title}
                </h3>
                {event.excerpt && (
                  <p className="mt-2 text-sm text-black/70 leading-relaxed line-clamp-3">
                    {event.excerpt}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white transition-opacity ${
            canPrev ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white transition-opacity ${
            canNext ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
          }`}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
