import { Link, createFileRoute } from '@tanstack/react-router'
import { getPostById } from '~/data/posts'
import { NotFound } from '~/components/NotFound'
import { MarkdownRenderer } from '~/components/MarkdownRenderer'
import { ScrollProgressBar } from '~/components/ScrollProgressBar'
import { seo } from '~/utils/seo'
import { buildUrl } from '~/utils/site'

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
        }),
        links: [{ rel: 'canonical', href: buildUrl(url) }],
      }
    }

    return {
      meta: seo({
        title: `${post.title} | Infoxicator`,
        description: post.excerpt,
        url,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
        image: '/profile.jpg',
      }),
      links: [{ rel: 'canonical', href: buildUrl(url) }],
    }
  },
  component: BlogPost,
  notFoundComponent: () => <NotFound>Post not found</NotFound>,
})

function BlogPost() {
  const { postId } = Route.useParams()
  const post = getPostById(postId)

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
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            Back to all posts
          </Link>
        </footer>
      </article>
    </>
  )
}
