import { useEffect, useRef, useState } from 'react'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal({
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const revealedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      revealedRef.current = true
      setIsRevealed(true)
      return
    }

    const markRevealed = () => {
      if (revealedRef.current) return
      revealedRef.current = true
      setIsRevealed(true)
    }

    const checkVisibility = () => {
      if (revealedRef.current) return
      const rect = node.getBoundingClientRect()
      if (rect.height === 0) return
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
      const visibleRatio = Math.max(0, visibleHeight) / rect.height
      const requiredRatio = Math.max(0, threshold)
      if (visibleHeight > 0 && visibleRatio >= requiredRatio) {
        markRevealed()
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio >= threshold) {
            markRevealed()
            if (once) observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    const rafId = window.requestAnimationFrame(checkVisibility)
    const handleWindow = () => {
      checkVisibility()
    }
    window.addEventListener('scroll', handleWindow, { passive: true })
    window.addEventListener('resize', handleWindow, { passive: true })

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleWindow)
      window.removeEventListener('resize', handleWindow)
    }
  }, [threshold, rootMargin, once])

  return { ref, isRevealed }
}
