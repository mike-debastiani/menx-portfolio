import Image from 'next/image'
import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/types'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import ScrollReveal from '@/components/atoms/ScrollReveal'
import { urlForFile, urlForImage } from '@/lib/sanity.client'
import type { SanityFile } from '@/types/sanity'
import AccordionGroup from '@/components/organisms/AccordionGroup'
import { getBlockPaddingClasses, type BlockPadding } from './padding'
import { getGridPlacementProps, type GridPlacement } from './gridPlacement'

export type SectionBlockText = {
  _key?: string
  _type: 'sectionBlockText'
  content?: PortableTextBlock[]
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockColumns = {
  _key?: string
  _type: 'sectionBlockColumns'
  columns?: Array<{
    title?: string
    items?: string[]
  }>
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockRows = {
  _key?: string
  _type: 'sectionBlockRows'
  rows?: Array<{
    label?: string
    items?: Array<{
      label: string
      href?: string
    }>
  }>
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockImage = {
  _key?: string
  _type: 'sectionBlockImage'
  image?: any
  alt?: string
  caption?: string
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockDetailedRows = {
  _key?: string
  _type: 'sectionBlockDetailedRows'
  title?: PortableTextBlock[]
  rows?: Array<{
    content?: PortableTextBlock[]
  }>
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockAccordion = {
  _key?: string
  _type: 'sectionBlockAccordion'
  items?: Array<{
    title?: PortableTextBlock[]
    content?: PortableTextBlock[]
  }>
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockBuildingView = {
  _key?: string
  _type: 'sectionBlockBuildingView'
  title?: PortableTextBlock[]
  cards?: Array<{
    _key?: string
    backgroundColor?: string
    icon?: SanityFile
    iconAlt?: string
    content?: PortableTextBlock[]
  }>
  padding?: BlockPadding
  gridPlacement?: GridPlacement | string
}

export type SectionBlockContent =
  | SectionBlockText
  | SectionBlockColumns
  | SectionBlockRows
  | SectionBlockImage
  | SectionBlockDetailedRows
  | SectionBlockAccordion
  | SectionBlockBuildingView

const hasPortableText = (content?: PortableTextBlock[]) => {
  if (!content || !Array.isArray(content) || content.length === 0) return false
  return content.some((block: any) =>
    block?._type === 'block' && Array.isArray(block.children)
      ? block.children.some((child: any) => typeof child?.text === 'string' && child.text.trim().length > 0)
      : false,
  )
}

function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function getColumnGridClasses(count: number) {
  if (count <= 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-1 md:grid-cols-2'
  if (count === 3) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
}

export function renderSectionBlockContent(block: SectionBlockContent) {
  switch (block._type) {
    case 'sectionBlockText': {
      if (!block.content || block.content.length === 0) return null
      return (
        <ScrollReveal className="text-block-content [&_p]:!font-sans [&_p]:!text-base [&_p]:!text-primary-500 [&_p]:!leading-[1.5]">
          <PortableText content={block.content} />
        </ScrollReveal>
      )
    }
    case 'sectionBlockColumns': {
      const columns = block.columns ?? []
      if (columns.length === 0) return null
      return (
        <div className={`mb-4 grid ${getColumnGridClasses(columns.length)} gap-x-4 gap-y-10 xl:gap-x-8`}>
          {columns.map((column, columnIndex) => (
            <ScrollReveal
              key={columnIndex}
              delay={columnIndex * 80}
              className="flex flex-col gap-6"
            >
              {column.title && (
                <div className="border-b border-primary-200 pt-0 pb-2" style={{ borderBottomWidth: '0.5px' }}>
                  <div className="font-mono font-normal text-base leading-[1.4] text-primary-400">{column.title}</div>
                </div>
              )}
              <div className="flex flex-col">
                {(column.items ?? []).map((item, itemIndex) => {
                  const isLast = itemIndex === (column.items?.length || 0) - 1
                  return (
                    <span
                      key={itemIndex}
                      className={`font-sans font-medium text-base leading-[1.4] text-primary-950 ${isLast ? '' : 'mb-[9px]'}`}
                    >
                      {item}
                    </span>
                  )
                })}
              </div>
            </ScrollReveal>
          ))}
        </div>
      )
    }
    case 'sectionBlockRows': {
      const rows = block.rows ?? []
      if (rows.length === 0) return null
      return (
        <div className="mb-4">
          <div className="flex flex-col gap-16 max-[449px]:hidden">
            {rows.map((row, rowIndex) => (
              <ScrollReveal
                key={rowIndex}
                delay={rowIndex * 80}
                className="info-rows-row border-t border-primary-200 pt-3 grid grid-cols-2 gap-3 md:gap-6"
                style={{ borderTopWidth: '0.5px' }}
              >
                <div className="info-rows-label font-mono font-normal text-base leading-[1.4] text-primary-400 max-[449px]:!text-base">
                  {row.label}
                </div>
                <div className="flex flex-col">
                  {(row.items ?? []).map((item, itemIndex) => {
                    const isLast = itemIndex === (row.items?.length || 0) - 1
                    const itemClasses = `info-rows-item block font-sans font-medium text-base leading-[1.4] text-primary-950 max-[449px]:!text-base ${
                      isLast ? '' : 'mb-[9px] max-[449px]:mb-[6px]'
                    }`

                    if (item.href) {
                      const isExternal = isExternalUrl(item.href)
                      if (isExternal || item.href.startsWith('mailto:')) {
                        return (
                          <a
                            key={itemIndex}
                            href={item.href}
                            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                            className={`${itemClasses} hover:underline`}
                          >
                            {item.label}
                          </a>
                        )
                      }

                      return (
                        <Link key={itemIndex} href={item.href} className={`${itemClasses} hover:underline`}>
                          {item.label}
                        </Link>
                      )
                    }

                    return (
                      <span key={itemIndex} className={itemClasses}>
                        {item.label}
                      </span>
                    )
                  })}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="hidden max-[449px]:grid grid-cols-[minmax(0,1fr)_max-content] gap-x-3">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                <div className="col-span-2 border-t border-primary-200" style={{ borderTopWidth: '0.5px' }} />
                <div className="info-rows-label min-w-0 pt-3 font-mono font-normal text-base leading-[1.4] text-primary-400 max-[449px]:!text-base">
                  {row.label}
                </div>
                <div className="pt-3 flex flex-col">
                  {(row.items ?? []).map((item, itemIndex) => {
                    const isLast = itemIndex === (row.items?.length || 0) - 1
                    const itemClasses = `info-rows-item block font-sans font-medium text-base leading-[1.4] text-primary-950 max-[449px]:!text-base ${
                      isLast ? '' : 'mb-[9px] max-[449px]:mb-[6px]'
                    }`

                    if (item.href) {
                      const isExternal = isExternalUrl(item.href)
                      if (isExternal || item.href.startsWith('mailto:')) {
                        return (
                          <a
                            key={itemIndex}
                            href={item.href}
                            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                            className={`${itemClasses} hover:underline`}
                          >
                            {item.label}
                          </a>
                        )
                      }

                      return (
                        <Link key={itemIndex} href={item.href} className={`${itemClasses} hover:underline`}>
                          {item.label}
                        </Link>
                      )
                    }

                    return (
                      <span key={itemIndex} className={itemClasses}>
                        {item.label}
                      </span>
                    )
                  })}
                </div>
                {rowIndex < rows.length - 1 && <div className="col-span-2 h-16 md:h-[88px]" aria-hidden="true" />}
              </div>
            ))}
          </ScrollReveal>
        </div>
      )
    }
    case 'sectionBlockImage': {
      if (!block.image) return null
      const imageUrl = urlForImage(block.image, {
        width: 2400,
        fit: 'max',
        quality: 95,
        auto: 'format',
      })
      if (!imageUrl) return null
      return (
        <ScrollReveal as="figure" className="w-full">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={block.alt || block.caption || 'Section Image'}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1200px) 50vw, (min-width: 768px) 66vw, 100vw"
              unoptimized
            />
          </div>
          {block.caption && <figcaption className="mt-4 text-sm text-primary-600">{block.caption}</figcaption>}
        </ScrollReveal>
      )
    }
    case 'sectionBlockDetailedRows': {
      const rows = block.rows ?? []
      if ((!block.title || block.title.length === 0) && rows.length === 0) return null
      return (
        <div className="mb-4 flex flex-col gap-3">
          {block.title && block.title.length > 0 && (
            <ScrollReveal className="[&_*]:!mb-0">
              <PortableText content={block.title} />
            </ScrollReveal>
          )}
          {rows.length > 0 && (
            <div className="flex flex-col gap-3">
              {rows.map((row, rowIndex) => (
                <ScrollReveal
                  key={rowIndex}
                  delay={rowIndex * 80}
                  className="border-t border-primary-200 pt-3"
                  style={{ borderTopWidth: '0.5px' }}
                >
                  {row.content && row.content.length > 0 && <PortableText content={row.content} />}
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      )
    }
    case 'sectionBlockAccordion': {
      const items = block.items ?? []
      if (items.length === 0) return null
      const baseId = block._key || 'section-block-accordion'
      const defaultOpenId = `${baseId}-0`
      return (
        <div className="mb-4">
          <AccordionGroup
            items={items.map((item, itemIndex) => ({
              id: `${baseId}-${itemIndex}`,
              title: item.title && item.title.length > 0 ? (
                <PortableText
                  content={item.title}
                  className="[&_p]:!mb-0 [&_h1]:!mb-0 [&_h2]:!mb-0 [&_h3]:!mb-0 [&_h4]:!mb-0"
                />
              ) : null,
              content: item.content && item.content.length > 0 ? <PortableText content={item.content} /> : null,
            }))}
            defaultOpenId={defaultOpenId}
          />
        </div>
      )
    }
    case 'sectionBlockBuildingView': {
      const cards = block.cards ?? []
      if ((!block.title || block.title.length === 0) && cards.length === 0) return null
      return (
        <div className="flex flex-col gap-4">
          {hasPortableText(block.title) && (
            <ScrollReveal className="[&_*]:!mb-0">
              <PortableText content={block.title as PortableTextBlock[]} />
            </ScrollReveal>
          )}
          {cards.length > 0 && (
            <div className="grid grid-cols-1 gap-3">
              {cards.map((card, cardIndex) => {
                const iconUrl = card.icon ? urlForFile(card.icon) : null
                return (
                  <ScrollReveal
                    as="article"
                    key={card._key || `section-block-building-view-card-${cardIndex}`}
                    className="rounded-lg p-4 xl:p-6"
                    style={{ backgroundColor: card.backgroundColor || undefined }}
                    delay={cardIndex * 80}
                  >
                    <div className="flex items-start gap-4">
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={card.iconAlt || ''}
                          className="h-8 w-8 shrink-0 md:h-10 md:w-10 xl:h-12 xl:w-12"
                          loading="lazy"
                        />
                      )}
                      {hasPortableText(card.content) && (
                        <div className="[&_*]:!mt-0">
                          <PortableText content={card.content as PortableTextBlock[]} />
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          )}
        </div>
      )
    }
    default:
      return null
  }
}

export function SectionBlockContentItem({ block }: { block: SectionBlockContent }) {
  return renderSectionBlockContent(block)
}

export function SectionBlockContentBlock(block: SectionBlockContent) {
  const content = renderSectionBlockContent(block)
  if (!content) return null

  const paddingClasses = getBlockPaddingClasses(block.padding)
  const placementProps = getGridPlacementProps(block.gridPlacement)

  return (
    <section className={paddingClasses}>
      <Container>
        <Grid>
          <div className={placementProps.className} style={placementProps.style}>
            {content}
          </div>
        </Grid>
      </Container>
    </section>
  )
}
