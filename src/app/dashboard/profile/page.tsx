import { UserProfile } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <div style={{ padding: '60px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 11, color: 'var(--gv-cyan)',
          letterSpacing: 5, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Player Portal
        </div>
        <h1 style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 900, color: 'var(--gv-text)',
          textTransform: 'uppercase', letterSpacing: -1,
        }}>
          Your <span style={{ color: 'var(--gv-cyan)' }}>Profile</span>
        </h1>
      </div>

      <UserProfile
        appearance={{
          variables: {
            colorBackground:      '#0a0a14',
            colorInputBackground: '#10101e',
            colorInputText:       '#e8e8f0',
            colorText:            '#e8e8f0',
            colorTextSecondary:   '#6a6a88',
            colorPrimary:         '#00f5ff',
            colorDanger:          '#ff4500',
            borderRadius:         '0px',
          },
          elements: {
            rootBox: 'w-full',
            card: 'w-full shadow-none bg-[#0a0a14] border border-[rgba(0,245,255,0.12)]',
            headerTitle: 'font-[var(--font-orbitron)] uppercase tracking-widest text-sm',
            formButtonPrimary: [
              'bg-[var(--gv-cyan)] text-[#04040a] font-bold tracking-[0.25em] uppercase text-xs',
              'hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all',
            ].join(' '),
            navbarButton: 'text-[var(--gv-muted)] hover:text-[var(--gv-cyan)]',
          },
        }}
      />
    </div>
  )
}
