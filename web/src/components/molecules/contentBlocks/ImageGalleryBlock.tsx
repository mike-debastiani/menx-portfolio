import Image from 'next/image'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import { urlForImage } from '@/lib/sanity.client'
import { stegaClean } from '@sanity/client/stega'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'

export interface GalleryImage {
  image?: any
  alt?: string
  caption?: string
}

export interface ImageGalleryBlockProps {
  _key: string
  images?: GalleryImage[]
  layout?: string
  gridPlacement?: GridPlacement | string
}

export default function ImageGalleryBlock({ images, layout, gridPlacement }: ImageGalleryBlockProps) {
  if (!images || images.length === 0) {
    return null
  }

  const cleanLayout = stegaClean(layout) || 'grid'
  const placementProps = getGridPlacementProps(gridPlacement)

  if (cleanLayout === 'carousel') {
    // Simple carousel implementation - you might want to use a library like Swiper for production
    return (
      <section className="py-8 md:py-12 xl:py-16">
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

  if (cleanLayout === 'masonry') {
    // Simple masonry layout using CSS columns
    return (
      <section className="py-8 md:py-12 xl:py-16">
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
    <section className="py-8 md:py-12 xl:py-16">
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
