import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { FeaturedGame } from '@/components/sections/FeaturedGame'
import { GamesSection } from '@/components/sections/GamesSection'
import { HomeScrollCinema } from '@/components/sections/HomeScrollCinema'
import { PlatformSection } from '@/components/sections/PlatformSection'
import { TechStrip } from '@/components/sections/TechStrip'
import { AboutSection } from '@/components/sections/AboutSection'
import { PillarsSection } from '@/components/sections/PillarsSection'
import { Footer } from '@/components/layout/Footer'
import { GAMES } from '@/lib/data'

export default function HomePage() {
  // Pick the highest-rated game as featured
  const featured = GAMES.reduce((best, g) => (g.rating ?? 0) > (best.rating ?? 0) ? g : best, GAMES[0])

  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturedGame game={featured} />
      <GamesSection />
      <HomeScrollCinema />
      <PlatformSection />
      <TechStrip />
      <AboutSection />
      <PillarsSection />
      <Footer />
    </main>
  )
}
