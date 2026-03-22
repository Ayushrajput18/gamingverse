'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const PANELS = [
  {
    eyebrow: 'The Mission',
    title:   'We Build\nWorlds',
    body:    'Not levels. Not maps. Full universes — with history, weather, memory, and consequence built into every interaction.',
    stat:    { value: '60+', label: 'Hours per title' },
    accentA: '#00f5ff',
    accentB: 'rgba(0,245,255,0.06)',
    image:   '/games/pandemic-lost-haven/hero.jpg',
  },
  {
    eyebrow: 'The Craft',
    title:   'Every Pixel\nIs a Choice',
    body:    'Art direction, sound design, and narrative run in parallel from day one. Nothing ships until every layer sings together.',
    stat:    { value: '100%', label: 'Original IP' },
    accentA: '#ff4500',
    accentB: 'rgba(255,69,0,0.06)',
    image:   '/games/rail-runner-rtx/hero.jpg',
  },
  {
    eyebrow: 'The Future',
    title:   'What We\nBuild Next',
    body:    'Three unannounced titles in active production including tactical strategy and massive RPGs. We are just getting started.',
    stat:    { value: '3', label: 'Titles in dev' },
    accentA: '#ffaa00',
    accentB: 'rgba(255,170,0,0.06)',
    image:   '/games/iron-citadel/hero.jpg',
  },
]

export function HomeScrollCinema() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const sticky    = stickyRef.current
    if (!container || !sticky) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      PANELS.forEach((panel, i) => {
        if (i === 0) return

        const prev = sticky.querySelector<HTMLElement>(`#hcp-${i - 1}`)
        const curr = sticky.querySelector<HTMLElement>(`#hcp-${i}`)
        const bg   = sticky.querySelector<HTMLElement>(`#hcbg-${i}`)
        const line = sticky.querySelector<HTMLElement>('#hc-accent-line')
        
        const prevImg = sticky.querySelector<HTMLElement>(`#hcimg-${i - 1}`)
        const currImg = sticky.querySelector<HTMLElement>(`#hcimg-${i}`)

        // Exit previous
        tl.to(prev, { opacity: 0, x: -80, duration: 0.5, ease: 'power2.in' })
        if (prevImg) tl.to(prevImg, { opacity: 0, scale: 1.05, duration: 0.5 }, '<')
        
        // Swap bg
        if (bg) tl.to(bg, { opacity: 1, duration: 0.5 }, '<0.2')
        // Shift accent line color
        if (line) tl.to(line, { background: panel.accentA, boxShadow: `0 0 20px ${panel.accentA}`, duration: 0.4 }, '<')
        
        // Enter new panel
        tl.fromTo(curr,
          { opacity: 0, x: 80 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' },
          '-=0.2'
        )
        if (currImg) tl.fromTo(currImg, 
          { opacity: 0, scale: 0.95 }, 
          { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }, 
          '<'
        )
      })

      // Pin and scrub
      ScrollTrigger.create({
        trigger:    container,
        start:      'top top',
        end:        `+=${(PANELS.length - 1) * 100}%`,
        pin:        sticky,
        pinSpacing: true,
        scrub:      1,
        animation:  tl,
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div ref={stickyRef} style={{
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        background: 'var(--gv-bg)',
        position: 'relative',
      }}>
        {/* Layered background panels — each fades in on scroll */}
        {PANELS.map((panel, i) => (
          <div key={i} id={`hcbg-${i}`} style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at ${i % 2 === 0 ? '30%' : '70%'} 60%, ${panel.accentB} 0%, transparent 65%)`,
            opacity: i === 0 ? 1 : 0,
            transition: 'none',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,245,255,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,245,255,0.025) 1px,transparent 1px)`,
          backgroundSize: '80px 80px', pointerEvents: 'none',
        }} />
        
        {/* Right-hand side images */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          zIndex: 5,
        }}>
          {PANELS.map((panel, i) => (
            <div key={i} id={`hcimg-${i}`} style={{
              position: 'absolute', inset: 0,
              opacity: i === 0 ? 1 : 0,
            }}>
              <Image 
                src={panel.image} 
                alt={panel.eyebrow}
                fill 
                style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.7)' }} 
              />
              {/* Fade gradient so it blends into the black background on the left edge */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, var(--gv-bg) 0%, transparent 30%)',
              }} />
            </div>
          ))}
        </div>

        {/* Accent vertical line left */}
        <div id="hc-accent-line" style={{
          position: 'absolute', left: 0, top: '15%', bottom: '15%',
          width: 3,
          background: PANELS[0].accentA,
          boxShadow: `0 0 20px ${PANELS[0].accentA}`,
          zIndex: 5,
        }} />

        {/* Content panels stacked */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 80px', width: '55%' }}>
          {PANELS.map((panel, i) => (
            <div key={i} id={`hcp-${i}`} style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0, left: 0, width: '100%',
              opacity: i === 0 ? 1 : 0,
            }}>
              {/* Eyebrow */}
              <div style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 11,
                color: panel.accentA, letterSpacing: 6,
                textTransform: 'uppercase', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <span style={{ display: 'block', width: 40, height: 1, background: panel.accentA, boxShadow: `0 0 8px ${panel.accentA}` }} />
                {panel.eyebrow}
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: 'clamp(48px, 6vw, 76px)',
                fontWeight: 900, color: '#fff',
                textTransform: 'uppercase', lineHeight: 0.95,
                letterSpacing: -2, marginBottom: 32,
                whiteSpace: 'pre-line',
              }}>
                {panel.title}
              </h2>

              {/* Body */}
              <p style={{
                fontSize: 18, color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8, maxWidth: 480, marginBottom: 44,
              }}>
                {panel.body}
              </p>

              {/* Stat */}
              <div style={{
                display: 'inline-flex', flexDirection: 'column',
                padding: '16px 28px',
                borderTop: `2px solid ${panel.accentA}`,
                background: `${panel.accentA}08`,
              }}>
                <span style={{
                  fontFamily: 'var(--font-orbitron)', fontSize: 40,
                  fontWeight: 900, color: panel.accentA,
                  letterSpacing: -2, lineHeight: 1,
                }}>
                  {panel.stat.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 10,
                  color: 'var(--gv-muted)', letterSpacing: 4,
                  textTransform: 'uppercase', marginTop: 6,
                }}>
                  {panel.stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel counter right */}
        <div style={{
          position: 'absolute', right: 48, bottom: 48,
          fontFamily: 'var(--font-share-tech)', fontSize: 10,
          color: 'var(--gv-muted)', letterSpacing: 4,
          textTransform: 'uppercase', zIndex: 10,
        }}>
          {String(1).padStart(2,'0')} / {String(PANELS.length).padStart(2,'0')}
        </div>
      </div>
    </div>
  )
}
