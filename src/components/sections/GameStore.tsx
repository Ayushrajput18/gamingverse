'use client'

import { useState } from 'react'
import type { Game } from '@/types'
import { PlatformCTA } from '@/components/ui/PlatformCTA'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

interface Props { game: Game }
type Tab = 'overview' | 'features' | 'requirements'

export function GameStore({ game }: Props) {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <section id="store" style={{
      padding: '120px 60px', background: 'var(--gv-surface)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: -200, left: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${game.accentColor}08 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionEyebrow>Get the Game</SectionEyebrow>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 80, alignItems: 'start' }} className="store-grid">

          {/* ── Left ── */}
          <div>
            {/* Tab bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--gv-border)', marginBottom: 48 }}>
              {(['overview','features','requirements'] as Tab[]).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 11, letterSpacing: 3,
                  textTransform: 'uppercase', padding: '12px 24px',
                  background: 'none', border: 'none',
                  color: tab === t ? game.accentColor : 'var(--gv-muted)',
                  borderBottom: tab === t ? `2px solid ${game.accentColor}` : '2px solid transparent',
                  marginBottom: -1, cursor: 'none', transition: 'color 0.2s',
                }}>
                  {t}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div style={{ animation: 'tabFadeIn 0.3s ease' }}>
                <h2 style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(28px,3vw,40px)', fontWeight: 900,
                  color: 'var(--gv-text)', textTransform: 'uppercase',
                  lineHeight: 1.1, letterSpacing: -1, marginBottom: 24,
                }}>
                  {game.title} <span style={{ color: game.accentColor }}>{game.subtitle}</span>
                </h2>
                <p style={{ fontSize: 17, color: 'var(--gv-muted)', lineHeight: 1.8, maxWidth: 580, marginBottom: 32 }}>
                  {game.longDescription ?? game.description}
                </p>
                {/* Platform availability callout */}
                <AvailabilityCallout game={game} />
              </div>
            )}

            {tab === 'features' && game.features && (
              <div style={{ animation: 'tabFadeIn 0.3s ease' }}>
                {game.features.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    padding: '16px 20px', marginBottom: 8,
                    background: 'var(--gv-surface2)',
                    borderLeft: `2px solid ${game.accentColor}`,
                  }} className="feature-row">
                    <span style={{
                      fontFamily: 'var(--font-orbitron)', fontSize: 11,
                      color: game.accentColor, fontWeight: 700, flexShrink: 0, marginTop: 2,
                    }}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <span style={{ fontSize: 15, color: 'var(--gv-text)', lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'requirements' && game.systemRequirements && (
              <div style={{ animation: 'tabFadeIn 0.3s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="sysreq-grid">
                  {(['minimum','recommended'] as const).map(tier => (
                    <div key={tier} style={{
                      background: 'var(--gv-surface2)', padding: '28px 24px',
                      borderTop: `2px solid ${tier==='recommended' ? game.accentColor : 'rgba(255,255,255,0.1)'}`,
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-share-tech)', fontSize: 10,
                        color: tier==='recommended' ? game.accentColor : 'var(--gv-muted)',
                        letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20,
                      }}>{tier}</div>
                      {Object.entries(game.systemRequirements![tier]).map(([key, val]) => (
                        <div key={key} style={{
                          display: 'flex', justifyContent: 'space-between',
                          padding: '8px 0', borderBottom: '1px solid var(--gv-border)', fontSize: 13,
                        }}>
                          <span style={{ fontFamily:'var(--font-share-tech)', fontSize:10, color:'var(--gv-muted)', textTransform:'uppercase', letterSpacing:1 }}>{key}</span>
                          <span style={{ color:'var(--gv-text)', textAlign:'right', maxWidth:'55%' }}>{val as string}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'requirements' && !game.systemRequirements && (
              <div style={{ padding: '40px 24px', textAlign: 'center', background: 'var(--gv-surface2)' }}>
                <p style={{ fontFamily: 'var(--font-share-tech)', fontSize: 12, color: 'var(--gv-muted)', letterSpacing: 2 }}>
                  This is a mobile game — no PC requirements
                </p>
              </div>
            )}
          </div>

          {/* ── Right: Platform CTA card ── */}
          <div style={{
            background: 'var(--gv-surface2)',
            border: '1px solid var(--gv-border)',
            padding: 32, position: 'sticky', top: 100,
          }}>
            {/* Accent top bar */}
            <div style={{ height: 2, marginBottom: 28, background: `linear-gradient(90deg, ${game.accentColor}, transparent)` }} />

            <div style={{
              fontFamily: 'var(--font-orbitron)', fontSize: 18, fontWeight: 900,
              color: 'var(--gv-text)', textTransform: 'uppercase', marginBottom: 6,
            }}>
              {game.title} {game.subtitle}
            </div>

            <div style={{
              fontFamily: 'var(--font-share-tech)', fontSize: 10,
              color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20,
            }}>
              {game.genre} · {game.year}
            </div>

            {/* Rating */}
            {game.rating && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24,
                padding: '10px 0', borderBottom: '1px solid var(--gv-border)',
              }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ fontSize: 14, color: s <= Math.round(game.rating!/2) ? game.accentColor : 'var(--gv-surface)' }}>★</span>
                ))}
                <span style={{ fontFamily:'var(--font-orbitron)', fontSize:14, fontWeight:700, color:'var(--gv-text)', marginLeft:4 }}>{game.rating}</span>
                <span style={{ fontFamily:'var(--font-share-tech)', fontSize:10, color:'var(--gv-muted)' }}>/10</span>
                {game.downloads && (
                  <span style={{ fontFamily:'var(--font-share-tech)', fontSize:10, color:'var(--gv-muted)', marginLeft:'auto' }}>
                    {game.downloads}
                  </span>
                )}
              </div>
            )}

            {/* Platform CTA — THE KEY COMPONENT */}
            <PlatformCTA game={game} badgeSize="sm" showLabels />

            <p style={{
              fontFamily: 'var(--font-share-tech)', fontSize: 10,
              color: 'var(--gv-muted)', letterSpacing: 1,
              lineHeight: 1.6, marginTop: 16, textAlign: 'center',
            }}>
              {game.pcAvailable ? 'PC: Secure checkout via Stripe · ' : ''}
              {(game.androidAvailable || game.iosAvailable) ? 'Mobile: Free via store' : ''}
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tabFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .feature-row:hover { background: var(--gv-surface) !important; }
        @media(max-width:1024px){ .store-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:600px){ .sysreq-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:768px){ #store{ padding:80px 24px !important; } }
      ` }} />
    </section>
  )
}

// ── Platform availability callout ─────────────────────────────────────────────
function AvailabilityCallout({ game }: { game: Game }) {
  const items = []
  if (game.pcAvailable) items.push({ icon: '◈', label: 'PC', sub: 'Direct purchase · Download & play', color: 'var(--gv-cyan)' })
  if (game.androidAvailable) items.push({ icon: '◉', label: 'Android', sub: 'Google Play · Free download', color: '#00ff80' })
  if (game.iosAvailable) items.push({ icon: '◎', label: 'iOS', sub: 'App Store · Free download', color: '#a855f7' })

  if (items.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {items.map(item => (
        <div key={item.label} style={{
          padding: '14px 20px',
          background: 'var(--gv-surface2)',
          borderLeft: `3px solid ${item.color}`,
          flex: '1 1 160px',
        }}>
          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 13, fontWeight: 700,
            color: item.color, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 10 }}>{item.icon}</span> {item.label}
          </div>
          <div style={{ fontFamily: 'var(--font-share-tech)', fontSize: 10, color: 'var(--gv-muted)', letterSpacing: 1 }}>
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  )
}
