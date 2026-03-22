'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useWordReveal, useSideReveal } from '@/hooks/useGSAPReveal'
import { HEX_SKILLS } from '@/lib/data'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { Button } from '@/components/ui/Button'

const INITIALLY_ACTIVE = new Set([0, 2, 5, 7, 8, 10, 13])

export function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const leftRef     = useSideReveal<HTMLDivElement>('left',  { duration: 1.1, delay: 0 })
  const rightRef    = useSideReveal<HTMLDivElement>('right', { duration: 1.1, delay: 0.1 })
  const manifestoRef = useWordReveal<HTMLParagraphElement>('top 75%')
  const [active, setActive] = useState(new Set(INITIALLY_ACTIVE))

  // Random hex pulse via GSAP
  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => {
        const next = new Set(prev)
        const idx  = Math.floor(Math.random() * HEX_SKILLS.length)
        next.has(idx) ? next.delete(idx) : next.add(idx)
        return next
      })
    }, 500)
    return () => clearInterval(id)
  }, [])

  // Animate hex grid entry
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const hexes = section.querySelectorAll('.hex-cell')
      gsap.fromTo(hexes,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1,
          duration: 0.5, stagger: { each: 0.04, from: 'random' },
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" style={{
      padding: '120px 60px', background: 'var(--gv-surface)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center', position: 'relative', zIndex: 1 }} className="about-inner">
        {/* Left */}
        <div ref={leftRef}>
          <SectionEyebrow>The Studio</SectionEyebrow>
          <p ref={manifestoRef} style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700,
            lineHeight: 1.3, color: 'var(--gv-text)', margin: '24px 0',
          }}>
            We don&apos;t make games. We build universes worth living in.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--gv-muted)', marginBottom: 40 }}>
            GamingVerse Studios is an independent game development powerhouse driven by one obsession: 
            crafting immersive worlds that players never want to leave. From narrative RPGs to pulse-pounding 
            shooters, every title carries our signature — depth, atmosphere, and soul.
          </p>
          <Button href="/about" variant="primary" size="md">Meet the Team</Button>
        </div>

        {/* Right — hex grid */}
        <div ref={rightRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 70px)', gap: 8, transform: 'rotate(-12deg)' }}>
            {HEX_SKILLS.map((skill, i) => (
              <div key={skill} className="hex-cell" style={{
                width: 70, height: 80,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: active.has(i) ? 'rgba(0,245,255,0.08)' : 'var(--gv-surface2)',
                border: `1px solid ${active.has(i) ? 'rgba(0,245,255,0.3)' : 'var(--gv-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-share-tech)', fontSize: 9,
                color: active.has(i) ? 'var(--gv-cyan)' : 'var(--gv-muted)',
                letterSpacing: 1,
                transition: 'all 0.4s ease',
                boxShadow: active.has(i) ? '0 0 20px rgba(0,245,255,0.15)' : 'none',
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:900px){ .about-inner{ grid-template-columns:1fr !important; gap:40px !important; } }
        @media(max-width:768px){ #about{ padding:80px 24px !important; } }
      ` }} />
    </section>
  )
}
