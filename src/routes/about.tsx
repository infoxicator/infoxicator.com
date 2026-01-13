import { createFileRoute, redirect } from '@tanstack/react-router'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, buildUrl } from '~/utils/site'
import { IS_DEV } from '~/utils/dev'

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
        'Learn more about Ruben Casas - Staff Engineer at Postman, conference speaker, and tech blogger based in London.',
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
          description: 'Learn more about Ruben Casas - Staff Engineer, speaker, and tech blogger.',
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

      {/* Hero Section - Editorial Style */}
      <header className="relative">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-end">
          {/* Text Column */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-2">
              <p className="text-muted font-mono text-sm tracking-wider uppercase">
                ~/about --verbose
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Building the
                <span className="block text-accent">future of APIs</span>
              </h1>
            </div>
            <p className="text-secondary text-lg leading-relaxed">
              I'm Ruben, a Staff Engineer at Postman working on making APIs more accessible to developers worldwide. When I'm not coding, you'll find me speaking at conferences or writing about the latest in web development.
            </p>
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

      {/* Photo Gallery Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-primary">gallery.map()</h2>
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
            <p className="text-muted text-sm font-mono">// career history</p>
          </div>
          <div className="space-y-6">
            <WorkItem
              company="Postman"
              role="Staff Engineer"
              period="2021 - Present"
              description="Leading frontend architecture and developer experience initiatives. Building tools that make API development more accessible."
            />
            <WorkItem
              company="Formidable"
              role="Senior Software Engineer"
              period="2019 - 2021"
              description="Worked with Fortune 500 clients on complex React applications. Contributed to open source projects."
            />
            <WorkItem
              company="Various Startups"
              role="Full Stack Developer"
              period="2015 - 2019"
              description="Built products from 0 to 1 across different industries. Learned to wear many hats."
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)]" />

        {/* Skills & Interests */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-primary">skills[]</h2>
            <p className="text-muted text-sm font-mono">// tech stack</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SkillGroup
              title="Frontend"
              skills={['React', 'TypeScript', 'Next.js', 'TanStack', 'CSS-in-JS']}
            />
            <SkillGroup
              title="Backend"
              skills={['Node.js', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Redis']}
            />
            <SkillGroup
              title="Tools"
              skills={['Vite', 'Webpack', 'Docker', 'GitHub Actions', 'Vercel']}
            />
            <SkillGroup
              title="Interests"
              skills={['AI/ML', 'DX', 'Open Source', 'Speaking', 'Mentoring']}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border)]" />

        {/* Speaking Stats */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-primary">stats()</h2>
            <p className="text-muted text-sm font-mono">// speaking metrics</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="30+" label="Conferences" />
            <StatCard number="15+" label="Countries" />
            <StatCard number="50K+" label="Developers Reached" />
            <StatCard number="100+" label="Blog Posts" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border border-theme rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border-b border-theme">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted font-mono ml-2">contact.sh</span>
        </div>
        <div className="p-6 bg-secondary text-center space-y-4">
          <p className="text-primary font-mono">
            <span className="text-accent">$</span> want_to_connect?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://x.com/Infoxicador"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary rounded border border-theme hover:bg-primary transition-colors text-sm font-mono"
            >
              <span className="text-accent">{'>'}</span> twitter
            </a>
            <a
              href="https://github.com/infoxicator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary rounded border border-theme hover:bg-primary transition-colors text-sm font-mono"
            >
              <span className="text-accent">{'>'}</span> github
            </a>
            <a
              href="https://www.linkedin.com/in/ruben-casas-17100383/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary rounded border border-theme hover:bg-primary transition-colors text-sm font-mono"
            >
              <span className="text-accent">{'>'}</span> linkedin
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function WorkItem({
  company,
  role,
  period,
  description,
}: {
  company: string
  role: string
  period: string
  description: string
}) {
  return (
    <div className="group relative pl-6 border-l-2 border-theme hover:border-accent transition-colors">
      <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-tertiary border-2 border-theme group-hover:border-accent group-hover:bg-accent transition-colors" />
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-primary font-semibold">{company}</h3>
          <span className="text-muted text-sm font-mono">{role}</span>
        </div>
        <p className="text-muted text-sm font-mono">{period}</p>
        <p className="text-secondary">{description}</p>
      </div>
    </div>
  )
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-primary font-semibold text-sm">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs bg-tertiary rounded border border-theme text-muted hover:text-accent hover:border-accent transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
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
