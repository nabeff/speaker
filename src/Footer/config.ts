import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (under logo)',
      defaultValue: 'Building the next generation of expert speakers.',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact info',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'text' },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social links',
      labels: { singular: 'Social', plural: 'Socials' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X / Twitter', value: 'x' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Spotify', value: 'spotify' },
            { label: 'Apple Podcasts', value: 'apple-podcasts' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'legalText',
      type: 'text',
      label: 'Bottom legal line',
      defaultValue: '© 2026 All rights reserved · Powered by Forge & Digitamine',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
