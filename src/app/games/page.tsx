import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GamesPageClient } from '@/components/sections/GamesPageClient'
import { GAMES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Games',
  description: 'Explore every world we have built — cinematic games forged with obsession.',
}

export default function GamesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <div style={{
          paddingTop: 160,
          paddingBottom: 80,
          paddingLeft: 60,
          paddingRight: 60,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Grid bg */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
            background: 'linear-gradient(to top, var(--gv-bg), transparent)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: 11,
              color: 'var(--gv-cyan)',
              letterSpacing: 6,
              textTransform: 'uppercase',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <span style={{ display: 'block', width: 40, height: 1, background: 'var(--gv-cyan)' }} />
              Our Universe
            </div>
            <h1 style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 900,
              color: 'var(--gv-text)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: -2,
            }}>
              All <span style={{ color: 'var(--gv-cyan)' }}>Worlds</span>
            </h1>
            <p style={{
              marginTop: 20,
              fontSize: 17,
              color: 'var(--gv-muted)',
              maxWidth: 500,
              lineHeight: 1.7,
            }}>
              {GAMES.length} titles. Each one a universe worth getting lost in.
            </p>
          </div>
        </div>

        <GamesPageClient games={GAMES} />
      </main>
      <Footer />
    </>
  )
}
