import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Purchases' }

async function getPurchases() {
  try {
    return await prisma.purchase.findMany({
      include: { game: { select: { title: true, subtitle: true, accentColor: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  } catch { return [] }
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: 'rgba(0,255,80,0.8)',
  PENDING:   'var(--gv-gold)',
  REFUNDED:  'var(--gv-ember)',
  FAILED:    'rgba(255,69,0,0.5)',
}
const STATUS_BG: Record<string, string> = {
  COMPLETED: 'rgba(0,255,80,0.08)',
  PENDING:   'rgba(255,170,0,0.08)',
  REFUNDED:  'rgba(255,69,0,0.08)',
  FAILED:    'rgba(255,69,0,0.05)',
}

export default async function AdminPurchasesPage() {
  const purchases = await getPurchases()
  const totalRevenue = purchases
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div style={{ padding: '56px 44px' }}>
      <div style={{ marginBottom: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-ember)', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 10 }}>
            Admin Panel
          </div>
          <h1 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: -1 }}>
            All <span style={{ color: 'var(--gv-ember)' }}>Purchases</span>
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 24, fontWeight: 700, color: 'var(--gv-cyan)', letterSpacing: -1 }}>
            ${(totalRevenue / 100).toFixed(2)}
          </div>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', marginTop: 4 }}>
            Total Revenue
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', overflow: 'auto' }}>
        {purchases.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
            No purchases yet
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gv-border)' }}>
                {['Order', 'User', 'Game', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} style={{
                    padding: '12px 18px', textAlign: 'left',
                    fontFamily: 'var(--font-share-tech)', fontSize: 9,
                    color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, i) => {
                const game = p.game as { title: string; subtitle?: string; accentColor: string; slug: string }
                return (
                  <tr key={p.id} style={{ borderBottom: i < purchases.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}
                    className="admin-row">
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)' }}>
                      #{p.id.slice(-6).toUpperCase()}
                    </td>
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)' }}>
                      {p.userId.slice(0, 14)}…
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 13, fontWeight: 600, color: game.accentColor }}>
                        {game.title} {game.subtitle ?? ''}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 700, color: 'var(--gv-text)' }}>
                      ${(p.amount / 100).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{
                        fontFamily: 'var(--font-share-tech)', fontSize: 9, letterSpacing: 2,
                        textTransform: 'uppercase', padding: '3px 10px',
                        background: STATUS_BG[p.status] ?? 'transparent',
                        color: STATUS_COLORS[p.status] ?? 'var(--gv-muted)',
                        border: `1px solid ${STATUS_COLORS[p.status] ?? 'var(--gv-border)'}22`,
                      }}>
                        {p.status.toLowerCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <style>{`.admin-row:hover { background: rgba(255,255,255,0.02) !important; }`}</style>
    </div>
  )
}
