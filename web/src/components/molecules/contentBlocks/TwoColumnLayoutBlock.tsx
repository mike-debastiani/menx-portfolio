import type { CSSProperties } from 'react'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'
import { renderSectionBlockContent, type SectionBlockContent } from './SectionBlockContent'

export interface TwoColumnLayoutBlockProps {
  _key: string
  leftBlock?: SectionBlockContent[]
  rightBlock?: SectionBlockContent[]
  columnColumns?: {
    md?: { left?: number; leftEnd?: number; right?: number; rightEnd?: number }
    lg?: { left?: number; leftEnd?: number; right?: number; rightEnd?: number }
  }
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

const clampColumn = (value: number | undefined, max: number, fallback: number) => {
  if (!value || Number.isNaN(value)) return fallback
  return Math.max(1, Math.min(max, value))
}

const ensureRange = (start: number, end: number, maxColumns: number) => {
  const safeStart = clampColumn(start, maxColumns, 1)
  const safeEnd = clampColumn(end, maxColumns, Math.min(maxColumns, safeStart))
  if (safeEnd < safeStart) return { start: safeStart, end: safeStart }
  return { start: safeStart, end: safeEnd }
}

const getColumnRanges = (columnColumns: TwoColumnLayoutBlockProps['columnColumns']) => {
  const fallback = {
    base: { left: { start: 1, end: 4 }, right: { start: 1, end: 4 } },
    md: { left: { start: 1, end: 3 }, right: { start: 4, end: 6 } },
    lg: { left: { start: 1, end: 6 }, right: { start: 7, end: 12 } },
  }

  return {
    base: {
      left: ensureRange(fallback.base.left.start, fallback.base.left.end, 4),
      right: ensureRange(fallback.base.right.start, fallback.base.right.end, 4),
    },
    md: {
      left: ensureRange(
        columnColumns?.md?.left ?? fallback.md.left.start,
        columnColumns?.md?.leftEnd ?? fallback.md.left.end,
        6
      ),
      right: ensureRange(
        columnColumns?.md?.right ?? fallback.md.right.start,
        columnColumns?.md?.rightEnd ?? fallback.md.right.end,
        6
      ),
    },
    lg: {
      left: ensureRange(
        columnColumns?.lg?.left ?? fallback.lg.left.start,
        columnColumns?.lg?.leftEnd ?? fallback.lg.left.end,
        12
      ),
      right: ensureRange(
        columnColumns?.lg?.right ?? fallback.lg.right.start,
        columnColumns?.lg?.rightEnd ?? fallback.lg.right.end,
        12
      ),
    },
  }
}

const buildRangeStyle = (
  baseStart: number,
  baseEnd: number,
  mdStart: number,
  mdEnd: number,
  lgStart: number,
  lgEnd: number
): CSSProperties =>
  ({
    '--tc-start': String(baseStart),
    '--tc-end': String(baseEnd + 1),
    '--tc-md-start': String(mdStart),
    '--tc-md-end': String(mdEnd + 1),
    '--tc-lg-start': String(lgStart),
    '--tc-lg-end': String(lgEnd + 1),
  }) as CSSProperties

export default function TwoColumnLayoutBlock({
  leftBlock,
  rightBlock,
  columnColumns,
  padding,
  gridPlacement,
}: TwoColumnLayoutBlockProps) {
  const leftItem = leftBlock?.[0]
  const rightItem = rightBlock?.[0]
  const leftContent = leftItem ? renderSectionBlockContent(leftItem) : null
  const rightContent = rightItem ? renderSectionBlockContent(rightItem) : null

  if (!leftContent && !rightContent) {
    return null
  }

  const ranges = getColumnRanges(columnColumns)
  const placementProps = getGridPlacementProps(gridPlacement)
  const paddingClasses = getBlockPaddingClasses(padding)

  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            <div className="layout-grid gap-y-4">
              {leftContent && (
                <div
                  className="two-column-span"
                  style={buildRangeStyle(
                    ranges.base.left.start,
                    ranges.base.left.end,
                    ranges.md.left.start,
                    ranges.md.left.end,
                    ranges.lg.left.start,
                    ranges.lg.left.end
                  )}
                >
                  {leftContent}
                </div>
              )}
              {rightContent && (
                <div
                  className="two-column-span"
                  style={buildRangeStyle(
                    ranges.base.right.start,
                    ranges.base.right.end,
                    ranges.md.right.start,
                    ranges.md.right.end,
                    ranges.lg.right.start,
                    ranges.lg.right.end
                  )}
                >
                  {rightContent}
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
