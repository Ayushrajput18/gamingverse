import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'
import { GAMES } from '@/lib/data'

export const metadata: Metadata = { title: 'Wishlist' }

export default async function WishlistPage() {
  const { userId } = auth()

  let wishlistIds: string[] = []
  try {
    const entries = await prisma.wishlist.findMany({
      where:   { userId: userId! },
      select:  { gameId: true },
      orderBy: { createdAt: 'desc' },
    })
    wishlistIds = entries.map(e => e.gameId)
  } catch {
    // DB not connected — graceful fallback
  }

  const wishlisted = GAMES.filter(g => wishlistIds.includes(g.id))

  return (
    <div style={{ padding: '60px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: 'var(--font-share-tech)', fontSize: 11,
          color: 'var(--gv-cyan)', letterSpacing: 5,
          textTransform: 'uppercase', marginBottom: 12,
        }}>Player Portal</div>
        <h1 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(28px,3vw,42px)', fontWeight: 900,
          color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: -1,
        }}>
          My <span style={{ color: 'var(--gv-ember)' }}>Wishlist</span>
        </h1>
        <p style={{
          marginTop: 12, fontSize: 15, color: 'var(--gv-muted)',
          fontFamily: 'var(--font-share-tech)', letterSpacing: 2,
        }}>
          {wishlisted.length} {wishlisted.length === 1 ? 'title' : 'titles'} saved
        </p>
      </div>

      {/* Empty state */}
      {wishlisted.length === 0 && (
        <div style={{
          background: 'var(--gv-surface)', border: '1px solid var(--gv-border)',
          padding: '80px 40px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 24, opacity: 0.3 }}>♡</div>
          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 18, fontWeight: 700,
            color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12,
          }}>
            Nothing Saved Yet
          </div>
          <p style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 12,
            color: 'var(--gv-muted)', letterSpacing: 2, marginBottom: 32,
          }}>
            Hit the heart icon on any game to save it here.
          </p>
          <Link href="/games" style={{
            fontFamily: 'var(--font-rajdhani)', fontSize: 12, fontWeight: 700,
            letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--gv-bg)', background: 'var(--gv-ember)',
            padding: '12px 32px', textDecoration: 'none',
            clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
            display: 'inline-block',
          }}>
            Browse Games
          </Link>
        </div>
      )}

      {/* Wishlist grid */}
      {wishlisted.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}>
          {wishlisted.map(game => (
            <div key={game.id} style={{
              background: game.bgGradient,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 100%)',
              }} />

              {/* Price badge */}
              {game.price && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 700,
                  color: game.accentColor, zIndex: 10,
                }}>
                  ${(game.price / 100).toFixed(2)}
                </div>
              )}

              <div style={{ padding: '80px 28px 28px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 9,
                  color: game.accentColor, letterSpacing: 3,
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  {game.genre}
                </div>
                <div style={{
                  fontFamily: 'var(--font-orbitron)', fontSize: 20, fontWeight: 900,
                  color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 16,
                }}>
                  {game.title} {game.subtitle}
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Link href={`/games/${game.slug}#store`} style={{
                    fontFamily: 'var(--font-rajdhani)', fontSize: 11, fontWeight: 700,
                    letterSpacing: 3, textTransform: 'uppercase',
                    color: 'var(--gv-bg)', background: game.accentColor,
                    padding: '8px 20px', textDecoration: 'none',
                    clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                    display: 'inline-block',
                  }}>
                    Buy Now
                  </Link>
                  <Link href={`/games/${game.slug}`} style={{
                    fontFamily: 'var(--font-share-tech)', fontSize: 10,
                    color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                    letterSpacing: 2, transition: 'color 0.2s',
                  }}>
                    View →
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
