import Image from 'next/image'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import { urlForImage } from '@/lib/sanity.client'
import { stegaClean } from '@sanity/client/stega'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

export interface GalleryImage {
  image?: any
  alt?: string
  caption?: string
}

export interface ImageGalleryBlockProps {
  _key: string
  images?: GalleryImage[]
  layout?: string
  bentoLayout?: string
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

const bentoPatterns: Record<string, string[]> = {
  'bento-a': [
    'md:col-span-4 md:row-span-2',
    'md:col-span-2 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-3 md:row-span-1',
    'md:col-span-3 md:row-span-1',
  ],
  'bento-b': [
    'md:col-span-3 md:row-span-2',
    'md:col-span-3 md:row-span-2',
    'md:col-span-2 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-2 md:row-span-1',
  ],
  'bento-c': [
    'md:col-span-6 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-3 md:row-span-1',
    'md:col-span-3 md:row-span-1',
  ],
}

const defaultBentoClass = 'md:col-span-2 md:row-span-1'

function getBentoItemClass(layout: string, index: number) {
  const pattern = bentoPatterns[layout]
  if (!pattern) return defaultBentoClass
  return pattern[index] ?? defaultBentoClass
}

export default function ImageGalleryBlock({
  images,
  layout,
  bentoLayout,
  padding,
  gridPlacement,
}: ImageGalleryBlockProps) {
  if (!images || images.length === 0) {
    return null
  }

  const cleanLayout = stegaClean(layout) || 'grid'
  const cleanBentoLayout = stegaClean(bentoLayout) || 'bento-a'
  const placementProps = getGridPlacementProps(gridPlacement)
  const paddingClasses = getBlockPaddingClasses(padding)

  if (cleanLayout === 'carousel') {
    // Simple carousel implementation - you might want to use a library like Swiper for production
    return (
      <section className={paddingClasses}>
        <Container>
          <Grid>
            <div className={placementProps.className} style={placementProps.style}>
              <div className="w-full overflow-x-auto">
                <div className="flex gap-4">
                  {images.map((item, index) => {
                    const imageUrl = item.image
                      ? urlForImage(item.image, {
                          width: 2200,
                          quality: 92,
                          auto: 'format',
                        })
                      : null

                    if (!imageUrl) return null

                    return (
                      <figure key={index} className="min-w-[80%] flex-shrink-0 md:min-w-[60%] xl:min-w-[40%]">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                          <Image
                            src={imageUrl}
                            alt={item.alt || item.caption || `Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1200px) 40vw, (min-width: 768px) 60vw, 80vw"
                            quality={90}
                          />
                        </div>
                        {item.caption && (
                          <figcaption className="mt-2 text-sm text-primary-600">{item.caption}</figcaption>
                        )}
                      </figure>
                    )
                  })}
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </section>
    )
  }

  if (cleanLayout === 'bento') {
    return (
      <section className={paddingClasses}>
        <Container>
          <Grid>
            <div className={placementProps.className} style={placementProps.style}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[140px] xl:auto-rows-[160px]">
                {images.map((item, index) => {
                  const imageUrl = item.image
                    ? urlForImage(item.image, {
                        width: 2200,
                        quality: 92,
                        auto: 'format',
                      })
                    : null

                  if (!imageUrl) return null

                  const bentoClass = getBentoItemClass(cleanBentoLayout, index)

                  return (
                    <figure key={index} className={`w-full ${bentoClass}`}>
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-auto md:h-full">
                        <Image
                          src={imageUrl}
                          alt={item.alt || item.caption || `Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                          quality={90}
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="mt-2 text-sm text-primary-600">{item.caption}</figcaption>
                      )}
                    </figure>
                  )
                })}
              </div>
            </div>
          </Grid>
        </Container>
      </section>
    )
  }

  if (cleanLayout === 'masonry') {
    // Simple masonry layout using CSS columns
    return (
      <section className={paddingClasses}>
        <Container>
          <Grid>
            <div className={placementProps.className} style={placementProps.style}>
              <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
                {images.map((item, index) => {
                  const imageUrl = item.image
                    ? urlForImage(item.image, {
                        width: 1800,
                        quality: 92,
                        auto: 'format',
                      })
                    : null

                  if (!imageUrl) return null

                  return (
                    <figure key={index} className="mb-4 break-inside-avoid">
                      <div className="relative w-full overflow-hidden rounded-lg">
                        <Image
                          src={imageUrl}
                          alt={item.alt || item.caption || `Gallery image ${index + 1}`}
                          width={800}
                          height={600}
                          className="h-auto w-full object-cover"
                          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                          quality={90}
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="mt-2 text-sm text-primary-600">{item.caption}</figcaption>
                      )}
                    </figure>
                  )
                })}
              </div>
            </div>
          </Grid>
        </Container>
      </section>
    )
  }

  // Default: Grid layout
  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {images.map((item, index) => {
                const imageUrl = item.image
                  ? urlForImage(item.image, {
                      width: 1800,
                      quality: 92,
                      auto: 'format',
                    })
                  : null

                if (!imageUrl) return null

                return (
                  <figure key={index} className="w-full">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={imageUrl}
                        alt={item.alt || item.caption || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                        quality={90}
                      />
                    </div>
                    {item.caption && (
                      <figcaption className="mt-2 text-sm text-primary-600">{item.caption}</figcaption>
                    )}
                  </figure>
                )
              })}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
