export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--gv-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480, padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <a href="/" style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 20,
            fontWeight: 900,
            color: 'var(--gv-cyan)',
            letterSpacing: 4,
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}>
            Gaming<span style={{ color: 'var(--gv-ember)' }}>Verse</span>
          </a>
        </div>
        {children}
      </div>
    </main>
  )
}
