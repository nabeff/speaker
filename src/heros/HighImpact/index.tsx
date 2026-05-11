'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Link from 'next/link'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-end justify-center text-white min-h-screen"
      data-theme="dark"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pb-20 pt-40">
        <div className="max-w-[40rem] mx-auto text-center">
          {richText && (
            <RichText
              className="mb-6 [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:font-bold [&_h1]:leading-tight [&_p]:text-white/80 [&_p]:text-base [&_p]:md:text-lg [&_p]:mt-4 [&_p]:leading-relaxed"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <HeroButton link={link} index={i} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function HeroButton({ link, index }: { link: any; index: number }) {
  const isOutline = link.appearance === 'outline'
  const variantColor = isOutline ? 'transparent' : 'var(--brand-primary)'
  const borderStyle = isOutline ? '2px solid rgba(255,255,255,0.3)' : 'none'

  const href =
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value.slug
      ? `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
      : link.url || '#'

  return (
    <Link
      href={href}
      className="group px-7 py-3 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-200"
      style={{
        backgroundColor: variantColor,
        color: 'white',
        border: borderStyle,
      }}
      onMouseEnter={(e) => {
        if (isOutline) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
        } else {
          e.currentTarget.style.backgroundColor = 'white'
          e.currentTarget.style.color = 'var(--brand-primary)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = variantColor
        e.currentTarget.style.color = 'white'
      }}
    >
      {link.label}
      <span className="relative w-4 h-4 overflow-hidden">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 -rotate-45 transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 -rotate-45 transition-transform duration-300 translate-x-[-20px] translate-y-[20px] group-hover:translate-x-0 group-hover:translate-y-0"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
