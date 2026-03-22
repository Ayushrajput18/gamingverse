import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { gameId } = await req.json()
    if (!gameId) return NextResponse.json({ error: 'Missing gameId' }, { status: 400 })

    const game = await prisma.game.findUnique({ where: { id: gameId } })
    if (!game || !game.stripePriceId) return NextResponse.json({ error: 'Game not found or not for sale' }, { status: 404 })

    const existing = await prisma.purchase.findUnique({ where: { userId_gameId: { userId, gameId } } })
    if (existing?.status === 'COMPLETED') return NextResponse.json({ error: 'Already purchased' }, { status: 409 })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: game.stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/library?success=${game.slug}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/games/${game.slug}?cancelled=true`,
      metadata: { gameId, userId },
    })

    await prisma.purchase.upsert({
      where: { userId_gameId: { userId, gameId } },
      create: { userId, gameId, stripeSessionId: session.id, amount: game.price ?? 0, status: 'PENDING' },
      update: { stripeSessionId: session.id, status: 'PENDING' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout]', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
