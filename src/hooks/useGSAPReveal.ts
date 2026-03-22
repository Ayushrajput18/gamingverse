'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap, ScrollTrigger, revealStagger, revealOne, revealSide, parallaxLayer } from '@/lib/gsap'

// ─── Generic scroll reveal ────────────────────────────────────────────────────

export function useRevealOnScroll<T extends Element>(
  options?: { y?: number; duration?: number; delay?: number; start?: string }
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      revealOne(el, el, options)
    }, el)
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// ─── Staggered children reveal ────────────────────────────────────────────────

export function useStaggerReveal<T extends Element>(
  childSelector: string,
  options?: { y?: number; stagger?: number; duration?: number; start?: string }
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const children = el.querySelectorAll(childSelector)
      if (children.length) revealStagger(children, el, options)
    }, el)
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// ─── Side reveal ─────────────────────────────────────────────────────────────

export function useSideReveal<T extends Element>(
  direction: 'left' | 'right',
  options?: { distance?: number; duration?: number; delay?: number }
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      revealSide(el, el, direction, options)
    }, el)
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// ─── Parallax layer ───────────────────────────────────────────────────────────

export function useParallax<T extends Element>(speed = 0.3): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      parallaxLayer(el, speed)
    }, el)
    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(st => st.refresh())
    }
  }, [speed])

  return ref
}

// ─── Hero entry timeline ──────────────────────────────────────────────────────

interface HeroAnimOptions {
  eyebrowSel?: string
  titleSel?: string
  subtitleSel?: string
  ctasSel?: string
  hintSel?: string
}

export function useHeroEntryTimeline(
  containerRef: RefObject<Element>,
  opts: HeroAnimOptions = {}
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const {
      eyebrowSel  = '.hero-eyebrow',
      titleSel    = '.hero-title',
      subtitleSel = '.hero-sub',
      ctasSel     = '.hero-ctas',
      hintSel     = '.hero-hint',
    } = opts

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([eyebrowSel, titleSel, subtitleSel, ctasSel, hintSel], {
        opacity: 0,
        y: 30,
      })

      const tl = gsap.timeline({ delay: 0.8 })

      tl.to(eyebrowSel,  { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' })
        .to(titleSel,    { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.4')
        .to(subtitleSel, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.5')
        .to(ctasSel,     { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.4')
        .to(hintSel,     { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.2')
    }, container)

    return () => ctx.revert()
  }, [containerRef]) // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── Word-by-word text reveal ─────────────────────────────────────────────────

export function useWordReveal<T extends Element>(start = 'top 75%'): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const original = el.innerHTML
    const words = (el.textContent ?? '').split(' ')

    // Wrap each word in a reveal span
    el.innerHTML = words
      .map(
        (w) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em">` +
          `<span class="word-inner" style="display:inline-block;transform:translateY(110%)">${w}</span>` +
          `</span>`
      )
      .join('')

    const inners = el.querySelectorAll<HTMLElement>('.word-inner')

    const ctx = gsap.context(() => {
      gsap.to(inners, {
        y: 0,
        duration: 0.8,
        stagger: 0.035,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => {
      ctx.revert()
      el.innerHTML = original
    }
  }, [start])

  return ref
}

// ─── Counter animation ────────────────────────────────────────────────────────

export function useGSAPCounter(
  target: number,
  suffix = '',
  start = 'top 85%'
): { ref: RefObject<HTMLElement>; display: string } {
  const ref      = useRef<HTMLElement>(null)
  const objRef   = useRef({ val: 0 })
  const dispRef  = useRef('0' + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(objRef.current, {
        val: target,
        duration: 1.6,
        ease: 'expo.out',
        snap: { val: 1 },
        onUpdate: () => {
          el.textContent = Math.round(objRef.current.val) + suffix
        },
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [target, suffix, start])

  return { ref, display: dispRef.current }
}
