import Link from 'next/link'

const FOOTER_COLS = [
  {
    title: 'Games',
    links: [
      { label: 'Ember Throne',  href: '/games/ember-throne' },
      { label: 'Void Protocol', href: '/games/void-protocol' },
      { label: 'Neon Wilds',    href: '/games/neon-wilds' },
      { label: 'Upcoming',      href: '/games' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About',    href: '/about' },
      { label: 'Team',     href: '/about#team' },
      { label: 'Press Kit',href: '/press' },
      { label: 'Careers',  href: '/careers' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Discord',    href: 'https://discord.gg/', external: true },
      { label: 'Twitter / X',href: 'https://x.com/',     external: true },
      { label: 'YouTube',    href: 'https://youtube.com/',external: true },
      { label: 'Newsletter', href: '/newsletter' },
    ],
  },
]

export function Footer() {
  return (
    <footer style={{
      background: 'var(--gv-surface)',
      borderTop: '1px solid var(--gv-border)',
      padding: '64px 60px 40px',
    }}>
      {/* Grid */}
      <div
        className="reveal footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 60,
          marginBottom: 48,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 20,
            fontWeight: 900,
            color: 'var(--gv-cyan)',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Gaming<span style={{ color: 'var(--gv-ember)' }}>Verse</span>
          </div>
          <p style={{
            fontSize: 14,
            color: 'var(--gv-muted)',
            lineHeight: 1.7,
            maxWidth: 280,
          }}>
            An independent game studio forging worlds at the intersection of art,
            technology, and obsession.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: 10,
              color: 'var(--gv-cyan)',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              {col.title}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, color: 'var(--gv-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      style={{ fontSize: 14, color: 'var(--gv-muted)', textDecoration: 'none', transition: 'color 0.3s' }}
                      className="footer-link"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--gv-border)',
        paddingTop: 28,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 11,
          color: 'var(--gv-muted)',
          letterSpacing: 2,
        }}>
          © {new Date().getFullYear()} GamingVerse Studios · All rights reserved
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {['𝕏', '▶', '◉'].map((icon, i) => (
            <a
              key={i}
              href="#"
              style={{
                width: 36, height: 36,
                border: '1px solid var(--gv-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: 'var(--gv-muted)',
                textDecoration: 'none',
                transition: 'border-color 0.3s, color 0.3s, box-shadow 0.3s',
              }}
              className="social-btn"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-link:hover { color: var(--gv-cyan) !important; }
        .social-btn:hover  {
          border-color: var(--gv-cyan) !important;
          color: var(--gv-cyan) !important;
          box-shadow: 0 0 12px rgba(0,245,255,0.2) !important;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 768px) {
          footer { padding: 48px 24px 32px !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </footer>
  )
}
