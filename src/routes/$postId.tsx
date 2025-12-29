import { Link, createFileRoute } from '@tanstack/react-router'
import { getPostById } from '~/data/posts'
import { NotFound } from '~/components/NotFound'
import { MarkdownRenderer } from '~/components/MarkdownRenderer'
import { ScrollProgressBar } from '~/components/ScrollProgressBar'

export const Route = createFileRoute('/$postId')({
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
