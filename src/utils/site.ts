export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://infoxicator.com')
  .replace(/\/$/, '')

export function buildUrl(path: string) {
  if (!path) {
    return SITE_URL
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
