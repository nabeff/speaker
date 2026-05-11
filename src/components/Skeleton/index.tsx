import React from 'react'
import { cn } from '@/utilities/ui'

type SkeletonProps = {
  className?: string
  style?: React.CSSProperties
  rounded?: boolean
}

// Reusable shimmer block. Uses a CSS animation defined in globals.css so the
// shimmer stays in sync across all skeletons on the page.
export const Skeleton: React.FC<SkeletonProps> = ({ className, style, rounded = true }) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block bg-black/[0.06] relative overflow-hidden',
        'after:absolute after:inset-0 after:-translate-x-full after:animate-[skeleton-shimmer_1.6s_ease-in-out_infinite]',
        "after:bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.04),transparent)]",
        rounded && 'rounded-md',
        className,
      )}
      style={style}
    />
  )
}
