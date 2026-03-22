# GamingVerse Studios — Phase 2 Complete

Cinematic gaming studio website with fullstack auth, payments, and player dashboard.

## What's in Phase 2

| Feature | Status |
|---|---|
| Individual game pages with cinematic hero | ✅ |
| Scroll-driven storytelling (GameScrollCinema) | ✅ |
| Game store with tabbed UI | ✅ |
| Clerk auth (sign up / sign in / profile) | ✅ |
| Protected dashboard with sidebar | ✅ |
| Player library (owned games) | ✅ |
| Stripe checkout wired to Clerk userId | ✅ |
| Purchase webhook + DB tracking | ✅ |
| All pages mobile responsive | ✅ |

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Auth | Clerk (`@clerk/nextjs`) |
| Payments | Stripe Checkout + Webhooks |
| Database | PostgreSQL + Prisma ORM |
| Deployment | Vercel + Railway |

## Quick Start

```bash
# 1. Install
npm install

# 2. Copy env and fill in your keys
cp .env.example .env.local

# 3. Push DB schema
npx prisma db push

# 4. Run dev server
npm run dev
```

## Getting your keys

### Clerk (free)
1. Create project at clerk.com
2. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
3. Set redirect URLs in Clerk dashboard to match `.env.local`

### Stripe (free test mode)
1. Create account at stripe.com
2. Copy API keys from Dashboard → Developers → API keys
3. For webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

### PostgreSQL (Railway — free tier)
1. Create project at railway.app
2. Add PostgreSQL service
3. Copy the `DATABASE_URL` from connection settings
4. Run `npx prisma db push` with that URL

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx              # Centered auth layout
│   │   ├── sign-in/[[...sign-in]]/ # Clerk SignIn
│   │   └── sign-up/[[...sign-up]]/ # Clerk SignUp
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar layout (server, auth-gated)
│   │   ├── page.tsx                # Overview with stats
│   │   ├── library/page.tsx        # Owned games
│   │   └── profile/page.tsx        # Clerk UserProfile
│   ├── games/
│   │   ├── page.tsx                # Games listing with filter
│   │   └── [slug]/page.tsx         # Individual game page
│   ├── api/
│   │   ├── games/route.ts
│   │   ├── checkout/route.ts       # Stripe, auth-gated
│   │   ├── purchases/route.ts      # User purchase history
│   │   └── webhooks/stripe/route.ts
│   └── layout.tsx                  # Root with ClerkProvider
├── components/
│   ├── layout/  Navbar (with auth), Footer, Providers, DashLayout
│   ├── sections/
│   │   ├── HeroSection, StatsBar, GamesSection
│   │   ├── AboutSection, PillarsSection, TechStrip
│   │   ├── GamesPageClient (filter)
│   │   ├── GameHero (cinematic + parallax)
│   │   ├── GameScrollCinema (pinned scroll storytelling)
│   │   └── GameStore (tabs: overview / features / requirements)
│   └── ui/
│       ├── Button, CustomCursor, Loader, SectionEyebrow
│       └── PurchaseButton (Stripe + Clerk integrated)
├── hooks/
│   ├── useRevealObserver.ts
│   ├── useCountUp.ts
│   └── useScrollAnimations.ts      # usePinSection, useParallax, useTextReveal
├── middleware.ts                    # Clerk route protection
└── lib/  data.ts, prisma.ts, utils.ts

prisma/schema.prisma                 # User, Game, Purchase, Wishlist
```

## Phase 3 Ideas

- Add actual game artwork / video backgrounds
- GSAP ScrollTrigger for even more cinematic scroll
- Wishlist feature (DB model already exists)
- Admin panel to manage games and view sales
- Email receipts via Resend
- Discord OAuth via Clerk social login
