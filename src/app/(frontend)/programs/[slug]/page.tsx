import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [k: string]: string | string[] | undefined }>
}

export default async function ProgramPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()

  const program = await queryProgramBySlug({ slug })
  if (!program) return notFound()

  const rawSearchParams = (await searchParamsPromise) || {}
  const searchParams: { [k: string]: string | undefined } = {}
  for (const [k, v] of Object.entries(rawSearchParams)) {
    if (typeof v === 'string') searchParams[k] = v
    else if (Array.isArray(v)) searchParams[k] = v[0]
  }

  return (
    <article>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={program.layout || []} searchParams={searchParams} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const program = await queryProgramBySlug({ slug })
  if (!program) return {}
  return {
    title: program.title,
    description: program.excerpt || undefined,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'programs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return (result.docs || []).filter((d) => d.slug).map(({ slug }) => ({ slug: slug as string }))
}

const queryProgramBySlug = cache(
  async ({
    slug,
  }: {
    slug: string
  }): Promise<RequiredDataFromCollectionSlug<'programs'> | null> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'programs',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      depth: 2,
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  },
)
