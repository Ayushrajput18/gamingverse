import type { Metadata, Viewport } from 'next'
import { Orbitron, Rajdhani, Share_Tech_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import '@/styles/globals.css'
import { Providers } from '@/components/layout/Providers'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Loader } from '@/components/ui/Loader'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron', weight: ['400', '700', '900'], display: 'swap' })
const rajdhani = Rajdhani({ subsets: ['latin'], variable: '--font-rajdhani', weight: ['300', '400', '500', '600', '700'], display: 'swap' })
const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], variable: '--font-share-tech', weight: '400', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: { default: 'GamingVerse Studios — Forge Digital Worlds', template: '%s | GamingVerse Studios' },
  description: 'An independent game studio building cinematic, immersive game worlds.',
  openGraph: {
    type: 'website', locale: 'en_US', url: 'https://gamingversestudios.com',
    siteName: 'GamingVerse Studios', title: 'GamingVerse Studios',
    description: 'Build worlds. Break limits. Define legends.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#04040a', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable}`} suppressHydrationWarning>
        <body>
          <Providers>
            <div className="scanlines-overlay" aria-hidden="true" />
            <div className="noise-overlay" aria-hidden="true" />
            <CustomCursor />
            <Loader />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
