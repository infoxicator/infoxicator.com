import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const postsDir = path.join(rootDir, 'src', 'content', 'posts')
const publicDir = path.join(rootDir, 'public')
const baseUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://infoxicator.com')
  .replace(/\/$/, '')

const normalizeDate = (value) => {
  if (!value) return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return undefined
  return parsed.toISOString().split('T')[0]
}

const extractDate = (content) => {
  const match = content.match(/^date:\s*["']?([^"'\n]+)["']?/m)
  return match ? normalizeDate(match[1].trim()) : undefined
}

const buildUrl = (pathname) => {
  if (!pathname) return baseUrl
  return `${baseUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

const files = await fs.readdir(postsDir)
const postFiles = files.filter((file) => file.endsWith('.md'))

const urls = [
  { loc: '/', lastmod: undefined },
  { loc: '/blog/', lastmod: undefined },
]

for (const file of postFiles) {
  const slug = path.basename(file, '.md')
  const content = await fs.readFile(path.join(postsDir, file), 'utf8')
  const lastmod = extractDate(content)
  urls.push({ loc: `/${slug}/`, lastmod })
}

const urlset = urls
  .map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
    return `<url><loc>${buildUrl(loc)}</loc>${lastmodTag}</url>`
  })
  .join('')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`

await fs.mkdir(publicDir, { recursive: true })
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap)
await fs.writeFile(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${buildUrl('/sitemap.xml')}\n`,
)

console.log(`Generated sitemap with ${urls.length} URLs.`)
