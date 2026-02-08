import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { PortableTextBlock } from '@portabletext/types'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import { urlForImage } from '@/lib/sanity.client'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

export interface CardsBlockCard {
  _key?: string
  image?: any
  alt?: string
  content?: PortableTextBlock[]
}

export interface CardsPerRow {
  base?: number
  md?: number
  xl?: number
}

export interface CardsBlockProps {
  _key: string
  title?: PortableTextBlock[]
  cards?: CardsBlockCard[]
  cardsPerRow?: CardsPerRow
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

const DEFAULT_COLUMNS = { base: 1, md: 2, xl: 3 }
const MIN_CARD_WIDTH = { base: 220, md: 240, xl: 260 }

const clampColumns = (value: number | undefined) => {
  if (!value) return undefined
  return Math.min(Math.max(value, 1), 4)
}

const hasPortableText = (content?: PortableTextBlock[]) => {
  if (!content || !Array.isArray(content) || content.length === 0) return false
  return content.some((block: any) =>
    block?._type === 'block' && Array.isArray(block.children)
      ? block.children.some((child: any) => typeof child?.text === 'string' && child.text.trim().length > 0)
      : false,
  )
}

export default function CardsBlock({
  title,
  cards,
  cardsPerRow,
  padding,
  gridPlacement,
}: CardsBlockProps) {
  if (!cards || cards.length === 0) {
    return null
  }

  const paddingClasses = getBlockPaddingClasses(padding)
  const placementProps = getGridPlacementProps(gridPlacement)
  const baseCols = clampColumns(cardsPerRow?.base) ?? DEFAULT_COLUMNS.base
  const mdCols = clampColumns(cardsPerRow?.md) ?? DEFAULT_COLUMNS.md
  const xlCols = clampColumns(cardsPerRow?.xl) ?? DEFAULT_COLUMNS.xl

  const gridVars: CSSProperties & Record<string, string | number> = {
    '--cards-cols': baseCols,
    '--cards-cols-md': mdCols,
    '--cards-cols-xl': xlCols,
    '--cards-min': `${MIN_CARD_WIDTH.base}px`,
    '--cards-min-md': `${MIN_CARD_WIDTH.md}px`,
    '--cards-min-xl': `${MIN_CARD_WIDTH.xl}px`,
  }

  const sizes = `(min-width: 1200px) ${Math.round(100 / xlCols)}vw, (min-width: 768px) ${Math.round(
    100 / mdCols,
  )}vw, ${Math.round(100 / baseCols)}vw`

  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            {hasPortableText(title) && (
              <ScrollReveal className="mb-6">
                <PortableText content={title as PortableTextBlock[]} />
              </ScrollReveal>
            )}
            <div className="cards-grid" style={gridVars}>
              {cards.map((card, index) => {
                const imageUrl = card.image
                  ? urlForImage(card.image, {
                      width: 1600,
                      quality: 92,
                      auto: 'format',
                    })
                  : null

                if (!imageUrl) return null

                return (
                  <ScrollReveal
                    as="article"
                    key={card._key || `cards-block-card-${index}`}
                    className="cards-grid-item"
                    delay={index * 80}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px]">
                      <Image
                        src={imageUrl}
                        alt={card.alt || 'Card image'}
                        fill
                        className="object-cover"
                        sizes={sizes}
                        quality={90}
                      />
                    </div>
                    {hasPortableText(card.content) && (
                      <div className="mt-3 px-2">
                        <PortableText content={card.content as PortableTextBlock[]} />
                      </div>
                    )}
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
