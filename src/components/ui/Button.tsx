import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
}

const base = `
  inline-flex items-center justify-center
  font-rajdhani font-bold tracking-widest uppercase
  clip-skewed transition-all duration-300
  cursor-none select-none
`

const variants = {
  primary: `
    bg-[var(--gv-cyan)] text-[var(--gv-bg)]
    hover:shadow-[0_0_40px_rgba(0,245,255,0.5),0_0_80px_rgba(0,245,255,0.2)]
    hover:-translate-y-0.5
  `,
  secondary: `
    bg-transparent text-[var(--gv-text)] border border-white/20
    hover:border-[var(--gv-cyan)] hover:text-[var(--gv-cyan)]
    hover:-translate-y-0.5
  `,
  ghost: `
    bg-transparent text-[var(--gv-muted)]
    hover:text-[var(--gv-cyan)]
  `,
}

const sizes = {
  sm:  'text-[11px] px-5 py-2.5 tracking-[3px]',
  md:  'text-[12px] px-9 py-3.5 tracking-[4px]',
  lg:  'text-[13px] px-11 py-4  tracking-[4px]',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  external,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>{children}</Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
