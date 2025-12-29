import { Link } from '@tanstack/react-router'

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Sad face emoticon */}
      <div className="text-8xl md:text-9xl font-light text-primary mb-6">:(</div>

      {/* Main error heading */}
      <h1 className="text-2xl md:text-4xl font-semibold text-primary mb-2">
        {children || 'Page not found'}
      </h1>

      {/* Subtitle */}
      <p className="text-muted text-sm md:text-base mb-6">
        Your coding agent hallucinated a link
      </p>

      {/* Go home link */}
      <Link
        to="/"
        className="text-lg md:text-xl text-accent hover:text-accent-hover underline underline-offset-4 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
