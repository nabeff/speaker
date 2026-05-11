import React from 'react'

import type { ContactBlock as ContactBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { ParallaxImage } from '@/components/ParallaxImage'
import { TextReveal } from '@/components/TextReveal'
import { Blob, QuarterCircle } from '@/components/Decorations'
import { ContactForm } from './ContactForm'

export const ContactBlockComponent: React.FC<ContactBlockProps> = ({
  heading,
  subheading,
  image,
  email,
  phone,
  address,
  form,
  privacyText,
}) => {
  const formDoc =
    typeof form === 'object' && form !== null
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (form as any)
      : null

  return (
    <div className="container pt-12 md:pt-16 pb-4 md:pb-6">
      <div className="relative grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] rounded-3xl overflow-hidden bg-white">
        {/* Left: cream info pane */}
        <div className="relative bg-[var(--brand-soft)] p-8 md:p-12 overflow-hidden">
          <Blob
            seed={2}
            className="absolute -bottom-20 -left-20 w-72 h-72"
            color="var(--brand-decor-1)"
            opacity={0.7}
          />
          <QuarterCircle
            corner="bl"
            className="absolute -top-16 -right-16 w-56 h-56"
            color="var(--brand-decor-2)"
            opacity={0.5}
          />

          <div className="relative">
            {heading && (
              <TextReveal
                text={heading}
                as="h2"
                className="text-3xl md:text-4xl font-bold text-black leading-tight"
              />
            )}
            {subheading && (
              <p className="mt-3 text-sm md:text-base text-black/70">{subheading}</p>
            )}
            {image && typeof image === 'object' && (
              <ParallaxImage
                strength={50}
                className="w-full aspect-[4/3] max-h-[360px] rounded-2xl mt-6"
              >
                <Media fill imgClassName="object-cover" resource={image} />
              </ParallaxImage>
            )}

            <div className="mt-8 space-y-5">
              {email && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                    Email
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 block text-sm md:text-base font-medium text-black hover:underline break-all"
                  >
                    {email}
                  </a>
                </div>
              )}
              {phone && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                    Phone
                  </div>
                  <a
                    href={`tel:${phone}`}
                    className="mt-1 block text-sm md:text-base font-medium text-black hover:underline"
                  >
                    {phone}
                  </a>
                </div>
              )}
              {address && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
                    Address
                  </div>
                  <p className="mt-1 text-sm md:text-base font-medium text-black">{address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="p-8 md:p-12">
          {formDoc && <ContactForm form={formDoc} />}
          {privacyText && (
            <RichText
              className="mt-10 text-xs text-black/50 leading-relaxed [&_a]:underline [&_a]:text-black"
              data={privacyText}
              enableGutter={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
