import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Games' }

async function getGames() {
  try {
    return await prisma.game.findMany({ orderBy: { year: 'desc' } })
  } catch { return [] }
}

export default async function AdminGamesPage() {
  const games = await getGames()

  return (
    <div style={{ padding: '56px 44px' }}>
      <div style={{ marginBottom: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-ember)', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 10 }}>
            Admin Panel
          </div>
          <h1 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: -1 }}>
            Games <span style={{ color: 'var(--gv-ember)' }}>Catalogue</span>
          </h1>
        </div>
        <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
          {games.length} titles total
        </div>
      </div>

      {games.length === 0 ? (
        <div style={{ background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', padding: '60px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
            No games in DB. Run: <code style={{ color: 'var(--gv-cyan)' }}>npm run db:seed</code>
          </p>
        </div>
      ) : (
        <div style={{ background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gv-border)' }}>
                {['Game', 'Genre', 'Year', 'Price', 'Status', 'Stripe ID', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '12px 20px', textAlign: 'left',
                    fontFamily: 'var(--font-share-tech)', fontSize: 9,
                    color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 400,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {games.map((game, i) => (
                <tr key={game.id} style={{ borderBottom: i < games.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 0.15s' }}
                  className="admin-row">
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 700, color: game.accentColor }}>
                      {game.title} {game.subtitle ?? ''}
                    </div>
                    <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 1, marginTop: 2 }}>
                      {game.slug}
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)' }}>{game.genre}</td>
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)' }}>{game.year}</td>
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 700, color: 'var(--gv-cyan)' }}>
                    {game.price ? `$${(game.price / 100).toFixed(2)}` : '—'}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontFamily: 'var(--font-share-tech)', fontSize: 9, letterSpacing: 2,
                      textTransform: 'uppercase', padding: '3px 10px',
                      background: game.status === 'RELEASED' ? 'rgba(0,255,80,0.1)' : 'rgba(255,170,0,0.1)',
                      color: game.status === 'RELEASED' ? 'rgba(0,255,80,0.8)' : 'var(--gv-gold)',
                      border: `1px solid ${game.status === 'RELEASED' ? 'rgba(0,255,80,0.2)' : 'rgba(255,170,0,0.2)'}`,
                    }}>
                      {game.status.toLowerCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)' }}>
                    {game.stripePriceId ? (
                      <span style={{ color: 'rgba(0,255,80,0.7)' }}>✓ Wired</span>
                    ) : (
                      <span style={{ color: 'var(--gv-ember)', opacity: 0.7 }}>Not set</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <a href={`/games/${game.slug}`} target="_blank" style={{
                      fontFamily: 'var(--font-share-tech)', fontSize: 9,
                      color: 'var(--gv-cyan)', letterSpacing: 2, textDecoration: 'none',
                      textTransform: 'uppercase', transition: 'opacity 0.2s',
                    }}>
                      View →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', borderLeft: '3px solid var(--gv-gold)' }}>
        <p style={{ fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)', letterSpacing: 1, lineHeight: 1.7, margin: 0 }}>
          To wire Stripe: create a product in your Stripe dashboard → copy the Price ID → add it to <code style={{ color: 'var(--gv-cyan)' }}>prisma/seed.ts</code> → re-run <code style={{ color: 'var(--gv-cyan)' }}>npm run db:seed</code>
        </p>
      </div>

      <style>{`.admin-row:hover { background: rgba(255,255,255,0.02); }`}</style>
    </div>
  )
}
