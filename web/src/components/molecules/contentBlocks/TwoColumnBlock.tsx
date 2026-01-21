import Image from 'next/image'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import { urlForImage } from '@/lib/sanity.client'
import { stegaClean } from '@sanity/client/stega'
import type { PortableTextBlock } from '@portabletext/types'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'

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
  columnRatio?: string
  gridPlacement?: GridPlacement | string
}

export default function TwoColumnBlock({ leftColumn, rightColumn, columnRatio, gridPlacement }: TwoColumnBlockProps) {
  const cleanRatio = stegaClean(columnRatio) || '50-50'

  // Map ratio to flex widths
  const ratioMap: Record<string, { left: string; right: string }> = {
    '50-50': { left: '50%', right: '50%' },
    '40-60': { left: '40%', right: '60%' },
    '60-40': { left: '60%', right: '40%' },
    '33-67': { left: '33.33%', right: '66.67%' },
    '67-33': { left: '66.67%', right: '33.33%' },
  }

  const widths = ratioMap[cleanRatio] || ratioMap['50-50']
  const placementProps = getGridPlacementProps(gridPlacement)

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
    <section className="py-8 md:py-12 xl:py-16">
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-auto" style={{ flex: `0 0 ${widths.left}` }}>
                {renderColumn(leftColumn)}
              </div>
              <div className="w-full md:w-auto" style={{ flex: `0 0 ${widths.right}` }}>
                {renderColumn(rightColumn)}
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
