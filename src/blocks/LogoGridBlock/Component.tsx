import React from 'react'

import type { LogoGridBlock as LogoGridBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

const headingAlignClass: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const columnsClass: Record<string, string> = {
  '3': 'sm:grid-cols-3',
  '4': 'sm:grid-cols-4',
  '5': 'sm:grid-cols-3 md:grid-cols-5',
}

export const LogoGridBlockComponent: React.FC<LogoGridBlockProps> = ({
  heading,
  headingAlign,
  columns,
  logos,
}) => {
  if (!logos || logos.length === 0) return null

  return (
    <div className="container py-16 md:py-20">
      {heading && (
        <h2
          className={`text-xl md:text-2xl font-bold text-black mb-8 ${
            headingAlignClass[headingAlign || 'right']
          }`}
        >
          {heading}
        </h2>
      )}
      <div className={`grid grid-cols-2 ${columnsClass[columns || '5']} gap-4`}>
        {logos.map((item, i) => (
          <div
            key={i}
            className="relative aspect-[16/9] bg-[var(--brand-decor-2)] rounded-xl flex items-center justify-center p-10 md:p-12"
          >
            {item.image && typeof item.image === 'object' && (
              <div className="relative w-full h-full">
                <Media
                  fill
                  imgClassName="object-contain"
                  resource={item.image}
                  alt={item.name || ''}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
