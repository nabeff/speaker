export type WavySide = 'top' | 'bottom' | 'left' | 'right'

// Returns an SVG path string for a rectangle with a 3-scallop indent on the
// chosen side and rounded corners elsewhere.
export const wavyMaskSvg = (side: WavySide): string => {
  const W = 400
  const H = 200
  const r = 24 // corner radius
  const a = 16 // scallop depth

  const topStraight = `M ${r} 0 L ${W - r} 0 A ${r} ${r} 0 0 1 ${W} ${r}`
  const rightStraight = `L ${W} ${H - r} A ${r} ${r} 0 0 1 ${W - r} ${H}`
  const bottomStraight = `L ${r} ${H} A ${r} ${r} 0 0 1 0 ${H - r}`
  const leftStraight = `L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`

  const topWave = (() => {
    const segs: string[] = [`M ${r} 0`]
    const startX = r
    const endX = W - r
    const span = endX - startX
    const n = 3
    for (let k = 0; k < n; k++) {
      const x0 = startX + (span * k) / n
      const x1 = startX + (span * (k + 1)) / n
      segs.push(`C ${x0 + (x1 - x0) * 0.25} ${a}, ${x1 - (x1 - x0) * 0.25} ${a}, ${x1} 0`)
    }
    segs.push(`A ${r} ${r} 0 0 1 ${W} ${r}`)
    return segs.join(' ')
  })()
  const bottomWave = (() => {
    const segs: string[] = [`L ${W - r} ${H}`]
    const startX = W - r
    const endX = r
    const span = startX - endX
    const n = 3
    for (let k = 0; k < n; k++) {
      const x0 = startX - (span * k) / n
      const x1 = startX - (span * (k + 1)) / n
      segs.push(`C ${x0 - (x0 - x1) * 0.25} ${H - a}, ${x1 + (x0 - x1) * 0.25} ${H - a}, ${x1} ${H}`)
    }
    segs.push(`A ${r} ${r} 0 0 1 0 ${H - r}`)
    return segs.join(' ')
  })()
  const rightWave = (() => {
    const segs: string[] = [`L ${W} ${r}`]
    const startY = r
    const endY = H - r
    const span = endY - startY
    const n = 3
    for (let k = 0; k < n; k++) {
      const y0 = startY + (span * k) / n
      const y1 = startY + (span * (k + 1)) / n
      segs.push(`C ${W - a} ${y0 + (y1 - y0) * 0.25}, ${W - a} ${y1 - (y1 - y0) * 0.25}, ${W} ${y1}`)
    }
    segs.push(`A ${r} ${r} 0 0 1 ${W - r} ${H}`)
    return segs.join(' ')
  })()
  const leftWave = (() => {
    const segs: string[] = [`L 0 ${H - r}`]
    const startY = H - r
    const endY = r
    const span = startY - endY
    const n = 3
    for (let k = 0; k < n; k++) {
      const y0 = startY - (span * k) / n
      const y1 = startY - (span * (k + 1)) / n
      segs.push(`C ${a} ${y0 - (y0 - y1) * 0.25}, ${a} ${y1 + (y0 - y1) * 0.25}, 0 ${y1}`)
    }
    segs.push(`A ${r} ${r} 0 0 1 ${r} 0 Z`)
    return segs.join(' ')
  })()

  let d = ''
  switch (side) {
    case 'top':
      d = `${topWave} ${rightStraight} ${bottomStraight} ${leftStraight}`
      break
    case 'right':
      d = `${topStraight} ${rightWave} ${bottomStraight} ${leftStraight}`
      break
    case 'bottom':
      d = `${topStraight} ${rightStraight} ${bottomWave} ${leftStraight}`
      break
    case 'left':
      d = `${topStraight} ${rightStraight} ${bottomStraight} ${leftWave}`
      break
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}' preserveAspectRatio='none'><path d='${d}' fill='black'/></svg>`
}

export const wavyMaskUrl = (side: WavySide): string =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(wavyMaskSvg(side))}")`

export const wavyMaskStyle = (
  side: WavySide,
): React.CSSProperties & { WebkitMaskImage?: string; WebkitMaskSize?: string; WebkitMaskRepeat?: string } => {
  const url = wavyMaskUrl(side)
  return {
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  }
}

export const WAVY_SIDES: readonly WavySide[] = ['bottom', 'top', 'right', 'left'] as const
