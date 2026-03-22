import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'GamingVerse Studios — Forge Digital Worlds'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#04040a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.06) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* Cyan glow orb top-left */}
        <div style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)',
          top: -150, left: -100,
          display: 'flex',
        }} />

        {/* Ember glow orb bottom-right */}
        <div style={{
          position: 'absolute',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,69,0,0.1) 0%, transparent 70%)',
          bottom: -200, right: -100,
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* Logo */}
          <div style={{
            fontSize: 56, fontWeight: 900,
            letterSpacing: 8,
            color: '#00f5ff',
            display: 'flex',
          }}>
            GAMING<span style={{ color: '#ff4500' }}>VERSE</span>
          </div>

          {/* Divider */}
          <div style={{
            width: 120, height: 2,
            background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
            display: 'flex',
          }} />

          {/* Tagline */}
          <div style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: 6,
            display: 'flex',
          }}>
            FORGE DIGITAL WORLDS
          </div>

          {/* Sub */}
          <div style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: 4,
            display: 'flex',
            gap: 20,
          }}>
            <span>BUILD WORLDS</span>
            <span style={{ color: '#00f5ff' }}>·</span>
            <span>BREAK LIMITS</span>
            <span style={{ color: '#ff4500' }}>·</span>
            <span>DEFINE LEGENDS</span>
          </div>
        </div>

        {/* Bottom url */}
        <div style={{
          position: 'absolute',
          bottom: 36,
          fontSize: 13,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: 3,
          display: 'flex',
        }}>
          gamingversestudios.com
        </div>
      </div>
    ),
    { ...size }
  )
}
