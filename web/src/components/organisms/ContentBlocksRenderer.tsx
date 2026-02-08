import {
  CardsBlock,
  FullImageBlock,
  ImageGalleryBlock,
  SectionBlock,
  SectionBlockContentBlock,
  TextBlock,
  TwoColumnBlock,
  TwoColumnLayoutBlock,
  VideoBlock,
} from '@/components/molecules/contentBlocks'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import type { SectionBlockContent } from '@/components/molecules/contentBlocks/SectionBlockContent'

export type ContentBlock =
  | ({ _type: 'cardsBlock' } & Parameters<typeof CardsBlock>[0])
  | ({ _type: 'fullImage' } & Parameters<typeof FullImageBlock>[0])
  | ({ _type: 'imageGallery' } & Parameters<typeof ImageGalleryBlock>[0])
  | ({ _type: 'sectionBlock' } & Parameters<typeof SectionBlock>[0])
  | SectionBlockContent
  | ({ _type: 'textBlock' } & Parameters<typeof TextBlock>[0])
  | ({ _type: 'twoColumn' } & Parameters<typeof TwoColumnBlock>[0])
  | ({ _type: 'twoColumnLayout' } & Parameters<typeof TwoColumnLayoutBlock>[0])
  | ({ _type: 'video' } & Parameters<typeof VideoBlock>[0])

export interface ContentBlocksRendererProps {
  blocks?: ContentBlock[]
  firstBlockRevealThreshold?: number
  firstBlockRootMargin?: string
  firstBlockAutoReveal?: boolean
}

export default function ContentBlocksRenderer({
  blocks,
  firstBlockRevealThreshold,
  firstBlockRootMargin,
  firstBlockAutoReveal,
}: ContentBlocksRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        // Always use _key for React keys (critical for Visual Editing)
        const key = block._key || `block-${Math.random()}`

        const isFirstBlock = index === 0 && (firstBlockRevealThreshold !== undefined || firstBlockAutoReveal)

        switch (block._type) {
          case 'cardsBlock':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <CardsBlock {...block} />
              </ScrollReveal>
            ) : (
              <CardsBlock key={key} {...block} />
            )
          case 'fullImage':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <FullImageBlock {...block} />
              </ScrollReveal>
            ) : (
              <FullImageBlock key={key} {...block} />
            )
          case 'imageGallery':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <ImageGalleryBlock {...block} />
              </ScrollReveal>
            ) : (
              <ImageGalleryBlock key={key} {...block} />
            )
          case 'sectionBlock':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <SectionBlock {...block} />
              </ScrollReveal>
            ) : (
              <SectionBlock key={key} {...block} />
            )
          case 'sectionBlockText':
          case 'sectionBlockColumns':
          case 'sectionBlockRows':
          case 'sectionBlockDetailedRows':
          case 'sectionBlockAccordion':
          case 'sectionBlockImage':
          case 'sectionBlockBuildingView':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <SectionBlockContentBlock {...block} />
              </ScrollReveal>
            ) : (
              <SectionBlockContentBlock key={key} {...block} />
            )
          case 'textBlock':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <TextBlock {...block} />
              </ScrollReveal>
            ) : (
              <TextBlock key={key} {...block} />
            )
          case 'twoColumn':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <TwoColumnBlock {...block} />
              </ScrollReveal>
            ) : (
              <TwoColumnBlock key={key} {...block} />
            )
          case 'twoColumnLayout':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <TwoColumnLayoutBlock {...block} />
              </ScrollReveal>
            ) : (
              <TwoColumnLayoutBlock key={key} {...block} />
            )
          case 'video':
            return isFirstBlock ? (
              <ScrollReveal
                key={key}
                threshold={firstBlockRevealThreshold}
                rootMargin={firstBlockRootMargin}
                forceReveal={firstBlockAutoReveal}
              >
                <VideoBlock {...block} />
              </ScrollReveal>
            ) : (
              <VideoBlock key={key} {...block} />
            )
          default:
            // TypeScript exhaustive check
            const _exhaustive: never = block
            console.warn(`Unknown block type: ${(block as any)._type}`)
            return null
        }
      })}
    </>
  )
}
