import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { GAMES } from '@/lib/data'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GameHero } from '@/components/sections/GameHero'
import { GameScrollCinema } from '@/components/sections/GameScrollCinema'
import { GameStore } from '@/components/sections/GameStore'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return GAMES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = GAMES.find(g => g.slug === params.slug)
  if (!game) return { title: 'Game Not Found' }

  const title = `${game.title} ${game.subtitle ?? ''}`.trim()
  const url   = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gamingversestudios.com'}/games/${game.slug}`

  return {
    title,
    description: game.description,
    openGraph: {
      title,
      description: game.description,
      url,
      type: 'website',
      // opengraph-image.tsx in the same folder auto-generates the image
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description: game.description,
    },
    alternates: { canonical: url },
  }
}

export default function GamePage({ params }: Props) {
  const game = GAMES.find(g => g.slug === params.slug)
  if (!game) notFound()

  return (
    <>
      <Navbar />
      <main>
        <GameHero game={game} />
        <GameScrollCinema game={game} />
        <GameStore game={game} />
      </main>
      <Footer />
    </>
  )
}
