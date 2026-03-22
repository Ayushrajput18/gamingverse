'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { STATS } from '@/lib/data'
import type { Stat } from '@/types'

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('.stat-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{
      background: 'var(--gv-surface)',
      borderTop: '1px solid var(--gv-border)', borderBottom: '1px solid var(--gv-border)',
      padding: '32px 60px',
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
    }} className="stats-bar">
      {STATS.map((stat, i) => <StatItem key={stat.label} stat={stat} index={i} />)}
      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:768px){ .stats-bar{ grid-template-columns:repeat(2,1fr) !important; padding:32px 24px !important; } }
      ` }} />
    </div>
  )
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: stat.value, duration: 1.8, ease: 'expo.out',
        snap: { val: 1 },
        onUpdate: () => { el.textContent = Math.round(obj.val) + (stat.suffix ?? '') },
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [stat.value, stat.suffix])

  return (
    <div className="stat-item" style={{
      textAlign: 'center', padding: '0 20px', position: 'relative',
      borderLeft: index > 0 ? '1px solid var(--gv-border)' : 'none',
    }}>
      <span ref={numRef} style={{
        fontFamily: 'var(--font-orbitron)',
        fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700,
        color: 'var(--gv-cyan)', letterSpacing: -1,
        display: 'block', lineHeight: 1,
      }}>
        0{stat.suffix ?? ''}
      </span>
      <div style={{
        fontFamily: 'var(--font-share-tech)', fontSize: 11,
        color: 'var(--gv-muted)', letterSpacing: 3,
        textTransform: 'uppercase', marginTop: 8,
      }}>
        {stat.label}
      </div>
    </div>
  )
}
