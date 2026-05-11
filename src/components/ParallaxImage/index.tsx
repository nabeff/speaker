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

    let rafId = 0
    let isVisible = false
    let currentOffset = 0
    let targetOffset = 0

    const computeTarget = () => {
      const rect = sectionEl.getBoundingClientRect()
      const vh = window.innerHeight || 0
      const total = rect.height + vh
      const progressed = (vh - rect.top) / (total || 1)
      const clamped = Math.max(0, Math.min(1, progressed))
      targetOffset = (clamped - 0.5) * strength
    }

    const tick = () => {
      computeTarget()
      // Smooth interpolate toward target to avoid frame-to-frame jumps
      currentOffset += (targetOffset - currentOffset) * 0.18
      innerEl.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`
      if (isVisible) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const start = () => {
      if (rafId) return
      rafId = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    // Initialize without easing so first paint is correct
    computeTarget()
    currentOffset = targetOffset
    innerEl.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting
          if (isVisible) start()
          else stop()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(sectionEl)

    return () => {
      io.disconnect()
      stop()
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
