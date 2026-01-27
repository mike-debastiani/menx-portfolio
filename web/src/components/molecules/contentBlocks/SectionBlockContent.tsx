import Image from 'next/image'
import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/types'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import { urlForImage } from '@/lib/sanity.client'
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

export type SectionBlockContent =
  | SectionBlockText
  | SectionBlockColumns
  | SectionBlockRows
  | SectionBlockImage
  | SectionBlockDetailedRows
  | SectionBlockAccordion

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
        <div className="text-block-content [&_p]:!font-sans [&_p]:!text-base [&_p]:!text-primary-500 [&_p]:!leading-[1.5]">
          <PortableText content={block.content} />
        </div>
      )
    }
    case 'sectionBlockColumns': {
      const columns = block.columns ?? []
      if (columns.length === 0) return null
      return (
        <div className={`mb-4 grid ${getColumnGridClasses(columns.length)} gap-x-4 gap-y-10 xl:gap-x-8`}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.title && (
                <div className="border-b border-primary-200 pt-0 pb-2" style={{ borderBottomWidth: '0.5px' }}>
                  <div className="font-mono font-normal text-base leading-[1.4] text-primary-300">{column.title}</div>
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
            </div>
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
              <div
                key={rowIndex}
                className="info-rows-row border-t border-primary-200 pt-3 grid grid-cols-2 gap-3 md:gap-6"
                style={{ borderTopWidth: '0.5px' }}
              >
                <div className="info-rows-label font-mono font-normal text-base leading-[1.4] text-primary-300 max-[449px]:!text-base">
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
              </div>
            ))}
          </div>

          <div className="hidden max-[449px]:grid grid-cols-[minmax(0,1fr)_max-content] gap-x-3">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                <div className="col-span-2 border-t border-primary-200" style={{ borderTopWidth: '0.5px' }} />
                <div className="info-rows-label min-w-0 pt-3 font-mono font-normal text-base leading-[1.4] text-primary-300 max-[449px]:!text-base">
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
          </div>
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
        <figure className="w-full">
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
        </figure>
      )
    }
    case 'sectionBlockDetailedRows': {
      const rows = block.rows ?? []
      if ((!block.title || block.title.length === 0) && rows.length === 0) return null
      return (
        <div className="mb-4 flex flex-col gap-3">
          {block.title && block.title.length > 0 && (
            <div className="[&_*]:!mb-0">
              <PortableText content={block.title} />
            </div>
          )}
          {rows.length > 0 && (
            <div className="flex flex-col gap-3">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="border-t border-primary-200 pt-3"
                  style={{ borderTopWidth: '0.5px' }}
                >
                  {row.content && row.content.length > 0 && <PortableText content={row.content} />}
                </div>
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
          />
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
