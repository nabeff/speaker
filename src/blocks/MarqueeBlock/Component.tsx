import React from 'react'

import type { MarqueeBlock as MarqueeBlockProps } from '@/payload-types'

import { WaveDivider } from '@/components/Decorations'

const speedDuration: Record<string, string> = {
  slow: '60s',
  normal: '40s',
  fast: '25s',
}

export const MarqueeBlockComponent: React.FC<MarqueeBlockProps> = ({ phrases, speed }) => {
  if (!phrases || phrases.length === 0) return null

  const duration = speedDuration[speed || 'normal']
  const items = phrases.map((p) => p.text).filter(Boolean) as string[]

  // Each unit ends with a separator, so the loop seam is always [text → ✦ → text → ✦ ...]
  const renderUnit = (keyPrefix: string) =>
    items.map((text, i) => (
      <React.Fragment key={`${keyPrefix}-${i}`}>
        <span className="text-lg md:text-2xl font-medium whitespace-nowrap text-black">
          {text}
        </span>
        <span className="text-[var(--brand-primary)] text-3xl shrink-0" aria-hidden="true">
          ✦
        </span>
      </React.Fragment>
    ))

  return (
    <div className="relative my-10 md:my-16">
      <WaveDivider color="var(--brand-soft)" height={70} className="-mb-px" />
      <div className="bg-[var(--brand-soft)] py-8 md:py-10 overflow-hidden">
        <div
          className="flex w-max items-center gap-20"
          style={{ animation: `marquee-scroll ${duration} linear infinite` }}
        >
          {renderUnit('a')}
          {renderUnit('b')}
        </div>
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
      <WaveDivider color="var(--brand-soft)" height={70} className="-mt-px" flip />
    </div>
  )
}
