'use client'

import { StoreBadge } from '@/components/ui/StoreBadge'
import { PurchaseButton } from '@/components/ui/PurchaseButton'
import type { Game } from '@/types'

interface Props {
  game: Game
  /** Layout direction */
  layout?: 'row' | 'column'
  /** Badge size */
  badgeSize?: 'sm' | 'md' | 'lg'
  /** Show PC section label */
  showLabels?: boolean
}

/**
 * PlatformCTA
 *
 * Renders the correct combination of store buttons depending on the game's
 * availability:
 *   - Android only → Google Play badge
 *   - iOS only → App Store badge
 *   - Both mobile → stacked / side-by-side badges
 *   - PC only → Stripe PurchaseButton
 *   - PC + Mobile → PC purchase + store badges with divider
 */
export function PlatformCTA({ game, layout = 'column', badgeSize = 'md', showLabels = true }: Props) {
  const hasPC      = game.pcAvailable && game.price
  const hasAndroid = game.androidAvailable && game.playStoreUrl
  const hasIOS     = game.iosAvailable && game.appStoreUrl
  const hasMobile  = hasAndroid || hasIOS
  const hasBoth    = hasPC && hasMobile

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {/* PC purchase block */}
      {hasPC && (
        <div>
          {showLabels && hasBoth && (
            <PlatformLabel icon="◈" label="PC — Direct Purchase" />
          )}
          <PurchaseButton game={game} />
        </div>
      )}

      {/* Divider between PC and mobile */}
      {hasBoth && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{
            fontFamily: 'var(--font-share-tech)', fontSize: 10,
            color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase',
          }}>
            or play on mobile
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>
      )}

      {/* Mobile store badges */}
      {hasMobile && (
        <div>
          {showLabels && hasBoth && (
            <PlatformLabel icon="◎" label="Mobile — Free to Play" />
          )}
          <div style={{
            display: 'flex',
            flexDirection: layout === 'row' ? 'row' : 'column',
            gap: 10,
            flexWrap: 'wrap',
          }}>
            {hasAndroid && (
              <StoreBadge store="google-play" url={game.playStoreUrl!} size={badgeSize} />
            )}
            {hasIOS && (
              <StoreBadge store="app-store" url={game.appStoreUrl!} size={badgeSize} />
            )}
          </div>
        </div>
      )}

      {/* Nothing available */}
      {!hasPC && !hasMobile && (
        <div style={{
          padding: '14px 24px',
          border: '1px solid var(--gv-border)',
          fontFamily: 'var(--font-share-tech)', fontSize: 11,
          color: 'var(--gv-muted)', letterSpacing: 3,
          textTransform: 'uppercase',
        }}>
          Coming Soon
        </div>
      )}
    </div>
  )
}

function PlatformLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
      fontFamily: 'var(--font-share-tech)', fontSize: 10,
      color: 'var(--gv-muted)', letterSpacing: 3, textTransform: 'uppercase',
    }}>
      <span style={{ color: 'var(--gv-cyan)', fontSize: 10 }}>{icon}</span>
      {label}
    </div>
  )
}

// ── Compact inline variant for cards ─────────────────────────────────────────

interface CompactProps {
  game: Game
  accentColor?: string
}

/**
 * PlatformBadges — compact icon-only platform indicators
 * Used in game cards, list rows, etc.
 */
export function PlatformBadges({ game, accentColor }: CompactProps) {
  const color = accentColor ?? game.accentColor

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {game.pcAvailable && (
        <PlatformPill icon="🖥" label="PC" color={color} href={`/games/${game.slug}#store`} />
      )}
      {game.androidAvailable && game.playStoreUrl && (
        <PlatformPill icon="◉" label="Android" color={color} href={game.playStoreUrl} external />
      )}
      {game.iosAvailable && game.appStoreUrl && (
        <PlatformPill icon="◎" label="iOS" color={color} href={game.appStoreUrl} external />
      )}
    </div>
  )
}

function PlatformPill({
  icon, label, color, href, external,
}: { icon: string; label: string; color: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontFamily: 'var(--font-share-tech)', fontSize: 9,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2, textTransform: 'uppercase',
        padding: '4px 10px',
        border: '1px solid rgba(255,255,255,0.1)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, color 0.2s',
      }}
      className="platform-pill"
    >
      <span style={{ fontSize: 10 }}>{icon}</span>
      {label}
      <style dangerouslySetInnerHTML={{ __html: `.platform-pill:hover { border-color: ${color}66 !important; color: ${color} !important; }` }} />
    </a>
  )
}
