import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export interface PortableTextProps {
  content: PortableTextBlock[]
  className?: string
}

export default function PortableText({ content, className = '' }: PortableTextProps) {
  if (!content || !Array.isArray(content)) {
    return null
  }

  const isEmptyChildren = (children: any) => {
    if (!children) return true
    if (typeof children === 'string') return children.trim().length === 0
    if (Array.isArray(children)) {
      return children.every((child) => {
        if (typeof child === 'string') return child.trim().length === 0
        if (child === null || child === undefined || child === false) return true
        return false
      })
    }
    return false
  }

  return (
    <div className={className}>
      <SanityPortableText
        value={content}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-2.5 text-base leading-[1.5] text-primary-950">
                {isEmptyChildren(children) ? '\u00A0' : children}
              </p>
            ),
            h1: ({ children }) => <h1 className="mb-4 text-4xl font-medium text-primary-950">{children}</h1>,
            h2: ({ children }) => <h2 className="mb-2 text-3xl font-medium text-primary-950">{children}</h2>,
            h3: ({ children }) => <h3 className="mb-2 text-2xl font-medium text-primary-950">{children}</h3>,
            h4: ({ children }) => <h4 className="mb-2 text-xl font-medium text-primary-950">{children}</h4>,
            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-4 border-primary-300 pl-4 italic text-primary-700">
                {children}
              </blockquote>
            ),
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            fontSans: ({ children }) => <span className="font-sans">{children}</span>,
            fontMono: ({ children }) => <span className="font-mono">{children}</span>,
            weightRegular: ({ children }) => <span className="font-normal">{children}</span>,
            weightMedium: ({ children }) => <span className="font-medium">{children}</span>,
            weightBold: ({ children }) => <span className="font-bold">{children}</span>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="rounded bg-primary-100 px-1 py-0.5 font-mono text-sm text-primary-800">
                {children}
              </code>
            ),
            textColor: ({ children, value }) => (
              <span
                className={value?.color || undefined}
                style={value?.customColor ? { color: value.customColor } : undefined}
              >
                {children}
              </span>
            ),
            textFont: ({ children, value }) => (
              <span className={value?.font || undefined}>{children}</span>
            ),
            textWeight: ({ children, value }) => (
              <span className={value?.weight || undefined}>{children}</span>
            ),
            link: ({ children, value }) => {
              const href = value?.href || '#'
              return (
                <a
                  href={href}
                  className="text-primary-600 underline hover:text-primary-800"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              )
            },
          },
          list: {
            bullet: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
            number: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }) => <li className="text-base leading-relaxed text-primary-950">{children}</li>,
            number: ({ children }) => <li className="text-base leading-relaxed text-primary-950">{children}</li>,
          },
        }}
      />
    </div>
  )
}
