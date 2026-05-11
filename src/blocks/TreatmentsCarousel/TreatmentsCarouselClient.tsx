'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { Treatment, TreatmentsCarouselBlock as Props } from '@/payload-types'

type ClientProps = Props & { treatments: Treatment[] }

export const TreatmentsCarouselClient: React.FC<ClientProps> = ({
  headingStart,
  headingAccent1,
  headingMiddle,
  headingAccent2,
  intro,
  linkLeadText,
  linkAccentText,
  linkUrl,
  treatments,
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
    const gap = 20
    el.scrollBy({ left: dir * (w + gap), behavior: 'smooth' })
  }

  const hasHeading = headingStart || headingAccent1 || headingMiddle || headingAccent2
  const hasLink = (linkLeadText || linkAccentText) && linkUrl

  if (treatments.length === 0) return null

  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-6 md:gap-12 md:grid-cols-[1.6fr_1fr] mb-8 md:mb-10 md:items-end">
        <div>
          {hasHeading && (
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight max-w-[40rem]">
              {headingStart && <>{headingStart} </>}
              {headingAccent1 && <span className="text-[var(--brand-primary)]">{headingAccent1} </span>}
              {headingMiddle && <>{headingMiddle} </>}
              {headingAccent2 && <span className="text-[var(--brand-primary)]">{headingAccent2}</span>}
            </h2>
          )}
          {intro && (
            <p className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">{intro}</p>
          )}
        </div>
        {hasLink && (
          <div className="md:text-right">
            <Link
              href={linkUrl as string}
              className="inline-flex items-center gap-2 text-base font-medium text-black hover:underline"
            >
              <ArrowRight className="w-5 h-5 text-[var(--brand-primary)]" strokeWidth={2.5} />
              {linkLeadText && <span>{linkLeadText}</span>}
              {linkAccentText && <span className="text-[var(--brand-primary)]">{linkAccentText}</span>}
            </Link>
          </div>
        )}
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {treatments.map((t) => (
            <TreatmentCard key={t.id} treatment={t} />
          ))}
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

const TreatmentCard: React.FC<{ treatment: Treatment }> = ({ treatment }) => {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const updateOrigin = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  return (
    <Link
      ref={cardRef}
      href={`/treatments/${treatment.slug}`}
      data-card
      className="group relative snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[calc((100%-60px)/4)] aspect-[5/4] rounded-2xl bg-[var(--brand-decor-2)] overflow-hidden flex items-center justify-center p-6 text-center"
      onPointerEnter={(e) => {
        updateOrigin(e)
        setHovered(true)
      }}
      onPointerLeave={(e) => {
        updateOrigin(e)
        setHovered(false)
      }}
    >
      <span
        aria-hidden="true"
        className="absolute pointer-events-none transition-transform duration-700 ease-out"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          width: '200%',
          height: '200%',
          marginLeft: '-100%',
          marginTop: '-100%',
          backgroundColor: 'var(--brand-primary)',
          transform: `scale(${hovered ? 1 : 0})`,
          transformOrigin: 'center center',
          borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
        }}
      />
      <span
        className={`relative text-sm md:text-base font-bold leading-snug transition-colors duration-500 ${
          hovered ? 'text-white' : 'text-black'
        }`}
      >
        {treatment.title}
      </span>
    </Link>
  )
}
