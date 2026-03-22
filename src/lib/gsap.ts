'use client'

// ─── GSAP Plugin Registry ─────────────────────────────────────────────────────
// Import and register all GSAP plugins here.
// This file is the single source of truth for GSAP setup.
// Import gsap from '@/lib/gsap' everywhere — never import directly from 'gsap'.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register once — safe to call multiple times (GSAP dedupes internally)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  // Smooth scroll defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  })
}

export { gsap, ScrollTrigger, ScrollToPlugin }

// ─── Shared eases ──────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO  = 'expo.out'
export const EASE_OUT_QUART = 'quart.out'
export const EASE_INOUT     = 'power2.inOut'

// ─── Timeline factory helpers ──────────────────────────────────────────────────

/** Staggered fade-up reveal for a list of elements */
export function revealStagger(
  targets: gsap.TweenTarget,
  trigger: Element,
  options?: {
    y?: number
    stagger?: number
    duration?: number
    delay?: number
    start?: string
  }
) {
  const { y = 50, stagger = 0.12, duration = 0.9, delay = 0, start = 'top 85%' } = options ?? {}

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: EASE_OUT_EXPO,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  )
}

/** Single element fade-up */
export function revealOne(
  target: gsap.TweenTarget,
  trigger: Element,
  options?: { y?: number; duration?: number; delay?: number; start?: string }
) {
  const { y = 40, duration = 0.9, delay = 0, start = 'top 80%' } = options ?? {}

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: EASE_OUT_EXPO,
      scrollTrigger: { trigger: trigger as Element, start, toggleActions: 'play none none none' },
    }
  )
}

/** Slide from left/right */
export function revealSide(
  target: gsap.TweenTarget,
  trigger: Element,
  direction: 'left' | 'right' = 'left',
  options?: { distance?: number; duration?: number; delay?: number; start?: string }
) {
  const { distance = 60, duration = 1, delay = 0, start = 'top 80%' } = options ?? {}
  const x = direction === 'left' ? -distance : distance

  return gsap.fromTo(
    target,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: EASE_OUT_EXPO,
      scrollTrigger: { trigger: trigger as Element, start, toggleActions: 'play none none none' },
    }
  )
}

/** Parallax — moves element at a fraction of scroll speed */
export function parallaxLayer(
  target: Element,
  speed = 0.3,
  options?: { start?: string; end?: string }
) {
  const { start = 'top bottom', end = 'bottom top' } = options ?? {}

  return gsap.fromTo(
    target,
    { y: 0 },
    {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub: true,
      },
    }
  )
}

/** Pin a section while inner timeline plays as user scrolls */
export function pinSection(
  trigger: Element,
  animation: gsap.core.Timeline,
  options?: { scrub?: number | boolean; pinSpacing?: boolean; start?: string; end?: string }
) {
  const { scrub = 1, pinSpacing = true, start = 'top top', end = '+=300%' } = options ?? {}

  ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    pinSpacing,
    scrub,
    animation,
  })
}
