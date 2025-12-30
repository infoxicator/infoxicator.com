import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const postsDir = path.join(rootDir, 'src', 'content', 'posts')
const publicDir = path.join(rootDir, 'public')
const baseUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://infoxicator.com')
  .replace(/\/$/, '')

const escapeXml = (value) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const normalizeDate = (value) => {
  if (!value) return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return undefined
  return parsed.toISOString().split('T')[0]
}

const toRfc2822 = (value) => {
  if (!value) return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return undefined
  return parsed.toUTCString()
}

const extractFrontmatterValue = (content, key) => {
  const match = content.match(new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?\\s*$`, 'm'))
  return match ? match[1].trim() : undefined
}

const extractDate = (content) => {
  return normalizeDate(extractFrontmatterValue(content, 'date'))
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
const feedPosts = []

for (const file of postFiles) {
  const slug = path.basename(file, '.md')
  const content = await fs.readFile(path.join(postsDir, file), 'utf8')
  const lastmod = extractDate(content)
  urls.push({ loc: `/${slug}/`, lastmod })
  feedPosts.push({
    slug,
    title: extractFrontmatterValue(content, 'title') ?? slug,
    excerpt: extractFrontmatterValue(content, 'excerpt'),
    pubDate: toRfc2822(extractFrontmatterValue(content, 'date')),
  })
}

const urlset = urls
  .map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
    return `<url><loc>${buildUrl(loc)}</loc>${lastmodTag}</url>`
  })
  .join('')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`

const sortedFeedPosts = feedPosts
  .filter((post) => post.pubDate)
  .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

const feedItems = sortedFeedPosts
  .map((post) => {
    const link = buildUrl(`/${post.slug}/`)
    const description = post.excerpt ? escapeXml(post.excerpt) : ''
    return `<item>` +
      `<title>${escapeXml(post.title)}</title>` +
      `<link>${link}</link>` +
      `<guid isPermaLink="true">${link}</guid>` +
      `<pubDate>${post.pubDate}</pubDate>` +
      `<description>${description}</description>` +
      `</item>`
  })
  .join('')

const lastBuildDate = sortedFeedPosts[0]?.pubDate ?? new Date().toUTCString()
const feed = `<?xml version="1.0" encoding="UTF-8"?>` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">` +
  `<channel>` +
  `<title>Infoxicator</title>` +
  `<link>${buildUrl('/')}</link>` +
  `<description>Personal blog and portfolio of Ruben Casas.</description>` +
  `<language>en</language>` +
  `<lastBuildDate>${lastBuildDate}</lastBuildDate>` +
  `<atom:link href="${buildUrl('/rss.xml')}" rel="self" type="application/rss+xml" />` +
  `${feedItems}` +
  `</channel>` +
  `</rss>`

await fs.mkdir(publicDir, { recursive: true })
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(publicDir, 'rss.xml'), feed)
await fs.writeFile(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${buildUrl('/sitemap.xml')}\n`,
)

console.log(`Generated sitemap with ${urls.length} URLs and RSS feed with ${feedPosts.length} items.`)
