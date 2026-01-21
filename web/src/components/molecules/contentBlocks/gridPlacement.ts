import type { CSSProperties } from 'react'
import { stegaClean } from '@sanity/client/stega'

export interface GridPlacementRange {
  start?: number
  end?: number
}

export interface GridPlacement {
  mobile?: GridPlacementRange
  tablet?: GridPlacementRange
  desktop?: GridPlacementRange
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const normalizeRange = (
  range: GridPlacementRange | undefined,
  columns: number,
  fallback: GridPlacementRange,
) => {
  const startRaw = range?.start ?? fallback.start ?? 1
  const endRaw = range?.end ?? fallback.end ?? columns
  const start = clamp(startRaw, 1, columns)
  const end = clamp(endRaw, 1, columns)
  return start <= end ? { start, end } : { start, end: start }
}

const legacyToRange = (value: string, columns: number): GridPlacementRange => {
  switch (value) {
    case 'left':
      return columns === 6 ? { start: 1, end: 3 } : columns === 12 ? { start: 1, end: 5 } : { start: 1, end: 4 }
    case 'center':
      return columns === 6 ? { start: 2, end: 5 } : columns === 12 ? { start: 4, end: 9 } : { start: 1, end: 4 }
    case 'right':
      return columns === 6 ? { start: 4, end: 6 } : columns === 12 ? { start: 8, end: 12 } : { start: 1, end: 4 }
    case 'full':
    default:
      return { start: 1, end: columns }
  }
}

const normalizePlacement = (placement?: GridPlacement | string) => {
  if (!placement) {
    return {
      mobile: { start: 1, end: 4 },
      tablet: { start: 1, end: 6 },
      desktop: { start: 1, end: 12 },
    }
  }

  if (typeof placement === 'string') {
    const clean = stegaClean(placement) || 'full'
    return {
      mobile: legacyToRange(clean, 4),
      tablet: legacyToRange(clean, 6),
      desktop: legacyToRange(clean, 12),
    }
  }

  const mobile = normalizeRange(placement.mobile, 4, { start: 1, end: 4 })
  const tablet = normalizeRange(placement.tablet, 6, mobile)
  const desktop = normalizeRange(placement.desktop, 12, tablet)

  return { mobile, tablet, desktop }
}

export const getGridPlacementProps = (placement?: GridPlacement | string) => {
  const normalized = normalizePlacement(placement)

  const style: CSSProperties & Record<string, string | number> = {
    '--gp-start': normalized.mobile.start ?? 1,
    '--gp-end': (normalized.mobile.end ?? 4) + 1,
    '--gp-md-start': normalized.tablet.start ?? 1,
    '--gp-md-end': (normalized.tablet.end ?? 6) + 1,
    '--gp-xl-start': normalized.desktop.start ?? 1,
    '--gp-xl-end': (normalized.desktop.end ?? 12) + 1,
  }

  return {
    className: 'case-block-placement',
    style,
  }
}

export const getGridPlacementSizes = (placement?: GridPlacement | string) => {
  const normalized = normalizePlacement(placement)

  const spanMobile = (normalized.mobile.end ?? 4) - (normalized.mobile.start ?? 1) + 1
  const spanTablet = (normalized.tablet.end ?? 6) - (normalized.tablet.start ?? 1) + 1
  const spanDesktop = (normalized.desktop.end ?? 12) - (normalized.desktop.start ?? 1) + 1

  const vwMobile = Math.min(100, Math.round((spanMobile / 4) * 100))
  const vwTablet = Math.min(100, Math.round((spanTablet / 6) * 100))
  const vwDesktop = Math.min(100, Math.round((spanDesktop / 12) * 100))

  // lg breakpoint in this project is 1200px (see globals.css)
  return `(min-width: 1200px) ${vwDesktop}vw, (min-width: 768px) ${vwTablet}vw, ${vwMobile}vw`
}
