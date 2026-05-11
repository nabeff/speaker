'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { Event as EventDoc, EventCategory } from '@/payload-types'

import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { NotchedBadge } from '@/components/NotchedBadge'

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

type Props = {
  heading: string
  categories: EventCategory[]
  activeCategorySlug: string
  events: EventDoc[]
  page: number
  totalPages: number
}

export const EventsListingClient: React.FC<Props> = ({
  heading,
  categories,
  activeCategorySlug,
  events,
  page,
  totalPages,
}) => {
  const pathname = usePathname()
  const params = useSearchParams()

  const buildHref = (overrides: { page?: number | null; cat?: string | null }) => {
    const next = new URLSearchParams(params.toString())
    if (overrides.page === null) next.delete('page')
    else if (typeof overrides.page === 'number') next.set('page', String(overrides.page))
    if (overrides.cat === null || overrides.cat === 'all') next.delete('cat')
    else if (typeof overrides.cat === 'string') next.set('cat', overrides.cat)
    const qs = next.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  const tabs: { label: string; slug: string }[] = [
    { label: 'All', slug: 'all' },
    ...categories.map((c) => ({ label: c.title, slug: c.slug || '' })),
  ]

  const pageNumbers: (number | 'gap')[] = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const out: (number | 'gap')[] = [1, 2, 3]
    out.push('gap')
    out.push(totalPages - 1, totalPages)
    return out
  })()

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-black">{heading}</h1>

      <div className="mt-6 flex flex-wrap gap-6 border-b border-black/10 pb-2">
        {tabs.map((t) => {
          const isActive = activeCategorySlug === t.slug
          return (
            <Link
              key={t.slug || 'all'}
              href={buildHref({ cat: t.slug, page: null })}
              className={`text-sm md:text-base transition-colors ${
                isActive ? 'text-black font-bold' : 'text-black/50 hover:text-black'
              }`}
            >
              {t.label}
            </Link>
          )
        })}
      </div>

      {events.length === 0 ? (
        <p className="mt-12 text-black/60">No events found.</p>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const cat =
              typeof event.category === 'object' && event.category !== null
                ? event.category
                : null
            return (
              <Link key={event.id} href={`/events/${event.slug}`} className="flex flex-col group">
                <div
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
                  style={cat?.title ? { borderTopRightRadius: 0 } : undefined}
                >
                  <ParallaxImage strength={220} className="absolute inset-0">
                    {event.image && typeof event.image === 'object' && (
                      <Media
                        fill
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                        resource={event.image}
                      />
                    )}
                  </ParallaxImage>
                  {cat?.title && <NotchedBadge>{cat.title}</NotchedBadge>}
                </div>
                <p className="mt-4 text-sm text-[var(--brand-primary)] font-medium">
                  {formatDate(event.dateStart)}
                </p>
                <h3 className="mt-2 text-base md:text-lg font-bold text-black leading-snug">
                  {event.title}
                </h3>
                {event.excerpt && (
                  <p className="mt-2 text-sm text-black/70 leading-relaxed line-clamp-3">
                    {event.excerpt}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 pt-6 border-t border-black/10 flex items-center justify-between">
          {page > 1 ? (
            <Link
              href={buildHref({ page: page - 1 })}
              className="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              Previous
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-black/30">
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              Previous
            </span>
          )}

          <div className="flex items-center gap-1">
            {pageNumbers.map((p, i) => {
              if (p === 'gap')
                return (
                  <span key={`gap-${i}`} className="px-2 text-black/40">
                    …
                  </span>
                )
              const isActive = p === page
              return (
                <Link
                  key={p}
                  href={buildHref({ page: p })}
                  className={`flex items-center justify-center w-9 h-9 rounded-full text-sm transition-colors ${
                    isActive ? 'bg-[var(--brand-soft)] text-[var(--brand-primary)] font-bold' : 'text-black hover:bg-black/5'
                  }`}
                >
                  {p}
                </Link>
              )
            })}
          </div>

          {page < totalPages ? (
            <Link
              href={buildHref({ page: page + 1 })}
              className="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline"
            >
              Next
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-black/30">
              Next
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}
