'use client'

import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { MediaBackground } from '@/components/ui/MediaBackground'
import { PlatformBadges } from '@/components/ui/PlatformCTA'
import { GAMES } from '@/lib/data'
import type { Game } from '@/types'

// Duplicate for seamless loop
const ROW_A = [...GAMES, ...GAMES, ...GAMES]
const ROW_B = [...[...GAMES].reverse(), ...[...GAMES].reverse(), ...[...GAMES].reverse()]

const CARD_W = 280
const CARD_H = 380
const GAP    = 16

export function GamesMarquee() {
  const rowARef = useRef<HTMLDivElement>(null)
  const rowBRef = useRef<HTMLDivElement>(null)
  const tweenA  = useRef<gsap.core.Tween>()
  const tweenB  = useRef<gsap.core.Tween>()

  useEffect(() => {
    const rowA = rowARef.current
    const rowB = rowBRef.current
    if (!rowA || !rowB) return

    const totalW = GAMES.length * (CARD_W + GAP)

    // Row A → left
    tweenA.current = gsap.to(rowA, {
      x:        -totalW,
      duration: 35,
      ease:     'none',
      repeat:   -1,
    })

    // Row B → right (start offscreen left, move to 0)
    gsap.set(rowB, { x: -totalW })
    tweenB.current = gsap.to(rowB, {
      x:        0,
      duration: 40,
      ease:     'none',
      repeat:   -1,
    })

    // Pause on hover
    const pauseAll  = () => { tweenA.current?.pause(); tweenB.current?.pause() }
    const resumeAll = () => { tweenA.current?.resume(); tweenB.current?.resume() }

    rowA.addEventListener('mouseenter', pauseAll)
    rowA.addEventListener('mouseleave', resumeAll)
    rowB.addEventListener('mouseenter', pauseAll)
    rowB.addEventListener('mouseleave', resumeAll)

    return () => {
      tweenA.current?.kill()
      tweenB.current?.kill()
      rowA.removeEventListener('mouseenter', pauseAll)
      rowA.removeEventListener('mouseleave', resumeAll)
      rowB.removeEventListener('mouseenter', pauseAll)
      rowB.removeEventListener('mouseleave', resumeAll)
    }
  }, [])

  return (
    <div style={{ overflow: 'hidden', padding: '8px 0', position: 'relative' }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 10,
        background: 'linear-gradient(to right, var(--gv-bg), transparent)',
        pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 10,
        background: 'linear-gradient(to left, var(--gv-bg), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Row A — moving left */}
      <div style={{ overflow: 'hidden', marginBottom: GAP }}>
        <div ref={rowARef} style={{ display: 'flex', gap: GAP, width: 'max-content' }}>
          {ROW_A.map((game, i) => (
            <MarqueeCard key={`a-${i}`} game={game} />
          ))}
        </div>
      </div>

      {/* Row B — moving right */}
      <div style={{ overflow: 'hidden' }}>
        <div ref={rowBRef} style={{ display: 'flex', gap: GAP, width: 'max-content' }}>
          {ROW_B.map((game, i) => (
            <MarqueeCard key={`b-${i}`} game={game} variant="landscape" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Card variants ─────────────────────────────────────────────────────────────

function MarqueeCard({ game, variant = 'portrait' }: { game: Game; variant?: 'portrait' | 'landscape' }) {
  const router = useRouter()
  const w = variant === 'landscape' ? 360 : CARD_W
  const h = variant === 'landscape' ? 220 : CARD_H
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card   = cardRef.current
    if (!card) return
    const border = card.querySelector<HTMLElement>('.mc-border')
    const bg     = card.querySelector<HTMLElement>('.mc-bg')

    const enter = () => {
      if (border) gsap.to(border, { height: '100%', duration: 0.5, ease: 'expo.out' })
      if (bg)     gsap.to(bg,     { scale: 1.07,   duration: 0.8, ease: 'expo.out' })
    }
    const leave = () => {
      if (border) gsap.to(border, { height: '0%', duration: 0.4, ease: 'expo.in' })
      if (bg)     gsap.to(bg,     { scale: 1,     duration: 0.7, ease: 'expo.out' })
    }

    card.addEventListener('mouseenter', enter)
    card.addEventListener('mouseleave', leave)
    return () => { card.removeEventListener('mouseenter', enter); card.removeEventListener('mouseleave', leave) }
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={() => router.push(`/games/${game.slug}`)}
      style={{
        position: 'relative',
        width: w, height: h,
        flexShrink: 0,
        display: 'block',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--gv-surface2)',
      }}
    >
      {/* Background */}
      <div className="mc-bg" style={{ position: 'absolute', inset: 0 }}>
        <MediaBackground
          imageSrc={game.imageSrc}
          gradient={game.bgGradient}
          imageAlt={`${game.title} ${game.subtitle}`}
        />
      </div>

      {/* Accent border left */}
      <div className="mc-border" style={{
        position: 'absolute', top: 0, left: 0,
        width: 3, height: '0%',
        background: game.accentColor,
        boxShadow: `0 0 16px ${game.accentColor}`,
        zIndex: 10,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: variant === 'landscape' ? '20px 24px' : '24px 22px',
        zIndex: 5,
      }}>
        {/* Genre */}
        <div style={{
          fontFamily: 'var(--font-share-tech)', fontSize: 9,
          color: game.accentColor, letterSpacing: 3,
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          {game.genre}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: variant === 'landscape' ? 20 : 18,
          fontWeight: 900, color: '#fff',
          textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 10,
        }}>
          {game.title}{game.subtitle && <><br /><span style={{ color: game.accentColor }}>{game.subtitle}</span></>}
        </div>

        {/* Platform badges */}
        <PlatformBadges game={game} />
      </div>

      {/* Rating badge */}
      {game.rating && (
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '4px 8px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{ color: game.accentColor, fontSize: 11 }}>★</span>
          <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 12, fontWeight: 700, color: '#fff' }}>
            {game.rating}
          </span>
        </div>
      )}

      {/* Downloads badge (mobile games) */}
      {game.downloads && (
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 10,
          fontFamily: 'var(--font-share-tech)', fontSize: 9,
          color: 'rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.5)',
          padding: '3px 8px',
          letterSpacing: 2, textTransform: 'uppercase',
        }}>
          {game.downloads} downloads
        </div>
      )}
    </div>
  )
}
