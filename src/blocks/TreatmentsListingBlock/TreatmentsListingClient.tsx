'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { Treatment } from '@/payload-types'

type Props = {
  heading: string
  intro?: string | null
  treatments: Treatment[]
  page: number
  totalPages: number
}

export const TreatmentsListingClient: React.FC<Props> = ({
  heading,
  intro,
  treatments,
  page,
  totalPages,
}) => {
  const pathname = usePathname()
  const params = useSearchParams()

  const buildHref = (overrides: { page?: number | null }) => {
    const next = new URLSearchParams(params.toString())
    if (overrides.page === null) next.delete('page')
    else if (typeof overrides.page === 'number') next.set('page', String(overrides.page))
    const qs = next.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  const pageNumbers: (number | 'gap')[] = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const out: (number | 'gap')[] = [1, 2, 3]
    out.push('gap')
    out.push(totalPages - 1, totalPages)
    return out
  })()

  return (
    <div className="container pt-6 md:pt-8 pb-12 md:pb-16">
      <div className="mb-10 md:mb-14 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">{heading}</h1>
        {intro && (
          <p className="mt-4 text-base md:text-lg text-black/70 leading-relaxed">{intro}</p>
        )}
      </div>

      {treatments.length === 0 ? (
        <p className="text-black/60">No treatments yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {treatments.map((t) => (
            <TreatmentCard key={t.id} treatment={t} />
          ))}
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
                    isActive
                      ? 'bg-[var(--brand-soft)] text-[var(--brand-primary)] font-bold'
                      : 'text-black hover:bg-black/5'
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

const TreatmentCard: React.FC<{ treatment: Treatment }> = ({ treatment }) => {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const updateOrigin = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  return (
    <Link
      ref={cardRef}
      href={`/treatments/${treatment.slug}`}
      className="group relative aspect-[5/4] rounded-2xl bg-[var(--brand-decor-2)] overflow-hidden flex items-center justify-center p-6 text-center"
      onPointerEnter={(e) => {
        updateOrigin(e)
        setHovered(true)
      }}
      onPointerLeave={(e) => {
        updateOrigin(e)
        setHovered(false)
      }}
    >
      <span
        aria-hidden="true"
        className="absolute pointer-events-none transition-transform duration-700 ease-out"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          width: '200%',
          height: '200%',
          marginLeft: '-100%',
          marginTop: '-100%',
          backgroundColor: 'var(--brand-primary)',
          transform: `scale(${hovered ? 1 : 0})`,
          transformOrigin: 'center center',
          borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
        }}
      />
      <span
        className={`relative text-base md:text-lg font-bold leading-snug transition-colors duration-500 ${
          hovered ? 'text-white' : 'text-black'
        }`}
      >
        {treatment.title}
      </span>
    </Link>
  )
}
