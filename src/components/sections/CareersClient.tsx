'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { OPEN_ROLES, DEPARTMENTS, type JobRole } from '@/lib/careers-data'

export function CareersClient() {
  const [dept,     setDept]     = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [applying, setApplying] = useState<string | null>(null)

  const filtered = dept === 'All' ? OPEN_ROLES : OPEN_ROLES.filter(r => r.department === dept)

  return (
    <div style={{ padding: '0 60px 120px' }} className="careers-body">
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 52, flexWrap: 'wrap' }}>
        {DEPARTMENTS.map(d => (
          <button key={d} onClick={() => setDept(d)} style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 11,
            letterSpacing: 3, textTransform: 'uppercase',
            padding: '8px 20px', cursor: 'none',
            background: dept === d ? 'var(--gv-cyan)' : 'var(--gv-surface)',
            color:      dept === d ? 'var(--gv-bg)'   : 'var(--gv-muted)',
            border: `1px solid ${dept === d ? 'var(--gv-cyan)' : 'var(--gv-border)'}`,
            transition: 'all 0.2s ease',
          }}>
            {d}
          </button>
        ))}
        <div style={{
          marginLeft: 'auto', display: 'flex', alignItems: 'center',
          fontFamily: 'var(--font-share-tech)', fontSize: 11,
          color: 'var(--gv-muted)', letterSpacing: 3,
        }}>
          {filtered.length} {filtered.length === 1 ? 'role' : 'roles'}
        </div>
      </div>

      {/* Role cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.map(role => (
          <RoleCard
            key={role.id}
            role={role}
            isExpanded={expanded === role.id}
            isApplying={applying === role.id}
            onToggle={() => setExpanded(p => p === role.id ? null : role.id)}
            onApply={() => setApplying(p => p === role.id ? null : role.id)}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@media(max-width:768px){ .careers-body{ padding: 0 24px 80px !important; } }` }} />
    </div>
  )
}

// ── Individual role card ──────────────────────────────────────────────────────

function RoleCard({
  role, isExpanded, isApplying, onToggle, onApply,
}: {
  role: JobRole
  isExpanded: boolean
  isApplying: boolean
  onToggle: () => void
  onApply: () => void
}) {
  const detailRef = useRef<HTMLDivElement>(null)
  const formRef   = useRef<HTMLDivElement>(null)

  // Animate expand/collapse
  useEffect(() => {
    const el = detailRef.current
    if (!el) return
    if (isExpanded) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'expo.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'expo.in' })
    }
  }, [isExpanded])

  // Animate form in/out
  useEffect(() => {
    const el = formRef.current
    if (!el) return
    if (isApplying) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'expo.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'expo.in' })
    }
  }, [isApplying])

  return (
    <div style={{ background: 'var(--gv-surface)', overflow: 'hidden', borderLeft: `3px solid ${role.accentColor}` }}
      className="role-card">
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '28px 32px', cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, textAlign: 'left',
        }}
        className="role-header"
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
            <h3 style={{
              fontFamily: 'var(--font-orbitron)', fontSize: 18, fontWeight: 700,
              color: 'var(--gv-text)', textTransform: 'uppercase', letterSpacing: 1,
              margin: 0,
            }}>
              {role.title}
            </h3>
            <span style={{
              fontFamily: 'var(--font-share-tech)', fontSize: 9,
              color: role.accentColor, letterSpacing: 3,
              textTransform: 'uppercase', padding: '3px 10px',
              border: `1px solid ${role.accentColor}44`,
              background: `${role.accentColor}0a`,
            }}>
              {role.type}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[role.department, role.location].map((tag, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 10,
                color: 'var(--gv-muted)', letterSpacing: 2, textTransform: 'uppercase',
              }}>
                {i === 0 ? '◈' : '◎'} {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Expand chevron */}
        <div style={{
          width: 32, height: 32, flexShrink: 0,
          border: `1px solid ${isExpanded ? role.accentColor : 'var(--gv-border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.2s, transform 0.3s',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke={isExpanded ? role.accentColor : 'var(--gv-muted)'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      <div ref={detailRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div style={{ padding: '0 32px 32px' }}>
          {/* Description */}
          <p style={{ fontSize: 16, color: 'var(--gv-muted)', lineHeight: 1.8, marginBottom: 28, maxWidth: 720 }}>
            {role.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }} className="req-grid">
            {/* Requirements */}
            <div>
              <div style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 10,
                color: role.accentColor, letterSpacing: 4,
                textTransform: 'uppercase', marginBottom: 16,
              }}>
                Requirements
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                {role.requirements.map((r, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: role.accentColor, fontSize: 10, marginTop: 4, flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: 14, color: 'var(--gv-text)', lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            {role.niceToHave && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-share-tech)', fontSize: 10,
                  color: 'var(--gv-muted)', letterSpacing: 4,
                  textTransform: 'uppercase', marginBottom: 16,
                }}>
                  Nice to Have
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                  {role.niceToHave.map((n, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gv-muted)', fontSize: 10, marginTop: 4, flexShrink: 0 }}>◇</span>
                      <span style={{ fontSize: 14, color: 'var(--gv-muted)', lineHeight: 1.6 }}>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Apply CTA */}
          {!isApplying && (
            <button onClick={onApply} style={{
              fontFamily: 'var(--font-rajdhani)', fontSize: 12, fontWeight: 700,
              letterSpacing: 4, textTransform: 'uppercase',
              color: 'var(--gv-bg)', background: role.accentColor,
              border: 'none', padding: '13px 32px', cursor: 'none',
              clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              transition: 'opacity 0.2s',
            }}>
              Apply for This Role
            </button>
          )}
        </div>

        {/* Application form */}
        <div ref={formRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
          <ApplicationForm role={role} onClose={() => onApply()} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .role-card { transition: background 0.2s; }
        .role-header:hover { background: rgba(255,255,255,0.015) !important; }
        @media(max-width:700px){ .req-grid { grid-template-columns: 1fr !important; } }
      ` }} />
    </div>
  )
}

// ── Application form ──────────────────────────────────────────────────────────

function ApplicationForm({ role, onClose }: { role: JobRole; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', portfolio: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, roleId: role.id, roleTitle: role.title }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: 'var(--gv-surface2)',
    border: '1px solid var(--gv-border)',
    color: 'var(--gv-text)',
    fontFamily: 'var(--font-rajdhani)', fontSize: 15,
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <div style={{
        height: 1, background: 'var(--gv-border)', marginBottom: 32,
      }} />

      {status === 'sent' ? (
        <div style={{
          padding: '32px 28px',
          background: 'rgba(0,245,255,0.05)',
          border: '1px solid rgba(0,245,255,0.15)',
          borderLeft: `3px solid ${role.accentColor}`,
          maxWidth: 560,
        }}>
          <div style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 16, fontWeight: 700,
            color: role.accentColor, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10,
          }}>
            Application Received
          </div>
          <p style={{ fontSize: 15, color: 'var(--gv-muted)', lineHeight: 1.7, margin: 0 }}>
            Thanks for applying for <strong style={{ color: 'var(--gv-text)' }}>{role.title}</strong>.
            We review every application personally and will be in touch within 2 weeks.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
          <div style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 10,
            color: role.accentColor, letterSpacing: 4,
            textTransform: 'uppercase', marginBottom: 24,
          }}>
            Apply — {role.title}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }} className="form-row">
            <div>
              <label style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Full Name *
              </label>
              <input
                required value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Email *
              </label>
              <input
                required type="email" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              Portfolio / GitHub / LinkedIn *
            </label>
            <input
              required value={form.portfolio}
              onChange={e => setForm(p => ({ ...p, portfolio: e.target.value }))}
              placeholder="https://"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontFamily: 'var(--font-share-tech)', fontSize: 9, color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              Why GamingVerse? *
            </label>
            <textarea
              required rows={5} value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="Tell us what draws you to this role and what you'd bring to the team..."
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                fontFamily: 'var(--font-rajdhani)', fontSize: 12, fontWeight: 700,
                letterSpacing: 4, textTransform: 'uppercase',
                color: 'var(--gv-bg)',
                background: status === 'sending' ? `${role.accentColor}88` : role.accentColor,
                border: 'none', padding: '13px 32px', cursor: 'none',
                clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Submit Application'}
            </button>
            <button
              type="button" onClick={onClose}
              style={{
                fontFamily: 'var(--font-share-tech)', fontSize: 10,
                color: 'var(--gv-muted)', background: 'none',
                border: 'none', cursor: 'none', letterSpacing: 3,
                textTransform: 'uppercase', transition: 'color 0.2s',
              }}
            >
              Cancel
            </button>
          </div>

          {status === 'error' && (
            <p style={{
              marginTop: 12, fontFamily: 'var(--font-share-tech)', fontSize: 11,
              color: 'var(--gv-ember)', letterSpacing: 1,
            }}>
              Something went wrong. Email us directly at careers@gamingversestudios.com
            </p>
          )}
        </form>
      )}

      <style dangerouslySetInnerHTML={{ __html: `@media(max-width:600px){ .form-row{ grid-template-columns:1fr !important; } }` }} />
    </div>
  )
}
