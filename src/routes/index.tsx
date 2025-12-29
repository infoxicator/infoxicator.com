import { Link, createFileRoute } from '@tanstack/react-router'
import { getRecentPosts } from '~/data/posts'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const recentPosts = getRecentPosts(10)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-primary">
          Hi, I'm Ruben Casas
        </h1>
        <p className="text-lg text-secondary leading-relaxed">
          Staff Vibe Engineer at Postman. Always exploring what's next: Currently playing with MCP and MCP Apps, AI-native developer tools, self-generating UIs, and the future of human + machine collaboration.
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded border border-theme hover:bg-tertiary transition-colors"
          >
            Read the blog
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Recent Posts</h2>
          <Link
            to="/blog"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="space-y-6">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="group p-4 -mx-4 rounded hover:bg-secondary transition-colors"
            >
              <Link to="/blog/$postId" params={{ postId: post.id }} className="block space-y-2">
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
                <h3 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-secondary line-clamp-2">{post.excerpt}</p>
                <div className="flex gap-2 pt-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-tertiary rounded text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
