import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'
import { GAMES } from '@/lib/data'

export const metadata: Metadata = { title: 'My Library' }

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const { userId } = auth()

  let purchases: Array<{ gameId: string; createdAt: Date }> = []
  try {
    purchases = await prisma.purchase.findMany({
      where: { userId: userId!, status: 'COMPLETED' },
      select: { gameId: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    // DB not connected — graceful fallback
  }

  // Match purchase IDs to our local game data (works before DB is seeded)
  const ownedGames = purchases.length > 0
    ? GAMES.filter(g => purchases.some(p => p.gameId === g.id))
    : []

  const successSlug = searchParams.success

  return (
    <div style={{ padding: '60px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 11, color: 'var(--gv-cyan)',
          letterSpacing: 5, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Player Portal
        </div>
        <h1 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 900, color: 'var(--gv-text)',
          textTransform: 'uppercase', letterSpacing: -1,
        }}>
          My <span style={{ color: 'var(--gv-cyan)' }}>Library</span>
        </h1>
        <p style={{
          marginTop: 12, fontSize: 15,
          color: 'var(--gv-muted)', fontFamily: 'var(--font-share-tech)',
          letterSpacing: 2,
        }}>
          {ownedGames.length} {ownedGames.length === 1 ? 'title' : 'titles'} owned
        </p>
      </div>

      {/* Purchase success banner */}
      {successSlug && (
        <div style={{
          marginBottom: 36,
          padding: '16px 24px',
          background: 'rgba(0,245,255,0.06)',
          border: '1px solid rgba(0,245,255,0.2)',
          borderLeft: '3px solid var(--gv-cyan)',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontSize: 20 }}>✓</span>
          <div>
            <div style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 15, fontWeight: 700,
              color: 'var(--gv-cyan)', letterSpacing: 2,
              textTransform: 'uppercase',
            }}>
              Purchase Complete
            </div>
            <div style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: 11, color: 'var(--gv-muted)', letterSpacing: 2, marginTop: 2,
            }}>
              {successSlug} has been added to your library
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {ownedGames.length === 0 && (
        <div style={{
          background: 'var(--gv-surface)',
          border: '1px solid var(--gv-border)',
          padding: '80px 40px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 24, opacity: 0.3 }}>⬡</div>
          <div style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 18, fontWeight: 700,
            color: 'var(--gv-text)', textTransform: 'uppercase',
            letterSpacing: 2, marginBottom: 12,
          }}>
            No Games Yet
          </div>
          <p style={{
            fontFamily: 'var(--font-share-tech)',
            fontSize: 12, color: 'var(--gv-muted)',
            letterSpacing: 2, marginBottom: 32,
          }}>
            Your library is empty. Start building your collection.
          </p>
          <Link
            href="/games"
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 12, fontWeight: 700,
              letterSpacing: 4, textTransform: 'uppercase',
              color: 'var(--gv-bg)',
              background: 'var(--gv-cyan)',
              padding: '12px 32px',
              textDecoration: 'none',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              display: 'inline-block',
            }}
          >
            Browse Games
          </Link>
        </div>
      )}

      {/* Games grid */}
      {ownedGames.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {ownedGames.map(game => (
            <div
              key={game.id}
              style={{
                background: game.bgGradient,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Owned badge */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                fontFamily: 'var(--font-share-tech)',
                fontSize: 9, color: 'var(--gv-bg)',
                background: 'var(--gv-cyan)',
                padding: '4px 10px', letterSpacing: 2,
                textTransform: 'uppercase', zIndex: 10,
              }}>
                Owned
              </div>

              <div style={{ padding: '60px 28px 28px', position: 'relative' }}>
                {/* Bottom overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-share-tech)',
                    fontSize: 9, color: game.accentColor,
                    letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6,
                  }}>
                    {game.genre}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 18, fontWeight: 900,
                    color: '#fff', textTransform: 'uppercase', lineHeight: 1.1,
                    marginBottom: 16,
                  }}>
                    {game.title} {game.subtitle}
                  </div>
                  <Link
                    href={`/games/${game.slug}`}
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: 3, textTransform: 'uppercase',
                      color: game.accentColor,
                      textDecoration: 'none',
                      borderBottom: `1px solid ${game.accentColor}44`,
                      paddingBottom: 2,
                      transition: 'border-color 0.2s',
                    }}
                  >
                    View Game →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
