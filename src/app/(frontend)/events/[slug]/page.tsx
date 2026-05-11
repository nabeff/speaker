import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import React, { cache } from 'react'

import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { NotchedBadge } from '@/components/NotchedBadge'
import { ParallaxImage } from '@/components/ParallaxImage'

type Args = {
  params: Promise<{ slug: string }>
}

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return ''
  const d = new Date(iso)
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
}

const formatLongDate = (iso: string | null | undefined) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const event = await queryEventBySlug({ slug })
  if (!event) return notFound()

  const dateRange = event.dateEnd
    ? `${formatDate(event.dateStart)} – ${formatDate(event.dateEnd)}`
    : formatDate(event.dateStart)
  const timeRange = [event.timeStart, event.timeEnd].filter(Boolean).join(' – ')
  const cat =
    typeof event.category === 'object' && event.category !== null ? event.category : null

  return (
    <article className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[var(--brand-decor-1)] opacity-60 -z-10"
      />

      <div className="container pt-28 md:pt-14 pb-10 md:pb-14 relative">
        {/* Hero header — title/subtitle on left, Back link on right (desktop).
            Stacks on mobile with Back link on top. */}
        <header className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
          <div className="max-w-4xl flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="mt-4 text-base md:text-lg text-black/70 leading-snug max-w-3xl">
                {event.subtitle}
              </p>
            )}
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black group shrink-0 md:mt-2 self-start"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </span>
            Back to Events
          </Link>
        </header>

        {/* Hero image with decorative circle behind/below */}
        <div className="relative mt-8">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/3 w-[420px] h-[420px] md:w-[640px] md:h-[640px] rounded-full bg-[var(--brand-decor-2)] opacity-40 -z-10"
          />
          <div
            className="relative w-full"
            style={cat?.title ? { borderTopRightRadius: 0 } : undefined}
          >
            <ParallaxImage
              strength={120}
              className="w-full aspect-[16/6] md:max-h-[420px] rounded-3xl"
            >
              {event.image && typeof event.image === 'object' && (
                <Media fill imgClassName="object-cover" priority resource={event.image} />
              )}
            </ParallaxImage>
            {cat?.title && <NotchedBadge>{cat.title}</NotchedBadge>}
          </div>
        </div>

        {/* Body + sidebar */}
        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_320px] md:gap-16">
          <div>
            {event.body && (
              <RichText
                className={[
                  'text-base md:text-lg text-black/80 leading-snug',
                  '[&>p]:mt-1 [&>p:first-child]:mt-0',
                  '[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-10 [&_h2]:mb-3',
                  '[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-2',
                  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-2 [&_ul>li]:my-0.5 [&_ul>li]:marker:text-[var(--brand-primary)]',
                  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mt-2 [&_ol>li]:my-0.5 [&_ol>li]:marker:text-[var(--brand-primary)]',
                  '[&_a]:underline [&_a]:text-[var(--brand-primary)]',
                  '[&_strong]:text-black',
                ].join(' ')}
                data={event.body}
                enableGutter={false}
              />
            )}
          </div>

          {/* Sticky info panel */}
          <aside className="md:sticky md:top-8 md:self-start">
            <div className="bg-[var(--brand-soft)] rounded-2xl p-7 md:p-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
                Event details
              </h3>
              <dl className="mt-5 divide-y divide-black/10">
                {dateRange && (
                  <div className="py-3 first:pt-0">
                    <dt className="text-xs text-black/50 mb-0.5">Date</dt>
                    <dd className="text-sm font-semibold text-black">
                      {event.dateEnd ? dateRange : formatLongDate(event.dateStart)}
                    </dd>
                  </div>
                )}
                {timeRange && (
                  <div className="py-3">
                    <dt className="text-xs text-black/50 mb-0.5">Time</dt>
                    <dd className="text-sm font-semibold text-black">{timeRange}</dd>
                  </div>
                )}
                {event.eventType && (
                  <div className="py-3">
                    <dt className="text-xs text-black/50 mb-0.5">Format</dt>
                    <dd className="text-sm font-semibold text-black">{event.eventType}</dd>
                  </div>
                )}
                {event.phone && (
                  <div className="py-3">
                    <dt className="text-xs text-black/50 mb-0.5">Phone</dt>
                    <dd className="text-sm font-semibold">
                      <a href={`tel:${event.phone}`} className="text-black hover:underline">
                        {event.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {event.email && (
                  <div className="py-3 last:pb-0">
                    <dt className="text-xs text-black/50 mb-0.5">Email</dt>
                    <dd className="text-sm font-semibold break-all">
                      <a href={`mailto:${event.email}`} className="text-black hover:underline">
                        {event.email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const event = await queryEventBySlug({ slug })
  if (!event) return {}
  return {
    title: event.title,
    description: event.excerpt || undefined,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return (result.docs || []).filter((d) => d.slug).map(({ slug }) => ({ slug: slug as string }))
}

const queryEventBySlug = cache(
  async ({ slug }: { slug: string }): Promise<RequiredDataFromCollectionSlug<'events'> | null> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'events',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      depth: 1,
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  },
)
