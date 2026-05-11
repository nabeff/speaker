import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 2)()) as Header
  const payload = await getPayload({ config: configPromise })

  // Resolve auto-source dropdowns by fetching the relevant collection.
  const enrichedNav = await Promise.all(
    (headerData.navItems || []).map(async (item) => {
      if (!item.hasDropdown) return item
      const source = (item as Record<string, unknown>).dropdownSource as
        | 'manual'
        | 'programs'
        | 'treatments'
        | undefined
      if (!source || source === 'manual') return item

      const result = await payload.find({
        collection: source,
        limit: 100,
        depth: 0,
        sort: source === 'programs' ? '-publishedAt' : 'title',
        select: { title: true, slug: true },
      })

      const generatedItems = (result.docs || []).map((doc) => {
        const d = doc as { id: string; title?: string; slug?: string }
        return {
          link: {
            type: 'custom' as const,
            url: `/${source}/${d.slug}`,
            label: d.title || '',
          },
        }
      })

      return {
        ...item,
        dropdownItems: generatedItems,
      }
    }),
  )

  return <HeaderClient data={{ ...headerData, navItems: enrichedNav as Header['navItems'] }} />
}
