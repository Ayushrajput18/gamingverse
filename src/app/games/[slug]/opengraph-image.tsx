import { ImageResponse } from 'next/og'
import { GAMES } from '@/lib/data'

export const runtime = 'edge'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

export default function GameOgImage({ params }: Props) {
  const game = GAMES.find(g => g.slug === params.slug)

  // Fallback if game not found
  const title       = game ? `${game.title} ${game.subtitle ?? ''}`.trim() : 'GamingVerse'
  const genre       = game?.genre  ?? 'Game'
  const year        = game?.year   ?? new Date().getFullYear()
  const accentColor = game?.accentColor ?? '#00f5ff'
  const rating      = game?.rating
  const price       = game?.price

  // Parse gradient for a solid bg color
  const darkBg = '#04040a'

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex',
        background: darkBg,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Left accent bar */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 6,
          background: accentColor,
          display: 'flex',
          boxShadow: `0 0 40px ${accentColor}`,
        }} />

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* Accent glow */}
        <div style={{
          position: 'absolute',
          width: 700, height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 65%)`,
          top: -200, left: -100,
          display: 'flex',
        }} />

        {/* Content container */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          width: '100%',
        }}>
          {/* Top row — studio logo + genre/year */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
              fontSize: 18, fontWeight: 900,
              color: '#00f5ff', letterSpacing: 5,
              display: 'flex',
            }}>
              GAMING<span style={{ color: '#ff4500' }}>VERSE</span>
            </div>
            <div style={{
              fontSize: 13, color: accentColor,
              letterSpacing: 5, display: 'flex', gap: 12,
            }}>
              <span>{genre.toUpperCase()}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{year}</span>
            </div>
          </div>

          {/* Main title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              fontSize: 96, fontWeight: 900,
              color: '#ffffff',
              letterSpacing: -3,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <span>{game?.title ?? title}</span>
              {game?.subtitle && (
                <span style={{ color: accentColor }}>{game.subtitle}</span>
              )}
            </div>

            {/* Description snippet */}
            {game?.description && (
              <div style={{
                fontSize: 20, color: 'rgba(255,255,255,0.45)',
                letterSpacing: 0.5, lineHeight: 1.5,
                maxWidth: 680, display: 'flex',
                marginTop: 16,
              }}>
                {game.description}
              </div>
            )}
          </div>

          {/* Bottom row — price, rating, platforms */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {price && (
              <div style={{
                fontSize: 28, fontWeight: 900,
                color: accentColor, letterSpacing: -1,
                display: 'flex',
              }}>
                ${(price / 100).toFixed(2)}
              </div>
            )}
            {rating && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 18px',
                border: '1px solid rgba(255,255,255,0.15)',
                fontSize: 18,
              }}>
                <span style={{ color: accentColor }}>★</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{rating}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>/10</span>
              </div>
            )}
            {game?.platforms && game.platforms.length > 0 && (
              <div style={{ display: 'flex', gap: 12 }}>
                {game.platforms.slice(0, 3).map((p: string) => (
                  <div key={p} style={{
                    fontSize: 11, color: 'rgba(255,255,255,0.3)',
                    letterSpacing: 3, textTransform: 'uppercase', display: 'flex',
                  }}>
                    {p}
                  </div>
                ))}
              </div>
            )}
            {/* Domain */}
            <div style={{
              marginLeft: 'auto',
              fontSize: 13, color: 'rgba(255,255,255,0.2)',
              letterSpacing: 3, display: 'flex',
            }}>
              gamingversestudios.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
