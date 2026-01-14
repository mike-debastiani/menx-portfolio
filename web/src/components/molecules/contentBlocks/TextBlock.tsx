import Container from '@/components/layout/Container'
import PortableText from '@/components/atoms/PortableText'
import { stegaClean } from '@sanity/client/stega'
import type { PortableTextBlock } from '@portabletext/types'

export interface TextBlockProps {
  _key: string
  content?: PortableTextBlock[]
  alignment?: string
  maxWidth?: string
}

export default function TextBlock({ content, alignment, maxWidth }: TextBlockProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null
  }

  const cleanAlignment = stegaClean(alignment) || 'left'
  const cleanMaxWidth = stegaClean(maxWidth) || 'medium'

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const maxWidthClasses = {
    full: 'max-w-full',
    narrow: 'max-w-[65ch]',
    medium: 'max-w-[80ch]',
    wide: 'max-w-[100ch]',
  }

  return (
    <section className="py-8 md:py-12 xl:py-16">
      <Container>
        <div
          className={`mx-auto ${maxWidthClasses[cleanMaxWidth as keyof typeof maxWidthClasses] || maxWidthClasses.medium} ${alignmentClasses[cleanAlignment as keyof typeof alignmentClasses] || alignmentClasses.left}`}
        >
          <PortableText content={content} />
        </div>
      </Container>
    </section>
  )
}
