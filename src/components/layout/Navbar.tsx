'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import { NAV_LINKS } from '@/lib/data'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: scrolled ? '16px 60px' : '24px 60px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(4,4,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--gv-border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-orbitron)', fontSize: 16, fontWeight: 900,
        color: 'var(--gv-cyan)', letterSpacing: 4, textDecoration: 'none', textTransform: 'uppercase',
      }}>
        Gaming<span style={{ color: 'var(--gv-ember)' }}>Verse</span>
      </Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <Link href={link.href} style={{
              fontFamily: 'var(--font-rajdhani)', fontSize: 13, fontWeight: 600,
              color: 'var(--gv-muted)', textDecoration: 'none',
              letterSpacing: 3, textTransform: 'uppercase',
              position: 'relative', paddingBottom: 4, transition: 'color 0.3s',
            }} className="nav-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-desktop">
        {isLoaded && (
          isSignedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Link href="/dashboard" style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 10,
                color: 'var(--gv-muted)', textDecoration: 'none',
                letterSpacing: 3, textTransform: 'uppercase',
                transition: 'color 0.2s',
              }} className="nav-link">
                Dashboard
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: 'w-8 h-8 border border-[rgba(0,245,255,0.3)]' } }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <SignInButton mode="modal">
                <button style={{
                  fontFamily: 'var(--font-rajdhani)', fontSize: 12, fontWeight: 600,
                  color: 'var(--gv-muted)', background: 'none', border: 'none',
                  letterSpacing: 3, textTransform: 'uppercase', cursor: 'none',
                  transition: 'color 0.2s',
                }}
                  className="nav-link"
                >
                  Sign In
                </button>
              </SignInButton>
              <Button href="/sign-up" variant="primary" size="sm">Join Free</Button>
            </div>
          )
        )}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile" aria-label="Toggle menu"
        style={{ background: 'none', border: 'none', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: 24, height: 1,
            background: menuOpen && i === 1 ? 'transparent' : 'var(--gv-cyan)',
            transition: 'all 0.3s ease',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(4px, 6px)'
              : i === 2 ? 'rotate(-45deg) translate(4px, -6px)' : 'none'
              : 'none',
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(4,4,10,0.98)', zIndex: 99,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'var(--font-orbitron)', fontSize: 24, fontWeight: 700,
              color: 'var(--gv-text)', textDecoration: 'none',
              letterSpacing: 4, textTransform: 'uppercase',
            }}>
              {link.label}
            </Link>
          ))}
          {isSignedIn
            ? <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-orbitron)', fontSize: 18, color: 'var(--gv-cyan)', textDecoration: 'none', letterSpacing: 3 }}>Dashboard</Link>
            : <Button href="/sign-up" variant="primary" size="lg">Join Free</Button>
          }
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gv-cyan); box-shadow: 0 0 8px var(--gv-cyan);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--gv-cyan) !important; }
        .nav-link:hover::after { width: 100%; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
      ` }} />
    </nav>
  )
}
