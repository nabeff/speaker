'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { Podcast } from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { NotchedBadge } from '@/components/NotchedBadge'

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

type Props = {
  heading?: string
  items: Podcast[]
}

export const RelatedCarousel: React.FC<Props> = ({
  heading = 'More from our podcasts',
  items,
}) => {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Scroll the track to the active slide whenever it changes
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const slide = el.children[active] as HTMLElement | undefined
    if (!slide) return
    el.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }, [active])

  if (!items || items.length === 0) return null
  const total = items.length

  const prev = () => setActive((p) => (p - 1 + total) % total)
  const next = () => setActive((p) => (p + 1) % total)

  return (
    <div className="relative">
      <h3 className="text-base md:text-lg font-bold text-black">{heading}</h3>

      <div className="mt-4 overflow-hidden">
        <div
          ref={trackRef}
          className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
        >
          {items.map((item, i) => {
            const cat =
              typeof item.category === 'object' && item.category !== null ? item.category : null
            return (
              <Link
                key={item.id || i}
                href={`/podcasts/${item.slug}`}
                className="relative block group shrink-0 w-full snap-start"
              >
                <div
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden"
                  style={cat?.title ? { borderTopRightRadius: 0 } : undefined}
                >
                  <ParallaxImage strength={200} className="absolute inset-0">
                    {item.image && typeof item.image === 'object' && (
                      <Media
                        fill
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                        resource={item.image}
                      />
                    )}
                  </ParallaxImage>
                  {cat?.title && <NotchedBadge>{cat.title}</NotchedBadge>}
                </div>
                {item.publishedAt && (
                  <p className="mt-5 text-xs text-[var(--brand-primary)] font-medium">
                    {formatDate(item.publishedAt)}
                  </p>
                )}
                <h4 className="mt-2 text-sm md:text-base font-bold text-black leading-snug">
                  {item.title}
                </h4>
                {item.excerpt && (
                  <p className="mt-1 text-sm text-black/70 leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--brand-primary)]/30 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 transition-colors"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  )
}
