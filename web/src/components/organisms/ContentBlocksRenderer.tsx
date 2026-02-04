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
}

export default function ContentBlocksRenderer({ blocks }: ContentBlocksRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        // Always use _key for React keys (critical for Visual Editing)
        const key = block._key || `block-${Math.random()}`

        switch (block._type) {
          case 'cardsBlock':
            return <CardsBlock key={key} {...block} />
          case 'fullImage':
            return <FullImageBlock key={key} {...block} />
          case 'imageGallery':
            return <ImageGalleryBlock key={key} {...block} />
          case 'sectionBlock':
            return <SectionBlock key={key} {...block} />
          case 'sectionBlockText':
          case 'sectionBlockColumns':
          case 'sectionBlockRows':
          case 'sectionBlockDetailedRows':
          case 'sectionBlockAccordion':
          case 'sectionBlockImage':
            return <SectionBlockContentBlock key={key} {...block} />
          case 'textBlock':
            return <TextBlock key={key} {...block} />
          case 'twoColumn':
            return <TwoColumnBlock key={key} {...block} />
          case 'twoColumnLayout':
            return <TwoColumnLayoutBlock key={key} {...block} />
          case 'video':
            return <VideoBlock key={key} {...block} />
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
