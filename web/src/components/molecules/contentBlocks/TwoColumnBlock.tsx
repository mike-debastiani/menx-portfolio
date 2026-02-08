import Image from 'next/image'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import { urlForImage } from '@/lib/sanity.client'
import { stegaClean } from '@sanity/client/stega'
import type { CSSProperties } from 'react'
import type { PortableTextBlock } from '@portabletext/types'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

export interface ColumnContent {
  type?: string
  text?: PortableTextBlock[]
  image?: any
  imageAlt?: string
}

export interface TwoColumnBlockProps {
  _key: string
  leftColumn?: ColumnContent
  rightColumn?: ColumnContent
  columnColumns?: {
    base?: { left?: number; leftEnd?: number; right?: number; rightEnd?: number }
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

const getColumnRanges = (columnColumns: TwoColumnBlockProps['columnColumns']) => {
  const fallback = {
    base: { left: { start: 1, end: 2 }, right: { start: 3, end: 4 } },
    md: { left: { start: 1, end: 3 }, right: { start: 4, end: 6 } },
    lg: { left: { start: 1, end: 6 }, right: { start: 7, end: 12 } },
  }

  return {
    base: {
      left: ensureRange(
        columnColumns?.base?.left ?? fallback.base.left.start,
        columnColumns?.base?.leftEnd ?? fallback.base.left.end,
        4
      ),
      right: ensureRange(
        columnColumns?.base?.right ?? fallback.base.right.start,
        columnColumns?.base?.rightEnd ?? fallback.base.right.end,
        4
      ),
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

export default function TwoColumnBlock({
  leftColumn,
  rightColumn,
  columnColumns,
  padding,
  gridPlacement,
}: TwoColumnBlockProps) {
  const ranges = getColumnRanges(columnColumns)
  const placementProps = getGridPlacementProps(gridPlacement)
  const paddingClasses = getBlockPaddingClasses(padding)

  const renderColumn = (column: ColumnContent | undefined) => {
    if (!column) return null

    const cleanType = stegaClean(column.type) || 'text'

    if (cleanType === 'image' && column.image) {
      const imageUrl = urlForImage(column.image, {
        // Column images can still be large on desktop/retina
        width: 2000,
        quality: 92,
        auto: 'format',
      })

      if (!imageUrl) return null

      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={column.imageAlt || 'Column image'}
            fill
            className="object-cover"
            sizes="(min-width: 1200px) 50vw, (min-width: 768px) 50vw, 100vw"
            quality={90}
          />
        </div>
      )
    }

    if (cleanType === 'text' && column.text) {
      return <PortableText content={column.text} />
    }

    return null
  }

  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            <div className="layout-grid gap-y-4">
              <ScrollReveal
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
                {renderColumn(leftColumn)}
              </ScrollReveal>
              <ScrollReveal
                className="two-column-span"
                style={buildRangeStyle(
                  ranges.base.right.start,
                  ranges.base.right.end,
                  ranges.md.right.start,
                  ranges.md.right.end,
                  ranges.lg.right.start,
                  ranges.lg.right.end
                )}
                delay={120}
              >
                {renderColumn(rightColumn)}
              </ScrollReveal>
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
