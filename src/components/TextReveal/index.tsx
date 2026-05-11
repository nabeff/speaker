'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utilities/ui'

gsap.registerPlugin(ScrollTrigger)

type AllowedTags = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type TextRevealProps = {
  text: string | string[]
  className?: string
  as?: AllowedTags
}

const DEFAULTS = {
  start: 'top 85%',
  once: true,
  delay: 0.2,
  duration: 1.2,
  staggerAmount: 0.25,
  skewY: 7,
  y: 100,
  lineClassName: '',
} as const

export const TextReveal: React.FC<TextRevealProps> = ({ text, className, as = 'div' }) => {
  const rootRef = useRef<HTMLElement | null>(null)
  const measureRef = useRef<HTMLSpanElement | null>(null)
  const [lines, setLines] = useState<string[]>([])

  const raw = useMemo(() => {
    if (Array.isArray(text)) return text.filter(Boolean)
    return String(text || '')
  }, [text])

  useEffect(() => {
    const el = rootRef.current
    const measurer = measureRef.current
    if (!el || !measurer) return

    const compute = () => {
      if (Array.isArray(raw)) {
        setLines(raw.filter(Boolean))
        return
      }

      const str = String(raw).trim()
      if (!str) {
        setLines([])
        return
      }

      if (str.includes('\n')) {
        setLines(
          str
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean),
        )
        return
      }

      const rawWidth = el.getBoundingClientRect().width
      if (!rawWidth) {
        // Width not measurable yet; ResizeObserver will recompute when ready.
        return
      }
      // Subtract a small buffer to avoid sub-pixel overflow on the nowrap line.
      const width = Math.max(0, rawWidth - 2)

      const words = str.split(/\s+/).filter(Boolean)
      const out: string[] = []
      let current = ''

      measurer.style.whiteSpace = 'nowrap'

      for (const w of words) {
        const candidate = current ? `${current} ${w}` : w
        measurer.textContent = candidate

        const candidateWidth = measurer.getBoundingClientRect().width

        if (candidateWidth <= width) {
          current = candidate
        } else {
          if (current) out.push(current)
          current = w
        }
      }

      if (current) out.push(current)

      setLines(out.length ? out : [str])
    }

    compute()

    const ro = new ResizeObserver(() => compute())
    ro.observe(el)

    return () => ro.disconnect()
  }, [raw])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const spans = el.querySelectorAll<HTMLElement>('[data-reveal-span]')
    if (!spans.length) return

    // If the element is already in (or above) the viewport on mount,
    // skip the reveal entirely so text never gets stuck offscreen.
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 0
    if (rect.top < vh * 0.85) {
      gsap.set(spans, { y: 0, skewY: 0, opacity: 1 })
      return
    }

    gsap.set(spans, { y: DEFAULTS.y, skewY: DEFAULTS.skewY, opacity: 1 })

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: DEFAULTS.start,
            once: DEFAULTS.once,
          },
        })
        .to(spans, {
          y: 0,
          skewY: 0,
          ease: 'power4.out',
          duration: DEFAULTS.duration,
          delay: DEFAULTS.delay,
          stagger: { amount: DEFAULTS.staggerAmount },
        })
    }, el)

    return () => ctx.revert()
  }, [lines.length])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any

  return (
    <Tag ref={rootRef} className={cn(className, 'relative block w-full min-w-0 max-w-full')}>
      <span
        ref={measureRef}
        className="pointer-events-none absolute -left-[9999px] top-0 opacity-0"
        aria-hidden="true"
      />

      {lines.map((line, idx) => (
        <span key={idx} className={cn('relative block overflow-hidden', DEFAULTS.lineClassName)}>
          <span
            data-reveal-span
            className="block will-change-transform whitespace-nowrap"
            style={{ display: 'inline-block' }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
