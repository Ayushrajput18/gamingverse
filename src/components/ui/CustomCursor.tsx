'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top  = pos.current.y + 'px'
      }
      // Ring follows with lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    // Scale effects on interactive elements
    const handleEnter = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(2.5)')
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1.6)')
      ringRef.current?.style.setProperty('border-color', 'var(--gv-cyan)')
    }
    const handleLeave = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)')
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)')
      ringRef.current?.style.setProperty('border-color', 'rgba(0,245,255,0.5)')
    }
    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 12, height: 12,
          background: 'var(--gv-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.12s ease',
          boxShadow: '0 0 20px var(--gv-cyan), 0 0 40px rgba(0,245,255,0.4)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          border: '1px solid rgba(0,245,255,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.18s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}
