import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { BannerCTABlock as BannerCTABlockProps } from '@/payload-types'

import { TextReveal } from '@/components/TextReveal'

const resolveHref = (link: BannerCTABlockProps['link']) => {
  if (!link) return undefined
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value?.slug
  ) {
    return `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
  }
  return link.url || undefined
}

export const BannerCTABlockComponent: React.FC<BannerCTABlockProps> = ({ heading, link }) => {
  const href = resolveHref(link)
  const newTabProps = link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className="my-10 md:my-16 relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full block -mb-px"
        style={{ height: 50 }}
      >
        <defs>
          <linearGradient id="banner-cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--brand-decor-1)" />
            <stop offset="50%" stopColor="#F0EDC1" />
            <stop offset="100%" stopColor="#DEEDB8" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q120,120 240,40 T480,40 T720,40 T960,40 T1200,40 T1440,40 L1440,120 L0,120 Z"
          fill="url(#banner-cta-gradient)"
        />
      </svg>
      <div
        className="py-10 md:py-14 px-6 text-center"
        style={{
          background:
            'linear-gradient(to right, var(--brand-decor-1) 0%, #F0EDC1 50%, #DEEDB8 100%)',
        }}
      >
        {heading && (
          <TextReveal
            text={heading}
            as="h2"
            className="text-2xl md:text-3xl font-bold text-black text-center"
          />
        )}
        {href && link?.label && (
          <div className="mt-6">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] text-white px-6 py-2.5 text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
              {...newTabProps}
            >
              {link.label}
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
