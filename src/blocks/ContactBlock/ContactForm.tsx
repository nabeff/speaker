'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

import RichText from '@/components/RichText'
import { getClientSideURL } from '@/utilities/getURL'

type FormField = {
  id?: string
  blockType: string
  blockName?: string
  name: string
  label?: string
  required?: boolean
  width?: number
  defaultValue?: string | boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

type FormDoc = {
  id: string
  fields?: FormField[] | null
  submitButtonLabel?: string
  confirmationType?: 'message' | 'redirect'
  confirmationMessage?: unknown
  redirect?: { url?: string } | null
}

type Props = {
  form: FormDoc
}

export const ContactForm: React.FC<Props> = ({ form }) => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const init: Record<string, string | boolean> = {}
    form.fields?.forEach((f) => {
      if (f.blockType === 'checkbox') init[f.name] = Boolean(f.defaultValue)
      else if (typeof f.defaultValue === 'string') init[f.name] = f.defaultValue
    })
    return init
  })

  const setField = (name: string, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [name]: value }))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    try {
      const submissionData = (form.fields || []).map((f) => ({
        field: f.name,
        value: values[f.name] ?? '',
      }))

      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data?.errors?.[0]?.message || data?.message || 'Submission failed. Please try again.',
        )
      }

      if (form.confirmationType === 'redirect' && form.redirect?.url) {
        router.push(form.redirect.url)
        return
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted && form.confirmationType !== 'redirect') {
    return (
      <div className="rounded-2xl bg-[var(--brand-decor-2)]/60 p-8">
        <h3 className="text-xl font-bold text-black">Thank you</h3>
        {form.confirmationMessage ? (
          <RichText
            className="mt-2 text-sm text-black/70 leading-relaxed [&_a]:underline [&_a]:text-black"
            data={form.confirmationMessage as never}
            enableGutter={false}
          />
        ) : (
          <p className="mt-2 text-sm text-black/70">We'll be in touch soon.</p>
        )}
      </div>
    )
  }

  const fields = form.fields || []

  return (
    <form className="grid grid-cols-2 gap-x-8 gap-y-6" onSubmit={onSubmit} noValidate>
      {fields.map((f) => {
        const widthPct = f.width || 100
        const colSpan = widthPct >= 100 ? 'col-span-2' : 'col-span-2 md:col-span-1'
        if (f.blockType === 'message') return null
        if (f.blockType === 'checkbox') {
          return (
            <label key={f.id || f.name} className={`${colSpan} flex items-center gap-3`}>
              <input
                type="checkbox"
                checked={Boolean(values[f.name])}
                onChange={(e) => setField(f.name, e.target.checked)}
                required={f.required}
                className="w-4 h-4 accent-[var(--brand-primary)]"
              />
              <span className="text-sm text-black/80">
                {f.label}
                {f.required && <span className="text-[var(--brand-primary)]"> *</span>}
              </span>
            </label>
          )
        }
        return (
          <FieldShell key={f.id || f.name} label={f.label} required={f.required} colSpan={colSpan}>
            {renderInput(f, values, setField)}
          </FieldShell>
        )
      })}

      {error && <p className="col-span-2 text-sm text-red-600 -mt-2">{error}</p>}

      <div className="col-span-2 mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] text-white px-7 py-3 text-sm font-semibold hover:bg-[var(--brand-primary)]/90 disabled:opacity-60 transition-colors"
        >
          {submitting ? 'Sending…' : form.submitButtonLabel || "Let's Get Started"}
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  )
}

const inputClass =
  'w-full bg-transparent border-0 border-b border-black/15 focus:border-[var(--brand-primary)] focus:outline-none text-sm md:text-base text-black py-3 px-0 placeholder:text-black/35 transition-colors'

const renderInput = (
  f: FormField,
  values: Record<string, string | boolean>,
  setField: (name: string, value: string | boolean) => void,
) => {
  const value = (values[f.name] as string) ?? ''
  const placeholder = f.placeholder || f.label || ''

  if (f.blockType === 'select') {
    return (
      <CustomSelect
        name={f.name}
        value={value}
        onChange={(v) => setField(f.name, v)}
        options={f.options || []}
        placeholder={placeholder || 'Make a selection'}
        required={f.required}
      />
    )
  }
  if (f.blockType === 'textarea') {
    return (
      <textarea
        name={f.name}
        required={f.required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setField(f.name, e.target.value)}
        rows={4}
        className={`${inputClass} min-h-[100px] resize-y`}
      />
    )
  }
  const type = f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'number' : 'text'
  return (
    <input
      type={type}
      name={f.name}
      required={f.required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setField(f.name, e.target.value)}
      className={inputClass}
    />
  )
}

type CustomSelectProps = {
  name: string
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
  placeholder: string
  required?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      {/* Hidden input to keep native required validation working */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        required={required}
        value={value}
        onChange={() => {}}
        className="absolute inset-0 opacity-0 pointer-events-none"
        name={name}
      />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex items-center justify-between text-left appearance-none pr-8`}
      >
        <span className={selected ? 'text-black' : 'text-black/35'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-primary)] transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 left-0 right-0 mt-2 bg-white shadow-lg border border-black/5 overflow-hidden max-h-64 overflow-y-auto"
        >
          {options.map((opt, i) => {
            const isActive = opt.value === value
            return (
              <li
                key={opt.value}
                className={i < options.length - 1 ? 'border-b border-black/10' : ''}
              >
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-[var(--brand-primary)] text-white font-medium'
                      : 'text-black hover:bg-[var(--brand-primary)] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

const FieldShell: React.FC<{
  label?: string
  required?: boolean
  colSpan: string
  children: React.ReactNode
}> = ({ label, required, colSpan, children }) => (
  <label className={`block ${colSpan}`}>
    {label && (
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
        {label}
        {required && <span className="text-[var(--brand-primary)]"> *</span>}
      </span>
    )}
    <div className="mt-3">{children}</div>
  </label>
)
