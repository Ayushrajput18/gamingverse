'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { MediaBackground } from '@/components/ui/MediaBackground'
import { PlatformCTA, PlatformBadges } from '@/components/ui/PlatformCTA'
import type { Game } from '@/types'

interface Props {
  game: Game
  /** If true, shows full CTA panel. False = teaser card only */
  showCTA?: boolean
}

export function FeaturedGame({ game, showCTA = true }: Props) {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const mediaRef    = useRef<HTMLDivElement>(null)

  // Entry reveal
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.fromTo(content.querySelectorAll('.fg-anim'),
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.9, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  // Parallax on media
  useEffect(() => {
    const el = mediaRef.current
    if (!el) return
    const st = gsap.to(el, {
      y: '-15%',
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    return () => { (st as gsap.core.Tween).scrollTrigger?.kill() }
  }, [])

  return (
    <div ref={sectionRef} style={{ position: 'relative', padding: '0 60px 0' }} className="featured-game-wrap">
      <div style={{
        position: 'relative',
        height: 600,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {/* Parallax media */}
        <div ref={mediaRef} style={{ position: 'absolute', inset: '-15% 0', height: '130%' }}>
          <MediaBackground
            imageSrc={game.imageSrc}
            videoSrc={game.videoSrc}
            gradient={game.bgGradient}
            imageAlt={`${game.title} ${game.subtitle}`}
            overlay={`
              radial-gradient(ellipse at 40% 50%, transparent 20%, rgba(0,0,0,0.7) 100%),
              linear-gradient(to top, rgba(4,4,10,1) 0%, rgba(4,4,10,0.1) 60%, transparent 100%)
            `}
          />
        </div>

        {/* Accent border bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${game.accentColor}, transparent 60%)`,
          boxShadow: `0 0 20px ${game.accentColor}66`,
          zIndex: 10,
        }} />

        {/* Content */}
        <div ref={contentRef} style={{
          position: 'relative', zIndex: 10,
          padding: '0 0 52px',
          display: 'grid',
          gridTemplateColumns: showCTA ? '1fr auto' : '1fr',
          gap: 60,
          alignItems: 'flex-end',
          width: '100%',
        }}
          className="featured-inner"
        >
          {/* Left — text */}
          <div>
            {/* Featured label */}
            <div className="fg-anim" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              fontFamily: 'var(--font-share-tech)', fontSize: 10,
              color: game.accentColor, letterSpacing: 5,
              textTransform: 'uppercase', marginBottom: 16,
            }}>
              <span style={{ display: 'block', width: 24, height: 1, background: game.accentColor, boxShadow: `0 0 8px ${game.accentColor}` }} />
              Featured Title · {game.genre}
            </div>

            {/* Title */}
            <h2 className="fg-anim" style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: 'clamp(52px, 7vw, 88px)',
              fontWeight: 900, color: '#fff',
              textTransform: 'uppercase', lineHeight: 0.9,
              letterSpacing: -2, marginBottom: 20,
            }}>
              {game.title}
              {game.subtitle && (
                <><br /><span style={{ color: game.accentColor }}>{game.subtitle}</span></>
              )}
            </h2>

            {/* Description */}
            <p className="fg-anim" style={{
              fontSize: 16, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8, maxWidth: 520, marginBottom: 24,
            }}>
              {game.description}
            </p>

            {/* Meta row */}
            <div className="fg-anim" style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              {game.rating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: game.accentColor, fontSize: 16 }}>★</span>
                  <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 16, fontWeight: 700, color: '#fff' }}>{game.rating}</span>
                  <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)' }}>/10</span>
                </div>
              )}
              {game.downloads && (
                <div style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 10,
                  color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase',
                }}>
                  {game.downloads} downloads
                </div>
              )}
              {game.year && (
                <div style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 10,
                  color: 'var(--gv-muted)', letterSpacing: 2,
                }}>
                  {game.year}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="fg-anim" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {game.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 9,
                  color: 'rgba(255,255,255,0.3)', letterSpacing: 2,
                  textTransform: 'uppercase', padding: '4px 12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — CTA panel */}
          {showCTA && (
            <div className="fg-anim" style={{
              background: 'rgba(4,4,10,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--gv-border)',
              borderTop: `2px solid ${game.accentColor}`,
              padding: '28px 28px 24px',
              minWidth: 260, maxWidth: 300,
              flexShrink: 0,
            }}>
              <div style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 9,
                color: 'var(--gv-muted)', letterSpacing: 3,
                textTransform: 'uppercase', marginBottom: 20,
              }}>
                Available On
              </div>
              <PlatformCTA game={game} badgeSize="sm" showLabels />
              <Link href={`/games/${game.slug}`} style={{
                display: 'block', marginTop: 16, textAlign: 'center',
                fontFamily: 'var(--font-share-tech)', fontSize: 10,
                color: 'var(--gv-muted)', letterSpacing: 2,
                textDecoration: 'none', transition: 'color 0.2s',
              }} className="fg-details-link">
                View full details →
                <style dangerouslySetInnerHTML={{ __html: `.fg-details-link:hover { color: var(--gv-cyan) !important; }` }} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:900px){
          .featured-inner { grid-template-columns: 1fr !important; }
          .featured-game-wrap { padding: 0 24px !important; }
        }
      ` }} />
    </div>
  )
}
