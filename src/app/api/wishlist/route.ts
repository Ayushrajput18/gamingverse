import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// ── GET /api/wishlist — fetch user's wishlist ─────────────────────────────────
export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const wishlist = await prisma.wishlist.findMany({
      where:   { userId },
      include: { game: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: wishlist })
  } catch (err) {
    console.error('[wishlist GET]', err)
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 })
  }
}

// ── POST /api/wishlist — add a game ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { gameId } = await req.json()
    if (!gameId) return NextResponse.json({ error: 'Missing gameId' }, { status: 400 })

    const game = await prisma.game.findUnique({ where: { id: gameId } })
    if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

    const entry = await prisma.wishlist.upsert({
      where:  { userId_gameId: { userId, gameId } },
      create: { userId, gameId },
      update: {},
    })

    return NextResponse.json({ data: entry }, { status: 201 })
  } catch (err) {
    console.error('[wishlist POST]', err)
    return NextResponse.json({ error: 'Failed to add to wishlist' }, { status: 500 })
  }
}

// ── DELETE /api/wishlist — remove a game ─────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { gameId } = await req.json()
    if (!gameId) return NextResponse.json({ error: 'Missing gameId' }, { status: 400 })

    await prisma.wishlist.deleteMany({
      where: { userId, gameId },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[wishlist DELETE]', err)
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 })
  }
}
