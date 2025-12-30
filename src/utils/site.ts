export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://infoxicator.com')
  .replace(/\/$/, '')

export const SITE_NAME = 'Infoxicator'
export const SITE_AUTHOR = 'Ruben Casas'
export const SITE_TWITTER_HANDLE = '@Infoxicador'
export const SITE_SOCIALS = {
  twitter: 'https://x.com/Infoxicador',
  github: 'https://github.com/infoxicator',
  linkedin: 'https://www.linkedin.com/in/ruben-casas-17100383/',
  youtube: 'https://www.youtube.com/rubencasas',
} as const

export function buildUrl(path: string) {
  if (!path) {
    return SITE_URL
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
