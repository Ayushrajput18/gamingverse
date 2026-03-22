import { UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const DASH_LINKS = [
  { href: '/dashboard',           icon: '◈', label: 'Overview'  },
  { href: '/dashboard/library',   icon: '⬡', label: 'Library'   },
  { href: '/dashboard/wishlist',  icon: '♡', label: 'Wishlist'  },
  { href: '/dashboard/profile',   icon: '◎', label: 'Profile'   },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  const user = await currentUser()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gv-bg)' }}>
      <aside style={{
        width: 260, flexShrink: 0,
        background: 'var(--gv-surface)',
        borderRight: '1px solid var(--gv-border)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 50,
      }}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid var(--gv-border)' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 14, fontWeight: 900,
            color: 'var(--gv-cyan)', letterSpacing: 3, textDecoration: 'none', textTransform: 'uppercase',
          }}>
            Gaming<span style={{ color: 'var(--gv-ember)' }}>Verse</span>
          </Link>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 3, marginTop: 4 }}>
            PLAYER PORTAL
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px' }}>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 4, padding: '8px 12px', marginBottom: 4 }}>
            NAVIGATION
          </div>
          {DASH_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="dash-link" style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 12px',
              fontFamily: 'var(--font-rajdhani)', fontSize: 14, fontWeight: 600,
              color: 'var(--gv-muted)', textDecoration: 'none',
              letterSpacing: 2, textTransform: 'uppercase',
              transition: 'color 0.2s, background 0.2s',
            }}>
              <span style={{ fontSize: 12, color: 'var(--gv-cyan)' }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--gv-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 border border-[rgba(0,245,255,0.2)]' } }} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{
              fontFamily: 'var(--font-rajdhani)', fontSize: 14, fontWeight: 600,
              color: 'var(--gv-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {user?.firstName ?? user?.emailAddresses[0]?.emailAddress}
            </div>
            <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 2 }}>PLAYER</div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 260, minHeight: '100vh' }}>
        {children}
      </main>

      <style>{`.dash-link:hover { color: var(--gv-cyan) !important; background: rgba(0,245,255,0.04) !important; }`}</style>
    </div>
  )
}
