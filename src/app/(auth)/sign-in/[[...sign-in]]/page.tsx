import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign In' }

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/dashboard"
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
            rootBox:        'w-full',
            card:           'w-full shadow-none border border-[rgba(0,245,255,0.12)] bg-[#0a0a14]',
            headerTitle:    'font-[var(--font-orbitron)] tracking-[0.3em] uppercase text-[var(--gv-cyan)] text-base',
            headerSubtitle: 'text-[var(--gv-muted)] text-sm',
            formButtonPrimary: [
              'bg-[var(--gv-cyan)] text-[#04040a] font-bold tracking-[0.25em] uppercase text-xs',
              'hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all',
            ].join(' '),
            footerActionLink: 'text-[var(--gv-cyan)] hover:text-white',
          },
        }}
      />
    </div>
  )
}
