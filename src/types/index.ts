export interface Game {
  id: string
  slug: string
  title: string
  subtitle?: string
  description: string
  longDescription?: string
  genre: string
  year: number
  status: 'released' | 'upcoming' | 'in-development'
  imageSrc?: string
  videoSrc?: string
  accentColor: string
  bgGradient: string
  tags: string[]
  platforms: Platform[]

  // ── Distribution ─────────────────────────────────────────────
  /** Is the game available on PC via the website store? */
  pcAvailable?: boolean
  /** Is the game available on Android (Play Store)? */
  androidAvailable?: boolean
  /** Is the game available on iOS (App Store)? */
  iosAvailable?: boolean
  /** Google Play Store URL — e.g. https://play.google.com/store/apps/details?id=com.studio.game */
  playStoreUrl?: string
  /** Apple App Store URL — e.g. https://apps.apple.com/app/id... */
  appStoreUrl?: string

  // ── Pricing ───────────────────────────────────────────────────
  /** PC price in USD cents (only if pcAvailable) */
  price?: number
  stripeProductId?: string
  stripePriceId?: string

  // ── Metadata ──────────────────────────────────────────────────
  rating?: number
  downloads?: string        // e.g. '2M+' for mobile games
  features?: string[]
  systemRequirements?: { minimum: SysReq; recommended: SysReq }
}

export interface SysReq {
  os: string; cpu: string; ram: string; gpu: string; storage: string
}

export type Platform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo Switch' | 'Android' | 'iOS'

export interface Stat { value: number; suffix?: string; label: string }
export interface Pillar { icon: string; title: string; description: string }
export interface NavLink { label: string; href: string; external?: boolean }

export interface ApiSuccess<T> { data: T; message?: string }
export interface ApiError { error: string; code?: string }
export type ApiResponse<T> = ApiSuccess<T> | ApiError

export interface User {
  id: string; email: string; username?: string; avatarUrl?: string
  createdAt: Date; purchasedGames: string[]
}
