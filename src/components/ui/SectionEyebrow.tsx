import { cn } from '@/lib/utils'

interface SectionEyebrowProps {
  children: React.ReactNode
  centered?: boolean
  className?: string
}

export function SectionEyebrow({ children, centered, className }: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 mb-4',
        centered && 'justify-center',
        className
      )}
    >
      {/* Decorative line */}
      <span
        style={{
          display: 'block',
          width: 40,
          height: 1,
          background: 'var(--gv-cyan)',
          boxShadow: '0 0 8px var(--gv-cyan)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-share-tech)',
          fontSize: 11,
          color: 'var(--gv-cyan)',
          letterSpacing: '6px',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
    </div>
  )
}
