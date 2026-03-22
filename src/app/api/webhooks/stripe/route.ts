import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { purchaseReceiptHtml, purchaseReceiptText } from '@/lib/email-templates'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Invalid signature', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ── checkout.session.completed ─────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { gameId, userId } = session.metadata ?? {}

    if (gameId && userId) {
      // 1. Mark purchase complete
      await prisma.purchase.updateMany({
        where: { stripeSessionId: session.id },
        data:  { status: 'COMPLETED' },
      })
      console.log(`[webhook] Purchase confirmed: user=${userId} game=${gameId}`)

      // 2. Send receipt email
      try {
        const [game, user] = await Promise.all([
          prisma.game.findUnique({ where: { id: gameId } }),
          // Clerk doesn't expose user email here — we get it from session if available
          // or fall back to fetching via Clerk backend SDK
          Promise.resolve(null),
        ])

        const customerEmail = session.customer_details?.email
        const customerName  = session.customer_details?.name ?? 'Player'

        if (game && customerEmail) {
          const html = purchaseReceiptHtml({
            playerName:  customerName,
            playerEmail: customerEmail,
            gameTitle:   `${game.title} ${game.subtitle ?? ''}`.trim(),
            gameGenre:   game.genre,
            gameYear:    game.year,
            accentColor: game.accentColor,
            price:       game.price ?? 0,
            purchaseId:  session.id,
            gameUrl:     `${process.env.NEXT_PUBLIC_BASE_URL}/games/${game.slug}`,
          })
          const text = purchaseReceiptText({
            playerName:  customerName,
            playerEmail: customerEmail,
            gameTitle:   `${game.title} ${game.subtitle ?? ''}`.trim(),
            gameGenre:   game.genre,
            gameYear:    game.year,
            accentColor: game.accentColor,
            price:       game.price ?? 0,
            purchaseId:  session.id,
            gameUrl:     `${process.env.NEXT_PUBLIC_BASE_URL}/games/${game.slug}`,
          })

          await resend.emails.send({
            from:    `GamingVerse Studios <${FROM_EMAIL}>`,
            to:      customerEmail,
            subject: `Your copy of ${game.title} ${game.subtitle ?? ''} is ready ✓`,
            html,
            text,
          })
          console.log(`[webhook] Receipt sent to ${customerEmail}`)
        }
      } catch (emailErr) {
        // Non-fatal — log but don't fail the webhook
        console.error('[webhook] Email send failed:', emailErr)
      }
    }
  }

  // ── charge.refunded ────────────────────────────────────────────
  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge
    await prisma.purchase.updateMany({
      where: { stripeSessionId: charge.payment_intent as string },
      data:  { status: 'REFUNDED' },
    })
    console.log(`[webhook] Refund processed: ${charge.id}`)
  }

  return NextResponse.json({ received: true })
}
