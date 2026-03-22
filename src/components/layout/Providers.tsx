'use client'

import { useEffect } from 'react'
import { useRevealObserver } from '@/hooks/useRevealObserver'

export function Providers({ children }: { children: React.ReactNode }) {
  // Boot the global scroll-reveal observer
  useRevealObserver()

  return <>{children}</>
}
