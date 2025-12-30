import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const extractFirstImage = (content: string) => {
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (htmlMatch?.[1]) return htmlMatch[1]

  const markdownMatch = content.match(/!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/)
  if (markdownMatch?.[1]) return markdownMatch[1]

  return undefined
}

const posts = defineCollection({
  name: 'posts',
  directory: './src/content/posts',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().date(),
    tags: z.array(z.string()),
    readingTime: z.string(),
    image: z.string().optional(),
  }),
  transform: ({ content, ...post }) => ({
    ...post,
    slug: post._meta.path,
    content: content.trim(),
    image: post.image ?? extractFirstImage(content),
  }),
})

export default defineConfig({
  collections: [posts],
})
