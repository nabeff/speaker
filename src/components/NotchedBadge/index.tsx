import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

/**
 * Badge nestled into the top-right corner of an image. The image's top-right
 * corner curves INWARD around the badge zone. Uses the box-shadow corner
 * trick — no SVG, no masks, no measurement.
 *
 * USAGE
 * -----
 * Wrap the image in a parent that has these classes / props:
 *   <div className="notched-image-wrapper relative overflow-hidden rounded-2xl"
 *        style={{ borderTopRightRadius: 0 }}>
 *     <Media ... />
 *     <NotchedBadge>Teen Mental Health</NotchedBadge>
 *   </div>
 *
 * The wrapper's `border-top-right-radius` MUST be 0 so the badge zone can
 * sit flush at that corner.
 */
export const NotchedBadge: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`absolute top-0 right-0 z-[3] ${className ?? ''}`} aria-hidden={false}>
      {/* The icon plate — auto width sized to its child pill, fixed height. */}
      <div
        className="relative inline-block h-[3rem] pl-3 pr-3 py-1.5"
        style={{ backgroundColor: 'var(--brand-bg)', borderBottomLeftRadius: '1.5rem' }}
      >
        {/* Concave joint to the LEFT of the plate, sitting against the
            image's top edge. The rounded TOP-RIGHT corner of this joint is
            what carves the curve into the image; the box-shadow paints page-bg
            UP & RIGHT to fill the wedge above the curve. */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            top: 0,
            left: '-1.25rem',
            width: '1.25rem',
            height: '1.25rem',
            background: 'transparent',
            borderTopRightRadius: '1.25rem',
            boxShadow: '0.313rem -0.313rem 0 0.313rem var(--brand-bg)',
          }}
        />

        {/* Concave joint BELOW the plate, sitting against the image's right
            edge. Rounded TOP-RIGHT corner carves the curve into the image;
            box-shadow paints page-bg UP & RIGHT to fill the wedge above. */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            bottom: '-1.25rem',
            right: 0,
            width: '1.25rem',
            height: '1.25rem',
            background: 'transparent',
            borderTopRightRadius: '1.25rem',
            boxShadow: '0.313rem -0.313rem 0 0.313rem var(--brand-bg)',
          }}
        />

        {/* Badge pill — inline so the plate sizes to its content. */}
        <span
          className="relative inline-flex items-center justify-center h-full bg-[var(--brand-badge)] text-[var(--brand-badge-text)] text-xs font-medium px-3 rounded-full whitespace-nowrap"
        >
          {children}
        </span>
      </div>
    </div>
  )
}
