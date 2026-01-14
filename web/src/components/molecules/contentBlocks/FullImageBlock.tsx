import Image from 'next/image'
import Container from '@/components/layout/Container'
import { urlForImage } from '@/lib/sanity.client'

export interface FullImageBlockProps {
  _key: string
  image?: any
  alt?: string
  caption?: string
}

export default function FullImageBlock({ image, alt, caption }: FullImageBlockProps) {
  if (!image) {
    return null
  }

  const imageUrl = urlForImage(image, {
    width: 1920,
    quality: 90,
    auto: 'format',
  })

  if (!imageUrl) {
    return null
  }

  return (
    <section className="py-8 md:py-12 xl:py-16">
      <Container>
        <figure className="w-full">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={alt || caption || 'Case Study Image'}
              width={1920}
              height={1080}
              className="h-auto w-full object-cover"
              priority={false}
            />
          </div>
          {caption && (
            <figcaption className="mt-4 text-sm text-primary-600">{caption}</figcaption>
          )}
        </figure>
      </Container>
    </section>
  )
}
