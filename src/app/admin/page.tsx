import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Overview' }

async function getStats() {
  try {
    const [revenue, purchases, users, games, recent] = await Promise.all([
      prisma.purchase.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
      prisma.purchase.count({ where: { status: 'COMPLETED' } }),
      prisma.user.count().catch(() => 0),
      prisma.game.count(),
      prisma.purchase.findMany({
        where: { status: 'COMPLETED' },
        include: { game: { select: { title: true, subtitle: true, accentColor: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ])
    return { revenue: revenue._sum.amount ?? 0, purchases, users, games, recent }
  } catch {
    return { revenue: 0, purchases: 0, users: 0, games: 0, recent: [] }
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Revenue',   value: `$${(stats.revenue / 100).toFixed(2)}`, icon: '◈', color: 'var(--gv-cyan)' },
    { label: 'Purchases',       value: stats.purchases,  icon: '⬡', color: 'var(--gv-gold)' },
    { label: 'Users',           value: stats.users,      icon: '◎', color: 'var(--gv-ember)' },
    { label: 'Published Games', value: stats.games,      icon: '⬟', color: 'rgba(0,255,80,0.8)' },
  ]

  return (
    <div style={{ padding: '56px 44px' }}>
      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-ember)', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 10 }}>
          Admin Panel
        </div>
        <h1 style={{
          fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(24px,3vw,36px)',
          fontWeight: 900, color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: -1,
        }}>
          Studio <span style={{ color: 'var(--gv-ember)' }}>Overview</span>
        </h1>
      </div>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, marginBottom: 48 }} className="admin-stats">
        {cards.map(c => (
          <div key={c.label} style={{
            background: 'var(--gv-surface)', padding: '28px 24px',
            borderTop: `2px solid ${c.color}`,
          }}>
            <div style={{ fontSize: 20, marginBottom: 12 }}>{c.icon}</div>
            <div style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: typeof c.value === 'string' ? 24 : 32,
              fontWeight: 700, color: c.color,
              letterSpacing: -1, lineHeight: 1, marginBottom: 6,
            }}>
              {c.value}
            </div>
            <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase' }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick nav */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 48, flexWrap: 'wrap' }}>
        {[
          { label: 'Manage Games',     href: '/admin/games',     color: 'var(--gv-cyan)' },
          { label: 'View Users',       href: '/admin/users',     color: 'var(--gv-ember)' },
          { label: 'All Purchases',    href: '/admin/purchases', color: 'var(--gv-gold)' },
        ].map(a => (
          <Link key={a.href} href={a.href} style={{
            fontFamily: 'var(--font-rajdhani)', fontSize: 11, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--gv-bg)', background: a.color,
            padding: '10px 24px', textDecoration: 'none',
            clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
            display: 'inline-block', transition: 'opacity 0.2s',
          }}>
            {a.label}
          </Link>
        ))}
      </div>

      {/* Recent purchases */}
      <div>
        <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>
          Recent Purchases
        </div>
        <div style={{ background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', overflow: 'hidden' }}>
          {stats.recent.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center', fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
              No purchases yet
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--gv-border)' }}>
                  {['User ID', 'Game', 'Amount', 'Date'].map(h => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left',
                      fontFamily: 'var(--font-share-tech)', fontSize: 9,
                      color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 400,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < stats.recent.length - 1 ? '1px solid var(--gv-border)' : 'none' }}>
                    <td style={{ padding: '12px 20px', fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)' }}>
                      {p.userId.slice(0, 18)}…
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{
                        fontFamily: 'var(--font-rajdhani)', fontSize: 13, fontWeight: 600,
                        color: (p.game as { accentColor: string }).accentColor,
                      }}>
                        {(p.game as { title: string; subtitle?: string }).title} {(p.game as { subtitle?: string }).subtitle ?? ''}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 700, color: 'var(--gv-cyan)' }}>
                      ${(p.amount / 100).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 20px', fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)' }}>
                      {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .admin-stats{ grid-template-columns:repeat(2,1fr) !important; } }
      `}</style>
    </div>
  )
}
