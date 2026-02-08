import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import { stegaClean } from '@sanity/client/stega'
import type { PortableTextBlock } from '@portabletext/types'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

export interface TextBlockProps {
  _key: string
  content?: PortableTextBlock[]
  alignment?: string
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export default function TextBlock({ content, alignment, padding, gridPlacement }: TextBlockProps) {
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
  const paddingClasses = getBlockPaddingClasses(padding)

  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            <ScrollReveal
              className={[
                alignmentClasses[cleanAlignment as keyof typeof alignmentClasses] || alignmentClasses.left,
                // Case Study TextBlock paragraphs should be primary-500
                '[&_p]:!text-primary-500',
              ].join(' ')}
            >
              <PortableText content={content} />
            </ScrollReveal>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
