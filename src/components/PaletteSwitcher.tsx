'use client'

import React, { useEffect, useState } from 'react'

const palettes: { key: string; label: string; swatches: string[] }[] = [
  {
    key: 'current',
    label: 'Current',
    swatches: ['#FFFFFF', 'var(--brand-primary)', 'var(--brand-decor-1)', 'var(--brand-decor-2)'],
  },
  {
    key: 'editorial',
    label: '1 · Editorial',
    swatches: ['#F4EDE3', '#C45A3C', '#3D5A4A', '#E5C97D'],
  },
  {
    key: 'cool',
    label: '2 · Cool',
    swatches: ['#FAFAF7', '#1F4D7A', '#E8B53D', '#E8EDF2'],
  },
  {
    key: 'mediterranean',
    label: '3 · Mediterranean',
    swatches: ['#FBF6EE', '#D14F2C', '#0E5E5E', '#F1B946'],
  },
  {
    key: 'wellness',
    label: '4 · Wellness',
    swatches: ['#F2EEE6', '#1F5447', '#E97C3D', '#E8DDC4'],
  },
  {
    key: 'mono',
    label: '5 · Mono',
    swatches: ['#F5F1E9', '#E04E2B', '#1A1714', '#EFE9DA'],
  },
]

const STORAGE_KEY = 'palette-preview'

export const PaletteSwitcher: React.FC = () => {
  const [active, setActive] = useState<string>('current')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) || 'current'
    setActive(stored)
    document.documentElement.setAttribute('data-palette', stored)
  }, [])

  const select = (key: string) => {
    setActive(key)
    window.localStorage.setItem(STORAGE_KEY, key)
    document.documentElement.setAttribute('data-palette', key)
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] font-sans"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open palette switcher"
          className="flex items-center gap-2 rounded-full bg-black text-white text-xs font-semibold px-4 py-2.5 shadow-lg hover:bg-black/85"
        >
          <span
            className="inline-flex w-3 h-3 rounded-full"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          />
          Palette: {palettes.find((p) => p.key === active)?.label || 'Current'}
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-3 min-w-[260px]">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/60">
              Palettes
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-black/60 hover:text-black text-lg leading-none w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {palettes.map((p) => (
              <li key={p.key}>
                <button
                  type="button"
                  onClick={() => select(p.key)}
                  className={`w-full flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors ${
                    active === p.key ? 'bg-black/5' : 'hover:bg-black/5'
                  }`}
                >
                  <span className="flex shrink-0">
                    {p.swatches.map((c, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 first:rounded-l-md last:rounded-r-md border-y border-black/5 first:border-l last:border-r"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </span>
                  <span className="text-sm text-black flex-1">{p.label}</span>
                  {active === p.key && (
                    <span className="text-xs font-bold text-black/60">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] text-black/40 px-2">
            Dev preview only. Saved per browser.
          </p>
        </div>
      )}
    </div>
  )
}
