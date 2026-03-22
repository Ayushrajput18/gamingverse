import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CareersClient } from '@/components/sections/CareersClient'
import { OPEN_ROLES } from '@/lib/careers-data'

export const metadata: Metadata = {
  title: 'Careers',
  description: `Join GamingVerse Studios and help forge the next generation of immersive game worlds. ${OPEN_ROLES.length} open roles.`,
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--gv-bg)', minHeight: '100vh' }}>

        {/* ── Page hero ── */}
        <div style={{
          paddingTop: 160, paddingBottom: 80,
          paddingLeft: 60, paddingRight: 60,
          position: 'relative', overflow: 'hidden',
        }} className="careers-hero">

          {/* Grid bg */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px), linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
            background: 'linear-gradient(to top, var(--gv-bg), transparent)',
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
            <div style={{
              fontFamily: 'var(--font-share-tech)', fontSize: 11,
              color: 'var(--gv-cyan)', letterSpacing: 6,
              textTransform: 'uppercase', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ display: 'block', width: 40, height: 1, background: 'var(--gv-cyan)', boxShadow: '0 0 8px var(--gv-cyan)' }} />
              Join the Studio
            </div>

            <h1 style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: 'clamp(44px, 7vw, 80px)',
              fontWeight: 900, color: 'var(--gv-text)',
              textTransform: 'uppercase', lineHeight: 0.92,
              letterSpacing: -2, marginBottom: 28,
            }}>
              Build Worlds<br />
              <span style={{ color: 'var(--gv-cyan)' }}>With Us</span>
            </h1>

            <p style={{
              fontSize: 18, color: 'var(--gv-muted)',
              lineHeight: 1.8, maxWidth: 560, marginBottom: 40,
            }}>
              We are a small, obsessive team building games that respect the player.
              Every person here has a direct impact on what ships. No layers, no bureaucracy —
              just craft and ambition.
            </p>

            {/* Perks strip */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                '100% Remote',
                'Profit Sharing',
                'Ship Real Games',
                'No Crunch Policy',
                'Annual Retreat',
                'Hardware Budget',
              ].map(perk => (
                <span key={perk} style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 10,
                  color: 'var(--gv-muted)', letterSpacing: 2,
                  textTransform: 'uppercase', padding: '6px 14px',
                  border: '1px solid var(--gv-border)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ color: 'var(--gv-cyan)', fontSize: 8 }}>◆</span>
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Open roles counter ── */}
        <div style={{
          background: 'var(--gv-surface)',
          borderTop: '1px solid var(--gv-border)',
          borderBottom: '1px solid var(--gv-border)',
          padding: '20px 60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }} className="roles-strip">
          <div style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 10,
            color: 'var(--gv-muted)', letterSpacing: 4, textTransform: 'uppercase',
          }}>
            Open Positions
          </div>
          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 28, fontWeight: 700,
            color: 'var(--gv-cyan)', letterSpacing: -1,
          }}>
            {OPEN_ROLES.length}
            <span style={{ fontFamily: 'var(--font-share-tech)', fontSize: 11, color: 'var(--gv-muted)', letterSpacing: 3, marginLeft: 12 }}>
              ROLES
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase' }}>
            All remote · All full-time unless noted
          </div>
        </div>

        {/* ── Roles list ── */}
        <div style={{ paddingTop: 48 }}>
          <CareersClient />
        </div>

        {/* ── Spontaneous application ── */}
        <div style={{
          margin: '0 60px 80px',
          padding: '40px 48px',
          background: 'var(--gv-surface)',
          borderTop: '2px solid var(--gv-cyan)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 24,
        }} className="spontaneous-section">
          <div>
            <div style={{
              fontFamily: 'var(--font-orbitron)', fontSize: 20, fontWeight: 700,
              color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
            }}>
              Don&apos;t See Your Role?
            </div>
            <p style={{ fontSize: 15, color: 'var(--gv-muted)', lineHeight: 1.6, margin: 0, maxWidth: 440 }}>
              We occasionally hire for roles we haven&apos;t posted. Send us your portfolio and what
              you want to build — we read every email.
            </p>
          </div>
          <a
            href="mailto:careers@gamingversestudios.com?subject=Spontaneous Application"
            style={{
              fontFamily: 'var(--font-rajdhani)', fontSize: 12, fontWeight: 700,
              letterSpacing: 4, textTransform: 'uppercase',
              color: 'var(--gv-bg)', background: 'var(--gv-cyan)',
              padding: '13px 32px', textDecoration: 'none',
              clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              display: 'inline-block', whiteSpace: 'nowrap',
            }}
          >
            Send Us a Note
          </a>
        </div>

      </main>
      <Footer />

      <style>{`
        @media(max-width:768px){
          .careers-hero { padding: 120px 24px 60px !important; }
          .roles-strip { padding: 20px 24px !important; }
          .spontaneous-section { margin: 0 24px 60px !important; padding: 28px 28px !important; }
        }
      `}</style>
    </>
  )
}
