import Image from 'next/image'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import { urlForImage } from '@/lib/sanity.client'
import { getGridPlacementProps, getGridPlacementSizes, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

export interface FullImageBlockProps {
  _key: string
  image?: any
  alt?: string
  caption?: string
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export default function FullImageBlock({ image, alt, caption, padding, gridPlacement }: FullImageBlockProps) {
  if (!image) {
    return null
  }

  const dimensions = image?.assetMetadata?.dimensions
  const intrinsicWidth = dimensions?.width ?? 1920
  const intrinsicHeight = dimensions?.height ?? 1080
  const requestedWidth = Math.min(intrinsicWidth, 4800)

  const imageUrl = urlForImage(image, {
    // Higher source pixels for desktop/retina
    width: requestedWidth,
    fit: 'max',
    quality: 95,
    auto: 'format',
  })

  if (!imageUrl) {
    return null
  }

  const placementProps = getGridPlacementProps(gridPlacement)
  const paddingClasses = getBlockPaddingClasses(padding)

  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <figure className={`${placementProps.className} w-full`} style={placementProps.style}>
            <div className="relative w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={alt || caption || 'Case Study Image'}
                width={intrinsicWidth}
                height={intrinsicHeight}
                className="h-auto w-full object-cover"
                sizes={getGridPlacementSizes(gridPlacement)}
                unoptimized
                priority={false}
              />
            </div>
            {caption && (
              <figcaption className="mt-4 text-sm text-primary-600">{caption}</figcaption>
            )}
          </figure>
        </Grid>
      </Container>
    </section>
  )
}
