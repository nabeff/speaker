import type { Block } from 'payload'

import { link } from '../../fields/link'

export const BannerCTABlock: Block = {
  slug: 'bannerCTABlock',
  interfaceName: 'BannerCTABlock',
  labels: {
    singular: 'Banner CTA',
    plural: 'Banner CTAs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    link({ appearances: false }),
  ],
}
