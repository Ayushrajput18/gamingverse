'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { GamesMarquee } from '@/components/sections/GamesMarquee'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { Button } from '@/components/ui/Button'
import { GAMES } from '@/lib/data'

export function GamesSection() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('.gs-anim'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const mobileCount = GAMES.filter(g => g.androidAvailable || g.iosAvailable).length
  const pcCount     = GAMES.filter(g => g.pcAvailable).length

  return (
    <section id="games" style={{ paddingTop: 100, paddingBottom: 80, background: 'var(--gv-bg)' }}>
      {/* Header */}
      <div ref={headerRef} style={{
        padding: '0 60px', marginBottom: 52,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 24,
      }} className="gs-header">
        <div>
          <SectionEyebrow className="gs-anim">Our Universe</SectionEyebrow>
          <h2 className="gs-anim" style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900, color: 'var(--gv-text)',
            textTransform: 'uppercase', lineHeight: 1, letterSpacing: -1,
          }}>
            {GAMES.length} <span style={{ color: 'var(--gv-cyan)' }}>Worlds</span> to Explore
          </h2>
          {/* Platform count badges */}
          <div className="gs-anim" style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
            <PlatformCount count={mobileCount} label="Mobile Games" icon="◉" color="var(--gv-cyan)" />
            <PlatformCount count={pcCount}     label="PC Games"     icon="◈" color="var(--gv-ember)" />
          </div>
        </div>
        <Button href="/games" variant="secondary" size="sm" className="gs-anim">
          View All Games →
        </Button>
      </div>

      {/* Marquee */}
      <GamesMarquee />

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:768px){ .gs-header{ padding: 0 24px !important; } }
      ` }} />
    </section>
  )
}

function PlatformCount({ count, label, icon, color }: { count: number; label: string; icon: string; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 14px',
      border: `1px solid ${color}22`,
      background: `${color}08`,
    }}>
      <span style={{ color, fontSize: 10 }}>{icon}</span>
      <span style={{
        fontFamily: 'var(--font-orbitron)', fontSize: 14,
        fontWeight: 700, color,
      }}>{count}</span>
      <span style={{
        fontFamily: 'var(--font-share-tech)', fontSize: 10,
        color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  )
}
