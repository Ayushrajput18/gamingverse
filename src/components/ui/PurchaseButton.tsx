'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import type { Game } from '@/types'

interface Props { game: Game }

export function PurchaseButton({ game }: Props) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/games/${game.slug}`)
      return
    }

    if (!game.price) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: game.id }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      // Redirect to Stripe Checkout
      if (data.url) window.location.href = data.url
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div style={{
        height: 52,
        background: 'var(--gv-surface)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }} />
    )
  }

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={loading || !game.price}
        style={{
          width: '100%',
          padding: '16px',
          background: loading ? 'rgba(0,245,255,0.5)' : game.price ? 'var(--gv-cyan)' : 'var(--gv-surface)',
          color: game.price ? 'var(--gv-bg)' : 'var(--gv-muted)',
          fontFamily: 'var(--font-rajdhani)',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          border: 'none',
          clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
          cursor: loading || !game.price ? 'not-allowed' : 'none',
          transition: 'box-shadow 0.3s, background 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
        className={game.price && !loading ? 'purchase-btn' : ''}
      >
        {loading ? (
          <>
            <Spinner color="var(--gv-bg)" />
            Processing...
          </>
        ) : !isSignedIn ? (
          'Sign In to Purchase'
        ) : game.price ? (
          `Buy Now — $${(game.price / 100).toFixed(2)}`
        ) : (
          'Coming Soon'
        )}
      </button>

      {!isSignedIn && game.price && (
        <p style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 10,
          color: 'var(--gv-muted)',
          letterSpacing: 2,
          textAlign: 'center',
          marginTop: 10,
        }}>
          You&apos;ll be asked to sign in or create a free account
        </p>
      )}

      {error && (
        <div style={{
          marginTop: 12,
          padding: '10px 14px',
          background: 'rgba(255,69,0,0.08)',
          border: '1px solid rgba(255,69,0,0.2)',
          fontFamily: 'var(--font-share-tech)',
          fontSize: 11,
          color: 'var(--gv-ember)',
          letterSpacing: 1,
        }}>
          {error}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .purchase-btn:hover {
          box-shadow: 0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2) !important;
        }
        @keyframes pulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.8; }
        }
      ` }} />
    </div>
  )
}

function Spinner({ color }: { color: string }) {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M8 2 A6 6 0 0 1 14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
    </svg>
  )
}
