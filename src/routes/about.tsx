import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { seo } from '~/utils/seo'
import { SITE_AUTHOR, buildUrl } from '~/utils/site'

// Character sheet data from Codex
const CHARACTER_SHEET = {
  name: 'Ruben Casas',
  class: 'Staff Vibe Engineer',
  subclass: 'Google Dev Expert',
  guild: 'Postman',
  origin: 'Colombia 🇨🇴',
  base: 'South East England, UK 🇬🇧',
  languages: ['English', 'Spanish'],
  party: 'Married + two kids',
  alignment: 'Pragmatic optimist with a slightly chaotic build',
}

const SPECIAL_MOVES = [
  { name: 'Developer tooling', icon: '🛠️' },
  { name: 'AI agents', icon: '🤖' },
  { name: 'MCP apps', icon: '⚡' },
  { name: 'Frontend architecture at scale', icon: '🏗️' },
]

// Side quests - the human stuff
const SIDE_QUESTS = [
  {
    title: 'Wingfoiling',
    description: 'Wind + water + board. Sounds made up but it is real and addictive.',
    image: '/images/posts/what-codex-thinks-about-me/wing-what.jpeg',
    video: '/videos/wing-foil.mp4',
    featured: true,
  },
  {
    title: 'Cold Water Swimming',
    description: 'Self-inflicted suffering that doubles as a reset button.',
    image: '/images/posts/what-codex-thinks-about-me/meme-cold-water.jpeg',
  },
  {
    title: 'Paddleboarding',
    description: 'Balance + calm + occasionally falling in.',
    image: '/images/about/sidequests/paddleboard.jpg',
  },
  {
    title: 'Music',
    description: 'I play 4 instruments: bass, keys, drums, and guitar. A story for another time.',
    image: '/images/about/sidequests/music.jpg',
  },
  {
    title: 'London Tour Guide',
    description: 'Former life. I can do the accent if you ask nicely.',
    image: '/images/about/sidequests/tourguide.JPG',
  },
]

// Podcasts that live in my brain
const PODCASTS = [
  {
    name: 'Syntax.fm',
    hosts: 'Wes Bos & Scott Tolinski',
    description: 'Tasty web development treats',
    url: 'https://syntax.fm/',
    color: '#F0DB4F',
    artwork: '/images/about/podcasts/syntax-fm.png',
  },
  {
    name: 'Latent Space',
    hosts: 'Alessio & Swyx',
    description: 'The AI engineer podcast',
    url: 'https://www.latent.space/',
    color: '#8B5CF6',
    artwork: '/images/about/podcasts/latent-space.png',
  },
  {
    name: 'My First Million',
    hosts: 'Sam Parr & Shaan Puri',
    description: 'Brainstorming business ideas since episode 1',
    url: 'https://www.mfmpod.com/',
    color: '#22C55E',
    artwork: '/images/about/podcasts/my-first-million.png',
  },
  {
    name: 'The Pragmatic Engineer',
    hosts: 'Gergely Orosz',
    description: 'Big tech and high-growth startups',
    url: 'https://newsletter.pragmaticengineer.com/podcast',
    color: '#3B82F6',
    artwork: '/images/about/podcasts/pragmatic-engineer.jpg',
  },
  {
    name: 'PodRocket',
    hosts: 'LogRocket Team',
    description: 'Weekly web dev conversations',
    url: 'https://podrocket.logrocket.com/',
    color: '#764ABC',
    artwork: '/images/about/podcasts/podrocket.jpg',
  },
  {
    name: 'Contejas Podcast',
    hosts: 'Contejas',
    description: 'Spanish tech conversations',
    url: 'https://tej.as/podcast',
    color: '#EC4899',
    artwork: '/images/about/podcasts/contejaspod.jpeg',
  },
  {
    name: 'Kill Switch',
    hosts: 'Various',
    description: 'True crime meets tech',
    url: 'https://open.spotify.com/show/3gkLkDGuc1avcwMYmoOchw',
    color: '#EF4444',
    artwork: '/images/about/podcasts/kill-switch.jpg',
  },
  {
    name: 'Something You Should Know',
    hosts: 'Mike Carruthers',
    description: 'Random facts about how elevators work',
    url: 'https://somethingyoushouldknow.net/',
    color: '#F97316',
    artwork: '/images/about/podcasts/something-you-should-know.jpg',
  },
]

// YouTube videos
const YOUTUBE_VIDEOS = [
  {
    id: 'z1fD9-1R_rw',
    title: 'Weather Agent with MCP-Ui',
    description: 'A wild idea shipped as a demo',
  },
  {
    id: 'y9dDVLVIGTA',
    title: 'Nano Banana Time Machine',
    description: 'Yes, this is real',
  },
  {
    id: 'cM6nYANYxFc',
    title: 'MCP-Ui Shop',
    description: 'Generative UI in action',
  },
]

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: seo({
      title: 'About | Ruben Casas',
      description:
        'Learn more about Ruben Casas - Staff Vibe Engineer at Postman, Google Dev Expert, speaker, and blogger exploring AI agents and frontend architecture at scale.',
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
          description:
            'Learn more about Ruben Casas - Staff Vibe Engineer, Google Dev Expert, speaker, and tech blogger.',
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
    <div className="space-y-20">
      {/* Hero Section - Character Sheet */}
      <HeroSection />

      {/* Speaking Gallery */}
      <SpeakingGallery />

      {/* Side Quests - Human stuff */}
      <SideQuestsSection />

      {/* Hot Take Section */}
      <HotTakeSection />

      {/* Podcast Carousel */}
      <PodcastCarousel />

      {/* YouTube Section */}
      <YouTubeSection />

      {/* Stats Section */}
      {/* <StatsSection />
       */}

      {/* Work & Links */}
      <FooterSection />
    </div>
  )
}

function HeroSection() {
  return (
    <header className="relative">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
        {/* Left Column - Name and Character Sheet */}
        <div className="space-y-6 order-2 lg:order-1">
          {/* Terminal-style header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-accent font-mono text-xs animate-pulse">●</span>
              <span className="text-muted font-mono text-xs tracking-widest uppercase">
                character_sheet.json
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-none tracking-tight">
              {CHARACTER_SHEET.name}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              Building the
              <span className="block text-accent">future of APIs</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
              <span className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-accent">
                {CHARACTER_SHEET.class}
              </span>
              <span className="text-muted">@</span>
              <span className="text-secondary">{CHARACTER_SHEET.guild}</span>
            </div>
          </div>

          {/* Character stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <StatBlock label="Class" value={CHARACTER_SHEET.class} />
            <StatBlock label="Subclass" value={CHARACTER_SHEET.subclass} />
            <StatBlock label="Origin" value={CHARACTER_SHEET.origin} />
            <StatBlock label="Base" value={CHARACTER_SHEET.base} />
            <StatBlock label="Languages" value={CHARACTER_SHEET.languages.join(' / ')} />
            <StatBlock label="Party" value={CHARACTER_SHEET.party} />
          </div>

          {/* Alignment */}
          <div className="border-l-2 border-accent pl-4">
            <p className="text-muted font-mono text-xs mb-1">alignment</p>
            <p className="text-secondary italic">{CHARACTER_SHEET.alignment}</p>
          </div>
        </div>

        {/* Right Column - Picture and Special Moves */}
        <div className="space-y-6 order-1 lg:order-2">
          {/* Image */}
          <div className="relative max-w-[280px] mx-auto md:max-w-none">
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-2xl blur-xl" />
            <div className="absolute inset-0 border-2 border-accent/30 translate-x-4 translate-y-4 rounded-xl" />
            <div className="absolute inset-0 border border-accent/10 -translate-x-2 -translate-y-2 rounded-xl" />

            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-theme">
              <img
                src="/profile.jpg"
                alt="Ruben Casas"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
            </div>

          </div>

          {/* Special moves - 2x2 grid on right side */}
          <div className="space-y-3 pt-4">
            <p className="text-muted font-mono text-xs tracking-wider">special_moves[]</p>
            <div className="grid grid-cols-2 gap-3">
              {SPECIAL_MOVES.map((move) => (
                <div
                  key={move.name}
                  className="group p-3 bg-secondary rounded-lg border border-theme hover:border-accent transition-all duration-300 text-center"
                >
                  <span className="text-xl mb-1 block group-hover:animate-bounce">{move.icon}</span>
                  <span className="text-xs text-secondary group-hover:text-accent transition-colors">
                    {move.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="group p-3 bg-secondary/50 rounded-lg border border-theme hover:border-accent/50 transition-colors">
      <p className="text-muted font-mono text-xs mb-1">{label}</p>
      <p className="text-primary text-sm group-hover:text-accent transition-colors">{value}</p>
    </div>
  )
}

function HotTakeSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 rounded-2xl" />
      <div className="relative border border-accent/30 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
            <span className="text-accent font-mono text-xs">hot_take()</span>
          </div>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            "The IDE is dead. <span className="text-accent">Vibe engineering</span> killed it."
          </blockquote>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            With coding agents in the loop, the stack matters a lot less. The bottleneck is now{' '}
            <span className="text-accent">intent</span>, not syntax.
          </p>
          <p className="text-muted font-mono text-sm">
            If you disagree, cool. See you on the other side in a year. 😎
          </p>
        </div>
      </div>
    </section>
  )
}

function SideQuestsSection() {
  const [videoModal, setVideoModal] = useState<string | null>(null)
  const [imageModal, setImageModal] = useState<number | null>(null)

  useEffect(() => {
    if (videoModal === null && imageModal === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVideoModal(null)
        setImageModal(null)
      }
      if (imageModal !== null) {
        // Get non-video quests for navigation
        const imageQuests = SIDE_QUESTS.map((q, i) => ({ ...q, originalIndex: i })).filter(q => !q.video)
        const currentImageIndex = imageQuests.findIndex(q => q.originalIndex === imageModal)
        if (e.key === 'ArrowRight') {
          const nextIndex = (currentImageIndex + 1) % imageQuests.length
          setImageModal(imageQuests[nextIndex].originalIndex)
        }
        if (e.key === 'ArrowLeft') {
          const prevIndex = (currentImageIndex - 1 + imageQuests.length) % imageQuests.length
          setImageModal(imageQuests[prevIndex].originalIndex)
        }
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [videoModal, imageModal])

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-primary">side_quests()</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>
      <p className="text-secondary text-lg max-w-2xl">
        The human side of the character sheet. Water, wind, music, and a past life as a London tour guide.
      </p>

      {/* Bento grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]">
        {SIDE_QUESTS.map((quest, index) => (
          <div
            key={quest.title}
            onClick={() => {
              if (quest.video) {
                setVideoModal(quest.video)
              } else {
                setImageModal(index)
              }
            }}
            className={`relative group overflow-hidden rounded-xl border border-theme bg-secondary hover:border-accent transition-all duration-500 cursor-pointer ${
              index === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <img
              src={quest.image}
              alt={quest.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay - stronger gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

            {/* Play button for video items */}
            {quest.video && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Expand icon for image items */}
            {!quest.video && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Content - flex container pinned to bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
              <h3 className="text-white font-bold text-sm md:text-base drop-shadow-lg">{quest.title}</h3>
              <p className="text-white/80 text-xs font-mono leading-snug mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                {quest.description}
              </p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setVideoModal(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-10"
            onClick={() => setVideoModal(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoModal}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModal !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setImageModal(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setImageModal(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          {(() => {
            const imageQuests = SIDE_QUESTS.map((q, i) => ({ ...q, originalIndex: i })).filter(q => !q.video)
            const currentImageIndex = imageQuests.findIndex(q => q.originalIndex === imageModal)
            return (
              <>
                <button
                  className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    const prevIndex = (currentImageIndex - 1 + imageQuests.length) % imageQuests.length
                    setImageModal(imageQuests[prevIndex].originalIndex)
                  }}
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    const nextIndex = (currentImageIndex + 1) % imageQuests.length
                    setImageModal(imageQuests[nextIndex].originalIndex)
                  }}
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )
          })()}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={SIDE_QUESTS[imageModal].image}
              alt={SIDE_QUESTS[imageModal].title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <p className="text-white font-medium">{SIDE_QUESTS[imageModal].title}</p>
              <p className="text-white/70 text-sm font-mono">{SIDE_QUESTS[imageModal].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function PodcastCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    updateScrollButtons()
    const ref = scrollRef.current
    ref?.addEventListener('scroll', updateScrollButtons)
    return () => ref?.removeEventListener('scroll', updateScrollButtons)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-primary">brain_food[]</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
          </div>
          <p className="text-secondary">
            Podcasts that live in my head. My morning walk and daily bike ride session, basically.
          </p>
        </div>

        {/* Scroll controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-2 rounded-lg border border-theme bg-secondary hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-2 rounded-lg border border-theme bg-secondary hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PODCASTS.map((podcast) => (
          <a
            key={podcast.name}
            href={podcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-[280px] snap-start"
          >
            <div className="relative h-full rounded-xl border border-theme bg-secondary overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10">
              {/* Podcast artwork */}
              <div className="relative h-[160px] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: podcast.color }}
                />
                <img
                  src={podcast.artwork}
                  alt={podcast.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to color block if image fails
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: podcast.color }}
                  >
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                    {podcast.name}
                  </h3>
                  <svg
                    className="w-4 h-4 text-muted group-hover:text-accent transition-colors flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <p className="text-muted text-xs font-mono">{podcast.hosts}</p>
                <p className="text-secondary text-sm">{podcast.description}</p>
              </div>

              {/* Accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: podcast.color }}
              />
            </div>
          </a>
        ))}
      </div>

      <p className="text-muted text-sm font-mono text-center">
        // the range is deliberate. Architecture, AI, startups, or random facts about elevators.
      </p>
    </section>
  )
}

function YouTubeSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-primary">rabbit_hole()</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>
      <p className="text-secondary text-lg">
        The weird side of what I build. Not polished documentaries—just "I had a wild idea and shipped it" videos.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {YOUTUBE_VIDEOS.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="terminal-window overflow-hidden">
              {/* Terminal header */}
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <span className="text-xs text-muted font-mono truncate">{video.title}</span>
              </div>

              {/* YouTube thumbnail */}
              <div className="relative aspect-video bg-tertiary">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                  }}
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center transition-transform group-hover:scale-110">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                {video.title}
              </h3>
              <p className="text-muted text-sm">{video.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://www.youtube.com/@RubenCasas"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-theme rounded-lg hover:border-accent transition-colors group"
        >
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="text-primary group-hover:text-accent transition-colors">
            @RubenCasas
          </span>
          <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { number: '30+', label: 'Conferences', icon: '🎤' },
    { number: '15+', label: 'Countries', icon: '🌍' },
    { number: '50K+', label: 'Developers', icon: '👥' },
    { number: '100+', label: 'Blog Posts', icon: '✍️' },
  ]

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent rounded-2xl" />
      <div className="relative py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group text-center p-6 rounded-xl border border-theme bg-secondary/50 hover:border-accent transition-all duration-300"
            >
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-muted font-mono text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stage credits photo data
const STAGE_PHOTOS = [
  {
    src: '/images/about/qcon.jpg',
    alt: 'QCon London',
    conference: 'QCon London',
    year: '2023',
    rotation: -2,
    zIndex: 8,
  },
  {
    src: '/images/speaking/cloudconf.jpeg',
    alt: 'CloudConf Italy',
    conference: 'CloudConf Italy',
    year: '2023',
    rotation: 3,
    zIndex: 6,
  },
  {
    src: '/images/about/weyweyweb.jpeg',
    alt: 'WeyWeyWeb Spain',
    conference: 'WeyWeyWeb',
    year: '2023',
    rotation: -4,
    zIndex: 5,
  },
  {
    src: '/images/about/react-advanced1.jpeg',
    alt: 'React Advanced London',
    conference: 'React Advanced',
    year: '2024',
    rotation: 5,
    zIndex: 4,
  },
  {
    src: '/images/about/react-advanced3.JPG',
    alt: 'React Advanced London',
    conference: 'React Advanced',
    year: '2023',
    rotation: -3,
    zIndex: 3,
  },
  {
    src: '/images/about/qcon2.jpg',
    alt: 'QCon London',
    conference: 'QCon London',
    year: '2024',
    rotation: 4,
    zIndex: 2,
  },
  {
    src: '/images/about/workshop.jpeg',
    alt: 'Workshop Session',
    conference: 'Workshop',
    year: '2023',
    rotation: -2,
    zIndex: 1,
  },
  {
    src: '/images/about/react-advanced2.jpeg',
    alt: 'React Advanced London',
    conference: 'React Advanced',
    year: '2022',
    rotation: 2,
    zIndex: 7,
  },
]

function SpeakingGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (index: number) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null)
    }, 50)
  }

  useEffect(() => {
    if (selectedPhoto === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null)
      if (e.key === 'ArrowRight') setSelectedPhoto((prev) => (prev! + 1) % STAGE_PHOTOS.length)
      if (e.key === 'ArrowLeft') setSelectedPhoto((prev) => (prev! - 1 + STAGE_PHOTOS.length) % STAGE_PHOTOS.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto])

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-primary">stage_credits()</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>

      <p className="text-secondary text-lg max-w-2xl">
        Conference stages, workshops, and meetups. Spreading the good word about architecture, and AI.
      </p>

      {/* Dynamic scattered collage */}
      <div className="relative w-full h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

        {/* Scattered polaroid-style photos */}
        <div className="absolute inset-0">
          {/* Large featured photo - center */}
          <div
            className="absolute left-1/2 top-1/2 w-[260px] md:w-[300px] lg:w-[340px] group cursor-pointer"
            style={{
              transform: `translate(-50%, -50%) rotate(${hoveredIndex === 0 ? 0 : STAGE_PHOTOS[0].rotation}deg) scale(${hoveredIndex === 0 ? 1.05 : 1})`,
              zIndex: hoveredIndex === 0 ? 100 : STAGE_PHOTOS[0].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 0 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(0)}
          >
            <div className="bg-white p-2 md:p-3 rounded-sm shadow-2xl shadow-black/30">
              <div className="relative overflow-hidden">
                <img
                  src={STAGE_PHOTOS[0].src}
                  alt={STAGE_PHOTOS[0].alt}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="pt-2 md:pt-3 pb-1">
                <p className="font-handwriting text-gray-700 text-sm md:text-base">{STAGE_PHOTOS[0].conference}</p>
              </div>
            </div>
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-amber-100/80 rotate-2 shadow-sm" />
          </div>

          {/* Top left photo - QCon */}
          <div
            className="absolute left-[2%] md:left-[8%] top-[3%] md:top-[5%] w-[140px] md:w-[180px] lg:w-[200px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 1 ? 0 : STAGE_PHOTOS[1].rotation}deg) scale(${hoveredIndex === 1 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 1 ? 100 : STAGE_PHOTOS[1].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 1 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(1)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[1].src}
                alt={STAGE_PHOTOS[1].alt}
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[1].conference}</p>
              </div>
            </div>
            <div className="absolute -top-2 left-4 w-8 h-5 bg-amber-100/70 -rotate-6 shadow-sm" />
          </div>

          {/* Top right photo - WeyWeyWeb */}
          <div
            className="absolute right-[2%] md:right-[5%] top-[8%] md:top-[12%] w-[150px] md:w-[180px] lg:w-[210px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 2 ? 0 : STAGE_PHOTOS[2].rotation}deg) scale(${hoveredIndex === 2 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 2 ? 100 : STAGE_PHOTOS[2].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 2 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(2)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[2].src}
                alt={STAGE_PHOTOS[2].alt}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[2].conference}</p>
              </div>
            </div>
            <div className="absolute -top-2 right-6 w-10 h-5 bg-amber-100/70 rotate-3 shadow-sm" />
          </div>

          {/* Left side photo - React Advanced closeup */}
          <div
            className="absolute left-[0%] md:left-[3%] top-[38%] md:top-[35%] w-[130px] md:w-[160px] lg:w-[180px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 3 ? 0 : STAGE_PHOTOS[3].rotation}deg) scale(${hoveredIndex === 3 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 3 ? 100 : STAGE_PHOTOS[3].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 3 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(3)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[3].src}
                alt={STAGE_PHOTOS[3].alt}
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[3].conference}</p>
              </div>
            </div>
          </div>

          {/* Right side photo - React Advanced podium */}
          <div
            className="absolute right-[0%] md:right-[3%] top-[45%] md:top-[42%] w-[120px] md:w-[150px] lg:w-[170px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 4 ? 0 : STAGE_PHOTOS[4].rotation}deg) scale(${hoveredIndex === 4 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 4 ? 100 : STAGE_PHOTOS[4].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 4 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(4)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[4].src}
                alt={STAGE_PHOTOS[4].alt}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[4].conference}</p>
              </div>
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-5 bg-amber-100/70 rotate-1 shadow-sm" />
          </div>

          {/* Bottom left photo - QCon2 */}
          <div
            className="absolute left-[5%] md:left-[12%] bottom-[8%] md:bottom-[10%] w-[140px] md:w-[170px] lg:w-[190px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 5 ? 0 : STAGE_PHOTOS[5].rotation}deg) scale(${hoveredIndex === 5 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 5 ? 100 : STAGE_PHOTOS[5].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 5 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(5)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[5].src}
                alt={STAGE_PHOTOS[5].alt}
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[5].conference}</p>
              </div>
            </div>
            <div className="absolute -top-2 right-4 w-8 h-5 bg-amber-100/70 -rotate-2 shadow-sm" />
          </div>

          {/* Bottom right photo - Workshop */}
          <div
            className="absolute right-[8%] md:right-[10%] bottom-[5%] md:bottom-[8%] w-[130px] md:w-[155px] lg:w-[175px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 6 ? 0 : STAGE_PHOTOS[6].rotation}deg) scale(${hoveredIndex === 6 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 6 ? 100 : STAGE_PHOTOS[6].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 6 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(6)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(6)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[6].src}
                alt={STAGE_PHOTOS[6].alt}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[6].conference}</p>
              </div>
            </div>
          </div>

          {/* Top center-left - React Advanced big stage */}
          <div
            className="absolute left-[25%] md:left-[28%] top-[2%] md:top-[3%] w-[130px] md:w-[160px] lg:w-[180px] group cursor-pointer"
            style={{
              transform: `rotate(${hoveredIndex === 7 ? 0 : STAGE_PHOTOS[7].rotation}deg) scale(${hoveredIndex === 7 ? 1.1 : 1})`,
              zIndex: hoveredIndex === 7 ? 100 : STAGE_PHOTOS[7].zIndex,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
              pointerEvents: hoveredIndex !== null && hoveredIndex !== 7 ? 'none' : 'auto',
            }}
            onMouseEnter={() => handleMouseEnter(7)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedPhoto(7)}
          >
            <div className="bg-white p-2 rounded-sm shadow-xl shadow-black/20">
              <img
                src={STAGE_PHOTOS[7].src}
                alt={STAGE_PHOTOS[7].alt}
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="pt-2 pb-1">
                <p className="font-handwriting text-gray-700 text-xs md:text-sm">{STAGE_PHOTOS[7].conference}</p>
              </div>
            </div>
            <div className="absolute -top-2 left-3 w-8 h-5 bg-amber-100/70 rotate-6 shadow-sm" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[18%] right-[30%] text-3xl opacity-15 rotate-12 pointer-events-none select-none">🎤</div>
        <div className="absolute bottom-[25%] left-[25%] text-2xl opacity-10 -rotate-6 pointer-events-none select-none">✨</div>
        <div className="absolute top-[65%] right-[25%] text-xl opacity-10 rotate-45 pointer-events-none select-none">🌍</div>
      </div>

      {/* Conference badges */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {['CloudConf', 'React Advanced', 'QCon', 'WeyWeyWeb', 'React Summit', 'NodeConf'].map((conf) => (
          <span
            key={conf}
            className="px-3 py-1.5 bg-secondary/50 border border-theme rounded-full text-xs font-mono text-muted hover:border-accent hover:text-accent transition-colors cursor-default"
          >
            {conf}
          </span>
        ))}
      </div>

      <div className="text-center pt-2">
        <Link
          to="/speaking"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-mono group"
        >
          <span className="border-b border-accent/30 group-hover:border-accent transition-colors">
            view all speaking engagements
          </span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Photo modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setSelectedPhoto(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhoto((prev) => (prev! - 1 + STAGE_PHOTOS.length) % STAGE_PHOTOS.length)
            }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhoto((prev) => (prev! + 1) % STAGE_PHOTOS.length)
            }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={STAGE_PHOTOS[selectedPhoto].src}
              alt={STAGE_PHOTOS[selectedPhoto].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <p className="text-white font-medium">{STAGE_PHOTOS[selectedPhoto].conference}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function FooterSection() {
  return (
    <section className="space-y-8 pb-8">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Work history */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">work()</h3>
          <p className="text-muted text-sm font-mono">// look at my linkedin for the full backstory</p>
          <ul className="space-y-3 text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-accent">→</span>
              <span>Staff Vibe Engineer @ Postman (2022 — now)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-muted">→</span>
              <span>Senior Software Engineer @ Amex (2019 — 2022)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-muted">→</span>
              <span>Full-stack builder - Ecommerce projects (2014 — 2019)</span>
            </li>
          </ul>
          <a
            href="https://www.linkedin.com/in/ruben-casas-17100383/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Connect */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">connect()</h3>
          <p className="text-muted text-sm font-mono">// say hello</p>
          <div className="flex flex-wrap gap-3">
            <SocialLink href="https://x.com/Infoxicador" label="X / Twitter" />
            <SocialLink href="https://github.com/infoxicator" label="GitHub" />
            <SocialLink href="https://www.youtube.com/@RubenCasas" label="YouTube" />
            <SocialLink href="https://dev.to/infoxicator" label="DEV" />
          </div>
        </div>
      </div>

      {/* Sign off */}
      <div className="text-center pt-8">
        <p className="text-muted font-mono text-sm">
          // If you made it this far... why? Thanks for reading. 💯
        </p>
      </div>
    </section>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-secondary border border-theme rounded-lg text-sm text-secondary hover:text-accent hover:border-accent transition-all"
    >
      {label}
    </a>
  )
}
