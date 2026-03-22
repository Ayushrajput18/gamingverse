'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { GAMES } from '@/lib/data'

export function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const mobileGames  = GAMES.filter(g => g.androidAvailable || g.iosAvailable)
  const pcGames      = GAMES.filter(g => g.pcAvailable)
  const totalDL      = mobileGames.reduce((acc, g) => {
    if (!g.downloads) return acc
    const num = parseFloat(g.downloads.replace(/[^0-9.]/g, ''))
    return acc + num
  }, 0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.ps-anim'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(section.querySelector('.ps-left'),
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(section.querySelector('.ps-right'),
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'expo.out', delay: 0.1,
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: 'var(--gv-surface)',
      padding: '100px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div className="ps-anim" style={{ textAlign: 'center', marginBottom: 64 }}>
        <SectionEyebrow centered>Play Anywhere</SectionEyebrow>
        <h2 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900,
          color: 'var(--gv-text)', textTransform: 'uppercase',
          lineHeight: 1, letterSpacing: -1,
        }}>
          Your Platform,<br /><span style={{ color: 'var(--gv-cyan)' }}>Your World</span>
        </h2>
      </div>

      {/* Two-panel split */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr',
        gap: 0, position: 'relative',
      }} className="ps-grid">
        {/* ── Mobile panel ── */}
        <div className="ps-left" style={{ padding: '0 60px 0 0' }}>
          {/* Icon */}
          <div style={{
            width: 64, height: 64, marginBottom: 28,
            background: 'rgba(0,245,255,0.06)',
            border: '1px solid rgba(0,245,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="6" y="2" width="16" height="24" rx="3" stroke="var(--gv-cyan)" strokeWidth="1.5"/>
              <circle cx="14" cy="21" r="1.5" fill="var(--gv-cyan)"/>
              <rect x="10" y="6" width="8" height="1.5" rx="0.75" fill="var(--gv-cyan)" opacity="0.5"/>
            </svg>
          </div>

          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 28, fontWeight: 900,
            color: 'var(--gv-cyan)', letterSpacing: -1, marginBottom: 6,
          }}>
            {mobileGames.length} Games
          </div>
          <div style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 10,
            color: 'var(--gv-muted)', letterSpacing: 4,
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            On Mobile · {totalDL}M+ Downloads
          </div>

          <p style={{ fontSize: 16, color: 'var(--gv-muted)', lineHeight: 1.8, marginBottom: 32, maxWidth: 380 }}>
            Every mobile title built from scratch for touch — not ported, not scaled down.
            Full-fat gaming experiences in your pocket, free to download.
          </p>

          {/* Game list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
            {mobileGames.map(game => (
              <a key={game.id} href={`/games/${game.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px',
                background: 'var(--gv-surface2)',
                borderLeft: `3px solid ${game.accentColor}`,
                textDecoration: 'none', transition: 'background 0.2s',
              }} className="ps-game-row">
                <div>
                  <div style={{
                    fontFamily: 'var(--font-rajdhani)', fontSize: 14, fontWeight: 700,
                    color: game.accentColor, textTransform: 'uppercase', letterSpacing: 1,
                  }}>
                    {game.title} {game.subtitle}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-share-tech)', fontSize: 9,
                    color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 2,
                  }}>
                    {game.genre}
                    {game.downloads && ` · ${game.downloads} downloads`}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  {game.androidAvailable && (
                    <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 8, color: '#00ff80', letterSpacing: 2, textTransform: 'uppercase', padding: '2px 8px', border: '1px solid #00ff8033' }}>Android</span>
                  )}
                  {game.iosAvailable && (
                    <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 8, color: '#a855f7', letterSpacing: 2, textTransform: 'uppercase', padding: '2px 8px', border: '1px solid #a855f733' }}>iOS</span>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Store badges */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StoreBadge store="google-play" url="https://play.google.com/store/apps/developer?id=GamingVerse+Studios" size="md" />
            <StoreBadge store="app-store" url="https://apps.apple.com/developer/gamingverse-studios/id000000" size="md" />
          </div>
        </div>

        {/* Divider */}
        <div style={{
          background: 'var(--gv-border)', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 36, height: 36,
            background: 'var(--gv-surface)',
            border: '1px solid var(--gv-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-share-tech)', fontSize: 9,
            color: 'var(--gv-muted)', letterSpacing: 1,
          }}>
            OR
          </div>
        </div>

        {/* ── PC panel ── */}
        <div className="ps-right" style={{ padding: '0 0 0 60px' }}>
          <div style={{
            width: 64, height: 64, marginBottom: 28,
            background: 'rgba(255,69,0,0.06)',
            border: '1px solid rgba(255,69,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="4" width="24" height="16" rx="2" stroke="var(--gv-ember)" strokeWidth="1.5"/>
              <path d="M9 24H19" stroke="var(--gv-ember)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 20V24" stroke="var(--gv-ember)" strokeWidth="1.5" strokeLinecap="round"/>
              <rect x="6" y="8" width="16" height="8" rx="1" fill="var(--gv-ember)" opacity="0.1"/>
            </svg>
          </div>

          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 28, fontWeight: 900,
            color: 'var(--gv-ember)', letterSpacing: -1, marginBottom: 6,
          }}>
            {pcGames.length} Games
          </div>
          <div style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 10,
            color: 'var(--gv-muted)', letterSpacing: 4,
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            On PC · Direct Purchase
          </div>

          <p style={{ fontSize: 16, color: 'var(--gv-muted)', lineHeight: 1.8, marginBottom: 32, maxWidth: 380 }}>
            Maximum fidelity. PC titles deliver the full cinematic experience with high-res textures,
            uncapped framerates, and mod support. Buy once, own forever.
          </p>

          {/* Game list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
            {pcGames.map(game => (
              <a key={game.id} href={`/games/${game.slug}#store`} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px',
                background: 'var(--gv-surface2)',
                borderLeft: `3px solid ${game.accentColor}`,
                textDecoration: 'none', transition: 'background 0.2s',
              }} className="ps-game-row">
                <div>
                  <div style={{
                    fontFamily: 'var(--font-rajdhani)', fontSize: 14, fontWeight: 700,
                    color: game.accentColor, textTransform: 'uppercase', letterSpacing: 1,
                  }}>
                    {game.title} {game.subtitle}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-share-tech)', fontSize: 9,
                    color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 2,
                  }}>
                    {game.genre} · {game.price ? `$${(game.price/100).toFixed(2)}` : 'Free'}
                  </div>
                </div>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-orbitron)', fontSize: 14, fontWeight: 700, color: game.accentColor }}>
                  {game.price ? `$${(game.price/100).toFixed(2)}` : 'Free'}
                </span>
              </a>
            ))}
          </div>

          {/* PC CTA */}
          <a href="/games" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-rajdhani)', fontSize: 13, fontWeight: 700,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--gv-bg)', background: 'var(--gv-ember)',
            padding: '14px 32px', textDecoration: 'none',
            clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
            transition: 'box-shadow 0.3s',
          }} className="pc-cta">
            Browse PC Games
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ps-game-row:hover { background: var(--gv-surface) !important; }
        .pc-cta:hover { box-shadow: 0 0 40px rgba(255,69,0,0.4) !important; }
        @media(max-width:900px){
          .ps-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .ps-left, .ps-right { padding: 0 !important; }
        }
        @media(max-width:768px){ section { padding: 80px 24px !important; } }
      ` }} />
    </section>
  )
}
