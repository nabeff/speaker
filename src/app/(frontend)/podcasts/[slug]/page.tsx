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
import { ParallaxImage } from '@/components/ParallaxImage'
import { NotchedBadge } from '@/components/NotchedBadge'

import { RelatedCarousel } from './RelatedCarousel'
import type { Podcast } from '@/payload-types'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function PodcastPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const podcast = await queryPodcastBySlug({ slug })
  if (!podcast) return notFound()

  const cat =
    typeof podcast.category === 'object' && podcast.category !== null ? podcast.category : null

  // Related: prefer same-category, then top up with other recent podcasts so the carousel always has variety.
  const payload = await getPayload({ config: configPromise })
  const sameCategory = cat?.id
    ? await payload.find({
        collection: 'podcasts',
        limit: 6,
        depth: 1,
        sort: '-publishedAt',
        where: {
          and: [{ id: { not_equals: podcast.id } }, { category: { equals: cat.id } }],
        },
      })
    : { docs: [] as Podcast[] }

  let relatedItems = (sameCategory.docs || []) as Podcast[]

  // Always also pull other recent podcasts, append any new ones, dedupe.
  if (relatedItems.length < 6) {
    const others = await payload.find({
      collection: 'podcasts',
      limit: 6,
      depth: 1,
      sort: '-publishedAt',
      where: { id: { not_equals: podcast.id } },
    })
    const otherDocs = (others.docs || []) as Podcast[]
    const existing = new Set(relatedItems.map((r) => r.id))
    for (const d of otherDocs) {
      if (!existing.has(d.id)) {
        relatedItems.push(d)
        existing.add(d.id)
      }
      if (relatedItems.length >= 6) break
    }
  }

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
              {podcast.title}
            </h1>
            {podcast.subtitle && (
              <p className="mt-4 text-base md:text-lg text-black/70 leading-snug max-w-3xl">
                {podcast.subtitle}
              </p>
            )}
          </div>
          <Link
            href="/podcasts"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black group shrink-0 md:mt-2 self-start"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            </span>
            Back to Podcasts
          </Link>
        </header>

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
              {podcast.image && typeof podcast.image === 'object' && (
                <Media fill imgClassName="object-cover" priority resource={podcast.image} />
              )}
            </ParallaxImage>
            {cat?.title && <NotchedBadge>{cat.title}</NotchedBadge>}
          </div>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_420px] md:gap-16">
          <div>
            {podcast.body && (
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
                data={podcast.body}
                enableGutter={false}
              />
            )}
          </div>

          <aside className="md:sticky md:top-8 md:self-start">
            <RelatedCarousel items={relatedItems} />
          </aside>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const podcast = await queryPodcastBySlug({ slug })
  if (!podcast) return {}
  return {
    title: podcast.title,
    description: podcast.excerpt || undefined,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'podcasts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return (result.docs || []).filter((d) => d.slug).map(({ slug }) => ({ slug: slug as string }))
}

const queryPodcastBySlug = cache(
  async ({
    slug,
  }: {
    slug: string
  }): Promise<RequiredDataFromCollectionSlug<'podcasts'> | null> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'podcasts',
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
