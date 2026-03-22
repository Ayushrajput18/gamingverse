import { TECH_ITEMS } from '@/lib/data'

export function TechStrip() {
  // Duplicate items for seamless infinite scroll
  const items = [...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div style={{
      background: 'var(--gv-surface)',
      borderTop: '1px solid var(--gv-border)',
      borderBottom: '1px solid var(--gv-border)',
      padding: '20px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 120,
        background: 'linear-gradient(to right, var(--gv-surface), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: 120,
        background: 'linear-gradient(to left, var(--gv-surface), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        gap: 60,
        width: 'max-content',
        animation: 'techScroll 24s linear infinite',
      }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: 11,
              color: 'var(--gv-muted)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <span style={{ color: 'var(--gv-cyan)', fontSize: 8 }}>◆</span>
            {item}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes techScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      ` }} />
    </div>
  )
}
