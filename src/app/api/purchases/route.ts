import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const purchases = await prisma.purchase.findMany({
      where: { userId, status: 'COMPLETED' },
      include: { game: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: purchases })
  } catch (err) {
    console.error('[purchases]', err)
    return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 })
  }
}
