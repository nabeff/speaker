'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { CoverflowCarouselBlock as CoverflowCarouselBlockProps } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const CoverflowCarouselComponent: React.FC<CoverflowCarouselBlockProps> = ({
  slides,
  autoplaySeconds,
}) => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides?.length ?? 0
  const interval = Math.max(2, autoplaySeconds ?? 4) * 1000

  const dragStartX = useRef<number | null>(null)
  const dragDelta = useRef(0)

  useEffect(() => {
    if (total < 2 || paused) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, interval)
    return () => window.clearInterval(id)
  }, [total, interval, paused])

  if (!slides || total === 0) return null

  const next = () => setActive((p) => (p + 1) % total)
  const prev = () => setActive((p) => (p - 1 + total) % total)

  const getOffset = (i: number) => {
    let diff = i - active
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX
    dragDelta.current = 0
    setPaused(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const threshold = 60
    if (dragDelta.current < -threshold) next()
    else if (dragDelta.current > threshold) prev()
    dragStartX.current = null
    dragDelta.current = 0
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
    window.setTimeout(() => setPaused(false), 1500)
  }

  return (
    <div className="container py-12 md:py-16">
      <div
        className="relative h-[360px] md:h-[560px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {slides.map((slide, i) => {
          const offset = getOffset(i)
          const isCenter = offset === 0
          const isVisible = Math.abs(offset) <= 1

          const translatePct = offset * 70
          const heightPct = isCenter ? 95 : 70
          const opacity = isVisible ? 1 : 0
          const zIndex = isCenter ? 30 : isVisible ? 20 : 10

          return (
            <div
              key={i}
              aria-hidden={!isCenter}
              draggable={false}
              className="absolute top-1/2 left-1/2 ease-out shadow-xl"
              style={{
                transform: `translate(-50%, -50%) translateX(${translatePct}%)`,
                opacity,
                zIndex,
                height: `${heightPct}%`,
                aspectRatio: '4 / 3',
                borderRadius: '1.5rem',
                transition: 'transform 500ms ease-out, opacity 500ms ease-out, height 500ms ease-out',
                backgroundImage:
                  slide.image && typeof slide.image === 'object' && slide.image.url
                    ? `url(${getMediaUrl(slide.image.url)})`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )
        })}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-[var(--brand-primary)]' : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
