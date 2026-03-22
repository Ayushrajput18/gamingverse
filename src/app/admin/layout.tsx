import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const ADMIN_LINKS = [
  { href: '/admin',             icon: '◈', label: 'Overview'   },
  { href: '/admin/games',       icon: '⬡', label: 'Games'      },
  { href: '/admin/users',       icon: '◎', label: 'Users'      },
  { href: '/admin/purchases',   icon: '⬟', label: 'Purchases'  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gv-bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: 'var(--gv-surface)',
        borderRight: '1px solid rgba(255,69,0,0.15)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 50,
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,69,0,0.12)' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 900,
            color: 'var(--gv-ember)', letterSpacing: 3, textDecoration: 'none', textTransform: 'uppercase',
          }}>
            Admin<span style={{ color: 'var(--gv-muted)' }}> Panel</span>
          </Link>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'rgba(255,69,0,0.5)', letterSpacing: 3, marginTop: 4 }}>
            GAMINGVERSE STUDIOS
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 10px' }}>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 4, padding: '6px 10px', marginBottom: 4 }}>
            MANAGEMENT
          </div>
          {ADMIN_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="admin-link" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 10px',
              fontFamily: 'var(--font-rajdhani)', fontSize: 13, fontWeight: 600,
              color: 'var(--gv-muted)', textDecoration: 'none',
              letterSpacing: 2, textTransform: 'uppercase',
              transition: 'color 0.2s, background 0.2s',
            }}>
              <span style={{ fontSize: 11, color: 'var(--gv-ember)' }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ margin: '16px 10px', height: 1, background: 'rgba(255,255,255,0.06)' }} />

          <Link href="/dashboard" className="admin-link" style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px',
            fontFamily: 'var(--font-share-tech)', fontSize: 10,
            color: 'var(--gv-muted)', textDecoration: 'none',
            letterSpacing: 3, textTransform: 'uppercase', transition: 'color 0.2s',
          }}>
            ← Player Dashboard
          </Link>
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,69,0,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7 border border-[rgba(255,69,0,0.3)]' } }} />
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'rgba(255,69,0,0.6)', letterSpacing: 2 }}>
            ADMIN
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 240, minHeight: '100vh' }}>
        {children}
      </main>

      <style>{`.admin-link:hover { color: var(--gv-ember) !important; background: rgba(255,69,0,0.04) !important; }`}</style>
    </div>
  )
}
