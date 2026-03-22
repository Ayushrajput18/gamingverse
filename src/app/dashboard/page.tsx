import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const { userId } = auth()
  const user = await currentUser()

  // Fetch purchase count from DB
  let purchaseCount = 0
  try {
    purchaseCount = await prisma.purchase.count({
      where: { userId: userId!, status: 'COMPLETED' },
    })
  } catch {
    // DB not connected in dev — graceful fallback
  }

  const displayName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress ?? 'Player'
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown'

  const summaryCards = [
    { label: 'Games Owned',    value: purchaseCount, icon: '⬡', color: 'var(--gv-cyan)' },
    { label: 'Hours Played',   value: 0,             icon: '◎', color: 'var(--gv-gold)' },
    { label: 'Achievements',   value: 0,             icon: '◈', color: 'var(--gv-ember)' },
    { label: 'Member Since',   value: joinDate,      icon: '⬟', color: 'rgba(255,255,255,0.4)', isText: true },
  ]

  return (
    <div style={{ padding: '60px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: 52 }}>
        <div style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 11, color: 'var(--gv-cyan)',
          letterSpacing: 5, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Welcome back
        </div>
        <h1 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 900, color: 'var(--gv-text)',
          textTransform: 'uppercase', letterSpacing: -1,
        }}>
          {displayName}
        </h1>
      </div>

      {/* Summary cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2, marginBottom: 52,
      }}
        className="dash-cards"
      >
        {summaryCards.map(card => (
          <div key={card.label} style={{
            background: 'var(--gv-surface)',
            padding: '28px 24px',
            borderTop: `2px solid ${card.color}`,
          }}>
            <div style={{ fontSize: 20, marginBottom: 12 }}>{card.icon}</div>
            <div style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: card.isText ? 14 : 32,
              fontWeight: 700,
              color: card.color,
              letterSpacing: card.isText ? 0 : -1,
              marginBottom: 6,
              lineHeight: 1,
            }}>
              {card.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: 10, color: 'var(--gv-muted)',
              letterSpacing: 3, textTransform: 'uppercase',
            }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 52 }}>
        <div style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 10, color: 'var(--gv-muted)',
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16,
        }}>
          Quick Actions
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Browse Games',   href: '/games',             color: 'var(--gv-cyan)' },
            { label: 'My Library',     href: '/dashboard/library', color: 'var(--gv-gold)' },
            { label: 'Edit Profile',   href: '/dashboard/profile', color: 'var(--gv-ember)' },
          ].map(action => (
            <Link
              key={action.href}
              href={action.href}
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: 12, fontWeight: 700,
                letterSpacing: 3, textTransform: 'uppercase',
                color: 'var(--gv-bg)',
                background: action.color,
                padding: '12px 28px',
                textDecoration: 'none',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                transition: 'opacity 0.2s',
                display: 'inline-block',
              }}
              className="quick-action"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Activity placeholder */}
      <div>
        <div style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 10, color: 'var(--gv-muted)',
          letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16,
        }}>
          Recent Activity
        </div>
        <div style={{
          background: 'var(--gv-surface)',
          border: '1px solid var(--gv-border)',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-share-tech)',
            fontSize: 12, color: 'var(--gv-muted)',
            letterSpacing: 2,
          }}>
            No activity yet — start by{' '}
            <Link href="/games" style={{ color: 'var(--gv-cyan)', textDecoration: 'none' }}>
              exploring our games
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .quick-action:hover { opacity: 0.85; }
        @media (max-width: 900px) {
          .dash-cards { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  )
}
