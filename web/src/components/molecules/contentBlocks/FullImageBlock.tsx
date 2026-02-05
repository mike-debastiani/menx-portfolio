import Image from 'next/image'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import { urlForImage } from '@/lib/sanity.client'
import { getGridPlacementProps, getGridPlacementSizes, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

export interface FullImageBlockProps {
  _key: string
  image?: any
  mobileImage?: any
  alt?: string
  caption?: string
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export default function FullImageBlock({
  image,
  mobileImage,
  alt,
  caption,
  padding,
  gridPlacement,
}: FullImageBlockProps) {
  if (!image) {
    return null
  }

  const desktopDimensions = image?.assetMetadata?.dimensions
  const desktopWidth = desktopDimensions?.width ?? 1920
  const desktopHeight = desktopDimensions?.height ?? 1080
  const desktopRequestedWidth = Math.min(desktopWidth, 4800)

  const imageUrl = urlForImage(image, {
    // Higher source pixels for desktop/retina
    width: desktopRequestedWidth,
    fit: 'max',
    quality: 95,
    auto: 'format',
  })

  const hasMobileImage = Boolean(mobileImage)
  const mobileDimensions = mobileImage?.assetMetadata?.dimensions
  const mobileWidth = mobileDimensions?.width ?? desktopWidth
  const mobileHeight = mobileDimensions?.height ?? desktopHeight
  const mobileRequestedWidth = Math.min(mobileWidth, 2400)

  const mobileImageUrl = hasMobileImage
    ? urlForImage(mobileImage, {
        width: mobileRequestedWidth,
        fit: 'max',
        quality: 95,
        auto: 'format',
      })
    : null

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
              {hasMobileImage && mobileImageUrl ? (
                <>
                  <Image
                    src={mobileImageUrl}
                    alt={alt || caption || 'Case Study Image'}
                    width={mobileWidth}
                    height={mobileHeight}
                    className="block h-auto w-full object-cover max-[799px]:block min-[800px]:hidden"
                    sizes="100vw"
                    unoptimized
                    priority={false}
                  />
                  <Image
                    src={imageUrl}
                    alt={alt || caption || 'Case Study Image'}
                    width={desktopWidth}
                    height={desktopHeight}
                    className="hidden h-auto w-full object-cover max-[799px]:hidden min-[800px]:block"
                    sizes={getGridPlacementSizes(gridPlacement)}
                    unoptimized
                    priority={false}
                  />
                </>
              ) : (
                <Image
                  src={imageUrl}
                  alt={alt || caption || 'Case Study Image'}
                  width={desktopWidth}
                  height={desktopHeight}
                  className="h-auto w-full object-cover"
                  sizes={getGridPlacementSizes(gridPlacement)}
                  unoptimized
                  priority={false}
                />
              )}
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
