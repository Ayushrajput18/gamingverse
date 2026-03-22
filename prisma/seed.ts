import { PrismaClient, Platform } from '@prisma/client'

const prisma = new PrismaClient()

const GAMES = [
  {
    slug:        'ember-throne',
    title:       'Ember',
    subtitle:    'Throne',
    description: 'Rule the shattered kingdoms or burn them to ash. Every choice reshapes the world forever.',
    genre:       'Action RPG',
    year:        2024,
    status:      'RELEASED' as const,
    accentColor: '#ff4500',
    tags:        ['Open World', 'Story-Driven', 'RPG'],
    platforms:   ['PC', 'PLAYSTATION', 'XBOX'] as Platform[],
    price:       5999,
    rating:      9.2,
    // Add your Stripe Price ID here after creating product in Stripe Dashboard:
    // stripePriceId: 'price_...',
  },
  {
    slug:        'void-protocol',
    title:       'Void',
    subtitle:    'Protocol',
    description: 'Navigate a dying space station where every system has turned against you.',
    genre:       'Sci-Fi FPS',
    year:        2023,
    status:      'RELEASED' as const,
    accentColor: '#00f5ff',
    tags:        ['Survival', 'Sci-Fi', 'Horror'],
    platforms:   ['PC', 'PLAYSTATION'] as Platform[],
    price:       4999,
    rating:      8.7,
  },
  {
    slug:        'neon-wilds',
    title:       'Neon',
    subtitle:    'Wilds',
    description: 'Survive the bioluminescent jungle. Nature evolved — and it hungers for you.',
    genre:       'Survival',
    year:        2022,
    status:      'RELEASED' as const,
    accentColor: '#00ff80',
    tags:        ['Open World', 'Survival', 'Action'],
    platforms:   ['PC', 'XBOX', 'NINTENDO_SWITCH'] as Platform[],
    price:       3999,
    rating:      8.4,
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  for (const game of GAMES) {
    const created = await prisma.game.upsert({
      where:  { slug: game.slug },
      update: game,
      create: game,
    })
    console.log(`  ✓ Game: ${created.title} ${created.subtitle ?? ''} (${created.id})`)
  }

  console.log('✅ Seed complete.')
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
