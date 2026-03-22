export interface JobRole {
  id:           string
  title:        string
  department:   string
  type:         'Full-time' | 'Contract' | 'Remote'
  location:     string
  accentColor:  string
  description:  string
  requirements: string[]
  niceToHave?:  string[]
}

export const OPEN_ROLES: JobRole[] = [
  {
    id:          'sr-game-engineer',
    title:       'Senior Game Engineer',
    department:  'Engineering',
    type:        'Full-time',
    location:    'Remote · Global',
    accentColor: '#00f5ff',
    description: 'Own core gameplay systems from design through ship. You will build the physics, AI, and networked multiplayer that millions of players will feel in their bones.',
    requirements: [
      '5+ years professional game development (Unity, Unreal, or custom engine)',
      'Deep C++ or C# systems programming experience',
      'Shipped at least one title in a senior individual contributor role',
      'Strong fundamentals in data structures, algorithms, and optimization',
      'Experience with multiplayer networking (authoritative servers, lag compensation)',
    ],
    niceToHave: [
      'Experience with procedural generation systems',
      'Shipped a live-service game with post-launch updates',
      'Open source contributions to game tooling',
    ],
  },
  {
    id:          'lead-3d-artist',
    title:       'Lead 3D Environment Artist',
    department:  'Art',
    type:        'Full-time',
    location:    'Remote · Global',
    accentColor: '#ff4500',
    description: 'Define the visual language of our worlds. You will set the bar for environment art across all titles — from initial concept blocks to final shipping quality.',
    requirements: [
      '6+ years in game environment art, with 2+ in a lead capacity',
      'Expert-level Maya, Blender, or equivalent DCC toolset',
      'Strong material authoring in Substance Painter / Substance Designer',
      'Portfolio demonstrating AAA or high-quality indie environments',
      'Experience establishing and enforcing art pipelines across a team',
    ],
    niceToHave: [
      'Houdini procedural environment experience',
      'Real-time VFX integration knowledge',
      'Architecture or industrial design background',
    ],
  },
  {
    id:          'narrative-designer',
    title:       'Narrative Designer',
    department:  'Design',
    type:        'Full-time',
    location:    'Remote · Global',
    accentColor: '#ffaa00',
    description: 'Build worlds that breathe. You will design the systems of consequence, dialogue trees, and lore architecture that make our universes feel alive long after the credits roll.',
    requirements: [
      '3+ years in game narrative design or interactive storytelling',
      'Shipped at least one narrative-heavy title',
      'Fluency with branching dialogue tools (Ink, Yarn Spinner, Twine, or proprietary)',
      'Exceptional prose writing and editorial instincts',
      'Ability to collaborate closely with engineers on quest logic systems',
    ],
    niceToHave: [
      'Background in screenwriting or fiction writing',
      'Experience designing systemic narrative (not just authored stories)',
      'RPG design sensibility',
    ],
  },
  {
    id:          'vfx-artist',
    title:       'Real-Time VFX Artist',
    department:  'Art',
    type:        'Contract',
    location:    'Remote · Global',
    accentColor: '#00ff80',
    description: 'Create the moments that get captured in clips and shared for years. Magic systems, explosions, weather, and ambient life — every particle is your signature.',
    requirements: [
      '3+ years real-time VFX in Unreal or Unity',
      'Strong portfolio of game-ready effects at various complexity levels',
      'Proficiency with Cascade, Niagara, or Unity VFX Graph',
      'Understanding of performance budgets and optimization',
    ],
    niceToHave: [
      'Houdini simulation for VFX reference generation',
      'Shader authoring ability',
    ],
  },
  {
    id:          'fullstack-engineer',
    title:       'Full-Stack Engineer (Web)',
    department:  'Engineering',
    type:        'Full-time',
    location:    'Remote · Global',
    accentColor: '#a855f7',
    description: 'Own the digital face of GamingVerse — the website, player portal, game store, and internal tooling. You will work with Next.js, PostgreSQL, Stripe, and Clerk at production scale.',
    requirements: [
      '4+ years full-stack web development',
      'Deep Next.js App Router knowledge (not just Pages Router)',
      'TypeScript-first mindset — no implicit any, ever',
      'Experience integrating payment systems (Stripe preferred)',
      'Strong eye for UI quality and animation',
    ],
    niceToHave: [
      'Experience building game-adjacent web products',
      'GSAP or Framer Motion animation experience',
      'Background working with game studios',
    ],
  },
]

export const DEPARTMENTS = ['All', ...Array.from(new Set(OPEN_ROLES.map(r => r.department)))]
