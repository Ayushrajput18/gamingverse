'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlatformBadges } from '@/components/ui/PlatformCTA'
import { MediaBackground } from '@/components/ui/MediaBackground'
import type { Game } from '@/types'

const FILTERS = ['All', 'Mobile', 'PC', 'Android', 'iOS']

export function GamesPageClient({ games }: { games: Game[] }) {
  const [filter, setFilter] = useState('All')

  const filtered = games.filter(g => {
    if (filter === 'All')     return true
    if (filter === 'Mobile')  return g.androidAvailable || g.iosAvailable
    if (filter === 'PC')      return g.pcAvailable
    if (filter === 'Android') return g.androidAvailable
    if (filter === 'iOS')     return g.iosAvailable
    return true
  })

  return (
    <section style={{ padding: '0 60px 120px' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 48, flexWrap: 'wrap', alignItems: 'center' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 11,
            letterSpacing: 3, textTransform: 'uppercase',
            padding: '8px 20px', cursor: 'none',
            background: filter === f ? 'var(--gv-cyan)' : 'var(--gv-surface)',
            color:      filter === f ? 'var(--gv-bg)'   : 'var(--gv-muted)',
            border: `1px solid ${filter === f ? 'var(--gv-cyan)' : 'var(--gv-border)'}`,
            transition: 'all 0.2s ease',
          }}>
            {f}
          </button>
        ))}
        <div style={{
          marginLeft: 'auto', fontFamily: 'var(--font-share-tech)',
          fontSize: 11, color: 'var(--gv-muted)', letterSpacing: 3,
        }}>
          {filtered.length} {filtered.length === 1 ? 'title' : 'titles'}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
        {filtered.map(game => <GameListCard key={game.id} game={game} />)}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:768px){ section{ padding:0 24px 80px !important; } }
      ` }} />
    </section>
  )
}

function GameListCard({ game }: { game: Game }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/games/${game.slug}`)}
      style={{ display: 'block', textDecoration: 'none', position: 'relative', cursor: 'pointer' }}
      className="glc"
    >
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <div className="glc-bg" style={{
          position: 'absolute', inset: 0,
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}>
          <MediaBackground gradient={game.bgGradient} imageSrc={game.imageSrc} imageAlt={game.title} />
        </div>

        <div className="glc-border" style={{
          position: 'absolute', top: 0, left: 0,
          width: 3, height: '0%',
          background: game.accentColor,
          boxShadow: `0 0 20px ${game.accentColor}`,
          transition: 'height 0.5s ease', zIndex: 20,
        }} />

        {/* Year badge */}
        <div style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          fontFamily: 'var(--font-share-tech)', fontSize: 10,
          color: game.accentColor, letterSpacing: 3,
        }}>{game.year}</div>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
          padding: '28px', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', zIndex: 5,
        }}>
          <div style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 9,
            color: game.accentColor, letterSpacing: 3,
            textTransform: 'uppercase', marginBottom: 6,
          }}>{game.genre}</div>

          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 20, fontWeight: 900,
            color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 12,
          }}>
            {game.title} {game.subtitle}
          </div>

          {/* Platform badges */}
          <PlatformBadges game={game} />

          {/* Price or free badge */}
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            {game.pcAvailable && game.price && (
              <span style={{
                fontFamily: 'var(--font-orbitron)', fontSize: 14, fontWeight: 700,
                color: game.accentColor,
              }}>
                PC ${(game.price/100).toFixed(2)}
              </span>
            )}
            {(game.androidAvailable || game.iosAvailable) && (
              <span style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 10,
                color: 'rgba(0,255,80,0.8)', letterSpacing: 2,
                textTransform: 'uppercase',
                padding: '2px 8px', border: '1px solid rgba(0,255,80,0.2)',
              }}>
                Free on Mobile
              </span>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .glc:hover .glc-bg  { transform: scale(1.05) !important; }
        .glc:hover .glc-border { height: 100% !important; }
      ` }} />
    </div>
  )
}
