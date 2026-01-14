import { createFileRoute, redirect } from '@tanstack/react-router'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, buildUrl } from '~/utils/site'
import { IS_DEV } from '~/utils/dev'

const HOBBIES = [
  {
    title: 'Wingfoiling',
    description: 'Wind + water + board',
    image: '/images/about/wingfoiling.svg',
    className: 'col-span-2 row-span-2',
  },
  {
    title: 'Cold Water Swimming',
    description: 'Reset button',
    image: '/images/about/cold-water-swimming.svg',
  },
  {
    title: 'Paddleboarding',
    description: 'Balance + calm',
    image: '/images/about/paddleboarding.svg',
  },
  {
    title: '4 Instruments',
    description: 'Strings, keys, rhythm, more',
    image: '/images/about/four-instruments.svg',
  },
  {
    title: 'London Tour Guide',
    description: 'Former life',
    image: '/images/about/london-tour-guide.svg',
  },
]

const CHARACTER_SHEET = [
  { label: 'Class', value: 'Staff Vibe Engineer @ Postman' },
  { label: 'Subclass', value: 'Google Dev Expert' },
  { label: 'Origin', value: 'Colombia' },
  { label: 'Base', value: 'South East England, UK' },
  { label: 'Languages', value: 'English / Spanish' },
  { label: 'Party', value: 'Married + two kids' },
  { label: 'Roles', value: 'Public speaker, blogger' },
]

const SPECIAL_MOVES = [
  'Developer tooling',
  'AI agents',
  'MCP apps',
  'Frontend architecture at scale',
]

export const Route = createFileRoute('/about')({
  beforeLoad: () => {
    if (!IS_DEV) {
      throw redirect({ to: '/' })
    }
  },
  head: () => ({
    meta: seo({
      title: 'About | Ruben Casas',
      description:
        'Learn more about Ruben Casas - Staff Vibe Engineer at Postman, Google Dev Expert, speaker, and blogger exploring AI agents and frontend architecture at scale.',
      url: '/about/',
      image: '/profile.jpg',
      imageAlt: 'Ruben Casas',
    }),
    links: [{ rel: 'canonical', href: buildUrl('/about/') }],
    headScripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Ruben Casas',
          url: buildUrl('/about/'),
          description:
            'Learn more about Ruben Casas - Staff Vibe Engineer, Google Dev Expert, speaker, and tech blogger.',
          mainEntity: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: buildUrl('/'),
          },
        }),
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Dev Mode Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-600 text-sm font-mono">
        <span className="text-amber-500">⚠</span> dev_mode: This page is only visible in development
      </div>

      {/* Hero Section - Character Sheet */}
      <header className="relative">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-end">
          {/* Text Column */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-2">
              <p className="text-muted font-mono text-sm tracking-wider uppercase">
                character_sheet.json
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Ruben Casas
              </h1>
              <p className="text-accent font-mono text-sm">
                Staff Vibe Engineer · Postman
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {CHARACTER_SHEET.map((item) => (
                <div
                  key={item.label}
                  className="border border-theme bg-secondary rounded-lg p-3"
                >
                  <p className="text-muted font-mono text-xs">{item.label}</p>
                  <p className="text-primary text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="border border-theme bg-secondary rounded-lg p-4 space-y-2">
              <p className="text-muted font-mono text-xs">special_moves[]</p>
              <div className="flex flex-wrap gap-2">
                {SPECIAL_MOVES.map((move) => (
                  <span
                    key={move}
                    className="px-2 py-1 text-xs bg-tertiary rounded border border-theme text-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>
            <div className="border border-theme bg-secondary rounded-lg p-4 font-mono text-sm text-primary space-y-2">
              <p className="text-muted">hot_take()</p>
              <p>"The IDE is dead. Vibe engineering killed it."</p>
              <p className="text-muted">With coding agents in the loop, the stack matters less.</p>
            </div>
          </div>

          {/* Image Column - Asymmetric Treatment */}
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/5] relative">
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-accent translate-x-4 translate-y-4 rounded-lg" />
              <img
                src="/profile.jpg"
                alt="Ruben Casas"
                className="relative w-full h-full object-cover rounded-lg border border-theme"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Outside of Programming - Hobby Gallery */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-primary">side_quests()</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <p className="text-secondary text-lg leading-relaxed">
          The other side of me: water, wind, music, and a past life as a London tour guide.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[140px] md:auto-rows-[170px]">
          {HOBBIES.map((hobby) => (
            <div
              key={hobby.title}
              className={`relative group overflow-hidden rounded-lg border border-theme ${
                hobby.className ?? 'aspect-square'
              }`}
            >
              <img
                src={hobby.image}
                alt={hobby.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <p className="text-white font-mono text-sm">{hobby.title}</p>
                <p className="text-white/80 text-xs font-mono">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-primary">stage_credits()</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Masonry-style Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Large featured image */}
          <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg border border-theme">
            <img
              src="/speaking/reactathon-2022.jpg"
              alt="Speaking at Reactathon 2022"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-mono text-sm">Reactathon 2022</p>
            </div>
          </div>

          {/* Smaller images */}
          <div className="relative group overflow-hidden rounded-lg border border-theme aspect-square">
            <img
              src="/speaking/react-advanced-2024.webp"
              alt="React Advanced London 2024"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-mono text-xs">React Advanced</p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg border border-theme aspect-square">
            <img
              src="/speaking/react-summit-2024.jpg"
              alt="React Summit 2024"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-mono text-xs">React Summit</p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg border border-theme aspect-square">
            <img
              src="/speaking/tech-leaders.jpg"
              alt="Tech Leaders Conference"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-mono text-xs">Tech Leaders</p>
            </div>
          </div>

          <div className="col-span-2 relative group overflow-hidden rounded-lg border border-theme aspect-[2/1]">
            <img
              src="/speaking/postman-galaxy.jpg"
              alt="Postman Galaxy Conference"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-mono text-sm">Postman Galaxy Conference</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Sections */}
      <section className="space-y-12">
        {/* Work Experience */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-primary">work()</h2>
            <p className="text-muted text-sm font-mono">// look at my linkedin</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-muted">
              <span>For the full backstory:</span>
              <a
                href="https://www.linkedin.com/in/ruben-casas-17100383/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Look at my LinkedIn
              </a>
            </div>
            <ul className="space-y-2 text-secondary">
              <li>Current quest: Staff Vibe Engineer @ Postman (2021 — now)</li>
              <li>Previous quest: Senior Software Engineer @ Formidable (2019 — 2021)</li>
              <li>Earlier: Full-stack builder across startups (2015 — 2019)</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)]" />

        {/* Speaking Stats */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-primary">stats()</h2>
            <p className="text-muted text-sm font-mono">// speaking stats</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="30+" label="Conferences" />
            <StatCard number="15+" label="Countries" />
            <StatCard number="50K+" label="Developers Reached" />
            <StatCard number="100+" label="Blog Posts" />
          </div>
        </div>
      </section>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4 bg-secondary rounded-lg border border-theme text-center hover:border-accent transition-colors group">
      <div className="text-2xl md:text-3xl font-bold text-accent group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="text-sm text-muted font-mono">{label}</div>
    </div>
  )
}
