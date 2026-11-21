'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  children: React.ReactNode
  /** How many pixels of total Y travel (default 100). Use 200 for stronger heroes. */
  strength?: number
  /** Buffer around the inner image so the translate doesn't reveal edges. */
  buffer?: number
  className?: string
  /** Tag for the outer clipping wrapper. */
  as?: 'div' | 'section' | 'figure'
}

export const ParallaxImage: React.FC<Props> = ({
  children,
  strength = 100,
  buffer,
  className,
  as = 'div',
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sectionEl = sectionRef.current
    const innerEl = innerRef.current
    if (!sectionEl || !innerEl) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      innerEl.style.transform = 'translate3d(0, 0, 0)'
      return
    }

    let rafId = 0
    let isVisible = false
    let lastOffset = Number.NaN

    // Map scroll progress straight to a transform. The offset is a pure
    // function of scroll position, so the image lands exactly where the
    // scroll says and never keeps drifting after the user stops.
    const render = () => {
      rafId = 0

      const rect = sectionEl.getBoundingClientRect()
      const vh = window.innerHeight || 0
      const total = rect.height + vh
      const progressed = (vh - rect.top) / (total || 1)
      const clamped = Math.max(0, Math.min(1, progressed))
      const offset = (clamped - 0.5) * strength

      // Skip sub-pixel repaints that the eye cannot see.
      if (Number.isNaN(lastOffset) || Math.abs(offset - lastOffset) > 0.05) {
        innerEl.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
        lastOffset = offset
      }
    }

    // Coalesce scroll/resize bursts into one paint per frame.
    const schedule = () => {
      if (rafId || !isVisible) return
      rafId = requestAnimationFrame(render)
    }

    render()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting
          if (isVisible) schedule()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(sectionEl)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [strength])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any
  const bufferPx = buffer ?? Math.ceil(strength * 0.7)

  return (
    <Tag ref={sectionRef} className={cn('relative overflow-hidden', className)}>
      <div
        ref={innerRef}
        className="absolute will-change-transform"
        style={{
          inset: `-${bufferPx}px`,
        }}
      >
        {children}
      </div>
    </Tag>
  )
}
