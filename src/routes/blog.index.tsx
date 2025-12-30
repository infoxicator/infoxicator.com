import { Link, createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '~/data/posts'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, SITE_NAME, buildUrl } from '~/utils/site'

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: seo({
      title: 'Blog | Infoxicator',
      description:
        'Thoughts on software engineering, web development, and building things with AI.',
      url: '/blog/',
      image: '/profile.jpg',
      imageAlt: 'Ruben Casas profile photo',
    }),
    links: [{ rel: 'canonical', href: buildUrl('/blog/') }],
    headScripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${SITE_NAME} Blog`,
          url: buildUrl('/blog/'),
          description:
            'Thoughts on software engineering, web development, and building things with AI.',
          publisher: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: buildUrl('/'),
          },
        }),
      },
    ],
  }),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-primary">Blog</h1>
        <p className="text-secondary">
          Thoughts on software engineering, web development, and building things with AI.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
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
                {post.title}
              </h2>
              <p className="text-secondary">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
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
    </div>
  )
}
