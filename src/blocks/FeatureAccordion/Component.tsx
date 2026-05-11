'use client'

import React, { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import type { FeatureAccordionBlock as FeatureAccordionBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'
import RichText from '@/components/RichText'

export const FeatureAccordionComponent: React.FC<FeatureAccordionBlockProps> = ({
  heading,
  description,
  image,
  items,
}) => {
  const [openIndex, setOpenIndex] = useState(0)
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([])

  if (!items || items.length === 0) return null

  return (
    <div className="overflow-x-clip">
      <div className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch min-w-0">
        <div className="flex flex-col min-w-0">
          {heading && (
            <TextReveal
              text={heading}
              as="h2"
              className="text-2xl md:text-3xl font-bold text-black max-w-[20rem] md:max-w-[28rem]"
            />
          )}
          {description && (
            <p className="mt-4 text-sm md:text-base text-black/70 leading-relaxed max-w-[30rem]">
              {description}
            </p>
          )}
          <div className="flex flex-col gap-3 mt-16 md:mt-20">
            {items.map((item, i) => {
              const isOpen = openIndex === i
              const bodyEl = bodyRefs.current[i]
              const bodyHeight = isOpen && bodyEl ? bodyEl.scrollHeight : 0

              return (
                <div
                  key={i}
                  className={`rounded-lg transition-colors duration-300 ${
                    isOpen ? 'bg-[var(--brand-soft)]' : 'bg-transparent'
                  }`}
                  onMouseEnter={() => setOpenIndex(i)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left min-w-0"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-black break-words min-w-0">{item.title}</span>
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full bg-[var(--brand-primary)] text-white shrink-0 transition-all duration-300 ${
                        isOpen ? 'opacity-100' : 'opacity-40'
                      }`}
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
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
                      className="px-5 pb-5"
                    >
                      {item.description && (
                        <RichText
                          className="text-sm md:text-base text-black/80"
                          data={item.description}
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

        <ParallaxImage
          strength={100}
          className="w-full h-full min-h-[340px] rounded-2xl order-first md:order-last"
        >
          {image && typeof image === 'object' && (
            <Media fill imgClassName="object-cover" priority resource={image} />
          )}
        </ParallaxImage>
        </div>
      </div>
    </div>
  )
}
