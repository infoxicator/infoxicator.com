import { buildUrl } from './site'

type SeoInput = {
  title: string
  description?: string
  image?: string
  keywords?: string
  url?: string
  type?: 'website' | 'article'
  twitterHandle?: string
  publishedTime?: string
  tags?: string[]
}

const resolveUrl = (value?: string) => {
  if (!value) return undefined

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return buildUrl(value)
}

export const seo = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  twitterHandle = '@infoxicator',
  publishedTime,
  tags,
}: SeoInput) => {
  const resolvedImage = resolveUrl(image)
  const resolvedUrl = resolveUrl(url)
  const meta = [{ title }]

  if (description) {
    meta.push({ name: 'description', content: description })
  }

  if (keywords) {
    meta.push({ name: 'keywords', content: keywords })
  }

  meta.push({ name: 'twitter:title', content: title })

  if (description) {
    meta.push({ name: 'twitter:description', content: description })
  }

  meta.push({
    name: 'twitter:card',
    content: resolvedImage ? 'summary_large_image' : 'summary',
  })

  if (twitterHandle) {
    meta.push({ name: 'twitter:creator', content: twitterHandle })
    meta.push({ name: 'twitter:site', content: twitterHandle })
  }

  meta.push({ property: 'og:type', content: type })
  meta.push({ property: 'og:title', content: title })

  if (description) {
    meta.push({ property: 'og:description', content: description })
  }

  if (resolvedUrl) {
    meta.push({ property: 'og:url', content: resolvedUrl })
  }

  if (resolvedImage) {
    meta.push({ name: 'twitter:image', content: resolvedImage })
    meta.push({ property: 'og:image', content: resolvedImage })
  }

  if (type === 'article' && publishedTime) {
    meta.push({ property: 'article:published_time', content: publishedTime })
  }

  if (type === 'article' && tags?.length) {
    tags.forEach((tag) => {
      meta.push({ property: 'article:tag', content: tag })
    })
  }

  return meta
}
