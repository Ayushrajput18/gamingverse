'use client'

import { useEffect, useState } from 'react'

export function Loader() {
  const [progress, setProgress]     = useState(0)
  const [visible,  setVisible]      = useState(true)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      const step = Math.random() * 8 + 2
      p = Math.min(p + step, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(id)
        setTimeout(() => setVisible(false), 450)
      }
    }, 60)
    return () => clearInterval(id)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#000',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        transition: 'opacity 0.8s ease',
        opacity: progress >= 100 ? 0 : 1,
      }}
    >
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-orbitron)',
        fontSize: 28,
        fontWeight: 900,
        color: 'var(--gv-cyan)',
        letterSpacing: 8,
        textTransform: 'uppercase',
      }}>
        GAMING<span style={{ color: 'var(--gv-ember)' }}>VERSE</span>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 280,
        height: 2,
        background: 'rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--gv-cyan), var(--gv-ember))',
          boxShadow: '0 0 12px var(--gv-cyan)',
          transition: 'width 0.05s ease',
        }} />
      </div>

      {/* Percentage */}
      <div style={{
        fontFamily: 'var(--font-share-tech)',
        fontSize: 12,
        color: 'var(--gv-muted)',
        letterSpacing: 3,
      }}>
        {String(Math.floor(progress)).padStart(3, '0')}%
      </div>
    </div>
  )
}
