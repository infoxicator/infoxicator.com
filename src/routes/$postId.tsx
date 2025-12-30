import { Link, createFileRoute } from '@tanstack/react-router'
import { getPostById, getAdjacentPosts } from '~/data/posts'
import { NotFound } from '~/components/NotFound'
import { MarkdownRenderer } from '~/components/MarkdownRenderer'
import { ScrollProgressBar } from '~/components/ScrollProgressBar'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, SITE_NAME, buildUrl } from '~/utils/site'

export const Route = createFileRoute('/$postId')({
  head: ({ params }) => {
    const post = getPostById(params.postId)
    const url = `/${params.postId}/`

    if (!post) {
      return {
        meta: seo({
          title: 'Post not found | Infoxicator',
          description: 'The requested post could not be found.',
          url,
          image: '/profile.jpg',
          robots: 'noindex, nofollow',
        }),
        links: [{ rel: 'canonical', href: buildUrl(url) }],
      }
    }

    const image = post.image ?? `/og/${post.id}.svg`
    const resolvedImage =
      image.startsWith('http://') || image.startsWith('https://')
        ? image
        : buildUrl(image)
    const canonicalUrl = buildUrl(url)

    return {
      meta: seo({
        title: `${post.title} | Infoxicator`,
        description: post.excerpt,
        url,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
        image,
        imageAlt: post.title,
      }),
      links: [{ rel: 'canonical', href: canonicalUrl }],
      headScripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            image: resolvedImage,
            keywords: post.tags.join(', '),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            author: {
              '@type': 'Person',
              name: SITE_AUTHOR,
              url: buildUrl('/'),
            },
            publisher: {
              '@type': 'Person',
              name: SITE_AUTHOR,
              url: buildUrl('/'),
            },
            isPartOf: {
              '@type': 'Blog',
              name: `${SITE_NAME} Blog`,
              url: buildUrl('/blog/'),
            },
          }),
        },
      ],
    }
  },
  component: BlogPost,
  notFoundComponent: () => <NotFound>Post not found</NotFound>,
})

function BlogPost() {
  const { postId } = Route.useParams()
  const post = getPostById(postId)
  const { prev, next } = getAdjacentPosts(postId)

  if (!post) {
    return <NotFound>Post not found</NotFound>
  }

  return (
    <>
      <ScrollProgressBar />
      <article className="space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <span aria-hidden="true">&larr;</span>
          Back to home
        </Link>

        {/* Post Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl font-bold text-primary">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-tertiary rounded text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <div className="prose">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Post Footer */}
        <footer className="pt-8 border-t border-theme">
          <nav className="flex items-start justify-between gap-4">
            {/* Previous Post */}
            {prev ? (
              <Link
                to="/$postId"
                params={{ postId: prev.id }}
                className="flex-1 group flex flex-col gap-2 p-4 -ml-4 rounded hover:bg-secondary transition-colors"
              >
                <span className="flex items-center gap-2 text-xs text-muted">
                  <kbd className="inline-flex items-center justify-center w-6 h-6 bg-tertiary rounded text-muted group-hover:bg-accent group-hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" />
                    </svg>
                  </kbd>
                  Previous
                </span>
                <span className="text-sm text-primary group-hover:text-accent transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {/* All Posts */}
            <Link
              to="/blog"
              className="group flex flex-col items-center gap-2 p-4 rounded hover:bg-secondary transition-colors"
            >
              <kbd className="inline-flex items-center justify-center w-6 h-6 bg-tertiary rounded text-muted group-hover:bg-accent group-hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75a2.25 2.25 0 100 4.5h10.5a2.25 2.25 0 100-4.5H15V4.5a2.25 2.25 0 10-4.5 0V6.75H6.75zM6.75 17.25a2.25 2.25 0 110-4.5h10.5a2.25 2.25 0 110 4.5H15v2.25a2.25 2.25 0 11-4.5 0v-2.25H6.75z" />
                </svg>
              </kbd>
              <span className="text-xs text-muted group-hover:text-primary transition-colors text-center">All posts</span>
            </Link>

            {/* Next Post */}
            {next ? (
              <Link
                to="/$postId"
                params={{ postId: next.id }}
                className="flex-1 group flex flex-col items-end gap-2 p-4 -mr-4 rounded hover:bg-secondary transition-colors text-right"
              >
                <span className="flex items-center gap-2 text-xs text-muted">
                  Next
                  <kbd className="inline-flex items-center justify-center w-6 h-6 bg-tertiary rounded text-muted group-hover:bg-accent group-hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h10.5m0 0l-4.5-4.5m4.5 4.5l-4.5 4.5M19.5 5.25v13.5" />
                    </svg>
                  </kbd>
                </span>
                <span className="text-sm text-primary group-hover:text-accent transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </footer>
      </article>
    </>
  )
}
