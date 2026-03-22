import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalRevenue, totalPurchases, totalGames, recentPurchases] = await Promise.all([
      // Sum of all completed purchases
      prisma.purchase.aggregate({
        where: { status: 'COMPLETED' },
        _sum:  { amount: true },
      }),
      // Count of completed purchases
      prisma.purchase.count({ where: { status: 'COMPLETED' } }),
      // Count of active games
      prisma.game.count(),
      // Last 10 purchases with game info
      prisma.purchase.findMany({
        where:   { status: 'COMPLETED' },
        include: { game: { select: { title: true, subtitle: true, accentColor: true } } },
        orderBy: { createdAt: 'desc' },
        take:    10,
      }),
    ])

    return NextResponse.json({
      data: {
        revenue:         totalRevenue._sum.amount ?? 0,
        purchases:       totalPurchases,
        games:           totalGames,
        recentPurchases: recentPurchases.map(p => ({
          id:          p.id,
          userId:      p.userId,
          amount:      p.amount,
          createdAt:   p.createdAt,
          game:        p.game,
        })),
      },
    })
  } catch (err) {
    console.error('[admin/stats]', err)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
