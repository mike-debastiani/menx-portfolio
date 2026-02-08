import type { PortableTextBlock } from '@portabletext/types'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import { getBlockPaddingClasses, type BlockPadding } from './padding'
import { SectionBlockContentItem, type SectionBlockContent } from './SectionBlockContent'

export interface SectionBlockProps {
  _key: string
  sectionTitle?: PortableTextBlock[]
  contentBlocks?: SectionBlockContent[]
  padding?: BlockPadding
}

export default function SectionBlock({ sectionTitle, contentBlocks, padding }: SectionBlockProps) {
  if ((!sectionTitle || sectionTitle.length === 0) && (!contentBlocks || contentBlocks.length === 0)) {
    return null
  }

  const paddingClasses = getBlockPaddingClasses(padding)

  return (
    <section className={`${paddingClasses} flex`}>
      <Container className="flex flex-col gap-30">
        <Grid>
          <ScrollReveal className="col-span-4 skills-col-lg mb-6">
            {sectionTitle && sectionTitle.length > 0 && (
              <PortableText content={sectionTitle} />
            )}
          </ScrollReveal>

          <div className="col-span-4 info-col-single">
            {contentBlocks && contentBlocks.length > 0 && (
              <div className="mt-0 flex flex-col gap-6 min-[500px]:gap-8 xl:gap-12">
                {contentBlocks.map((block, index) => (
                  <SectionBlockContentItem
                    key={block._key || `section-block-item-${index}`}
                    block={block}
                  />
                ))}
              </div>
            )}
          </div>
        </Grid>
      </Container>
    </section>
  )
}
