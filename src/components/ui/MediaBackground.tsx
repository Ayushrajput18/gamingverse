'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

interface MediaBackgroundProps {
  /** Path or URL to a looping video (mp4). Highest priority. */
  videoSrc?: string
  /** Path or URL to a cover image. Used when no video, or as video poster. */
  imageSrc?: string
  /** Alt text for the image */
  imageAlt?: string
  /** CSS gradient string — fallback when no video or image is provided */
  gradient: string
  /** Extra overlay on top of media for readability (default: cinematic vignette) */
  overlay?: string
  /** className for the root wrapper */
  className?: string
  /** Parallax speed factor (0 = no parallax, 0.4 = strong). Requires GSAP caller to set transform. */
  parallax?: boolean
  /** Exposed ref for parallax parent */
  innerRef?: React.RefObject<HTMLDivElement>
}

/**
 * MediaBackground
 *
 * Renders the best available background in this priority:
 *   1. Looping <video> (if videoSrc provided)
 *   2. next/image cover (if imageSrc provided)
 *   3. CSS gradient fallback (always available)
 *
 * The component is absolutely positioned to fill its parent.
 * Wrap in a relative-positioned container.
 */
export function MediaBackground({
  videoSrc,
  imageSrc,
  imageAlt = '',
  gradient,
  overlay,
  className,
  parallax,
  innerRef,
}: MediaBackgroundProps) {
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [videoOk,  setVideoOk]  = useState(true)
  const [imageOk,  setImageOk]  = useState(true)

  // Attempt autoplay — some browsers require user gesture
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      // Autoplay blocked — hide video, fall through to image/gradient
      setVideoOk(false)
    })
  }, [])

  const defaultOverlay = `
    radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%),
    linear-gradient(to top, rgba(4,4,10,0.95) 0%, transparent 60%)
  `

  const wrapStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 0,
  }

  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '-20% 0',   // Extra height so parallax has room to travel
    width: '100%',
    height: '140%',    // Compensate for negative inset
  }

  const showVideo = Boolean(videoSrc) && videoOk
  const showImage = Boolean(imageSrc) && imageOk && !showVideo
  const showGrad  = !showVideo && !showImage

  return (
    <div style={wrapStyle} className={className} ref={innerRef}>
      {/* ── Video ── */}
      {videoSrc && videoOk && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoOk(false)}
          style={{
            ...mediaStyle,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}

      {/* ── Image ── */}
      {showImage && imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          onError={() => setImageOk(false)}
        />
      )}

      {/* ── Gradient fallback ── */}
      {showGrad && (
        <div style={{ position: 'absolute', inset: 0, background: gradient }} />
      )}

      {/* ── Gradient tint on top of video/image for readability ── */}
      {(showVideo || showImage) && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `${gradient.split(',').slice(-1)[0].trim()
            .replace(/linear-gradient[^)]+\)/, '')}`,
          // Just apply a dark vignette on top of real media
        }} />
      )}

      {/* ── Overlay (vignette + bottom fade) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: overlay ?? defaultOverlay,
        zIndex: 1,
      }} />

      {/* ── Noise texture ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        zIndex: 2,
        pointerEvents: 'none',
      }} />
    </div>
  )
}
