import React from 'react'
import { cn } from '@/utilities/ui'

type BaseProps = {
  className?: string
  color?: string // any CSS color, defaults to var(--brand-decor-2)
  opacity?: number
}

/**
 * Organic blob with asymmetric border-radius — feels hand-drawn.
 * Pass `seed` 0–4 for different blob shapes.
 */
export const Blob: React.FC<BaseProps & { seed?: 0 | 1 | 2 | 3 | 4 }> = ({
  className,
  color = 'var(--brand-decor-2)',
  opacity = 1,
  seed = 0,
}) => {
  const shapes = [
    '60% 40% 30% 70% / 50% 60% 40% 50%',
    '70% 30% 50% 50% / 60% 40% 60% 40%',
    '50% 60% 40% 60% / 70% 40% 60% 30%',
    '40% 60% 70% 30% / 60% 30% 70% 40%',
    '55% 45% 65% 35% / 45% 55% 45% 55%',
  ]
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={{
        backgroundColor: color,
        borderRadius: shapes[seed],
        opacity,
      }}
    />
  )
}

/**
 * Squircle / superellipse-like rounded rect — softer than rounded-2xl.
 */
export const Squircle: React.FC<BaseProps> = ({
  className,
  color = 'var(--brand-decor-1)',
  opacity = 1,
}) => (
  <div
    aria-hidden="true"
    className={cn('pointer-events-none', className)}
    style={{
      backgroundColor: color,
      borderRadius: '40% 40% 40% 40% / 25% 25% 25% 25%',
      opacity,
    }}
  />
)

/**
 * Quarter-circle / arc — only one corner is rounded; others sharp.
 * `corner` picks which corner is the round one.
 */
export const QuarterCircle: React.FC<
  BaseProps & { corner?: 'tl' | 'tr' | 'bl' | 'br' }
> = ({ className, color = 'var(--brand-decor-2)', opacity = 1, corner = 'tl' }) => {
  const radiusMap = {
    tl: '100% 0 0 0',
    tr: '0 100% 0 0',
    bl: '0 0 0 100%',
    br: '0 0 100% 0',
  }
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={{
        backgroundColor: color,
        borderRadius: radiusMap[corner],
        opacity,
      }}
    />
  )
}

/**
 * Wave divider (SVG). Use at section seams.
 * `flip` mirrors vertically so the wave dips up instead of down.
 */
export const WaveDivider: React.FC<{
  color?: string
  className?: string
  flip?: boolean
  height?: number
}> = ({ color = 'var(--brand-soft)', className, flip = false, height = 80 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    className={cn('w-full block pointer-events-none', className)}
    style={{
      height,
      transform: flip ? 'scaleY(-1)' : undefined,
      display: 'block',
    }}
  >
    <path
      d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z"
      fill={color}
    />
  </svg>
)

/**
 * Scallop / cloud bottom edge — softer than wave, more decorative.
 */
export const ScallopDivider: React.FC<{
  color?: string
  className?: string
  flip?: boolean
  height?: number
}> = ({ color = 'var(--brand-soft)', className, flip = false, height = 60 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    className={cn('w-full block pointer-events-none', className)}
    style={{
      height,
      transform: flip ? 'scaleY(-1)' : undefined,
      display: 'block',
    }}
  >
    <path
      d="M0,80 Q120,0 240,80 T480,80 T720,80 T960,80 T1200,80 T1440,80 L1440,120 L0,120 Z"
      fill={color}
    />
  </svg>
)

/**
 * Inverted-radius surface — a card that looks "scooped out" on one corner.
 * Use as a section bg with carved-out corners. `corner` picks which is inverted.
 */
export const InvertedRadiusBox: React.FC<
  BaseProps & { corner?: 'tl' | 'tr' | 'bl' | 'br'; size?: number }
> = ({
  className,
  color = 'var(--brand-soft)',
  opacity = 1,
  corner = 'br',
  size = 80,
}) => {
  // Use a CSS mask-image with radial-gradient to "cut out" a corner
  const positions: Record<typeof corner, string> = {
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right',
  }
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={{
        backgroundColor: color,
        opacity,
        WebkitMask: `radial-gradient(circle ${size}px at ${positions[corner]}, transparent 99%, #000 100%)`,
        mask: `radial-gradient(circle ${size}px at ${positions[corner]}, transparent 99%, #000 100%)`,
      }}
    />
  )
}

/**
 * Half-pill that pokes in from a side.
 * `side` picks which edge: 'left' | 'right' | 'top' | 'bottom'
 */
export const HalfPill: React.FC<BaseProps & { side?: 'left' | 'right' | 'top' | 'bottom' }> = ({
  className,
  color = 'var(--brand-decor-1)',
  opacity = 1,
  side = 'right',
}) => {
  const radiusMap = {
    left: '0 9999px 9999px 0',
    right: '9999px 0 0 9999px',
    top: '0 0 9999px 9999px',
    bottom: '9999px 9999px 0 0',
  }
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={{
        backgroundColor: color,
        borderRadius: radiusMap[side],
        opacity,
      }}
    />
  )
}

/**
 * Wavy divider line — horizontal squiggle to flank section titles.
 * Stretches to fill its container; thicker + curlier than a flat line.
 */
export const WavyLine: React.FC<{
  color?: string
  className?: string
  flip?: boolean
  strokeWidth?: number
}> = ({ color = 'var(--brand-decor-2)', className, flip = false, strokeWidth = 6 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 240 30"
    preserveAspectRatio="none"
    className={cn('block h-5', className)}
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <path
      d="M 0 15 Q 15 -2, 30 15 T 60 15 T 90 15 T 120 15 T 150 15 T 180 15 T 210 15 T 240 15"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Soft-cornered triangle pointing in a direction.
 */
export const Triangle: React.FC<
  BaseProps & { direction?: 'up' | 'down' | 'left' | 'right' }
> = ({ className, color = 'var(--brand-primary)', opacity = 1, direction = 'up' }) => {
  const points: Record<typeof direction, string> = {
    up: '50,8 92,90 8,90',
    down: '8,10 92,10 50,92',
    left: '10,50 90,8 90,92',
    right: '90,50 10,8 10,92',
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={cn('pointer-events-none block', className)}
      style={{ opacity, overflow: 'visible' }}
    >
      <polygon points={points[direction]} fill={color} rx="6" style={{ stroke: color, strokeWidth: 8, strokeLinejoin: 'round' }} />
    </svg>
  )
}

/**
 * Hand-drawn squiggle / wavy line — for an organic accent stroke.
 */
export const Squiggle: React.FC<BaseProps & { strokeWidth?: number }> = ({
  className,
  color = 'var(--brand-primary)',
  opacity = 1,
  strokeWidth = 4,
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 200 30"
    preserveAspectRatio="none"
    className={cn('pointer-events-none block', className)}
    style={{ opacity }}
  >
    <path
      d="M 2 15 Q 25 0, 50 15 T 100 15 T 150 15 T 198 15"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Plus / cross / sparkle accent.
 */
export const Plus: React.FC<BaseProps & { strokeWidth?: number }> = ({
  className,
  color = 'var(--brand-primary)',
  opacity = 1,
  strokeWidth = 8,
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    className={cn('pointer-events-none block', className)}
    style={{ opacity }}
  >
    <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="10" y1="50" x2="90" y2="50" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
)

/**
 * Dotted grid pattern — small cluster of dots for texture.
 */
export const DotGrid: React.FC<BaseProps & { rows?: number; cols?: number }> = ({
  className,
  color = 'var(--brand-primary)',
  opacity = 1,
  rows = 4,
  cols = 4,
}) => {
  const dots: { x: number; y: number }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: c * (100 / (cols - 1 || 1)), y: r * (100 / (rows - 1 || 1)) })
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={cn('pointer-events-none block', className)}
      style={{ opacity }}
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill={color} />
      ))}
    </svg>
  )
}
