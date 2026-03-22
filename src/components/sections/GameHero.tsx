'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { parallaxLayer } from '@/lib/gsap'
import { MediaBackground } from '@/components/ui/MediaBackground'
import { Button } from '@/components/ui/Button'
import type { Game } from '@/types'

interface Props { game: Game }

export function GameHero({ game }: Props) {
  const sectionRef    = useRef<HTMLElement>(null)
  const mediaWrapRef  = useRef<HTMLDivElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)

  // GSAP entry timeline
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const els = content.querySelectorAll('.gh-anim')
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', delay: 0.4 }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  // GSAP parallax on media layer
  useEffect(() => {
    const el = mediaWrapRef.current
    if (!el) return
    const st = parallaxLayer(el, 0.35)
    return () => { st.scrollTrigger?.kill(); }
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative', height: '100vh', minHeight: 700,
      overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
    }}>
      {/* Media layer (parallax) */}
      <div ref={mediaWrapRef} style={{ position: 'absolute', inset: '-20% 0', height: '140%', zIndex: 0 }}>
        <MediaBackground
          imageSrc={game.imageSrc}
          videoSrc={game.videoSrc}
          gradient={game.bgGradient}
          imageAlt={`${game.title} ${game.subtitle}`}
          overlay={`
            radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%),
            linear-gradient(to top, rgba(4,4,10,1) 0%, rgba(4,4,10,0.2) 50%, transparent 100%)
          `}
        />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)`,
        backgroundSize: '80px 80px', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 10, padding: '0 60px 80px', width: '100%' }}>
        <a href="/games" className="gh-anim" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-share-tech)', fontSize: 11,
          color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textDecoration: 'none',
          textTransform: 'uppercase', marginBottom: 40, transition: 'color 0.2s',
        }} onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
          ← All Games
        </a>

        <div className="gh-anim" style={{
          fontFamily: 'var(--font-share-tech)', fontSize: 12,
          color: game.accentColor, letterSpacing: 5,
          textTransform: 'uppercase', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ display: 'block', width: 32, height: 1, background: game.accentColor }} />
          {game.genre} · {game.year}
        </div>

        <h1 className="gh-anim" style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(56px, 9vw, 120px)',
          fontWeight: 900, color: '#fff',
          textTransform: 'uppercase', lineHeight: 0.88,
          letterSpacing: -3, marginBottom: 28,
        }}>
          {game.title}
          {game.subtitle && <><br /><span style={{ color: game.accentColor }}>{game.subtitle}</span></>}
        </h1>

        <p className="gh-anim" style={{
          fontSize: 18, color: 'rgba(255,255,255,0.65)',
          maxWidth: 560, lineHeight: 1.7, marginBottom: 40,
        }}>
          {game.description}
        </p>

        <div className="gh-anim" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          {game.price ? (
            <>
              <Button href={`/games/${game.slug}#store`} variant="primary" size="lg">
                Buy — ${(game.price / 100).toFixed(2)}
              </Button>
              <Button href={`/games/${game.slug}#store`} variant="secondary" size="lg">
                Learn More ↓
              </Button>
            </>
          ) : (
            <Button href="#store" variant="secondary" size="lg">Coming Soon</Button>
          )}
          {game.rating && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', border: '1px solid rgba(255,255,255,0.12)',
            }}>
              <span style={{ fontSize: 20, color: game.accentColor }}>★</span>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 16, fontWeight: 700, color: '#fff' }}>{game.rating}</span>
              <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 2 }}>/ 10</span>
            </div>
          )}
        </div>

        <div className="gh-anim" style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
          {game.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-share-tech)', fontSize: 10,
              color: 'rgba(255,255,255,0.35)', letterSpacing: 2,
              textTransform: 'uppercase', padding: '4px 12px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
      }}>
        <div style={{
          writingMode: 'vertical-rl', fontFamily: 'var(--font-share-tech)',
          fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 4, textTransform: 'uppercase',
        }}>Scroll</div>
        <ScrollPulse />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:768px){ section { padding-left:24px !important; padding-right:24px !important; } }
      ` }} />
    </section>
  )
}

function ScrollPulse() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { scaleY: 0, opacity: 1, transformOrigin: 'top' },
      { scaleY: 1, opacity: 0, duration: 2, repeat: -1, ease: 'power1.inOut' }
    )
  }, [])
  return <div ref={ref} style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--gv-muted), transparent)' }} />
}
