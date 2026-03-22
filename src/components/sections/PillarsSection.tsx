'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { PILLARS } from '@/lib/data'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(section.querySelector('.pillars-header'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } }
      )
      // Cards stagger from bottom with a slight rotation
      const cards = section.querySelectorAll('.pillar-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 70, rotationX: 10 },
        {
          opacity: 1, y: 0, rotationX: 0,
          duration: 0.9, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )

      // Hover animations per card
      cards.forEach(card => {
        const line  = card.querySelector<HTMLElement>('.pillar-top-line')
        const icon  = card.querySelector<HTMLElement>('.pillar-icon')

        const enter = () => {
          gsap.to(card,  { y: -6, duration: 0.4, ease: 'expo.out' })
          gsap.to(line,  { scaleX: 1, duration: 0.4, ease: 'expo.out' })
          gsap.to(icon,  { scale: 1.15, rotate: 10, duration: 0.4, ease: 'back.out(2)' })
        }
        const leave = () => {
          gsap.to(card,  { y: 0, duration: 0.4, ease: 'expo.out' })
          gsap.to(line,  { scaleX: 0, duration: 0.35 })
          gsap.to(icon,  { scale: 1, rotate: 0, duration: 0.35 })
        }

        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pillars" style={{ padding: '120px 60px', background: 'var(--gv-bg)' }}>
      <div className="pillars-header" style={{ textAlign: 'center', marginBottom: 64 }}>
        <SectionEyebrow centered>Our DNA</SectionEyebrow>
        <h2 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900,
          color: 'var(--gv-text)', textTransform: 'uppercase',
          lineHeight: 1, letterSpacing: -1,
        }}>
          Built on <span style={{ color: 'var(--gv-cyan)' }}>Four</span> Pillars
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }} className="pillars-grid">
        {PILLARS.map(p => (
          <div key={p.title} className="pillar-card" style={{
            background: 'var(--gv-surface)', padding: '40px 32px',
            position: 'relative', overflow: 'hidden',
            transformStyle: 'preserve-3d',
            cursor: 'none',
          }}>
            {/* Animated top gradient bar */}
            <div className="pillar-top-line" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, var(--gv-cyan), var(--gv-ember))',
              transform: 'scaleX(0)', transformOrigin: 'left',
            }} />
            <span className="pillar-icon" style={{ fontSize: 32, display: 'inline-block', marginBottom: 20 }}>
              {p.icon}
            </span>
            <div style={{
              fontFamily: 'var(--font-orbitron)', fontSize: 15, fontWeight: 700,
              color: 'var(--gv-text)', textTransform: 'uppercase',
              letterSpacing: 2, marginBottom: 12,
            }}>
              {p.title}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gv-muted)' }}>{p.description}</p>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:900px){ .pillars-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:600px){ .pillars-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:768px){ #pillars{ padding:80px 24px !important; } }
      ` }} />
    </section>
  )
}
