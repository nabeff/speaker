import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

const platformIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.35z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
  x: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2H21.5l-7.4 8.46L23 22h-6.8l-5.32-6.96L4.8 22H1.54l7.92-9.05L1 2h6.96l4.81 6.36L18.244 2zm-1.19 18h1.88L7.04 4H5.08l11.974 16z" />
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.81a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z" />
    </svg>
  ),
  spotify: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  'apple-podcasts': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 11.5c-3 0-5.5 1.7-7 4.2a10 10 0 0 0 14 0c-1.5-2.5-4-4.2-7-4.2z" />
    </svg>
  ),
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socials = footerData?.socials || []
  const contact = footerData?.contact
  const tagline = footerData?.tagline
  const logo =
    footerData?.logo && typeof footerData.logo === 'object' ? footerData.logo : null
  const legalText =
    footerData?.legalText || '© 2026 All rights reserved · Powered by Forge & Digitamine'

  return (
    <footer className="mt-auto bg-black text-white" data-theme="dark">
      <div className="container py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              {logo?.url ? (
                <img
                  src={logo.url}
                  alt={logo.alt || 'Logo'}
                  className="h-20 md:h-24 w-auto"
                />
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                    >
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M5 10a7 7 0 0 0 14 0" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="8" y1="22" x2="16" y2="22" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold text-sm leading-tight">
                    Expert
                    <br />
                    To Speaker
                  </span>
                </>
              )}
            </Link>
            {tagline && (
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mt-2">{tagline}</p>
            )}
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-4 font-[family-name:var(--font-display)]">
                Navigation
              </h3>
              <nav className="flex flex-col gap-2.5">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    appearance="inline"
                    className="text-sm text-white/80 hover:text-white transition-colors w-fit"
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Contact */}
          {(contact?.email || contact?.phone || contact?.address) && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-4 font-[family-name:var(--font-display)]">
                Contact
              </h3>
              <div className="flex flex-col gap-2.5 text-sm">
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-white/80 hover:text-white transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                )}
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {contact.phone}
                  </a>
                )}
                {contact?.address && (
                  <p className="text-white/80 leading-relaxed">{contact.address}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">{legalText}</p>

          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
                >
                  {platformIcons[s.platform] || (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
