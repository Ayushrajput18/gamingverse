import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/purchases(.*)',
  '/api/checkout(.*)',
  '/api/wishlist(.*)',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
])

export default clerkMiddleware((auth, req) => {
  // Protect player routes
  if (isProtectedRoute(req)) {
    auth().protect()
  }

  // Admin routes — require admin role in Clerk public metadata
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = auth()
    if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url))

    const isAdmin = (sessionClaims?.metadata as { role?: string } | undefined)?.role === 'admin'
    if (!isAdmin) return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
