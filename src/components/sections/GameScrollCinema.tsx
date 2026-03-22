'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { Game } from '@/types'

interface Props { game: Game }

export function GameScrollCinema({ game }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)

  // ── Dynamic Slides derived from the Game object ──────────────────────────
  const SLIDES = [
    {
      label:   'World & Lore',
      heading: 'A Universe\nBuilt for You',
      body:    game.longDescription || game.description || 'A sprawling, immersive universe awaits.',
      counter: { value: game.rating?.toString() || '9+', label: 'Critic Score' },
    },
    {
      label:   'Gameplay',
      heading: 'Master\nthe System',
      body:    `Experience genre-defining mechanics. Features include:\n• ${game.features?.[0] || 'Dynamic tactical combat'}\n• ${game.features?.[1] || 'Deep progression trees'}\n• ${game.features?.[2] || 'Living environments'}`,
      counter: { value: game.features?.length?.toString() || '10+', label: 'Core Features' },
    },
    {
      label:   'Specs',
      heading: 'Pushing the\nHardware',
      body:    game.systemRequirements 
        ? `Built for next-gen performance.\nRecommended:\nOS: ${game.systemRequirements.recommended.os}\nCPU: ${game.systemRequirements.recommended.cpu}\nGPU: ${game.systemRequirements.recommended.gpu}`
        : `Optimized from the ground up for seamless performance across all supported platforms.`,
      counter: { value: game.year?.toString() || 'TBA', label: 'Release' },
    },
  ]

  // Derive 3 images from the game's slug
  const slideImages = [
    game.imageSrc || `/games/${game.slug}/hero.jpg`,
    `/games/${game.slug}/cover.jpg`,
    `/games/${game.slug}/og.jpg`,
  ]

  // ── GSAP ScrollTrigger pin + scrub ────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    const sticky    = stickyRef.current
    if (!container || !sticky) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      SLIDES.forEach((slide, i) => {
        if (i === 0) return // first slide is default visible state

        const heading = sticky.querySelector<HTMLElement>(`#slide-h-${i}`)
        const body    = sticky.querySelector<HTMLElement>(`#slide-b-${i}`)
        const counter = sticky.querySelector<HTMLElement>(`#slide-c-${i}`)
        const prevH   = sticky.querySelector<HTMLElement>(`#slide-h-${i - 1}`)
        const prevB   = sticky.querySelector<HTMLElement>(`#slide-b-${i - 1}`)
        const prevC   = sticky.querySelector<HTMLElement>(`#slide-c-${i - 1}`)
        const dot     = sticky.querySelector<HTMLElement>(`#dot-${i}`)
        const prevDot = sticky.querySelector<HTMLElement>(`#dot-${i - 1}`)
        const bar     = sticky.querySelector<HTMLElement>('#progress-bar')
        const label   = sticky.querySelector<HTMLElement>('#slide-label')
        const idx     = sticky.querySelector<HTMLElement>('#slide-idx')
        const geom    = sticky.querySelector<HTMLElement>('#geom')
        
        const prevImg = sticky.querySelector<HTMLElement>(`#gsimg-${i - 1}`)
        const currImg = sticky.querySelector<HTMLElement>(`#gsimg-${i}`)

        // Outgoing slide
        tl.to([prevH, prevB, prevC], { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' })
        
        if (prevImg) tl.to(prevImg, { opacity: 0, scale: 1.05, duration: 0.5 }, '<')

        // Dot transition
        if (prevDot) tl.to(prevDot, { width: 6, borderRadius: '50%', duration: 0.3 }, '<')
        if (dot)     tl.to(dot, { width: 24, borderRadius: 3, duration: 0.3 }, '<')

        // Geometry rotate
        if (geom) tl.to(geom, { rotate: `+=${120 / (SLIDES.length - 1)}`, duration: 0.6, ease: 'power2.inOut' }, '<')

        // Progress bar
        if (bar) tl.to(bar, { width: `${((i + 1) / SLIDES.length) * 100}%`, duration: 0.4 }, '<0.1')

        // Label update (instant)
        if (label) tl.add(() => { if (label) label.textContent = slide.label }, '<')
        if (idx)   tl.add(() => { if (idx) idx.textContent = `0${i + 1}` }, '<')

        // Incoming slide
        tl.fromTo(
          [heading, body, counter].filter(Boolean),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out' },
          '-=0.1'
        )
        
        if (currImg) tl.fromTo(currImg, 
          { opacity: 0, scale: 0.95 }, 
          { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, 
          '<'
        )
      })

      // Pin + scrub
      ScrollTrigger.create({
        trigger:    container,
        start:      'top top',
        end:        `+=${(SLIDES.length - 1) * 100}%`,
        pin:        sticky,
        pinSpacing: true,
        scrub:      1.2,
        animation:  tl,
      })
    }, container)

    return () => ctx.revert()
  }, [game.slug, SLIDES.length])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div ref={stickyRef} style={{
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        position: 'relative',
        background: 'var(--gv-bg)',
      }}>
        {/* Background gradient echo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: game.bgGradient,
          opacity: 0.12,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--gv-bg) 0%, var(--gv-surface) 100%)',
        }} />

        {/* Right-hand side images */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          zIndex: 4,
        }}>
          {SLIDES.map((slide, i) => (
            <div key={i} id={`gsimg-${i}`} style={{
              position: 'absolute', inset: 0,
              opacity: i === 0 ? 1 : 0,
            }}>
              <Image 
                src={slideImages[i % slideImages.length]} 
                alt={slide.label}
                fill 
                style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.6)' }} 
              />
              {/* Fade gradient to blend into bg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, var(--gv-bg) 0%, transparent 30%)',
              }} />
            </div>
          ))}
        </div>

        {/* Spinning geometry (background/overlay on images) */}
        <div id="geom" style={{
          position: 'absolute', right: '22%', top: '50%',
          transform: 'translate(50%, -50%)',
          opacity: 0.25, pointerEvents: 'none', zIndex: 6,
        }}>
          <SlideGeometry slug={game.slug} color={game.accentColor} size={520} />
        </div>

        {/* Section label top-left */}
        <div style={{
          position: 'absolute', top: 48, left: 60,
          fontFamily: 'var(--font-share-tech)', fontSize: 10,
          color: 'var(--gv-muted)', letterSpacing: 5, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 12, zIndex: 10,
        }}>
          <span style={{ display: 'block', width: 24, height: 1, background: 'var(--gv-muted)' }} />
          Inside {game.title} {game.subtitle}
        </div>

        {/* Progress bar bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, background: 'rgba(255,255,255,0.06)', zIndex: 10,
        }}>
          <div id="progress-bar" style={{
            height: '100%',
            width: `${(1 / SLIDES.length) * 100}%`,
            background: `linear-gradient(90deg, ${game.accentColor}, var(--gv-cyan))`,
            boxShadow: `0 0 10px ${game.accentColor}`,
            transition: 'none',
          }} />
        </div>

        {/* Dot nav right */}
        <div style={{
          position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 12, zIndex: 10,
        }}>
          {SLIDES.map((_, i) => (
            <div key={i} id={`dot-${i}`} style={{
              width: i === 0 ? 24 : 6, height: 6,
              background: i === 0 ? game.accentColor : 'rgba(255,255,255,0.15)',
              borderRadius: i === 0 ? 3 : '50%',
              boxShadow: i === 0 ? `0 0 12px ${game.accentColor}` : 'none',
            }} />
          ))}
        </div>

        {/* Main content — slides stacked, GSAP controls visibility */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 60px', width: '55%' }}>
          {/* Slide counter + label */}
          <div style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 11,
            color: game.accentColor, letterSpacing: 4, textTransform: 'uppercase',
            marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span id="slide-idx">01</span>
            <span style={{ display: 'block', width: 40, height: 1, background: game.accentColor, opacity: 0.4 }} />
            <span id="slide-label">{SLIDES[0].label}</span>
          </div>

          {/* All slides absolutely layered — GSAP controls opacity/y */}
          <div style={{ position: 'relative', minHeight: 320 }}>
            {SLIDES.map((slide, i) => (
              <div key={i} style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0, left: 0,
                width: '100%',
                opacity: i === 0 ? 1 : 0,
              }}>
                <h2 id={`slide-h-${i}`} style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 900, color: '#fff',
                  textTransform: 'uppercase', lineHeight: 1,
                  letterSpacing: -1, marginBottom: 28,
                  whiteSpace: 'pre-line',
                }}>
                  {slide.heading}
                </h2>
                <p id={`slide-b-${i}`} style={{
                  fontSize: 18, color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.8, maxWidth: 520, marginBottom: 36,
                  whiteSpace: 'pre-line',
                }}>
                  {slide.body}
                </p>
                <div id={`slide-c-${i}`} style={{
                  display: 'inline-flex', flexDirection: 'column',
                  padding: '16px 24px',
                  border: `1px solid ${game.accentColor}33`,
                  borderLeft: `3px solid ${game.accentColor}`,
                  background: `${game.accentColor}08`,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-orbitron)', fontSize: 32,
                    fontWeight: 900, color: game.accentColor, letterSpacing: -1, lineHeight: 1,
                  }}>
                    {slide.counter.value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-share-tech)', fontSize: 10,
                    color: 'var(--gv-muted)', letterSpacing: 3,
                    textTransform: 'uppercase', marginTop: 4,
                  }}>
                    {slide.counter.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideGeometry({ slug, color, size }: { slug: string; color: string; size: number }) {
  if (slug === 'ember-throne') return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <polygon points="100,5 195,52 195,148 100,195 5,148 5,52" stroke={color} strokeWidth="0.6" />
      <polygon points="100,25 175,65 175,135 100,175 25,135 25,65" stroke={color} strokeWidth="0.4" />
      <polygon points="100,45 155,78 155,122 100,155 45,122 45,78" stroke="#ffaa00" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="22" stroke={color} strokeWidth="0.5" />
      <circle cx="100" cy="100" r="8" fill={color} opacity="0.3" />
    </svg>
  )
  if (slug === 'void-protocol') return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="0.5" />
      <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="0.4" strokeDasharray="5 5" />
      <circle cx="100" cy="100" r="52" stroke="#5000ff" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="32" stroke={color} strokeWidth="0.5" />
      <circle cx="100" cy="100" r="10" stroke={color} strokeWidth="1" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
        const r = a * Math.PI / 180
        return <line key={a} x1={100} y1={100} x2={100+Math.cos(r)*92} y2={100+Math.sin(r)*92} stroke={color} strokeWidth="0.2" />
      })}
    </svg>
  )
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {[0,18,36,54,72,90].map(rot => (
        <rect key={rot} x="30" y="30" width="140" height="140" stroke={color} strokeWidth="0.5" transform={`rotate(${rot} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="18" fill={color} opacity="0.25" />
    </svg>
  )
}
