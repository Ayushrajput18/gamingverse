import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Users' }

async function getUserData() {
  try {
    // Group purchases by userId to get per-user stats
    const purchaseGroups = await prisma.purchase.groupBy({
      by:      ['userId'],
      where:   { status: 'COMPLETED' },
      _count:  { _all: true },
      _sum:    { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take:    50,
    })
    return purchaseGroups
  } catch { return [] }
}

export default async function AdminUsersPage() {
  const users = await getUserData()

  return (
    <div style={{ padding: '56px 44px' }}>
      <div style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-ember)', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 10 }}>
          Admin Panel
        </div>
        <h1 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: -1 }}>
          Player <span style={{ color: 'var(--gv-ember)' }}>Roster</span>
        </h1>
        <p style={{ marginTop: 12, fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
          Showing players with completed purchases. Full user management via{' '}
          <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--gv-cyan)', textDecoration: 'none' }}>
            Clerk Dashboard →
          </a>
        </p>
      </div>

      {users.length === 0 ? (
        <div style={{ background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', padding: '60px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
            No paying users yet
          </p>
        </div>
      ) : (
        <div style={{ background: 'var(--gv-surface)', border: '1px solid var(--gv-border)', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gv-border)' }}>
                {['Player ID', 'Games Purchased', 'Total Spent', 'Rank'].map(h => (
                  <th key={h} style={{
                    padding: '12px 20px', textAlign: 'left',
                    fontFamily: 'var(--font-share-tech)', fontSize: 9,
                    color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 400,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.userId} style={{ borderBottom: i < users.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}
                  className="admin-row">
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)' }}>
                    {u.userId.slice(0, 20)}…
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-orbitron)', fontSize: 15, fontWeight: 700, color: 'var(--gv-cyan)' }}>
                    {u._count._all}
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'var(--font-orbitron)', fontSize: 15, fontWeight: 700, color: 'var(--gv-text)' }}>
                    ${((u._sum.amount ?? 0) / 100).toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontFamily: 'var(--font-share-tech)', fontSize: 9, letterSpacing: 2,
                      textTransform: 'uppercase', padding: '3px 10px',
                      background: i === 0 ? 'rgba(255,170,0,0.1)' : 'rgba(255,255,255,0.04)',
                      color: i === 0 ? 'var(--gv-gold)' : 'var(--gv-muted)',
                      border: `1px solid ${i === 0 ? 'rgba(255,170,0,0.3)' : 'var(--gv-border)'}`,
                    }}>
                      {i === 0 ? '★ Top' : `#${i + 1}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`.admin-row:hover { background: rgba(255,255,255,0.02) !important; }`}</style>
    </div>
  )
}
