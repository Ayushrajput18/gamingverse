'use client'

import { useEffect, useRef } from 'react'

// ── Lightweight GSAP-style scroll animations without the full GSAP dep ──────
// When you install GSAP Pro, swap these helpers for gsap.to() + ScrollTrigger

export interface ScrollAnimConfig {
  trigger: string | HTMLElement
  start?: string          // e.g. 'top 80%'
  end?: string            // e.g. 'bottom 20%'
  scrub?: boolean | number
  pin?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onUpdate?: (progress: number) => void
}

/**
 * useScrollProgress
 * Tracks scroll progress (0–1) of a section as it moves through the viewport.
 * Returns a ref to attach to the element and the current progress value.
 */
export function useScrollProgress(options?: { start?: number; end?: number }) {
  const ref       = useRef<HTMLElement>(null)
  const progress  = useRef(0)
  const callbacks = useRef<Array<(p: number) => void>>([])

  const startOffset = options?.start ?? 0.8  // trigger when top of element hits 80% down viewport
  const endOffset   = options?.end   ?? 0.1  // fully animated when bottom hits 10% down viewport

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh   = window.innerHeight

      // Map scroll position to 0–1 range
      const raw = 1 - (rect.top / (vh * startOffset))
      const p   = Math.max(0, Math.min(1, raw))

      if (Math.abs(p - progress.current) > 0.001) {
        progress.current = p
        callbacks.current.forEach(cb => cb(p))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [startOffset, endOffset])

  const onProgress = (cb: (p: number) => void) => {
    callbacks.current.push(cb)
  }

  return { ref, onProgress }
}

/**
 * usePinSection
 * Pins a section while content inside scrolls/animates.
 * Simulates GSAP ScrollTrigger pin behavior with pure CSS + JS.
 */
export function usePinSection(totalScrollHeight = '300vh') {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)
  const progress     = useRef(0)
  const callbacks    = useRef<Array<(p: number) => void>>([])

  useEffect(() => {
    const container = containerRef.current
    const sticky    = stickyRef.current
    if (!container || !sticky) return

    const onScroll = () => {
      const rect   = container.getBoundingClientRect()
      const totalH = container.offsetHeight - window.innerHeight
      if (totalH <= 0) return

      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalH))

      if (Math.abs(p - progress.current) > 0.001) {
        progress.current = p
        callbacks.current.forEach(cb => cb(p))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onProgress = (cb: (p: number) => void) => {
    callbacks.current.push(cb)
    return () => {
      callbacks.current = callbacks.current.filter(c => c !== cb)
    }
  }

  return { containerRef, stickyRef, onProgress, totalScrollHeight }
}

/**
 * useParallax
 * Returns a ref. Attaches a scroll listener that applies a CSS transform
 * proportional to scroll position for parallax depth.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect     = el.getBoundingClientRect()
      const centered = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translateY(${centered * speed}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}

/**
 * useTextReveal
 * Splits text into words and animates them in on scroll.
 */
export function useTextReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector)

    elements.forEach((el) => {
      const text  = el.textContent ?? ''
      const words = text.split(' ')

      el.innerHTML = words
        .map((w, i) => `<span class="reveal-word" style="
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          margin-right: 0.25em;
        "><span style="
          display: inline-block;
          transform: translateY(110%);
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s;
        ">${w}</span></span>`)
        .join('')

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.reveal-word span').forEach((span) => {
            span.style.transform = 'translateY(0%)'
          })
          observer.unobserve(el)
        }
      }, { threshold: 0.3 })

      observer.observe(el)
    })
  }, [selector])
}
