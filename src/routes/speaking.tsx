import { createFileRoute } from '@tanstack/react-router'
import { getAllSpeakingItems, type SpeakingItem } from '~/data/speaking'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, buildUrl } from '~/utils/site'

export const Route = createFileRoute('/speaking')({
  head: () => ({
    meta: seo({
      title: 'Speaking | Ruben Casas',
      description:
        'Conference talks, podcast appearances, and meetup presentations by Ruben Casas.',
      url: '/speaking/',
      image: '/og-main.png',
      imageAlt: 'Ruben Casas speaking engagements',
    }),
    links: [{ rel: 'canonical', href: buildUrl('/speaking/') }],
    headScripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Speaking Engagements',
          url: buildUrl('/speaking/'),
          description:
            'Conference talks, podcast appearances, and meetup presentations.',
          author: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: buildUrl('/'),
          },
        }),
      },
    ],
  }),
  component: SpeakingPage,
})

function SpeakingPage() {
  const items = getAllSpeakingItems()

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-primary">Speaking --list</h1>
        <p className="text-secondary">
          Conference talks, podcast appearances, and community meetups.
        </p>
              {/* Footer CTA */}
      <section className="border border-theme rounded-lg p-6 bg-secondary text-center space-y-3">
        <p className="text-primary font-mono">
          <span className="text-accent">$</span> interested_in_having_me_speak?
        </p>
        <a
          href="https://x.com/Infoxicador"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary rounded border border-theme hover:bg-primary transition-colors text-sm font-mono"
        >
          <span className="text-accent">{'>'}</span> dm_me_on_twitter
        </a>
      </section>
      </header>

      <div className="space-y-6">
        {items.map((item) => (
          <SpeakingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function SpeakingCard({ item }: { item: SpeakingItem }) {
  const typeLabel = {
    podcast: 'podcast',
    talk: 'talk',
    meetup: 'meetup',
    livestream: 'livestream',
  }[item.type]

  const typeIcon = {
    podcast: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM8 12a4 4 0 0 0 8 0h2a6 6 0 0 1-5 5.917V21h3v2H8v-2h3v-3.083A6 6 0 0 1 6 12h2z" />
      </svg>
    ),
    talk: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    meetup: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 3a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10zm0 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    ),
    livestream: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="2" stroke="currentColor" fill="none" />
      </svg>
    ),
  }[item.type]

  // Talk or livestream with YouTube embed or fallback image
  if ((item.type === 'talk' || item.type === 'livestream') && (item.youtubeId || item.image)) {
    return (
      <article className="group border border-theme rounded-lg overflow-hidden bg-secondary">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border-b border-theme">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted font-mono ml-2 flex items-center gap-2">
            {typeIcon}
            <span>{item.event}</span>
            <span className="text-tertiary">|</span>
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </span>
        </div>

        {/* YouTube Embed or Fallback Image */}
        <div className="aspect-video">
          {item.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Talk Info */}
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">
            {item.title}
          </h2>
          <p className="text-secondary text-sm">{item.description}</p>
          {item.slides && (
            <a
              href={item.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors font-mono"
            >
              {'>'} view_slides
            </a>
          )}
        </div>
      </article>
    )
  }

  // Meetup with images (array or single fallback)
  if (item.type === 'meetup' && (item.images?.length || item.image)) {
    return (
      <article className="group border border-theme rounded-lg overflow-hidden">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border-b border-theme">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted font-mono ml-2 flex items-center gap-2">
            {typeIcon}
            <span>{item.event}</span>
            <span className="text-tertiary">|</span>
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </span>
        </div>

        {/* Meetup Images */}
        {item.images && item.images.length > 0 ? (
          <div className={`grid ${item.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 bg-secondary`}>
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${item.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="aspect-video">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Meetup Info */}
        <div className="p-4 space-y-2 bg-secondary">
          {item.location && (
            <div className="flex items-center gap-1 text-sm text-muted">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {item.location}
            </div>
          )}
          <h2 className="text-lg font-medium text-primary">
            {item.title}
          </h2>
          <p className="text-secondary text-sm">{item.description}</p>
        </div>
      </article>
    )
  }

  // Podcast or fallback card style (with terminal window design)
  const content = (
    <>
      <h2 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">
        {item.title}
      </h2>
      <p className="text-secondary text-sm">{item.description}</p>
      {item.url && (
        <div className="pt-2">
          <span className="inline-flex items-center gap-1 text-sm text-accent font-mono">
            {'>'} {item.type === 'podcast' ? 'Listen' : 'Watch'}
          </span>
        </div>
      )}
    </>
  )

  return (
    <article className="group border border-theme rounded-lg overflow-hidden">
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border-b border-theme">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted font-mono ml-2 flex items-center gap-2">
          {typeIcon}
          <span>{item.event}</span>
          <span className="text-tertiary">|</span>
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </span>
      </div>

      {/* Fallback Image */}
      {item.image && (
        <div className="aspect-video">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 space-y-2 bg-secondary hover:bg-tertiary transition-colors"
        >
          {content}
        </a>
      ) : (
        <div className="p-4 space-y-2 bg-secondary">
          {content}
        </div>
      )}
    </article>
  )
}
