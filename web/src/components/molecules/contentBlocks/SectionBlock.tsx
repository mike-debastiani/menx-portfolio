import Image from 'next/image'
import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/types'
import Container from '@/components/layout/Container'
import Grid from '@/components/layout/Grid'
import PortableText from '@/components/atoms/PortableText'
import { urlForImage } from '@/lib/sanity.client'
import { getBlockPaddingClasses, type BlockPadding } from './padding'

type SectionBlockText = {
  _type: 'sectionBlockText'
  content?: PortableTextBlock[]
}

type SectionBlockColumns = {
  _type: 'sectionBlockColumns'
  columns?: Array<{
    title?: string
    items?: string[]
  }>
}

type SectionBlockRows = {
  _type: 'sectionBlockRows'
  rows?: Array<{
    label?: string
    items?: Array<{
      label: string
      href?: string
    }>
  }>
}

type SectionBlockImage = {
  _type: 'sectionBlockImage'
  image?: any
  alt?: string
  caption?: string
}

type SectionBlockDetailedRows = {
  _type: 'sectionBlockDetailedRows'
  title?: PortableTextBlock[]
  rows?: Array<{
    content?: PortableTextBlock[]
  }>
}

type SectionBlockContent =
  | SectionBlockText
  | SectionBlockColumns
  | SectionBlockRows
  | SectionBlockImage
  | SectionBlockDetailedRows

export interface SectionBlockProps {
  _key: string
  sectionTitle?: PortableTextBlock[]
  contentBlocks?: SectionBlockContent[]
  padding?: BlockPadding
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

function renderContentBlock(block: SectionBlockContent, index: number) {
  switch (block._type) {
    case 'sectionBlockText': {
      if (!block.content || block.content.length === 0) return null
      return (
        <div key={`section-block-text-${index}`} className="text-block-content [&_p]:!font-sans [&_p]:!text-base [&_p]:!text-primary-500 [&_p]:!leading-[1.5]">
          <PortableText content={block.content} />
        </div>
      )
    }
    case 'sectionBlockColumns': {
      const columns = block.columns ?? []
      if (columns.length === 0) return null
      return (
        <div
          key={`section-block-columns-${index}`}
          className={`mb-4 grid ${getColumnGridClasses(columns.length)} gap-x-4 gap-y-10 xl:gap-x-8`}
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.title && (
                <div className="border-b border-primary-200 pt-0 pb-2" style={{ borderBottomWidth: '0.5px' }}>
                  <div className="font-mono font-normal text-base leading-[1.4] text-primary-300">
                    {column.title}
                  </div>
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
        <div key={`section-block-rows-${index}`} className="mb-4">
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
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className={`${itemClasses} hover:underline`}
                        >
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
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className={`${itemClasses} hover:underline`}
                        >
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
                {rowIndex < rows.length - 1 && (
                  <div className="col-span-2 h-16 md:h-[88px]" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    case 'sectionBlockImage': {
      if (!block.image) return null
      const imageUrl = urlForImage(block.image, {
        width: 2000,
        quality: 90,
        auto: 'format',
      })
      if (!imageUrl) return null
      return (
        <figure key={`section-block-image-${index}`} className="w-full">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={block.alt || block.caption || 'Section Image'}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1200px) 50vw, (min-width: 768px) 66vw, 100vw"
              quality={90}
            />
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-sm text-primary-600">{block.caption}</figcaption>
          )}
        </figure>
      )
    }
    case 'sectionBlockDetailedRows': {
      const rows = block.rows ?? []
      if ((!block.title || block.title.length === 0) && rows.length === 0) return null
      return (
        <div key={`section-block-detailed-rows-${index}`} className="mb-4 flex flex-col gap-3">
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
                  {row.content && row.content.length > 0 && (
                    <PortableText content={row.content} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
    default:
      return null
  }
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
          <div className="col-span-4 skills-col-lg mb-6">
            {sectionTitle && sectionTitle.length > 0 && (
              <PortableText content={sectionTitle} />
            )}
          </div>

          <div className="col-span-4 info-col-single">
            {contentBlocks && contentBlocks.length > 0 && (
              <div className="mt-0 flex flex-col gap-6 min-[500px]:gap-8 xl:gap-12">
                {contentBlocks.map((block, index) => renderContentBlock(block, index))}
              </div>
            )}
          </div>
        </Grid>
      </Container>
    </section>
  )
}
