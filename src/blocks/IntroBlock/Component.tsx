import React from 'react'
import Image from 'next/image'

import type { IntroBlock as IntroBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const IntroBlockComponent: React.FC<IntroBlockProps> = ({ showIcon, richText }) => {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto text-center">
        {showIcon && (
          <div className="flex justify-center mb-6">
            <Image src="/mic.svg" alt="" width={72} height={72} priority />
          </div>
        )}
        {richText && (
          <RichText
            className="mx-auto text-lg md:text-xl leading-relaxed"
            data={richText}
            enableGutter={false}
          />
        )}
      </div>
    </div>
  )
}
