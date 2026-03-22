'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useHeroEntryTimeline } from '@/hooks/useGSAPReveal'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const starfieldRef = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)
  const orb1Ref      = useRef<HTMLDivElement>(null)
  const orb2Ref      = useRef<HTMLDivElement>(null)

  // GSAP entry timeline
  useHeroEntryTimeline(containerRef)

  // Build star field
  useEffect(() => {
    const sf = starfieldRef.current
    if (!sf) return
    sf.innerHTML = ''
    for (let i = 0; i < 200; i++) {
      const s     = document.createElement('div')
      const size  = Math.random() * 2.5 + 0.5
      const delay = Math.random() * 5
      const dur   = Math.random() * 4 + 2
      Object.assign(s.style, {
        position: 'absolute',
        width: size + 'px', height: size + 'px',
        background: '#fff', borderRadius: '50%',
        left: Math.random() * 100 + '%',
        top:  Math.random() * 100 + '%',
        opacity: '0',
      })
      // GSAP yoyo twinkle per star
      gsap.to(s, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: dur,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      sf.appendChild(s)
    }
  }, [])

  // Mouse parallax on orbs and grid
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 2
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2
      if (gridRef.current) {
        gsap.to(gridRef.current, { x: xPct * 12, y: yPct * 12, duration: 0.8, ease: 'power2.out' })
      }
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, { x: xPct * 30, y: yPct * 30, duration: 1.2, ease: 'power2.out' })
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, { x: -xPct * 24, y: -yPct * 24, duration: 1.2, ease: 'power2.out' })
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh', minHeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source src="/games/pandemic-lost-haven/pandemic_trailer.mp4" type="video/mp4" />
      </video>

      {/* Stars */}
      <div ref={starfieldRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }} />

      {/* Grid */}
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        zIndex: 1,
      }} />

      {/* Orbs */}
      <div ref={orb1Ref} style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
        filter: 'blur(100px)', top: -100, left: -100,
      }} />
      <div ref={orb2Ref} style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,69,0,0.06) 0%, transparent 70%)',
        filter: 'blur(100px)', bottom: -150, right: -100,
      }} />

      {/* Abstract rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 1 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="hero-ring" style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 300 * i, height: 300 * i, borderRadius: '50%',
            border: `1px solid rgba(0,245,255,${0.05 - (i * 0.01)})`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 40px' }}>
        <div className="hero-eyebrow" style={{
          fontFamily: 'var(--font-share-tech)', fontSize: 12,
          color: 'var(--gv-cyan)', letterSpacing: 6,
          textTransform: 'uppercase', marginBottom: 24,
        }}>
          // Forging Digital Worlds Since 2020
        </div>

        <h1 className="hero-title" style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(48px, 8vw, 100px)',
          fontWeight: 900, lineHeight: 0.9,
          textTransform: 'uppercase', letterSpacing: -2,
          color: 'var(--gv-text)',
        }}>
          <GlitchText text="GAMING" />
          <br />VERSE<br />
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.48em', letterSpacing: 14 }}>STUDIOS</span>
        </h1>

        <p className="hero-sub" style={{
          fontSize: 18, fontWeight: 400, color: 'var(--gv-muted)',
          letterSpacing: 3, textTransform: 'uppercase', margin: '28px 0 48px',
        }}>
          Build Worlds &nbsp;·&nbsp; Break Limits &nbsp;·&nbsp; Define Legends
        </p>

        <div className="hero-ctas" style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button href="/games" variant="primary" size="lg">Explore Games</Button>
          <Button href="/#about" variant="secondary" size="lg">Our Story</Button>
        </div>

        {/* Dynamic status tape to fill space */}
        <div className="hero-status" style={{
          marginTop: 64, display: 'inline-flex', alignItems: 'center', gap: 24,
          padding: '16px 32px', background: 'rgba(0,245,255,0.02)',
          border: '1px solid rgba(0,245,255,0.1)', borderRadius: 100,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, background: 'var(--gv-cyan)', borderRadius: '50%', boxShadow: '0 0 10px var(--gv-cyan)', animation: 'pulseDot 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-cyan)', letterSpacing: 2, textTransform: 'uppercase' }}>
              Core Systems Online
            </span>
          </div>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Active Players: <span style={{ color: '#fff' }}>12,459,021</span>
          </span>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Latest Engine: <span style={{ color: '#fff' }}>v5.4.2</span>
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-hint" style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <ScrollLine />
        <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 4, textTransform: 'uppercase' }}>Scroll</span>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(to top, var(--gv-bg) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollLineAnim {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        @keyframes glitch {
          0%,92%,100% { opacity:0; transform:translateX(0); }
          93% { opacity:0.8; transform:translateX(-4px); }
          94% { opacity:0;   transform:translateX(4px); }
          95% { opacity:0.6; transform:translateX(-2px); }
          96% { opacity:0; }
        }
        @keyframes pulseDot {
          0% { opacity: 1; box-shadow: 0 0 10px var(--gv-cyan); }
          50% { opacity: 0.4; box-shadow: 0 0 2px var(--gv-cyan); }
          100% { opacity: 1; box-shadow: 0 0 10px var(--gv-cyan); }
        }
      ` }} />
    </section>
  )
}

function GlitchText({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', color: 'var(--gv-cyan)' }}>
      {text}
      <span aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0,
        color: 'var(--gv-ember)',
        clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        opacity: 0,
        animation: 'glitch 6s ease-in-out 2s infinite',
      }}>{text}</span>
    </span>
  )
}

function ScrollLine() {
  const lineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    gsap.fromTo(el,
      { scaleY: 0, opacity: 1, transformOrigin: 'top' },
      { scaleY: 1, opacity: 0, duration: 2, repeat: -1, ease: 'power1.inOut' }
    )
  }, [])
  return (
    <div ref={lineRef} style={{
      width: 1, height: 48,
      background: 'linear-gradient(to bottom, var(--gv-muted), transparent)',
    }} />
  )
}
