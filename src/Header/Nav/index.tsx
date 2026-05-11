'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

type NavItem = NonNullable<HeaderType['navItems']>[number]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const cta = data?.cta

  return (
    <>
      <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
        {navItems.map((item, i) => {
          if (item.hasDropdown && item.dropdownItems?.length) {
            return <DropdownNavItem key={i} item={item} />
          }
          return (
            <CMSLink
              key={i}
              {...item.link}
              appearance="inline"
              className="relative text-white/85 hover:text-white text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
            />
          )
        })}
      </nav>

      {cta?.label && (
        <div className="hidden lg:flex items-center">
          <CTAButton cta={cta} />
        </div>
      )}

      <MobileMenu data={data} />
    </>
  )
}

function DropdownNavItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }
  const scheduleClose = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 180)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="relative flex items-center gap-1.5" onMouseEnter={open} onMouseLeave={scheduleClose}>
      <CMSLink
        {...item.link}
        appearance="inline"
        className="relative text-white/85 hover:text-white text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
      />
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--brand-primary)] transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <ChevronDown className="w-3 h-3 text-white" strokeWidth={2.5} />
      </button>

      <div
        className={`fixed left-0 right-0 top-[var(--header-height,64px)] grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      >
        <div className="overflow-hidden">
          <div
            className={`bg-black border-t border-white/10 shadow-2xl transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="container py-8">
              {(item.dropdownTitle || item.dropdownDescription) && (
                <div className="mb-6 px-2">
                  {item.dropdownTitle && (
                    <h3 className="text-white text-lg font-semibold">{item.dropdownTitle}</h3>
                  )}
                  {item.dropdownDescription && (
                    <p className="text-white/50 text-sm mt-1 max-w-xl">{item.dropdownDescription}</p>
                  )}
                </div>
              )}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {item.dropdownItems?.map((dropdownItem, j) => (
                  <li key={j}>
                    <CMSLink
                      {...dropdownItem.link}
                      appearance="inline"
                      className="block rounded-md px-3 py-3 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CTAButton({ cta }: { cta: NonNullable<HeaderType['cta']> }) {
  const href =
    cta.link?.type === 'reference' &&
    typeof cta.link.reference?.value === 'object' &&
    cta.link.reference.value.slug
      ? `${cta.link.reference.relationTo !== 'pages' ? `/${cta.link.reference.relationTo}` : ''}/${cta.link.reference.value.slug}`
      : cta.link?.url || '#'

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] text-white px-5 py-2.5 text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors whitespace-nowrap"
    >
      {cta.label}
      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
    </Link>
  )
}

function MobileMenu({ data }: { data: HeaderType }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const cta = data?.cta

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="text-white p-2 -mr-2"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" strokeWidth={2} />
      </button>

      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed top-0 right-0 z-[70] w-[88%] max-w-sm text-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#000', height: '100dvh' }}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
          {navItems.map((item, i) => {
            if (item.hasDropdown && item.dropdownItems?.length) {
              return <MobileDropdown key={i} item={item} />
            }
            return (
              <CMSLink
                key={i}
                {...item.link}
                appearance="inline"
                className="block py-3 text-base text-white/90 hover:text-white border-b border-white/10"
              />
            )
          })}
        </nav>

        {cta?.label && (
          <div className="px-6 py-5 border-t border-white/10">
            <CTAButton cta={cta} />
          </div>
        )}
      </aside>
    </div>
  )
}

function MobileDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const bodyHeight = isOpen && bodyRef.current ? bodyRef.current.scrollHeight : 0

  return (
    <div className="border-b border-white/10">
      <div className="flex items-center justify-between w-full py-3">
        <CMSLink
          {...item.link}
          appearance="inline"
          className="flex-1 text-base text-white/90 hover:text-white"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="shrink-0 ml-3"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
        >
          <span
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--brand-primary)] transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </span>
        </button>
      </div>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
        style={{ maxHeight: bodyHeight, opacity: isOpen ? 1 : 0 }}
      >
        <div ref={bodyRef} className="pb-3 pl-3 flex flex-col gap-1">
          {item.dropdownItems?.map((dropdownItem, j) => (
            <CMSLink
              key={j}
              {...dropdownItem.link}
              appearance="inline"
              className="block py-2 text-sm text-white/70 hover:text-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
