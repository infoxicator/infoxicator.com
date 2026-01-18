import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, buildUrl } from '~/utils/site'

export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: seo({
      title: 'Projects | Ruben Casas',
      description:
        'A showcase of recent projects, experiments, and open source contributions by Ruben Casas.',
      url: '/projects/',
      image: '/og-main.png',
      imageAlt: 'Ruben Casas Projects',
    }),
    links: [{ rel: 'canonical', href: buildUrl('/projects/') }],
    headScripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projects by Ruben Casas',
          url: buildUrl('/projects/'),
          description: 'A showcase of recent projects and experiments.',
          author: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: buildUrl('/'),
          },
        }),
      },
    ],
  }),
  component: ProjectsPage,
})

// Project data - you can move this to a separate data file later
const projects: Project[] = [
  {
    id: 'infoxicator-site',
    title: 'My Personal Site',
    description:
      'A full rewrite of infoxicator.com with a focus on fast shipping, fresh ideas, and a clean TanStack Start stack.',
    image: '/og-main.png',
    tech: ['TanStack Start', 'Netlify'],
    link: 'https://infoxicator.com/',
    year: '2025',
  },
  {
    id: 'city-quest',
    title: 'City Quest: ChatGPT Adventure Game',
    description:
      'A ChatGPT-powered city exploration game that guides players through quests and builds a shareable recap video.',
    image: '/images/posts/side-projects-i-dont-have-time/city-quest-thumb.png',
    tech: ['TanStack Start', 'ChatGPT Apps SDK', 'Convex', 'Nano Banana'],
    link: 'https://city-quest.netlify.app',
    youtube: 'https://www.youtube.com/watch?v=MJ5RtWxOiZc&t=30s',
    year: '2025',
  },
  {
    id: 'postman-welcome-video',
    title: 'Postman Welcome Video',
    description:
      'An automated workflow that turns a Slack new-hire post into a personalized welcome video.',
    image: '/images/posts/side-projects-i-dont-have-time/sterling-postman.png',
    tech: ['React', 'TypeScript', 'React Router', 'Remotion', 'Postman Flows', 'Nano Banana', 'Slack API'],
    link: 'https://postman-new-hire-video.vercel.app',
    year: '2025',
  },
  {
    id: 'chatgpt-tshirt-app',
    title: 'ChatGPT App to Buy T-Shirts',
    description:
      'A ChatGPT App that lets people browse, try on, and purchase shirts from the MCP-UI shop using AI styling.',
    image: '/images/posts/side-projects-i-dont-have-time/chatgpt-app-t-shirt.png',
    tech: [
      'Next.js',
      'ChatGPT Apps SDK',
      'Postman Flows',
      'Nano Banana',
      'Shopify Headless CMS',
    ],
    youtube: 'https://www.youtube.com/watch?v=XHgxGczwERo',
    year: '2025',
  },
  {
    id: 'tbpn-video-generator',
    title: 'TBPN Video Generator',
    description:
      'A generative video tool that spins up comedic onboarding or conference stories using templates and live data.',
    image: '/images/posts/side-projects-i-dont-have-time/tbpn-tobin.png',
    tech: ['React', 'TypeScript', 'React Router', 'Remotion', 'Postman Flows', 'Nano Banana'],
    link: 'https://tbpn-video-generator.vercel.app/',
    youtube: 'https://www.youtube.com/watch?v=42B_ia64QZU&t=4s',
    year: '2025',
  },
  {
    id: 'adventures-of-fluffy',
    title: "Children's Book: The Adventures of Fluffy",
    description:
      "A fully vibecoded children's book co-created with my daughter: storyboarding, art generation, and layout.",
    image: '/images/posts/side-projects-i-dont-have-time/adventures-of-fluffy.jpeg',
    tech: ['Nano Banana', 'Gemini Pro', 'ChatGPT', 'Canva'],
    year: '2025',
  },
  {
    id: 'mcp-ui-shop',
    title: 'Shopify Store MCP-UI.shop',
    description:
      'An MCP-UI storefront built on Shopify so people can buy shirts via MCP-aware clients and apps.',
    image: '/images/posts/side-projects-i-dont-have-time/mcp-ui-shop.jpeg',
    tech: ['Shopify', 'MCP Storefront', 'MCP-UI', 'Goose'],
    link: 'https://mcp-ui.shop/',
    youtube: 'https://www.youtube.com/watch?v=cM6nYANYxFc',
    featured: true,
    year: '2025',
  },
  {
    id: 'nano-banana-time-machine',
    title: 'Time Machine with Nano Banana',
    description:
      'A photo time-travel site that transforms uploads into a different era using image generation and a lightweight upload pipeline.',
    image: '/images/posts/side-projects-i-dont-have-time/nano-banana-time-machine.jpeg',
    tech: [
      'React',
      'TypeScript',
      'Cloudflare Workers',
      'R2 Storage',
      'Postman Flows',
      'Nano Banana',
    ],
    link: 'https://iwasthere.today/',
    youtube: 'https://www.youtube.com/watch?v=y9dDVLVIGTA',
    featured: true,
    year: '2025',
  },
  {
    id: 'weather-agent-mcp-ui',
    title: 'Weather Agent with MCP-UI',
    description:
      'A generative UI weather agent that fetches the temperature and restyles itself on the fly based on any user-provided vibe.',
    image: '/images/posts/side-projects-i-dont-have-time/weather-agent.jpeg',
    tech: ['Postman Flows', 'MCP-UI', 'Weather API'],
    youtube: 'https://www.youtube.com/watch?v=z1fD9-1R_rw',
    featured: true,
    year: '2025',
  },
  {
    id: 'postman-app-launch-performance',
    title: 'Postman App Launch Performance',
    description:
      "Multi-year project to improve the launch performance of Postman's Electron application, including a public conference talk on the approach and results.",
    image: '/images/projects/postman-performance.jpeg',
    tech: ['Electron', 'Performance', 'Postman'],
    link: 'https://gitnation.com/contents/this-is-how-we-made-postman-launch-twice-as-fast',
    year: 'Apr 2023 - Apr 2025',
  },
  {
    id: 'postman-vscode-extension',
    title: 'Postman VSCode Extension',
    description:
      'Shipped the Postman VSCode extension with a small team in six months; now used by 2M+ developers. Introduced bidirectional sync across tabs and an integration-test platform.',
    image: '/images/projects/vscode-blog-new-features.jpeg',
    tech: ['VS Code', 'Extensions', 'Postman'],
    link: 'https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode',
    year: 'Jan 2022 - Aug 2022',
  },
  {
    id: 'one-app-micro-frontend-framework',
    title: 'One App Micro-Frontend Framework',
    description:
      'Contributor and core team member of the open source React meta-framework published after the internal implementation at American Express.',
    image: '/images/projects/one-app.png',
    tech: ['React', 'Micro-Frontends', 'Open Source'],
    github: 'https://github.com/americanexpress/one-app',
    link: 'https://github.com/americanexpress/one-app',
    year: 'Mar 2020 - Mar 2022',
  },
]

interface Project {
  id: string
  title: string
  description: string
  image?: string
  tech: string[]
  link?: string
  github?: string
  youtube?: string
  featured?: boolean
  year: string
  status?: 'wip' | 'archived'
}

function ProjectsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-primary">projects --list</h1>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-muted font-mono text-sm">{projects.length} items</span>
        </div>
        <p className="text-secondary">
          A collection of things I've built, contributed to, or am currently experimenting with.
        </p>
      </header>

      {/* All Projects Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {/* Open Source CTA */}
      <section className="border border-theme rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border-b border-theme">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted font-mono ml-2">opensource.sh</span>
        </div>
        <div className="p-6 bg-secondary space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-tertiary rounded-lg border border-theme">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-primary font-semibold">Open Source</h3>
              <p className="text-secondary text-sm">
                Most of my work is open source. Check out my GitHub for more projects, contributions,
                and experiments.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/infoxicator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary rounded border border-theme hover:bg-primary transition-colors text-sm font-mono"
          >
            <span className="text-accent">{'>'}</span> view_all_repos
          </a>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  // Primary link: prefer link, fallback to youtube
  const primaryUrl = project.link || project.youtube

  const cardContent = (
    <>
      {/* Image */}
      {project.image && (
        <div className="relative aspect-video overflow-hidden bg-tertiary">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {/* Header with year and links */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted font-mono">{project.year}</span>
              {project.status === 'wip' && (
                <span className="px-1.5 py-0.5 text-[10px] bg-amber-500/10 text-amber-500 rounded font-mono border border-amber-500/30">
                  WIP
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
              {project.title}
            </h2>
          </div>
          {/* Links - stop propagation to allow individual clicks */}
          <div className="flex items-center gap-1 shrink-0 relative z-10">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded hover:bg-tertiary transition-colors text-muted hover:text-primary"
                aria-label={`${project.title} on GitHub`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded hover:bg-tertiary transition-colors text-muted hover:text-primary"
                aria-label={`Visit ${project.title}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {project.youtube && (
              <a
                href={project.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded hover:bg-tertiary transition-colors text-muted hover:text-primary"
                aria-label={`Watch ${project.title} on YouTube`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.99 2.99 0 0 0-2.105-2.112C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.393.574A2.99 2.99 0 0 0 .502 6.186C0 8.078 0 12 0 12s0 3.922.502 5.814a2.99 2.99 0 0 0 2.105 2.112C4.495 20.5 12 20.5 12 20.5s7.505 0 9.393-.574a2.99 2.99 0 0 0 2.105-2.112C24 15.922 24 12 24 12s0-3.922-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary text-sm flex-1">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs bg-tertiary rounded text-muted font-mono"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-muted font-mono">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </>
  )

  // If there's a primary URL, wrap in a link
  if (primaryUrl) {
    return (
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group border border-theme rounded-lg overflow-hidden hover:border-accent transition-colors bg-secondary flex flex-col cursor-pointer"
      >
        {cardContent}
      </a>
    )
  }

  // No link available, render as article
  return (
    <article className="group border border-theme rounded-lg overflow-hidden bg-secondary flex flex-col">
      {cardContent}
    </article>
  )
}
