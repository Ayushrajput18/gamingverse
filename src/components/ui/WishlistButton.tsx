'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'

interface Props {
  gameId: string
  gameSlug: string
  /** Optional: pass in initial state to avoid an extra fetch */
  initialWishlisted?: boolean
  size?: 'sm' | 'md'
}

export function WishlistButton({ gameId, gameSlug, initialWishlisted = false, size = 'md' }: Props) {
  const { isSignedIn, isLoaded } = useUser()
  const router   = useRouter()
  const [wishlisted, setWishlisted] = useState(initialWishlisted)
  const [loading,    setLoading]    = useState(false)
  const heartRef = useRef<SVGSVGElement>(null)
  const btnRef   = useRef<HTMLButtonElement>(null)

  // Fetch real state on mount if signed in
  useEffect(() => {
    if (!isSignedIn || initialWishlisted) return
    fetch('/api/wishlist')
      .then(r => r.json())
      .then(data => {
        if (data.data) {
          const found = data.data.some((w: { game: { id: string } }) => w.game.id === gameId)
          setWishlisted(found)
        }
      })
      .catch(() => {})
  }, [isSignedIn, gameId, initialWishlisted])

  const toggle = async () => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/games/${gameSlug}`)
      return
    }

    // Optimistic update
    setWishlisted(prev => !prev)
    setLoading(true)

    // GSAP heart pop
    const heart = heartRef.current
    if (heart) {
      gsap.fromTo(heart,
        { scale: 0.6, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(3)' }
      )
    }

    try {
      const method = wishlisted ? 'DELETE' : 'POST'
      const res = await fetch('/api/wishlist', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId }),
      })
      if (!res.ok) setWishlisted(prev => !prev) // revert on error
    } catch {
      setWishlisted(prev => !prev) // revert on network error
    } finally {
      setLoading(false)
    }
  }

  const dim = size === 'sm' ? 32 : 40
  const iconSize = size === 'sm' ? 14 : 18

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      disabled={loading}
      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      style={{
        width:  dim, height: dim,
        background: wishlisted ? 'rgba(255,69,0,0.12)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${wishlisted ? 'rgba(255,69,0,0.4)' : 'rgba(255,255,255,0.12)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none', transition: 'all 0.25s ease',
        flexShrink: 0,
      }}
      className="wishlist-btn"
    >
      <svg
        ref={heartRef}
        width={iconSize} height={iconSize}
        viewBox="0 0 24 24"
        fill={wishlisted ? '#ff4500' : 'none'}
        stroke={wishlisted ? '#ff4500' : 'rgba(255,255,255,0.5)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .wishlist-btn:hover {
          background: rgba(255,69,0,0.1) !important;
          border-color: rgba(255,69,0,0.3) !important;
        }
      ` }} />
    </button>
  )
}
