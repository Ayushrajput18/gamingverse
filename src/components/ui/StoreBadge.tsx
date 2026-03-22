'use client'

interface StoreBadgeProps {
  store: 'google-play' | 'app-store'
  url: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = { sm: 120, md: 148, lg: 176 }

export function StoreBadge({ store, url, size = 'md' }: StoreBadgeProps) {
  const w = SIZES[size]

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block', flexShrink: 0, cursor: 'none' }}
      className="store-badge-link"
    >
      {store === 'google-play' ? (
        <GooglePlayBadge width={w} />
      ) : (
        <AppStoreBadge width={w} />
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .store-badge-link { transition: opacity 0.2s, transform 0.2s; }
        .store-badge-link:hover { opacity: 0.85; transform: translateY(-1px); }
      ` }} />
    </a>
  )
}

function GooglePlayBadge({ width }: { width: number }) {
  const h = Math.round(width * 0.297)
  return (
    <svg width={width} height={h} viewBox="0 0 564 168" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="564" height="168" rx="12" fill="#1a1a2e" />
      <rect x="0.75" y="0.75" width="562.5" height="166.5" rx="11.25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Play icon */}
      <g transform="translate(28, 44)">
        <path d="M0 6.5C0 3.46243 2.46243 1 5.5 1H74.5C77.5376 1 80 3.46243 80 6.5V73.5C80 76.5376 77.5376 79 74.5 79H5.5C2.46243 79 0 76.5376 0 73.5V6.5Z" fill="rgba(0,245,255,0.08)" />
        {/* Triangle play */}
        <path d="M28 28L56 40L28 52V28Z" fill="#00f5ff" />
        {/* Colored lines behind triangle */}
        <path d="M20 20L44 44" stroke="#ff4500" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M20 60L44 36" stroke="#00ff80" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M44 44L60 40" stroke="#ffaa00" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Text */}
      <text x="128" y="70" fill="rgba(255,255,255,0.6)" fontSize="20" fontFamily="system-ui,sans-serif" letterSpacing="1">GET IT ON</text>
      <text x="128" y="114" fill="white" fontSize="40" fontWeight="500" fontFamily="system-ui,sans-serif" letterSpacing="-0.5">Google Play</text>
    </svg>
  )
}

function AppStoreBadge({ width }: { width: number }) {
  const h = Math.round(width * 0.297)
  return (
    <svg width={width} height={h} viewBox="0 0 564 168" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="564" height="168" rx="12" fill="#1a1a2e" />
      <rect x="0.75" y="0.75" width="562.5" height="166.5" rx="11.25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Apple logo */}
      <g transform="translate(28, 28)">
        <rect width="80" height="112" rx="8" fill="rgba(0,245,255,0.06)" />
        {/* Simplified Apple  */}
        <path d="M40 18C40 18 50 14 54 22C54 22 46 26 40 18Z" fill="rgba(255,255,255,0.5)" />
        <path d="M26 40C26 40 20 36 22 28C22 28 30 28 34 36C38 44 42 64 40 76C38 88 30 92 24 88C18 84 18 76 24 72C28 69 36 72 40 76C44 80 48 92 54 92C60 92 64 84 64 76C64 56 56 36 48 30C42 25 36 28 30 32C26 35 26 40 26 40Z" fill="white" />
      </g>

      {/* Text */}
      <text x="128" y="70" fill="rgba(255,255,255,0.6)" fontSize="20" fontFamily="system-ui,sans-serif" letterSpacing="1">DOWNLOAD ON THE</text>
      <text x="128" y="114" fill="white" fontSize="40" fontWeight="500" fontFamily="system-ui,sans-serif" letterSpacing="-0.5">App Store</text>
    </svg>
  )
}
