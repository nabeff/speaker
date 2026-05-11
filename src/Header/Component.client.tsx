'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  useEffect(() => {
    let lastY = window.scrollY
    const threshold = 8
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const diff = y - lastY
        if (Math.abs(diff) > threshold) {
          if (y > 100 && diff > 0) setHidden(true)
          else setHidden(false)
          lastY = y
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const setVar = () => {
      document.documentElement.style.setProperty('--header-height', `${el.offsetHeight}px`)
    }
    setVar()
    const ro = new ResizeObserver(setVar)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const logo = data?.logo as Media | undefined

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-black transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-3 md:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {logo?.url ? (
            <img
              src={logo.url}
              alt={logo.alt || 'Logo'}
              width={logo.width || 50}
              height={logo.height || 50}
              className="h-7 md:h-8 w-auto"
            />
          ) : (
            <div className="flex items-center gap-3">
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
            </div>
          )}
        </Link>

        <HeaderNav data={data} />
      </div>
    </header>
  )
}
