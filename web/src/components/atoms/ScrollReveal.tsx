'use client'

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode, Ref } from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib'
import { useScrollReveal } from '@/lib/useScrollReveal'

type ScrollRevealElement = ElementType

export interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  delay?: number
  as?: ScrollRevealElement
  threshold?: number
  rootMargin?: string
  once?: boolean
  forceReveal?: boolean
  style?: CSSProperties
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  as = 'div',
  threshold,
  rootMargin,
  once,
  forceReveal = false,
  style,
  ...rest
}: ScrollRevealProps) {
  const { ref, isRevealed } = useScrollReveal({ threshold, rootMargin, once })
  const Tag = as
  const [forceVisible, setForceVisible] = useState(false)

  useEffect(() => {
    if (!forceReveal) return
    const id = window.requestAnimationFrame(() => {
      setForceVisible(true)
    })
    return () => window.cancelAnimationFrame(id)
  }, [forceReveal])

  const isVisible = forceVisible || isRevealed

  const revealStyle: CSSProperties = {
    ...style,
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={cn('scroll-reveal', isVisible && 'scroll-reveal--visible', forceReveal && 'scroll-reveal--force', className)}
      style={revealStyle}
      data-reveal-force={forceReveal ? 'true' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
