import * as React from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { getAllPosts } from '~/data/posts'
import { seo } from '~/utils/seo'
import { buildUrl } from '~/utils/site'

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
    }
  },
  head: () => ({
    meta: seo({
      title: 'Search | Infoxicator',
      description: 'Search through all blog posts.',
      url: '/search',
      image: '/og-main.png',
      imageAlt: 'Ruben Casas profile card',
    }),
    links: [{ rel: 'canonical', href: buildUrl('/search') }],
  }),
  component: SearchPage,
})

function SearchPage() {
  const { q } = Route.useSearch()
  const navigate = useNavigate()
  const [query, setQuery] = React.useState(q || '')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const results = React.useMemo(() => {
    if (!q?.trim()) return []

    const searchTerm = q.toLowerCase()
    return getAllPosts().filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm)
      const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm)
      const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      return titleMatch || excerptMatch || tagMatch
    })
  }, [q])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate({ to: '/search', search: { q: query.trim() } })
    }
  }

  React.useEffect(() => {
    setQuery(q || '')
  }, [q])

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-primary">Search</h1>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg border border-theme">
            <svg
              className="w-5 h-5 text-muted flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts by title, excerpt, or tags..."
              className="flex-1 bg-transparent text-primary placeholder:text-muted outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </form>
      </header>

      {q ? (
        <div className="space-y-6">
          <p className="text-muted">
            {results.length === 0
              ? `No posts found for "${q}"`
              : `Found ${results.length} ${results.length === 1 ? 'post' : 'posts'} for "${q}"`}
          </p>

          {results.length > 0 && (
            <div className="space-y-6">
              {results.map((post) => (
                <article
                  key={post.id}
                  className="group p-4 -mx-4 rounded hover:bg-secondary transition-colors"
                >
                  <Link to="/$postId" params={{ postId: post.id }} className="block space-y-2">
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>&middot;</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="text-xl font-medium text-primary group-hover:text-accent transition-colors">
                      <HighlightMatch text={post.title} query={q} />
                    </h2>
                    <p className="text-secondary">
                      <HighlightMatch text={post.excerpt} query={q} />
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded ${
                            tag.toLowerCase().includes(q.toLowerCase())
                              ? 'bg-accent/20 text-accent'
                              : 'bg-tertiary text-muted'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-muted">Enter a search term to find posts.</p>
      )}
    </div>
  )
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-accent/30 text-inherit rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}
