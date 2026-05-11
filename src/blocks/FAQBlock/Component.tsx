'use client'

import React, { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { TextReveal } from '@/components/TextReveal'
import { Blob } from '@/components/Decorations'

export const FAQBlockComponent: React.FC<FAQBlockProps> = ({ heading, subtitle, items }) => {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([])

  if (!items || items.length === 0) return null

  return (
    <div className="container py-16 md:py-20 relative overflow-x-clip">
      <Blob
        seed={4}
        className="absolute -top-32 right-0 translate-x-1/4 w-[280px] h-[280px] md:w-[360px] md:h-[360px] z-0 opacity-60"
        color="var(--brand-decor-1)"
      />
      <div className="w-full relative">
        {heading && (
          <TextReveal
            text={heading}
            as="h2"
            className="text-3xl md:text-4xl font-bold text-black"
          />
        )}
        {subtitle && (
          <p className="mt-2 text-base font-medium text-[var(--brand-primary)]">{subtitle}</p>
        )}
        <div className="mt-8 divide-y divide-black/10 border-t border-b border-black/10">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            const bodyEl = bodyRefs.current[i]
            const bodyHeight = isOpen && bodyEl ? bodyEl.scrollHeight : 0

            return (
              <div key={i} onMouseEnter={() => setOpenIndex(i)}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base text-black">{item.question}</span>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-[var(--brand-primary)] text-white' : 'bg-black/10 text-black/60'
                    }`}
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                  style={{
                    maxHeight: bodyHeight,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    ref={(el) => {
                      bodyRefs.current[i] = el
                    }}
                    className="pb-5"
                  >
                    {item.answer && (
                      <RichText
                        className="text-sm md:text-base text-black/70 leading-relaxed"
                        data={item.answer}
                        enableGutter={false}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
