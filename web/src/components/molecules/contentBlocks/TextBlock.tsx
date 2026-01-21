import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import { stegaClean } from '@sanity/client/stega'
import type { PortableTextBlock } from '@portabletext/types'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'

export interface TextBlockProps {
  _key: string
  content?: PortableTextBlock[]
  alignment?: string
  gridPlacement?: GridPlacement | string
}

export default function TextBlock({ content, alignment, gridPlacement }: TextBlockProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null
  }

  const cleanAlignment = stegaClean(alignment) || 'left'
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const placementProps = getGridPlacementProps(gridPlacement)

  return (
    <section className="py-8 md:py-12 xl:py-16">
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            <div
              className={[
                alignmentClasses[cleanAlignment as keyof typeof alignmentClasses] || alignmentClasses.left,
                // Case Study TextBlock paragraphs should be primary-500
                '[&_p]:!text-primary-500',
              ].join(' ')}
            >
              <PortableText content={content} />
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
