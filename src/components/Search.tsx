import * as React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { blogPosts, type BlogPost } from '~/data/posts'

interface SearchContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  open: () => void
  close: () => void
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])

  return (
    <SearchContext.Provider value={{ isOpen, setIsOpen, open, close }}>
      {children}
    </SearchContext.Provider>
  )
}

function useSearch() {
  const context = React.useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}

export function SearchButton() {
  const { open } = useSearch()

  return (
    <button
      onClick={open}
      className="flex items-center justify-center w-9 h-9 bg-secondary rounded hover:bg-tertiary transition-colors"
      aria-label="Search posts"
    >
      <svg
        className="w-5 h-5"
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
    </button>
  )
}

export function SearchModal() {
  const { isOpen, close } = useSearch()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<BlogPost[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const modalRef = React.useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = blogPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm)
      const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm)
      const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      return titleMatch || excerptMatch || tagMatch
    })
    setResults(filtered)
  }, [query])

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      close()
      navigate({ to: '/search', search: { q: query.trim() } })
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl mx-4 bg-primary border border-theme rounded-lg shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-theme">
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
            placeholder="Search posts..."
            className="flex-1 bg-transparent text-primary placeholder:text-muted outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-muted bg-secondary rounded">
            ESC
          </kbd>
        </form>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="px-4 py-8 text-center text-muted">
              Type to search posts by title, excerpt, or tags
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted">
              No posts found for "{query}"
            </div>
          ) : (
            <ul className="py-2">
              {results.map((post) => (
                <li key={post.id}>
                  <Link
                    to="/$postId"
                    params={{ postId: post.id }}
                    onClick={close}
                    className="flex flex-col gap-1 px-4 py-3 hover:bg-secondary transition-colors"
                  >
                    <span className="text-primary font-medium">{post.title}</span>
                    <span className="text-sm text-muted line-clamp-2">{post.excerpt}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted">{post.readingTime}</span>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-secondary rounded text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
