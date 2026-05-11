import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Has Dropdown',
          defaultValue: false,
        },
        link({
          appearances: false,
        }),
        {
          name: 'dropdownTitle',
          type: 'text',
          label: 'Dropdown Title',
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown,
          },
        },
        {
          name: 'dropdownDescription',
          type: 'textarea',
          label: 'Dropdown Description',
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown,
          },
        },
        {
          name: 'dropdownSource',
          type: 'select',
          label: 'Dropdown Source',
          defaultValue: 'manual',
          options: [
            { label: 'Manual list', value: 'manual' },
            { label: 'All Programs (auto)', value: 'programs' },
            { label: 'All Treatments (auto)', value: 'treatments' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown,
            description:
              'Choose where dropdown items come from. "Auto" pulls all records from the collection — new entries appear automatically.',
          },
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.hasDropdown &&
              (!siblingData?.dropdownSource || siblingData?.dropdownSource === 'manual'),
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Contact us',
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
        {
          name: 'variant',
          type: 'select',
          label: 'Button Color',
          defaultValue: 'blue',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
